export interface TechNote {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedDate: string;
  excerpt: string;
  tags: string[];
  content: string;
}

export const techNotesData: TechNote[] = [
  {
    slug: 'concurrency-control-inventory',
    title: 'Pessimistic Concurrency Locking in Multi-Vendor E-Commerce',
    category: 'Backend & Database Architecture',
    readTime: '6 min read',
    publishedDate: 'Nov 2024',
    excerpt: 'How we solved stock-depletion race conditions under concurrent pharmacy checkouts using MariaDB row-level locks and atomic database transactions in Laravel.',
    tags: ['Laravel', 'MariaDB', 'Transactions', 'Concurrency', 'System Design'],
    content: `
### The Concurrency Challenge in Pharmaceutical Inventories

In multi-vendor healthcare marketplaces like **PharmaJiji**, inventory availability isn't just an e-commerce concern—dispensing an out-of-stock emergency medication due to a race condition can directly disrupt critical patient care.

Under high checkout concurrency (e.g. multiple users purchasing the final batch of a specialized antibiotic simultaneously), a classic Read-Modify-Write anomaly can occur:

1. **Request A** reads stock count: \`stock = 1\`.
2. **Request B** reads stock count before Request A completes: \`stock = 1\`.
3. **Request A** decrements: \`stock = 0\`, records the order.
4. **Request B** also decrements: \`stock = -1\` (or over-commits inventory).

### Solution: Pessimistic Row-Level Locking (\`SELECT ... FOR UPDATE\`)

To eliminate the window of vulnerability, we utilize InnoDB's row-level locking via Laravel's \`lockForUpdate()\` method encapsulated within an atomic transaction.

\`\`\`php
use Illuminate\\Support\\Facades\\DB;
use App\\Exceptions\\InsufficientInventoryException;

public function processCheckout(int $userId, array $orderItems): Order
{
    return DB::transaction(function () use ($userId, $orderItems) {
        $order = Order::create([
            'user_id' => $userId,
            'status'  => 'processing',
        ]);

        foreach ($orderItems as $item) {
            // Acquires an exclusive row-level lock on this specific record
            $medicine = Medicine::where('id', $item['medicine_id'])
                ->lockForUpdate()
                ->firstOrFail();

            if ($medicine->stock < $item['quantity']) {
                throw new InsufficientInventoryException(
                    "Insufficient inventory for: {$medicine->name}"
                );
            }

            $medicine->decrement('stock', $item['quantity']);
            
            $order->items()->create([
                'medicine_id' => $medicine->id,
                'quantity'    => $item['quantity'],
                'unit_price'  => $medicine->price,
            ]);
        }

        return $order;
    }, 5); // 5 attempts if deadlock occurs
}
\`\`\`

### Architectural Safeguards

1. **Deadlock Prevention via Deterministic Sorting**:
   When acquiring multiple row locks across an array of items, items are strictly ordered by \`medicine_id ASC\`. This prevents cyclic dependency deadlocks when two orders involve overlapping items in opposite sequence.
2. **Short-Lived Transactions**:
   External API calls (payment gateway authorization, SMS delivery alerts) are dispatched strictly **outside** the database transaction boundary using queued jobs (\`OrderPlacedEvent\`) to avoid holding row locks while awaiting external network I/O.
3. **Graceful Fallbacks**:
   When a lock timeout occurs, the transaction automatically fails fast and returns a standardized HTTP 409 Conflict with an actionable retry-after header.
    `
  },
  {
    slug: 'optimizing-laravel-api-latency',
    title: 'Slashing API Latency from 340ms to 42ms with Redis & Composite Indexing',
    category: 'Performance Engineering',
    readTime: '5 min read',
    publishedDate: 'Oct 2024',
    excerpt: 'Detailed case study on optimizing read-heavy REST endpoints in AutoDrive: analyzing EXPLAIN query execution plans, eliminating N+1 queries, and implementing cache tags.',
    tags: ['MySQL', 'Redis', 'Laravel', 'Query Tuning', 'Benchmarking'],
    content: `
### Diagnosing the Bottleneck

In **AutoDrive**, the vehicle fleet search endpoint (\`GET /api/v1/vehicles/search\`) was suffering from escalating latency under catalog load:
- Initial Average Latency: **340ms**
- Latency at p95: **780ms**

Profiling with Laravel Telescope and MySQL \`EXPLAIN\` revealed three structural culprits:
1. **Full Table Scans** during compound queries filtering on \`status\`, \`category\`, and sorting by \`daily_rate\`.
2. **Hidden N+1 Queries** loading vehicle insurance specs and agency branch locations.
3. **Zero Caching** of un-mutated vehicle specifications.

### Step 1: Compound Covering Index Optimization

Rather than separate single-column indexes, we designed a composite index covering the query predicate:

\`\`\`sql
-- Before: Separate single column indexes triggered filesort
ALTER TABLE vehicles ADD INDEX idx_status (status);
ALTER TABLE vehicles ADD INDEX idx_category (category);

-- After: Composite index covering the exact filtering and sorting order
ALTER TABLE vehicles ADD INDEX idx_vehicles_search (status, category, daily_rate);
\`\`\`

Evaluating the query plan via \`EXPLAIN\`:
- \`type: ref\` (down from \`ALL\` table scan)
- \`rows examined: 18\` (down from \`12,400\`)
- \`Extra: Using index condition\`

### Step 2: Eager Loading and Column Pruning

By replacing lazy-loaded relationships with targeted eager loads and selecting only necessary columns, query volume plummeted from 24 queries per request to **2 queries**:

\`\`\`php
$vehicles = Vehicle::query()
    ->select(['id', 'make', 'model', 'category', 'daily_rate', 'agency_id'])
    ->with(['agency:id,name,city,rating', 'primaryPhoto:id,vehicle_id,url'])
    ->where('status', 'available')
    ->where('category', $category)
    ->orderBy('daily_rate')
    ->paginate(20);
\`\`\`

### Step 3: Layered Redis Tagged Caching

For static search patterns, we implemented tag-based Redis caching with 15-minute invalidation TTLs and automated bust on vehicle inventory mutations:

\`\`\`php
$cacheKey = "vehicles:search:{$category}:{$page}";

$data = Cache::tags(['vehicles_catalog'])->remember($cacheKey, 900, function () use ($query) {
    return VehicleResource::collection($query->get());
});
\`\`\`

### Results & Verification

- Average Response Time: **42ms** (87.6% reduction)
- P99 Response Time: **88ms**
- Server CPU Load: reduced by **64%** under simulated load testing of 1,000 req/s.
    `
  },
  {
    slug: 'clean-architecture-php8',
    title: 'Domain-Driven Service-Repository Patterns in PHP 8.3 & Laravel',
    category: 'Software Architecture',
    readTime: '7 min read',
    publishedDate: 'Aug 2024',
    excerpt: 'Structuring large-scale web applications: decoupling business logic from controllers, utilizing typed DTOs, and leveraging PHP 8.3 readonly classes.',
    tags: ['PHP 8.3', 'Clean Architecture', 'DTOs', 'Refactoring', 'Testing'],
    content: `
### Why "Fat Controllers" Fail at Scale

In small prototypes, placing database queries and business validation directly inside HTTP Controllers seems convenient. However, as applications expand with multiple consumers (Web, REST API, CLI Cron Jobs, Webhooks), duplicated logic leads to regressions and testing nightmares.

In our production architectures, controllers serve strictly as **HTTP orchestrators**:
1. Accept and validate HTTP requests.
2. Transform input into typed **Data Transfer Objects (DTOs)**.
3. Delegate to **Domain Services**.
4. Return standardized API resources.

### 1. Strongly Typed Readonly DTOs

Leveraging PHP 8.2/8.3 readonly classes ensures payload immutability across the entire execution lifecycle:

\`\`\`php
namespace App\\DTOs;

readonly class CreateRentalDTO
{
    public function __construct(
        public int $userId,
        public int $vehicleId,
        public \\DateTimeImmutable $startDate,
        public \\DateTimeImmutable $endDate,
        public ?string $promoCode = null
    ) {}

    public static function fromRequest(\\Illuminate\\Http\\Request $request): self
    {
        return new self(
            userId: $request->user()->id,
            vehicleId: (int) $request->input('vehicle_id'),
            startDate: new \\DateTimeImmutable($request->input('start_date')),
            endDate: new \\DateTimeImmutable($request->input('end_date')),
            promoCode: $request->input('promo_code')
        );
    }
}
\`\`\`

### 2. Isolated Domain Services

Domain services house pure business logic, completely decoupled from HTTP request/response objects. This makes them effortlessly testable using unit tests without mocking HTTP kernels:

\`\`\`php
namespace App\\Services;

use App\\DTOs\\CreateRentalDTO;
use App\\Repositories\\Contracts\\VehicleRepositoryInterface;
use App\\Repositories\\Contracts\\RentalRepositoryInterface;

class RentalBookingService
{
    public function __construct(
        private VehicleRepositoryInterface $vehicles,
        private RentalRepositoryInterface $rentals,
        private PricingCalculationEngine $pricing
    ) {}

    public function bookVehicle(CreateRentalDTO $dto): Rental
    {
        // 1. Conflict verification
        $isAvailable = $this->vehicles->isAvailableBetween(
            $dto->vehicleId,
            $dto->startDate,
            $dto->endDate
        );

        if (!$isAvailable) {
            throw new VehicleConflictException("Selected dates conflict with existing reservation.");
        }

        // 2. Pricing calculation with seasonal multiplier
        $price = $this->pricing->calculateTotalPrice($dto);

        // 3. Persist through repository
        return $this->rentals->create([
            'user_id'     => $dto->userId,
            'vehicle_id'  => $dto->vehicleId,
            'start_date'  => $dto->startDate,
            'end_date'    => $dto->endDate,
            'total_price' => $price,
            'status'      => 'confirmed',
        ]);
    }
}
\`\`\`

### Key Architectural Benefits

- **100% Unit Testability**: Services can be tested in isolation with in-memory repository mocks in <5ms.
- **Single Source of Truth**: Whether a booking is created via mobile app, admin panel, or background queue worker, the exact same business invariants apply.
- **Clear Team Velocity**: Frontend and backend contracts remain stable and self-documenting.
    `
  }
];

