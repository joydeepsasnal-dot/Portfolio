import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Disc, Radio, Info, Sparkles } from 'lucide-react';

interface SafarMusicDemoProps {
  onOpenDoc?: () => void;
}

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  tuning: string;
  chords: number[][]; // Frequency combinations in Hz
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: 'Himalayan Morning',
    artist: 'Safar Ambient Ensemble',
    duration: '3:45',
    tuning: '432 Hz Raga Bhairav',
    chords: [
      [216, 270, 324, 432], // Sa, Ga, Pa, Sa'
      [192, 240, 288, 384],
      [216, 259, 324, 432],
    ],
  },
  {
    id: 2,
    title: 'Monsoon Reverie',
    artist: 'Safar Meditative Strings',
    duration: '4:12',
    tuning: '528 Hz Harmonic Resonance',
    chords: [
      [176, 220, 264, 352], // Deep drone
      [198, 247, 297, 396],
      [220, 275, 330, 440],
    ],
  },
  {
    id: 3,
    title: 'Desert Twilight',
    artist: 'Dusk Acoustic Collective',
    duration: '3:28',
    tuning: '440 Hz Pentatonic Drone',
    chords: [
      [146, 220, 293, 366],
      [164, 246, 329, 411],
      [130, 196, 261, 327],
    ],
  },
];

