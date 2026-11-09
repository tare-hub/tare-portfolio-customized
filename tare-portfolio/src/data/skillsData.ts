import { SkillItem } from '../types';

export const skillsData: SkillItem[] = [
  // Backend
  {
    name: 'Laravel & PHP 8.3+',
    level: 92,
    category: 'backend',
    icon: 'Terminal',
    experience: '3+ Years',
    description: 'Enterprise REST APIs, Eloquent ORM optimizations, Service-Repository pattern, queue workers, and authorization policies.',
    codeSnippet: {
      language: 'php',
      filename: 'OrderService.php',
      code: `<?php

namespace App\\Services;

use App\\Models\\Order;
use App\\Events\\OrderPlaced;
use Illuminate\\Support\\Facades\\DB;
use App\\Exceptions\\InsufficientInventoryException;

class OrderService
{
    public function placeOrder(int $userId, array $items): Order
    {
        return DB::transaction(function () use ($userId, $items) {
            $total = 0;
            $order = Order::create([
                'user_id' => $userId,
                'status'  => 'processing',
                'ref_no'  => 'ORD-' . strtoupper(bin2hex(random_bytes(4))),
            ]);

            foreach ($items as $item) {
                $medicine = \\App\\Models\\Medicine::lockForUpdate()->findOrFail($item['id']);
                
                if ($medicine->stock < $item['quantity']) {
                    throw new InsufficientInventoryException("Stock depleted: {$medicine->name}");
                }
                
                $medicine->decrement('stock', $item['quantity']);
                $order->items()->create([
                    'medicine_id' => $medicine->id,
                    'quantity'    => $item['quantity'],
                    'unit_price'  => $medicine->price,
                ]);
                $total += $medicine->price * $item['quantity'];
            }

            $order->update(['total_amount' => $total]);
            event(new OrderPlaced($order));
            
            return $order->load('items');
        });
    }
}`,
      explanation: 'Pessimistic database locking (`lockForUpdate`) wrapped in atomic DB transactions ensures zero inventory race conditions under heavy concurrent checkout spikes.'
    }
  },
  {
    name: 'RESTful API Architecture',
    level: 90,
    category: 'backend',
    icon: 'Cpu',
    experience: '3+ Years',
    description: 'Standardized JSON responses, API rate limiting, JWT/Sanctum authentication, versioning, and OpenAPI/Swagger documentation.',
    codeSnippet: {
      language: 'php',
      filename: 'ApiController.php',
      code: `<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Resources\\PharmacyResource;
use App\\Models\\Pharmacy;
use Illuminate\\Http\\Request;
use Illuminate\\Http\\JsonResponse;

class PharmacyController extends BaseApiController
{
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'lat'    => 'required|numeric|between:-90,90',
            'lng'    => 'required|numeric|between:-180,180',
            'radius' => 'nullable|numeric|max:50',
        ]);

        $radius = $validated['radius'] ?? 10; // km

        $pharmacies = Pharmacy::query()
            ->selectRaw("*, (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance", [
                $validated['lat'], $validated['lng'], $validated['lat']
            ])
            ->where('is_active', true)
            ->having('distance', '<=', $radius)
            ->orderBy('distance')
            ->paginate(15);

        return $this->respondWithPagination(
            PharmacyResource::collection($pharmacies),
            'Pharmacies fetched successfully'
        );
    }
}`,
      explanation: 'Haversine distance formulation calculates precise physical proximity for on-demand pharmacy searches with low database overhead.'
    }
  },

  // Frontend
  {
    name: 'Vue 3 & Composition API',
    level: 88,
    category: 'frontend',
    icon: 'Layers',
    experience: '2+ Years',
    description: 'Reactive state with Pinia, Composition API script setup, reusable composables, Vite optimization, and component lifecycles.',
    codeSnippet: {
      language: 'typescript',
      filename: 'usePharmacySearch.ts',
      code: `import { ref, computed, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import type { Pharmacy } from '@/types';

export function usePharmacySearch() {
  const searchQuery = ref('');
  const results = ref<Pharmacy[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const performSearch = useDebounceFn(async (query: string) => {
    if (!query.trim()) {
      results.value = [];
      return;
    }
    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch(\`/api/v1/pharmacies/search?q=\${encodeURIComponent(query)}\`);
      if (!response.ok) throw new Error('Failed to fetch store inventory');
      const data = await response.json();
      results.value = data.data;
    } catch (err: any) {
      error.value = err.message || 'Search failed';
    } finally {
      isLoading.value = false;
    }
  }, 300);

  watch(searchQuery, (newVal) => {
    performSearch(newVal);
  });

  const verifiedStoresOnly = computed(() => 
    results.value.filter(store => store.is_verified)
  );

  return { searchQuery, results, verifiedStoresOnly, isLoading, error };
}`,
      explanation: 'Debounced search composable preventing network floods while delivering instantaneous reactive suggestions to users.'
    }
  },
  {
    name: 'JavaScript / TypeScript',
    level: 89,
    category: 'frontend',
    icon: 'Code2',
    experience: '3+ Years',
    description: 'Modern ESNext syntax, strong type-safety, async/await concurrency, DOM APIs, Canvas 2D/WebGL rendering, and Web Audio.',
    codeSnippet: {
      language: 'typescript',
      filename: 'particleEngine.ts',
      code: `interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export class ParticleMatrix {
  private particles: Particle[] = [];
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, count: number) {
    this.ctx = ctx;
    this.init(count);
  }

  private init(count: number) {
    const { width, height } = this.ctx.canvas;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: '#e84a4a'
      });
    }
  }

  public render(mouseX: number, mouseY: number) {
    // 60FPS fluid simulation loop with mouse repulsion
  }
}`,
      explanation: 'TypeScript strict typing with hardware-accelerated HTML5 Canvas particle physics rendering smoothly at 60 FPS.'
    }
  },
  {
    name: 'Modern CSS & Tailwind CSS',
    level: 93,
    category: 'frontend',
    icon: 'Palette',
    experience: '3+ Years',
    description: 'Grid, Flexbox, glassmorphic filters, responsive typography clamps, dark mode theming, and custom micro-animations.',
    codeSnippet: {
      language: 'css',
      filename: 'cyber-tokens.css',
      code: `:root {
  --bg-dark: #07070a;
  --cyber-red: #e84a4a;
  --glow-radius: 28px;
}

.glassmorphic-card {
  background: rgba(18, 17, 24, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
              border-color 0.3s ease;
}

.glassmorphic-card:hover {
  transform: translateY(-4px);
  border-color: rgba(232, 74, 74, 0.4);
}`,
      explanation: 'Hardware-composited blur effects and non-blocking CSS transforms deliver premium desktop application aesthetics.'
    }
  },

  // Database
  {
    name: 'MySQL & MariaDB',
    level: 87,
    category: 'database',
    icon: 'Database',
    experience: '3+ Years',
    description: 'Relational schema design, composite index tuning, EXPLAIN query plans, foreign key constraints, and transactional consistency.',
    codeSnippet: {
      language: 'sql',
      filename: 'schema_optimization.sql',
      code: `-- High-performance spatial and compound indexing
CREATE TABLE IF NOT EXISTS inventory_reservations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT UNSIGNED NOT NULL,
    medicine_id BIGINT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_medicine_expiry (medicine_id, expires_at),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC;

-- Index plan verification
EXPLAIN SELECT medicine_id, SUM(quantity) as reserved_qty
FROM inventory_reservations
WHERE medicine_id = 42 AND expires_at > NOW()
GROUP BY medicine_id;`,
      explanation: 'Composite indexes (medicine_id, expires_at) satisfy range scans in index-only covering queries, avoiding costly table lookups.'
    }
  },

  // DevOps & Workflow
  {
    name: 'Git, GitHub & CI/CD',
    level: 88,
    category: 'devops',
    icon: 'GitBranch',
    experience: '3+ Years',
    description: 'Feature branching, interactive rebase, semantic versioning, pull request reviews, and automated deployment pipelines.',
    codeSnippet: {
      language: 'yaml',
      filename: '.github/workflows/deploy.yml',
      code: `name: Production CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  test-and-verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup PHP 8.3
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
          extensions: mbstring, pdo_mysql, redis
      - name: Run Test Suite
        run: |
          composer install -q --no-ansi --no-interaction
          ./vendor/bin/phpunit --stop-on-failure`,
      explanation: 'Automated GitHub Actions workflow validating test suites and static analysis before zero-downtime production deployment.'
    }
  },
  {
    name: 'UI/UX & System Design',
    level: 86,
    category: 'architecture',
    icon: 'Layout',
    experience: '3+ Years',
    description: 'Figma wireframing, component-driven design systems, accessibility (WCAG), information architecture, and user flow mapping.',
    codeSnippet: {
      language: 'typescript',
      filename: 'designSystem.tokens.ts',
      code: `export const DesignTokens = {
  colors: {
    obsidian: '#07070a',
    crimson: '#e84a4a',
    emerald: '#10b981',
    textPrimary: '#f4f1ee',
    textMuted: '#99959d',
  },
  typography: {
    fontSans: '"Manrope", sans-serif',
    fontMono: '"DM Mono", monospace',
  },
  radii: {
    card: '14px',
    button: '8px',
  }
} as const;`,
      explanation: 'Strict tokenized design system enforcing visual harmony, contrast ratios, and seamless theming across web interfaces.'
    }
  }
];

