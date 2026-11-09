import React, { useState } from 'react';
import { Project } from '../../types';
import { Play, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, Terminal, Sparkles, Database } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface LiveProjectSimulatorProps {
  project: Project;
}

export const LiveProjectSimulator: React.FC<LiveProjectSimulatorProps> = ({ project }) => {
  // PharmaJiji Simulator State
  const [pharmaStock, setPharmaStock] = useState<number>(6);
  const [pharmaQty, setPharmaQty] = useState<number>(2);
  const [pharmaLogs, setPharmaLogs] = useState<string[]>([
    'System ready. Database transaction isolation: REPEATABLE READ',
  ]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // AutoDrive Simulator State
  const [bookingDays, setBookingDays] = useState<number>(3);
  const [dailyRate] = useState<number>(85);
  const [autoDriveLogs, setAutoDriveLogs] = useState<string[]>([
    'Fleet Cache: Warmed in Redis. Zero conflict window active.',
  ]);

  // DevPulse Simulator State
  const [latencyHistory, setLatencyHistory] = useState<number[]>([22, 28, 19, 34, 25, 20, 24]);

  const simulatePharmaCheckout = () => {
    soundFx.playClick();
    setIsProcessing(true);

    const newLogs = [
      `[T+0ms] POST /api/v1/orders/checkout -> payload: { medicine_id: 104, quantity: ${pharmaQty} }`,
      `[T+12ms] BEGIN TRANSACTION;`,
      `[T+18ms] SELECT * FROM medicines WHERE id = 104 FOR UPDATE; (Acquired row lock)`,
    ];

    setTimeout(() => {
      if (pharmaStock >= pharmaQty) {
        const remaining = pharmaStock - pharmaQty;
        setPharmaStock(remaining);
        soundFx.playSuccess();
        newLogs.push(
          `[T+34ms] Verified stock >= requested quantity. Decrementing stock to ${remaining}...`,
          `[T+48ms] INSERT INTO orders (user_id, status) VALUES (42, 'verified');`,
          `[T+58ms] COMMIT; (Transaction released lock in 40ms)`,
          `[T+62ms] HTTP 201 Created -> Order #ORD-${Math.random().toString(36).substring(2, 7).toUpperCase()} confirmed!`
        );
      } else {
        newLogs.push(
          `[T+28ms] ERROR: Requested ${pharmaQty} exceeds current stock (${pharmaStock})`,
          `[T+32ms] ROLLBACK; (Transaction rolled back safely)`,
          `[T+36ms] HTTP 409 Conflict -> InsufficientInventoryException caught.`
        );
      }
      setPharmaLogs(newLogs);
      setIsProcessing(false);
    }, 450);
  };

  const simulateAutoDriveBooking = () => {
    soundFx.playClick();
    setIsProcessing(true);

    setTimeout(() => {
      soundFx.playSuccess();
      const ref = 'AD-' + Math.floor(1000 + Math.random() * 9000);
      setAutoDriveLogs([
        `[Redis Check] Key: "vehicles:available:asset_849" -> HIT (0.8ms)`,
        `[Calendar Window] Checking Nov 12 - Nov ${12 + bookingDays} against composite index...`,
        `[Pessimistic Lock] Verified zero overlapping reservations in MySQL range scan.`,
        `[Invoice Generated] Total: $${bookingDays * dailyRate} (Deposit: $200 held)`,
        `[Status] Booking ${ref} confirmed without race conditions!`,
      ]);
      setIsProcessing(false);
    }, 380);
  };

  const simulateDevPulsePing = () => {
    soundFx.playClick();
    const newLatency = Math.floor(15 + Math.random() * 30);
    setLatencyHistory((prev) => [...prev.slice(1), newLatency]);
  };

  return (
    <div className="rounded-2xl bg-[#09080e] border border-zinc-800 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-rose-500 font-mono text-xs font-bold uppercase tracking-wider">
            <Sparkles size={13} />
            <span>LIVE INTERACTIVE PROTOTYPE PLAYGROUND</span>
          </div>
          <h4 className="text-white font-extrabold text-lg mt-0.5">
            Test and simulate the underlying system logic
          </h4>
        </div>
        <div className="text-[11px] font-mono text-zinc-500">
          In-memory sandbox simulation
        </div>
      </div>

      {/* Simulator Switch based on project */}
      {project.mockupType === 'pharma' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-zinc-500 text-[10px] uppercase">Medicine Item</span>
              <div className="text-white font-bold">Amoxicillin 500mg</div>
              <div className="text-emerald-400 text-[11px]">$4.80 / unit</div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-zinc-500 text-[10px] uppercase">Available Stock</span>
              <div className="text-2xl font-bold font-mono text-amber-400">
                {pharmaStock} <span className="text-xs text-zinc-500">units</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-zinc-500 text-[10px] uppercase">Checkout Quantity</span>
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => setPharmaQty(Math.max(1, pharmaQty - 1))}
                  className="w-7 h-7 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-lg font-bold text-white">{pharmaQty}</span>
                <button
                  onClick={() => setPharmaQty(pharmaQty + 1)}
                  className="w-7 h-7 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={simulatePharmaCheckout}
              disabled={isProcessing}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-rose-950/40 transition-all active:scale-95"
            >
              <Play size={12} className="fill-current" />
              <span>{isProcessing ? 'Executing Transaction...' : 'Simulate Atomic Checkout'}</span>
            </button>

            <button
              onClick={() => {
                setPharmaStock(6);
                setPharmaQty(2);
                setPharmaLogs(['Stock reset to 6 units. Transaction lock released.']);
              }}
              className="px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw size={12} />
              <span>Reset Stock</span>
            </button>
          </div>

          {/* Database Log Stream Console */}
          <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#06050a] font-mono text-xs">
            <div className="px-3.5 py-1.5 bg-[#121118] border-b border-zinc-800 text-[10px] text-zinc-500 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Terminal size={11} /> ATOMIC DB TRANSACTION TRACE
              </span>
              <span className="text-emerald-400">PESSIMISTIC LOCK: INNODB</span>
            </div>
            <div className="p-3.5 space-y-1 text-zinc-300 text-[11px] leading-relaxed max-h-48 overflow-y-auto">
              {pharmaLogs.map((log, i) => (
                <div key={i} className={log.includes('ERROR') ? 'text-rose-400 font-bold' : log.includes('COMMIT') ? 'text-emerald-400 font-bold' : 'text-zinc-400'}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {project.mockupType === 'autodrive' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-zinc-500 text-[10px] uppercase">Vehicle Asset</span>
              <div className="text-white font-bold">Tesla Model 3 Long Range</div>
              <div className="text-cyan-400 text-[11px]">${dailyRate} / day</div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-zinc-500 text-[10px] uppercase">Rental Duration</span>
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => setBookingDays(Math.max(1, bookingDays - 1))}
                  className="w-7 h-7 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-lg font-bold text-white">{bookingDays} days</span>
                <button
                  onClick={() => setBookingDays(bookingDays + 1)}
                  className="w-7 h-7 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-zinc-500 text-[10px] uppercase">Calculated Total</span>
              <div className="text-2xl font-bold font-mono text-cyan-400">
                ${bookingDays * dailyRate}
              </div>
            </div>
          </div>

          <button
            onClick={simulateAutoDriveBooking}
            disabled={isProcessing}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-950/40 transition-all active:scale-95"
          >
            <Play size={12} className="fill-current" />
            <span>{isProcessing ? 'Verifying Calendar Range...' : 'Simulate Conflict-Free Booking'}</span>
          </button>

          <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#06050a] font-mono text-xs">
            <div className="px-3.5 py-1.5 bg-[#121118] border-b border-zinc-800 text-[10px] text-zinc-500 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Database size={11} /> REDIS & MYSQL RESERVATION ENGINE
              </span>
              <span className="text-cyan-400">ZERO CONFLICT CHECK</span>
            </div>
            <div className="p-3.5 space-y-1 text-zinc-300 text-[11px] leading-relaxed">
              {autoDriveLogs.map((log, i) => (
                <div key={i} className="text-zinc-300">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {project.mockupType === 'devpulse' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">Real-Time Gateway Heartbeat Latency:</span>
            <button
              onClick={simulateDevPulsePing}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono flex items-center gap-1.5"
            >
              <Play size={11} className="fill-current" /> Emit Telemetry Ping
            </button>
          </div>

          <div className="h-20 bg-zinc-950 rounded-xl p-3 border border-zinc-800 flex items-end gap-2">
            {latencyHistory.map((lat, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] font-mono text-zinc-500">{lat}ms</span>
                <div
                  className="w-full bg-cyan-500 rounded-t"
                  style={{ height: `${lat * 1.5}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {project.mockupType === 'media' && (
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2 text-xs font-mono text-zinc-300">
          <div className="text-amber-400 font-bold">Audio & Video Fluid Stream Pipeline</div>
          <p className="text-zinc-400">
            Simulates zero-layout-shift responsive media loading with progressive WebP blur-up placeholders and Web Audio API spectrum analyzers.
          </p>
        </div>
      )}
    </div>
  );
};

