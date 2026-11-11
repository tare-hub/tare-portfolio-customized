import React, { useState } from 'react';
import { Server, Database, Globe, Cpu, Shield, Layers, Radio, CheckCircle2, ArrowRight } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface NodeDetail {
  id: string;
  title: string;
  role: string;
  tech: string;
  latency: string;
  security: string;
  highlights: string[];
}

const NODES: NodeDetail[] = [
  {
    id: 'client',
    title: 'Client Interfaces',
    role: 'Frontend Presentation Layer',
    tech: 'Vue 3, TypeScript, Pinia, Tailwind CSS',
    latency: '< 15ms (render)',
    security: 'CSP Headers, Strict XSS Escaping, LocalStorage Token Guard',
    highlights: [
      'Debounced search queries with optimistic client state updates',
      'Progressive Web App offline caching for catalog browsing',
      'Reactive Pinia state management with modular store design'
    ]
  },
  {
    id: 'gateway',
    title: 'Reverse Proxy & Gateway',
    role: 'Traffic Routing & Rate Limiting',
    tech: 'Nginx, Cloudflare Edge, SSL/TLS 1.3',
    latency: '< 8ms (edge routing)',
    security: 'DDoS Shielding, IP Throttling (60 req/min), WAF Rules',
    highlights: [
      'Gzip/Brotli edge asset compression saving 72% bandwidth',
      'Global SSL termination with automated certificate rotations',
      'Geographic origin request shielding'
    ]
  },
  {
    id: 'app',
    title: 'Laravel 13 Application Layer',
    role: 'Core Business Logic & API',
    tech: 'PHP 8.3, Laravel Sanctum, FormRequests',
    latency: '< 35ms (execution)',
    security: 'Sanctum Bearer Tokens, Role-Based Access Control (RBAC), CSRF Guard',
    highlights: [
      'Strict typed DTOs ensuring zero unvalidated parameter injection',
      'Decoupled Service-Repository architecture pattern',
      'Event-driven asynchronous job dispatching'
    ]
  },
  {
    id: 'cache',
    title: 'Redis In-Memory Cache',
    role: 'High-Velocity Read Layer',
    tech: 'Redis 7.2, Predis Client',
    latency: '< 2ms (memory retrieval)',
    security: 'Encrypted Redis Auth, Network VPC Isolation',
    highlights: [
      'Cache tags for instantaneous surgical cache invalidation',
      'Session storage and token blacklisting layer',
      'Rate-limiting sliding window counters'
    ]
  },
  {
    id: 'db',
    title: 'MariaDB / MySQL Relational DB',
    role: 'ACID Persistent Storage',
    tech: 'MariaDB 10.11 / MySQL 8.0 (InnoDB Engine)',
    latency: '< 12ms (indexed query)',
    security: 'Row-level Locks (FOR UPDATE), Parameterized PDO Prepared Statements',
    highlights: [
      'Composite indexes configured for zero-filesort table scans',
      'Strict foreign keys with atomic transaction rollbacks',
      'Spatial GIS indexing for geolocation distance calculations'
    ]
  },
  {
    id: 'queue',
    title: 'Async Queue Workers',
    role: 'Background Processing & Notifications',
    tech: 'Laravel Horizon, Redis Queues, Supervisor',
    latency: 'Background (< 1s dispatch)',
    security: 'Dead-letter retry queues, exponential backoff',
    highlights: [
      'Decoupled PDF prescription & invoice generation',
      'SMS delivery alerts and payment webhook integrations',
      'Zero user-facing HTTP thread blocking'
    ]
  }
];

export const InteractiveSystemDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<NodeDetail>(NODES[2]); // Default: Laravel App

  const handleNodeClick = (node: NodeDetail) => {
    soundFx.playClick();
    setSelectedNode(node);
  };

  return (
    <div className="rounded-2xl bg-[#09080e] border border-zinc-800/90 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-rose-500 font-mono text-xs font-bold uppercase tracking-wider">
            <Radio size={14} className="animate-pulse" />
            <span>INTERACTIVE ARCHITECTURE TOPOLOGY</span>
          </div>
          <h4 className="text-white font-extrabold text-lg mt-0.5">
            Enterprise Request Lifecycle & Pipeline
          </h4>
        </div>
        <div className="text-[11px] font-mono text-zinc-500">
          Click any node below to inspect security & latency
        </div>
      </div>

      {/* Visual Topology Graph */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {NODES.map((node, i) => {
          const isSelected = selectedNode.id === node.id;
          return (
            <button
              key={node.id}
              onClick={() => handleNodeClick(node)}
              className={`p-2.5 sm:p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between relative group ${
                isSelected
                  ? 'bg-rose-950/40 border-rose-500 text-white shadow-lg shadow-rose-950/50 scale-[1.02]'
                  : 'bg-[#12111a] border-zinc-800/90 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                <span className={isSelected ? 'text-rose-400 font-bold' : 'text-zinc-500'}>
                  0{i + 1}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>

              <div className="font-bold text-xs text-white mb-1 leading-snug group-hover:text-rose-400 transition-colors">
                {node.title}
              </div>

              <div className="text-[10px] font-mono text-zinc-500 truncate">
                {node.latency}
              </div>

              {/* Active pip */}
              {isSelected && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-rose-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Node Deep Dive Inspector */}
      <div className="p-5 rounded-xl bg-[#12111a] border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
          <div>
            <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider">
              NODE INSPECTOR
            </span>
            <h5 className="text-white font-bold text-sm sm:text-base flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span>{selectedNode.title}</span>
              <span className="text-zinc-600 text-xs hidden sm:inline">•</span>
              <span className="text-zinc-400 font-normal text-xs">{selectedNode.role}</span>
            </h5>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
              <span className="text-zinc-500">Latency: </span>
              <span className="text-rose-400 font-bold">{selectedNode.latency}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Core Technology</span>
            <div className="text-zinc-200 font-mono bg-zinc-900/70 p-2.5 rounded-lg border border-zinc-800 break-words">
              {selectedNode.tech}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Security Invariants</span>
            <div className="text-zinc-200 font-mono bg-zinc-900/70 p-2.5 rounded-lg border border-zinc-800 break-words">
              {selectedNode.security}
            </div>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-2">
            Engineering Highlights
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {selectedNode.highlights.map((hl, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 text-[11px] text-zinc-300 flex items-start gap-2"
              >
                <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>{hl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