export const SafarMusicDemo: React.FC<SafarMusicDemoProps> = ({ onOpenDoc }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.65);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [elapsedSecs, setElapsedSecs] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const activeOscsRef = useRef<OscillatorNode[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  // Stop active oscillators
  const stopSynthesis = () => {
    for (const osc of activeOscsRef.current) {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // ignore
      }
    }
    activeOscsRef.current = [];
  };

  // Start synthesizing ambient chords with warm soothing detune
  const startSynthesis = () => {
    stopSynthesis();

    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass();
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Master Gain
    if (!gainNodeRef.current) {
      gainNodeRef.current = ctx.createGain();
      analyserRef.current = ctx.createAnalyser();
      analyserRef.current.fftSize = 64;

      gainNodeRef.current.connect(analyserRef.current);
      analyserRef.current.connect(ctx.destination);
    }

    gainNodeRef.current.gain.setValueAtTime(isMuted ? 0 : volume * 0.18, ctx.currentTime);

    // Warm Lowpass Filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(750, ctx.currentTime);
    filter.connect(gainNodeRef.current);

    // Pick chord frequencies for this track
    const chord = currentTrack.chords[elapsedSecs % currentTrack.chords.length];

    const oscs: OscillatorNode[] = [];
    for (let i = 0; i < chord.length; i++) {
      const freq = chord[i];
      // Oscillator 1 (Warm sine)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, ctx.currentTime);

      // Oscillator 2 (Triangle with slight micro-detuning for lush chorus)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 1.003, ctx.currentTime);

      const chordGain = ctx.createGain();
      chordGain.gain.setValueAtTime(0.25 / chord.length, ctx.currentTime);

      osc1.connect(chordGain);
      osc2.connect(chordGain);
      chordGain.connect(filter);

      osc1.start();
      osc2.start();
      oscs.push(osc1, osc2);
    }

    activeOscsRef.current = oscs;
  };

  // Toggle playback
  const togglePlay = () => {
    if (isPlaying) {
      stopSynthesis();
      setIsPlaying(false);
    } else {
      startSynthesis();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    stopSynthesis();
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setElapsedSecs(0);
    if (isPlaying) {
      setTimeout(startSynthesis, 50);
    }
  };

  const handlePrev = () => {
    stopSynthesis();
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setElapsedSecs(0);
    if (isPlaying) {
      setTimeout(startSynthesis, 50);
    }
  };

  // Update volume
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(isMuted ? 0 : volume * 0.18, audioCtxRef.current.currentTime);
    }
  }, [volume, isMuted]);

  // Elapsed timer & dynamic chord shifts
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setElapsedSecs((s) => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Render frequency spectrum bars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderSpectrum = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bufferLength = analyserRef.current ? analyserRef.current.frequencyBinCount : 32;
      const dataArray = new Uint8Array(bufferLength);

      if (analyserRef.current && isPlaying) {
        analyserRef.current.getByteFrequencyData(dataArray);
      } else {
        // Subtle resting wave
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = 12 + Math.sin(Date.now() / 400 + i * 0.3) * 6;
        }
      }

      const barWidth = (canvas.width / bufferLength) * 0.8;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const val = dataArray[i];
        const percent = val / 255;
        const barHeight = Math.max(4, percent * (canvas.height - 10));

        // Vibrant gradient bar (cyan to emerald)
        const grad = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        grad.addColorStop(0, '#0284c7');
        grad.addColorStop(0.5, '#06b6d4');
        grad.addColorStop(1, '#34d399');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, canvas.height - barHeight, barWidth, barHeight, [3, 3, 0, 0]);
        ctx.fill();

        x += barWidth + 3;
      }

      animFrameRef.current = requestAnimationFrame(renderSpectrum);
    };

    animFrameRef.current = requestAnimationFrame(renderSpectrum);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      stopSynthesis();
    };
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-sky-900/40 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-sky-800/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-sans tracking-tight text-white flex items-center gap-2">
              <span>Safar - सफर</span>
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-sky-900/60 text-sky-300 border border-sky-700/60">
                Web Audio Engine
              </span>
            </h3>
            <p className="text-xs text-sky-200/70 mt-0.5">
              Live native browser synthesis • Zero-latency 64-band FFT visualizer • Pure semantic HTML5
            </p>
          </div>
        </div>

        {onOpenDoc && (
          <button
            onClick={onOpenDoc}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-900/50 hover:bg-sky-800/60 text-sky-200 border border-sky-700/50 text-xs font-medium transition cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Audio Graph Specs</span>
          </button>
        )}
      </div>

      {/* Player Main Layout */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left: Vinyl Disc with Spinning Physics */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative group">
            <div
              className={`w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-stone-950 border-4 border-stone-800 shadow-2xl flex items-center justify-center relative ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '12s' }}
            >
              {/* Vinyl Grooves */}
              <div className="absolute inset-2 rounded-full border border-stone-800/70" />
              <div className="absolute inset-5 rounded-full border border-stone-800/60" />
              <div className="absolute inset-8 rounded-full border border-stone-800/50" />
              <div className="absolute inset-12 rounded-full border border-stone-800/40" />

              {/* Center Record Label */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-600 to-emerald-500 flex flex-col items-center justify-center text-center p-2 shadow-inner">
                <span className="text-[10px] font-bold text-white tracking-wider uppercase font-mono">SAFAR</span>
                <span className="text-[8px] text-sky-100 font-sans">432 Hz</span>
                <div className="w-3.5 h-3.5 rounded-full bg-stone-950 mt-1 border border-white/40" />
              </div>
            </div>

            {/* Glowing Aura underneath */}
            <div className={`absolute -inset-2 bg-sky-500/20 rounded-full blur-xl -z-10 transition-opacity ${isPlaying ? 'opacity-100' : 'opacity-20'}`} />
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs font-mono text-sky-300/80 bg-sky-950/60 px-3 py-1 rounded-full border border-sky-800/50">
              {currentTrack.tuning}
            </span>
          </div>
        </div>

        {/* Right: Track Metadata, Visualizer & Controls */}
        <div className="md:col-span-7 space-y-6">
          {/* Track Info */}
          <div>
            <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase">
              Now Streaming Track #{currentTrack.id}
            </span>
            <h4 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight mt-1">
              {currentTrack.title}
            </h4>
            <p className="text-sm text-sky-200/80">{currentTrack.artist}</p>
          </div>

          {/* Real-time Audio Visualizer Canvas */}
          <div className="bg-stone-950/70 rounded-2xl p-3 border border-sky-900/60">
            <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mb-2 px-1">
              <span className="flex items-center gap-1.5 text-sky-400">
                <Sparkles className="w-3 h-3" />
                <span>64-Band FFT Spectrum</span>
              </span>
              <span>{isPlaying ? 'Synthesizing Live Chords' : 'Standing by'}</span>
            </div>
            <canvas
              ref={canvasRef}
              width={420}
              height={70}
              className="w-full h-18 rounded-lg block"
              aria-label="Real-time frequency visualizer"
            />
          </div>

          {/* Playback Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-sky-400 to-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (elapsedSecs % 180) / 1.8)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-mono text-stone-400">
              <span>{formatTime(elapsedSecs)}</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>

          {/* Interactive Player Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            {/* Play/Pause & Skip buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-200 transition cursor-pointer"
                aria-label="Previous Track"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={togglePlay}
                className="p-4 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-stone-950 font-bold shadow-lg hover:shadow-sky-500/25 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                aria-label={isPlaying ? 'Pause Audio' : 'Play Audio'}
              >
                {isPlaying ? <Pause className="w-5 h-5 text-stone-950 fill-current" /> : <Play className="w-5 h-5 text-stone-950 fill-current ml-0.5" />}
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-200 transition cursor-pointer"
                aria-label="Next Track"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2.5 bg-stone-950/60 px-3.5 py-2 rounded-full border border-stone-800">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-stone-400 hover:text-white transition cursor-pointer"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-20 accent-sky-400 cursor-pointer h-1.5 rounded-lg"
                aria-label="Volume slider"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
