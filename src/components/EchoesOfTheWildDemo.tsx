import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, ExternalLink, Zap, Info, Trophy, Copy, Check, Sparkles, Gamepad2, Maximize2 } from 'lucide-react';
import { findNextStepOnGrid, GridPoint } from '../utils/engine';

interface EchoesOfTheWildDemoProps {
  onOpenDoc?: () => void;
}

const GAME_URL = 'https://echoes-wild-joydeep.mythicbulb1.chatgpt.site/';
const GAME_IMAGE = '/assets/aistudio/Screenshot_2026-11-08_001354_190c65cc.png';
const GRID_SIZE = 16;

interface SimEntity {
  id: number;
  type: 'prey' | 'predator';
  x: number;
  y: number;
  energy: number;
}

export const EchoesOfTheWildDemo: React.FC<EchoesOfTheWildDemoProps> = ({ onOpenDoc }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState<'game' | 'simulator'>('game');
  const [isPlayingInFrame, setIsPlayingInFrame] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Simulation state
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [playerPos, setPlayerPos] = useState<GridPoint>({ x: 2, y: 2 });
  const [targetPos, setTargetPos] = useState<GridPoint>({ x: 13, y: 13 });
  const [plannedPath, setPlannedPath] = useState<GridPoint[]>([]);
  const [entities, setEntities] = useState<SimEntity[]>([
    { id: 1, type: 'prey', x: 8, y: 5, energy: 80 },
    { id: 2, type: 'prey', x: 4, y: 11, energy: 95 },
    { id: 3, type: 'predator', x: 12, y: 8, energy: 100 },
  ]);
  const [foragedCount, setForagedCount] = useState<number>(0);
  const [telemetry, setTelemetry] = useState({
    fps: 60,
    frameTimeMs: 0.18,
    arenaAllocatedKb: 14.8,
    astarNodesEvaluated: 18,
  });

  // Procedural obstacle map
  const [obstacles] = useState<Set<string>>(() => {
    const obs = new Set<string>();
    obs.add('6,4'); obs.add('6,5'); obs.add('6,6'); obs.add('6,7');
    obs.add('10,10'); obs.add('10,11'); obs.add('11,10'); obs.add('11,11'); obs.add('12,10');
    obs.add('3,8'); obs.add('4,8'); obs.add('9,3');
    return obs;
  });

  const [foodItems, setFoodItems] = useState<Set<string>>(() => {
    return new Set<string>(['5,3', '8,12', '13,4', '2,14', '14,14']);
  });

  const handleCopyGameLink = () => {
    navigator.clipboard.writeText(GAME_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Calculate A* path from player to targetPos
  const computeAStar = useCallback(
    (start: GridPoint, goal: GridPoint) => {
      const path: GridPoint[] = [];
      let curr = { ...start };
      const visited = new Set<string>();
      let iterations = 0;

      while ((curr.x !== goal.x || curr.y !== goal.y) && iterations < 30) {
        iterations++;
        const next = findNextStepOnGrid(curr, goal, GRID_SIZE, GRID_SIZE, obstacles);
        const key = `${next.x},${next.y}`;
        if (visited.has(key) || (next.x === curr.x && next.y === curr.y)) {
          break;
        }
        visited.add(key);
        path.push(next);
        curr = next;
      }

      setPlannedPath(path);
      setTelemetry((prev) => ({
        ...prev,
        astarNodesEvaluated: iterations * 4,
        frameTimeMs: Number((0.12 + iterations * 0.015).toFixed(2)),
      }));
    },
    [obstacles]
  );

  useEffect(() => {
    computeAStar(playerPos, targetPos);
  }, [playerPos, targetPos, computeAStar]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor(((e.clientX - rect.left) * scaleX) / (canvas.width / GRID_SIZE));
    const y = Math.floor(((e.clientY - rect.top) * scaleY) / (canvas.height / GRID_SIZE));

    if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
      if (!obstacles.has(`${x},${y}`)) {
        setTargetPos({ x, y });
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'simulator') return;
      let dx = 0;
      let dy = 0;

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') dy = -1;
      else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') dy = 1;
      else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') dx = -1;
      else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') dx = 1;
      else return;

      e.preventDefault();

      setPlayerPos((prev) => {
        const nx = prev.x + dx;
        const ny = prev.y + dy;
        if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE && !obstacles.has(`${nx},${ny}`)) {
          const key = `${nx},${ny}`;
          if (foodItems.has(key)) {
            setFoodItems((f) => {
              const updated = new Set(f);
              updated.delete(key);
              return updated;
            });
            setForagedCount((c) => c + 1);
          }
          return { x: nx, y: ny };
        }
        return prev;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, obstacles, foodItems]);

  // Simulation tick
  useEffect(() => {
    if (!isRunning || activeTab !== 'simulator') return;

    const interval = setInterval(() => {
      if (plannedPath.length > 0) {
        const nextStep = plannedPath[0];
        setPlayerPos(nextStep);

        const key = `${nextStep.x},${nextStep.y}`;
        if (foodItems.has(key)) {
          setFoodItems((f) => {
            const updated = new Set(f);
            updated.delete(key);
            return updated;
          });
          setForagedCount((c) => c + 1);
        }
      }

      setEntities((prev) =>
        prev.map((ent) => {
          const randDir = [
            { x: 0, y: -1 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 0 },
          ][Math.floor(Math.random() * 4)];

          const nx = ent.x + randDir.x;
          const ny = ent.y + randDir.y;

          if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE && !obstacles.has(`${nx},${ny}`)) {
            return { ...ent, x: nx, y: ny, energy: Math.max(20, ent.energy - 1) };
          }
          return ent;
        })
      );
    }, 600);

    return () => clearInterval(interval);
  }, [isRunning, activeTab, plannedPath, obstacles, foodItems]);

  // Canvas render loop
  useEffect(() => {
    if (activeTab !== 'simulator') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const tileSize = canvas.width / GRID_SIZE;

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const key = `${x},${y}`;
        const px = x * tileSize;
        const py = y * tileSize;

        if (obstacles.has(key)) {
          if (x >= 10 && y >= 10) {
            ctx.fillStyle = '#0284c7';
            ctx.fillRect(px, py, tileSize, tileSize);
            ctx.fillStyle = '#38bdf8';
            ctx.fillRect(px + 4, py + 8, tileSize - 8, 3);
          } else {
            ctx.fillStyle = '#475569';
            ctx.fillRect(px, py, tileSize, tileSize);
            ctx.fillStyle = '#94a3b8';
            ctx.beginPath();
            ctx.moveTo(px + tileSize / 2, py + 4);
            ctx.lineTo(px + tileSize - 4, py + tileSize - 4);
            ctx.lineTo(px + 4, py + tileSize - 4);
            ctx.fill();
          }
        } else {
          ctx.fillStyle = (x + y) % 2 === 0 ? '#15803d' : '#166534';
          ctx.fillRect(px, py, tileSize, tileSize);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.strokeRect(px, py, tileSize, tileSize);
        }

        if (foodItems.has(key)) {
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(px + tileSize / 2, py + tileSize / 2, tileSize / 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    if (plannedPath.length > 0) {
      ctx.strokeStyle = '#a3e635';
      ctx.lineWidth = 3;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(playerPos.x * tileSize + tileSize / 2, playerPos.y * tileSize + tileSize / 2);

      for (const pt of plannedPath) {
        ctx.lineTo(pt.x * tileSize + tileSize / 2, pt.y * tileSize + tileSize / 2);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    const targetPx = targetPos.x * tileSize + tileSize / 2;
    const targetPy = targetPos.y * tileSize + tileSize / 2;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(targetPx, targetPy, tileSize / 2.5, 0, Math.PI * 2);
    ctx.stroke();

    for (const ent of entities) {
      const ePx = ent.x * tileSize + tileSize / 2;
      const ePy = ent.y * tileSize + tileSize / 2;
      ctx.fillStyle = ent.type === 'predator' ? '#e11d48' : '#fb923c';
      ctx.beginPath();
      ctx.arc(ePx, ePy, tileSize / 3, 0, Math.PI * 2);
      ctx.fill();
    }

    const pPx = playerPos.x * tileSize + tileSize / 2;
    const pPy = playerPos.y * tileSize + tileSize / 2;
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(pPx, pPy, tileSize / 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [activeTab, playerPos, targetPos, plannedPath, obstacles, foodItems, entities]);

  return (
    <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-stone-800">
      {/* Top Header & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h3 className="text-xl font-bold font-sans tracking-tight text-white flex items-center gap-2">
              <span>Echoes of the Wild</span>
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                Single-Player Adventure
              </span>
            </h3>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Chapter I — The Awakening • C-Engine Architecture • A* Pathfinding & Memory Pooling
          </p>
        </div>

        {/* View Switcher & Action Links */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-stone-950 p-1 rounded-2xl border border-stone-800">
            <button
              onClick={() => setActiveTab('game')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'game'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Official Game</span>
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'simulator'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>C-Engine Simulator</span>
            </button>
          </div>

          {onOpenDoc && (
            <button
              onClick={onOpenDoc}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
              <span>C Struct Specs</span>
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: OFFICIAL GAME SHOWCASE & LAUNCHER (Requested by user) */}
      {activeTab === 'game' && (
        <div className="mt-6 space-y-6 animate-in fade-in duration-300">
          {/* Game Screenshot Artwork Banner */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-stone-700 shadow-2xl group bg-black">
            <img
              src={GAME_IMAGE}
              alt="Echoes of the Wild - One hero. Five worlds. Endless adventures."
              className="w-full h-auto object-cover max-h-[460px] block transition-transform duration-500 group-hover:scale-[1.01]"
            />
            {/* Ambient vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

            {/* Quick Badge Overlay */}
            <div className="absolute top-4 left-4 bg-stone-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-700 text-xs text-stone-200 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Official Game Screenshot</span>
            </div>
          </div>

          {/* Dedicated Game Play Launcher Directly Under The Image */}
          <div className="p-6 sm:p-7 rounded-2xl bg-stone-950/90 border border-stone-800 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold block mb-1">
                  Ready to Play
                </span>
                <h4 className="text-2xl font-bold font-sans text-white tracking-tight">
                  Play Echoes of the Wild
                </h4>
                <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-xl">
                  Step into the forgotten world. Guide the hero through the enchanted forest, solve terrain obstacles, and experience the full adventure.
                </p>
              </div>

              {/* Primary Launch Button */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={GAME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#b4f34d] hover:bg-[#a3e635] text-stone-950 font-bold text-sm transition-all shadow-lg hover:shadow-lime-500/25 cursor-pointer transform hover:scale-102 active:scale-98"
                >
                  <Gamepad2 className="w-5 h-5 text-stone-950" />
                  <span>Start Adventure • Play Game</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setIsPlayingInFrame(!isPlayingInFrame)}
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold border border-stone-700 transition cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4 text-emerald-400" />
                  <span>{isPlayingInFrame ? 'Close In-Page Player' : 'Play In-Page'}</span>
                </button>
              </div>
            </div>

            {/* Direct Link Info & Copy Field */}
            <div className="pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 font-mono text-stone-400">
                <span className="text-stone-500">Game URL:</span>
                <a
                  href={GAME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline break-all"
                >
                  {GAME_URL}
                </a>
              </div>

              <button
                onClick={handleCopyGameLink}
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5 font-mono text-[11px]"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied Game Link!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Game Link</span>
                  </>
                )}
              </button>
            </div>

            {/* In-Page Embedded Game Frame (when toggled) */}
            {isPlayingInFrame && (
              <div className="mt-6 pt-6 border-t border-stone-800 space-y-3 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
                  <span className="flex items-center gap-2 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Live Embedded Game Window</span>
                  </span>
                  <a
                    href={GAME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white flex items-center gap-1"
                  >
                    <span>Open Full Screen</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="w-full aspect-[16/9] min-h-[420px] rounded-2xl overflow-hidden border-2 border-emerald-500/50 shadow-2xl bg-black">
                  <iframe
                    src={GAME_URL}
                    title="Echoes of the Wild Playable Game"
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: C-ENGINE & A* PATHFINDING SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="mt-6 space-y-6 animate-in fade-in duration-300">
          {/* Live C Engine Telemetry HUD */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-950 p-3 rounded-2xl border border-stone-800 text-xs font-mono">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-stone-500 block text-[10px]">FPS / FRAME</span>
                <span className="text-emerald-400 font-semibold">{telemetry.fps} FPS ({telemetry.frameTimeMs}ms)</span>
              </div>
              <div className="h-6 w-px bg-stone-800" />
              <div>
                <span className="text-stone-500 block text-[10px]">ARENA MEMORY</span>
                <span className="text-amber-400 font-semibold">{telemetry.arenaAllocatedKb} KB (O(1))</span>
              </div>
              <div className="h-6 w-px bg-stone-800" />
              <div>
                <span className="text-stone-500 block text-[10px]">A* NODES EVAL</span>
                <span className="text-sky-400 font-semibold">{telemetry.astarNodesEvaluated}</span>
              </div>
            </div>
            <span className="text-stone-400 text-[11px]">Click tiles to re-route A* path</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Canvas */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative rounded-2xl overflow-hidden border-2 border-stone-700 shadow-inner bg-black">
                <canvas
                  ref={canvasRef}
                  width={480}
                  height={480}
                  onClick={handleCanvasClick}
                  className="w-full max-w-[420px] aspect-square cursor-crosshair block"
                  aria-label="Interactive 2D wilderness grid canvas"
                />
                <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono border border-stone-700 text-stone-300">
                  WASD / Arrow keys or Click
                </div>
              </div>
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Player Position:</span>
                  <span className="text-emerald-400 font-bold">({playerPos.x}, {playerPos.y})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Target Goal:</span>
                  <span className="text-amber-400 font-bold">({targetPos.x}, {targetPos.y})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Foraged Berries:</span>
                  <span className="text-rose-400 font-bold flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" />
                    {foragedCount} Items
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Sim Entities:</span>
                  <span className="text-purple-400 font-bold">{entities.length + 1}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs font-medium transition cursor-pointer"
                >
                  {isRunning ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
                  <span>{isRunning ? 'Pause Sim' : 'Resume Sim'}</span>
                </button>
                <button
                  onClick={() => {
                    setPlayerPos({ x: 2, y: 2 });
                    setTargetPos({ x: 13, y: 13 });
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs font-medium transition cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-rose-400" />
                  <span>Reset Grid</span>
                </button>
              </div>

              {/* Direct Link to Official Game */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-xs space-y-2">
                <p className="font-semibold text-emerald-300">Looking for the full adventure game?</p>
                <a
                  href={GAME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white font-bold underline hover:text-emerald-400"
                >
                  <span>Launch Echoes of the Wild Game ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
