import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'pharmajiji',
    title: 'PharmaJiji',
    subtitle: 'Enterprise Multi-Vendor Healthcare Marketplace',
    category: 'Full-Stack',
    shortDescription: 'A multi-vendor digital healthcare platform connecting licensed pharmacies with patients for prescription fulfillment, real-time inventory tracking, and swift logistics.',
    fullDescription: 'PharmaJiji addresses critical access bottlenecks in pharmaceutical supply chains. The application incorporates a multi-tenant architecture where individual pharmacies manage their inventory, order queues, and compliance filings, while patients benefit from instant drug search, proximity-based store matching, and secure checkout.',
    tags: ['Laravel 13', 'Vue 3', 'MariaDB', 'REST API', 'Pinia', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/tare-hub',
    liveUrl: 'https://github.com/tare-hub',
    featured: true,
    accentGradient: 'from-rose-950/60 via-red-950/30 to-black',
    symbol: '✚',
    symbolType: 'text',
    imageUrl: './assets/pharmajiji-mockup.jpg',
    imageAlt: 'PharmaJiji Multi-Vendor Digital Pharmacy Marketplace Interface',
    mockupType: 'pharma',
    architecture: {
      overview: 'Modular monolithic structure with isolated domain modules for Vendors, Catalog, Orders, and Deliveries. Uses asynchronous job queues for SMS order notifications and automated inventory reconciliations.',
      keyFeatures: [
        'Multi-tenant pharmacy inventory & stock alerts',
        'Prescription image upload & pharmacist verification flow',
        'Geo-proximity pharmacy lookup using spatial coordinates',
        'Automated dispatch and tracking pipeline for couriers',
        'Granular role-based permissions (SuperAdmin, Vendor, Customer, Courier)'
      ],
      databaseSchema: [
        'pharmacies: id, name, license_no, lat, lng, is_verified, rating, created_at',
        'medicines: id, pharmacy_id, name, generic_name, dosage, price, stock, requires_rx',
        'orders: id, customer_id, pharmacy_id, total_amount, status (pending/verified/dispatched), payment_status',
        'order_items: id, order_id, medicine_id, quantity, unit_price',
        'prescriptions: id, order_id, user_id, document_path, reviewed_by, status'
      ],
      apiEndpoints: [
        { method: 'GET', path: '/api/v1/pharmacies/search?q={query}&lat={lat}&lng={lng}', desc: 'Geolocated inventory search with distance ranking' },
        { method: 'POST', path: '/api/v1/orders/checkout', desc: 'Atomic transactional order creation with stock reservation' },
        { method: 'POST', path: '/api/v1/prescriptions/upload', desc: 'Encrypted document ingestion with MIME validation' },
        { method: 'GET', path: '/api/v1/vendor/inventory/analytics', desc: 'Sales velocities and low-stock reorder thresholds' }
      ],
      technicalHighlights: [
        'Optimized MariaDB spatial indexing for fast neighborhood geo-queries',
        'Idempotent payment webhook listeners preventing double charges',
        'Vue 3 Composition API frontend with optimistic UI updates and live search debouncing'
      ],
      systemMetrics: [
        { label: 'Avg Latency', value: '< 65ms' },
        { label: 'Uptime Target', value: '99.9%' },
        { label: 'Concurrency', value: '1,500+ Req/s' },
        { label: 'DB Queries/Req', value: '<= 4 queries' }
      ]
    }
  },
  {
    id: 'autodrive',
    title: 'AutoDrive',
    subtitle: 'Fleet Rental & Dealership Management System',
    category: 'Backend',
    shortDescription: 'A full-cycle vehicle fleet management and booking platform built with Laravel and MySQL, featuring automated rental contracts, dynamic availability calculation, and servicing lifecycles.',
    fullDescription: 'AutoDrive is designed for vehicle rental agencies and car dealerships needing unified operations. It orchestrates vehicle availability calendars, customer KYC validation, pricing surges, maintenance scheduling, and financial transaction reporting.',
    tags: ['Laravel', 'PHP 8.3', 'MySQL', 'Blade & Alpine.js', 'Redis', 'Stripe Integration'],
    githubUrl: 'https://github.com/tare-hub',
    liveUrl: 'https://github.com/tare-hub',
    featured: true,
    accentGradient: 'from-zinc-900 via-stone-900/60 to-black',
    symbol: 'AD',
    symbolType: 'text',
    imageUrl: './assets/autodrive-mockup.jpg',
    imageAlt: 'AutoDrive Fleet Rental and Dealership Management Platform Interface',
    mockupType: 'autodrive',
    architecture: {
      overview: 'Service-Repository architecture with event-driven domain dispatches. Utilizes Redis caching for high-read vehicle catalog queries and database transactions with row-level locking to eliminate double-booking race conditions.',
      keyFeatures: [
        'Real-time date-range conflict detection preventing double-booking',
        'Dynamic tier-based pricing (daily, weekly, seasonal multipliers)',
        'Vehicle inspection checklist with automated mileage and damage tracking',
        'Automated PDF contract and invoice generation via background workers',
        'Customer KYC document verification portal'
      ],
      databaseSchema: [
        'vehicles: id, vin, make, model, year, category, daily_rate, status, mileage',
        'rentals: id, vehicle_id, customer_id, start_date, end_date, total_price, deposit_held, status',
        'maintenance_logs: id, vehicle_id, service_date, description, cost, next_due_km',
        'payments: id, rental_id, transaction_ref, amount, gateway, status'
      ],
      apiEndpoints: [
        { method: 'GET', path: '/api/v1/vehicles/available?start={date}&end={date}', desc: 'Conflict-free availability query using exclusion window' },
        { method: 'POST', path: '/api/v1/rentals/reserve', desc: 'Pessimistic lock booking checkout with deposit pre-authorization' },
        { method: 'PATCH', path: '/api/v1/vehicles/{id}/odometer', desc: 'Odometer sync and scheduled maintenance trigger' }
      ],
      technicalHighlights: [
        'Pessimistic concurrency control on vehicle calendar records',
        'Strict database normalization with composite indexes on (status, category, daily_rate)',
        'Automated scheduled cron tasks for rental overdue alerts and telemetry sync'
      ],
      systemMetrics: [
        { label: 'Booking Time', value: '< 2.4s' },
        { label: 'Cache Hit Ratio', value: '94%' },
        { label: 'Zero Overlaps', value: '100% strict' },
        { label: 'Supported Fleet', value: '500+ Assets' }
      ]
    }
  },
  {
    id: 'media-works',
    title: 'Media Works',
    subtitle: 'Immersive Multimedia Storytelling Platform',
    category: 'Creative',
    shortDescription: 'An editorial digital publication and multimedia showcase engineered with performance-focused modern web technologies, celebrating community advocacy, audio-visual narratives, and photojournalism.',
    fullDescription: 'Media Works challenges conventional portfolio design by blending magazine-grade typography, dynamic video presentation, sound design, and fluid micro-interactions. Tailored for journalists, creators, and advocacy groups who need their stories to leave an unforgettable emotional imprint.',
    tags: ['HTML5', 'Modern CSS', 'JavaScript ESNext', 'Web Audio API', 'IntersectionObserver'],
    githubUrl: 'https://github.com/tare-hub',
    liveUrl: 'https://github.com/tare-hub',
    featured: true,
    accentGradient: 'from-amber-950/60 via-stone-900 to-black',
    symbol: 'MW',
    symbolType: 'text',
    imageUrl: './assets/media-works-mockup.jpg',
    imageAlt: 'Media Works Editorial Storytelling and Audio-Visual Digital Publication',
    mockupType: 'media',
    architecture: {
      overview: 'Zero-runtime-overhead architecture leveraging modern CSS Grid, native scroll-driven animations, fluid layout clamps, and lazy-loading media pipelines to deliver 100/100 Lighthouse performance scores.',
      keyFeatures: [
        'Editorial typography system with dynamic viewport sizing',
        'Audio-visual storytelling modules with interactive audio commentary',
        'Zero-layout-shift responsive picture elements and WebP delivery',
        'Custom keyboard navigation and full screen-reader compliance (WCAG 2.1 AA)'
      ],
      databaseSchema: [
        'articles: id, slug, title, lede, content, cover_image, author, published_at',
        'media_assets: id, article_id, type (video/audio/photo), url, caption, aspect_ratio',
        'tags: id, name, slug'
      ],
      apiEndpoints: [
        { method: 'GET', path: '/api/articles?featured=true', desc: 'Cached static JSON response' },
        { method: 'GET', path: '/api/stories/{slug}', desc: 'Full editorial bundle' }
      ],
      technicalHighlights: [
        'Lighthouse performance: 99-100 across mobile & desktop',
        'Adaptive streaming and blur-up placeholder generation for low-bandwidth regions',
        'Zero external framework bloat for maximum accessibility'
      ],
      systemMetrics: [
        { label: 'Lighthouse Score', value: '100 / 100' },
        { label: 'Bundle Size', value: '< 28 KB' },
        { label: 'First Contentful Paint', value: '0.4s' },
        { label: 'Accessibility', value: '100%' }
      ]
    }
  },
  {
    id: 'devpulse',
    title: 'DevPulse Sentinel',
    subtitle: 'Cloud Microservices Telemetry & API Sentinel',
    category: 'Full-Stack',
    shortDescription: 'A developer observability console displaying real-time API response latency histograms, error budgets, and distributed microservices health metrics.',
    fullDescription: 'Built to provide immediate observability across decoupled backend architectures, DevPulse features live WebSocket streaming of HTTP request/response metrics, threshold alerting, and incident timeline replays.',
    tags: ['TypeScript', 'Node.js', 'Vue 3', 'WebSockets', 'Chart.js', 'Docker'],
    githubUrl: 'https://github.com/tare-hub',
    liveUrl: 'https://github.com/tare-hub',
    featured: false,
    accentGradient: 'from-cyan-950/50 via-slate-900 to-black',
    symbol: '⚡',
    symbolType: 'text',
    imageUrl: './assets/devpulse-mockup.jpg',
    imageAlt: 'DevPulse Sentinel Cloud Microservices Telemetry and Real-Time Latency Dashboard',
    mockupType: 'devpulse',
    architecture: {
      overview: 'Lightweight agent collector pushing high-frequency metrics over bidirectional WebSocket channels into an in-memory ring buffer with sliding-window aggregations.',
      keyFeatures: [
        'Real-time p50, p95, p99 latency percentile calculations',
        'Live heartbeat monitors with automated webhook notifications',
        'Interactive timeline scrubber for historical incident diagnosis',
        'Docker containerized deployment with minimal resource footprint'
      ],
      databaseSchema: [
        'endpoints: id, service_name, url, expected_status, check_interval_ms',
        'telemetry_samples: id, endpoint_id, latency_ms, status_code, timestamp',
        'incidents: id, endpoint_id, reason, resolved_at, duration_seconds'
      ],
      apiEndpoints: [
        { method: 'GET', path: '/api/v1/metrics/live', desc: 'WebSocket metrics stream' },
        { method: 'GET', path: '/api/v1/services/status', desc: 'Global health rollup' }
      ],
      technicalHighlights: [
        'Sub-10ms metric push-to-render latency via WebSockets',
        'Memory-bounded ring buffer preventing client-side RAM exhaustion',
        'Zero-dependency standalone binary collector'
      ],
      systemMetrics: [
        { label: 'Sample Rate', value: '10k events/s' },
        { label: 'WebSocket Lag', value: '< 8ms' },
        { label: 'Memory Usage', value: '< 45MB' },
        { label: 'Data Retention', value: 'Rolling 30d' }
      ]
    }
  }
];

