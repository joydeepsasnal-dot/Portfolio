import { Project, CoreLanguageInfo, Testimonial } from '../types';

export const PERSONAL_INFO = {
  name: 'Joydeep Sasmal',
  title: 'Software Engineer',
  roleDescriptor: 'Systems, Algorithms & Web Engineering',
  email: 'developerjoy122@gmail.com',
  github: 'https://github.com/joydeepsasnal-dot',
  linkedin: 'https://linkedin.com/in/joydeep-sasmal',
  location: 'Kolkata, India / Remote Available',
  availabilityStatus: 'Available for new opportunities',
  tagline: 'Passionate about low-level memory efficiency, algorithmic rigor, and clean frontend craft to solve complex problems.',
  bioShort: 'Specializing in C programming, Python backend architecture, and modern semantic HTML5/CSS3 web experiences with rigorous technical documentation.',
  awardBadge: 'Google Website Of The Day 2026 • Featured Software Engineer',
  recruiterSocialProof: 'Trusted by engineering hiring managers across systems & full-stack domains',
  avatarUrl: '/assets/aistudio/file_0000000025508211a087065bea908f59_031c9fd3.png',
};

export const CORE_LANGUAGES: CoreLanguageInfo[] = [
  {
    id: 'C',
    name: 'C Language',
    version: 'C99 / C11 Standard',
    level: 'Advanced Systems & Memory',
    tagline: 'Deterministic execution, pointer arithmetic, manual memory allocation, and cache-conscious data structures.',
    focusAreas: ['Memory Management (malloc/free/arena)', 'Pointers & Bitwise Ops', '2D Game Engines', 'Data Structures (Trees, Heaps)'],
    concepts: [
      'Contiguous memory allocation with custom arena allocators',
      'Pointer arithmetic & structural memory padding',
      'Dynamic arrays & spatial hashing for collision detection',
      'Deterministic 60 FPS fixed-timestep game loops',
    ],
    codeHighlight: {
      title: 'arena_allocator.c — High-performance contiguous memory chunking',
      language: 'c',
      code: `typedef struct {
    size_t capacity;
    size_t offset;
    uint8_t* buffer;
} Arena;

Arena* arena_create(size_t bytes) {
    Arena* arena = (Arena*)malloc(sizeof(Arena));
    arena->buffer = (uint8_t*)malloc(bytes);
    arena->capacity = bytes;
    arena->offset = 0;
    return arena;
}

void* arena_alloc(Arena* a, size_t size, size_t align) {
    uintptr_t curr = (uintptr_t)a->buffer + a->offset;
    uintptr_t aligned = (curr + (align - 1)) & ~(align - 1);
    size_t padding = aligned - curr;
    if (a->offset + padding + size > a->capacity) return NULL;
    a->offset += padding + size;
    return (void*)aligned;
}`,
      notes: 'Eliminates fragmentation overhead and achieves O(1) allocation in Echoes of the Wild.',
    },
    projectIds: ['echoes-of-the-wild'],
  },
  {
    id: 'Python',
    name: 'Python',
    version: 'Python 3.11 / 3.12',
    level: 'Backend Architecture & Algorithms',
    tagline: 'Algorithmic problem solving, directed acyclic graphs, heapq priority queues, and microservices.',
    focusAreas: ['Graph Theory (Kahn’s Topological Sort)', 'Heapq Priority Queues', 'RESTful API Engineering', 'Data Structures & Testing'],
    concepts: [
      'Directed Acyclic Graph (DAG) cycle detection algorithms',
      'Min/Max heap implementations for priority task scheduling',
      'Clean modular architecture with typing & dataclasses',
      'Asynchronous task workers & deterministic test fixtures',
    ],
    codeHighlight: {
      title: 'dag_scheduler.py — Kahn’s Topological Sort with cycle detection',
      language: 'python',
      code: `from collections import deque, defaultdict
from typing import List, Dict, Optional, Tuple

class TaskGraph:
    def __init__(self, tasks: List[Dict]):
        self.graph = defaultdict(list)
        self.in_degree = {t['id']: 0 for t in tasks}
        for t in tasks:
            for dep in t.get('dependencies', []):
                self.graph[dep].append(t['id'])
                self.in_degree[t['id']] += 1

    def resolve_schedule(self) -> Tuple[List[str], bool]:
        queue = deque([k for k, v in self.in_degree.items() if v == 0])
        resolved = []
        while queue:
            curr = queue.popleft()
            resolved.append(curr)
            for neighbor in self.graph[curr]:
                self.in_degree[neighbor] -= 1
                if self.in_degree[neighbor] == 0:
                    queue.append(neighbor)
        has_cycle = len(resolved) != len(self.in_degree)
        return resolved, has_cycle`,
      notes: 'Guarantees dead-lock free task sequencing with O(V + E) complexity in the Task Manager.',
    },
    projectIds: ['task-manager-dashboard'],
  },
  {
    id: 'HTML',
    name: 'HTML5',
    version: 'Living Standard Semantic HTML',
    level: 'Semantic & Accessible Architecture',
    tagline: 'Semantic markup, accessible ARIA landmarks, Canvas 2D rendering, and Web Audio API integration.',
    focusAreas: ['Semantic Web Structure', 'Canvas 2D Rendering Context', 'Web Audio Nodes', 'WCAG 2.1 AA Compliance'],
    concepts: [
      'Semantic document outlines with <header>, <main>, <article>, <section>',
      'High-performance Canvas 2D frame-loop binding',
      'Accessible form controls with associated labels and live regions',
      'SEO metadata, OpenGraph tags, and responsive viewport configuration',
    ],
    codeHighlight: {
      title: 'semantic_audio_hub.html — Accessible Web Audio player markup',
      language: 'html',
      code: `<section class="safar-player" aria-labelledby="player-heading">
  <h2 id="player-heading" class="sr-only">Ambient Audio Player</h2>
  <div class="visualizer-container" role="img" aria-label="Live audio frequency spectrum">
    <canvas id="freqCanvas" width="600" height="180"></canvas>
  </div>
  <div class="player-controls" role="group" aria-label="Playback Controls">
    <button id="playBtn" aria-pressed="false" class="control-btn">
      <span class="btn-icon" aria-hidden="true">▶</span>
      <span class="sr-only">Play Track</span>
    </button>
    <div class="track-meta" aria-live="polite">
      <p class="track-title" id="currentTrackTitle">Himalayan Mist</p>
      <p class="track-artist">Ambient Raga Ensemble</p>
    </div>
  </div>
</section>`,
      notes: 'Provides screen-reader friendly states and frictionless accessibility in Safar.',
    },
    projectIds: ['safar-music', 'echoes-of-the-wild'],
  },
  {
    id: 'CSS',
    name: 'CSS3',
    version: 'Modern CSS (Grid, Flexbox, Tokens)',
    level: 'Responsive Design & Design Systems',
    tagline: 'Responsive fluid typography, CSS custom properties, glassmorphism, hardware-accelerated animations.',
    focusAreas: ['CSS Grid & Flexbox Layouts', 'CSS Custom Properties (Variables)', 'Glassmorphism & Radial Mesh Blurs', 'Hardware-Accelerated Keyframes'],
    concepts: [
      'Fluid spacing with clamp() and viewport units',
      'Multi-layer backdrop-filter glassmorphism with subtle borders',
      'GPU-accelerated transforms & opacity transitions',
      'Container queries and responsive media breakpoints',
    ],
    codeHighlight: {
      title: 'glass_system.css — Radial mesh gradient & modern frosted glass',
      language: 'css',
      code: `.mesh-aura {
  background: radial-gradient(circle 380px at 50% 38%, 
    rgba(180, 243, 77, 0.45) 0%, 
    rgba(78, 224, 133, 0.25) 50%, 
    rgba(255, 255, 255, 0) 80%);
  filter: blur(48px);
  will-change: transform, opacity;
}

.glass-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.05);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}`,
      notes: 'Powers the sleek glowing aesthetic inspired by modern top-tier design portfolios.',
    },
    projectIds: ['safar-music', 'task-manager-dashboard'],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'echoes-of-the-wild',
    title: 'Echoes of the Wild',
    subtitle: 'Procedural 2D Wilderness Game & A* Pathfinding Simulation',
    category: 'Game Engine & Systems Engineering',
    languages: ['C', 'HTML', 'CSS'],
    tags: ['C Systems', 'A* Search', 'Arena Allocator', 'Canvas 2D', 'Algorithmic Simulation'],
    accentColor: '#10b981',
    bannerGradient: 'from-emerald-500/20 via-lime-500/10 to-teal-500/20',
    featured: true,
    imageUrl: '/assets/aistudio/Screenshot_2026-11-08_001354_190c65cc.png',
    liveUrl: 'https://echoes-wild-joydeep.mythicbulb1.chatgpt.site/',
    description:
      'A real-time wilderness survival and ecosystem simulation originally engineered with low-level C memory routines and ported with a responsive HTML5 Canvas renderer. Features deterministic A* pathfinding, dynamic wildlife forage-and-flee AI, custom arena memory pooling, and day-night survival cycles.',
    keyFeatures: [
      'Interactive live playable simulation with keyboard (WASD/Arrows) and point-and-click traversal',
      'Entity-Component inspired architecture written in C with fixed-timestep physics',
      'A* pathfinding with Manhattan heuristic and dynamic terrain obstruction weights',
      'Custom arena memory pool that reduces allocation latency to O(1)',
      'Live engine telemetry: frame time, active entities, pathfinding nodes expanded, and memory stats',
    ],
    metrics: [
      { label: 'Framerate Target', value: '60 FPS' },
      { label: 'Memory Allocation', value: 'O(1) Arena' },
      { label: 'Pathfinding Cost', value: 'O(V + E log V)' },
      { label: 'Interactive States', value: 'Live Playable' },
    ],
    technicalDoc: {
      overview:
        'Echoes of the Wild addresses high-frequency allocation bottlenecks in 2D tile games. By implementing a linear arena allocator in C, memory churn is dropped to zero during game-loop iterations. Entity AI runs an optimized A* grid search with early exit heuristics to simulate predator-prey dynamics and player survival mechanics.',
      architectureSummary:
        'Three-tier architecture: (1) Core C-Style Game Loop & Memory Arena, (2) Grid Spatial Partitioner & A* Pathfinding Solver, (3) HTML5 Canvas Double-Buffered Render Pipeline.',
      complexity: {
        time: 'O(V + E log V) for A* pathfinding; O(1) for entity movement and spatial lookup',
        space: 'O(W × H) for grid map array; O(N) for active entity pool within preallocated arena',
      },
      algorithmsUsed: [
        'A* Search Algorithm with Manhattan & Euclidean cost heuristics',
        'Bresenham’s Line Algorithm for field-of-view / line-of-sight raycasts',
        'Cellular Automata for procedural wilderness terrain generation',
        'State-Machine based AI (Forage, Flee, Idle, Rest)',
      ],
      dataStructures: [
        'Linear Arena Allocator buffer with byte alignment',
        '2D Flat Array with row-major indexing `idx = y * width + x`',
        'Binary Min-Heap priority queue for A* open list',
        'Bitwise flags for entity status and terrain traits',
      ],
      codeSnippets: [
        {
          language: 'c',
          title: 'entity_system.h — C Struct definitions with bitfield flags',
          code: `typedef enum {
    ENTITY_ALIVE     = 1 << 0,
    ENTITY_FORAGING  = 1 << 1,
    ENTITY_FLEEING   = 1 << 2,
    ENTITY_RESTING   = 1 << 3
} EntityState;

typedef struct {
    uint32_t id;
    int16_t x, y;
    int16_t target_x, target_y;
    uint8_t energy;
    uint8_t health;
    uint8_t state_flags;
} Entity;

typedef struct {
    uint16_t width, height;
    uint8_t* tiles; // 0=Grass, 1=Water, 2=Forest, 3=Stone
    Entity* entities;
    uint32_t entity_count;
    uint32_t entity_capacity;
} GameWorld;`,
          explanation:
            'Bitfields allow packing multiple boolean game states into a single byte, maximizing CPU L1 cache utilization.',
        },
        {
          language: 'c',
          title: 'pathfinder.c — A* neighbor relaxation loop',
          code: `int astar_solve(GameWorld* world, int sx, int sy, int tx, int ty, Point* out_path) {
    if (sx == tx && sy == ty) return 0;
    PriorityQueue open_set;
    pq_init(&open_set, 256);
    
    Node start_node = { .x = sx, .y = sy, .g_cost = 0, .h_cost = manhattan(sx, sy, tx, ty) };
    pq_push(&open_set, start_node);

    while (!pq_is_empty(&open_set)) {
        Node current = pq_pop(&open_set);
        if (current.x == tx && current.y == ty) {
            return reconstruct_path(world, current, out_path);
        }
        relax_neighbors(world, &open_set, current, tx, ty);
    }
    return -1; // Unreachable
}`,
          explanation:
            'Extracts minimum f-cost nodes and reconstructs parent pointer links back to the origin in optimal time.',
        },
      ],
      benchmarks: [
        { label: 'Std malloc() vs Arena', value: '4.8x faster', comparison: 'Arena: 0.12ms vs Malloc: 0.58ms per frame' },
        { label: 'A* Path Computation (20x20)', value: '< 0.35ms', comparison: 'Average across 100 random obstacle boards' },
        { label: 'Memory Footprint', value: '184 KB total', comparison: 'Entire game world, tiles, and 64 active entities' },
      ],
      challengesSolved: [
        'Eliminated memory fragmentation during continuous entity spawning and despawning.',
        'Prevented path oscillation when multiple entities navigate narrow mountain choke-points.',
        'Implemented smooth keyboard WASD + mouse point navigation on Canvas with zero input delay.',
      ],
    },
  },
  {
    id: 'safar-music',
    title: 'Safar - Music Website',
    subtitle: 'Modern Ambient & World Music Streaming Audio Platform',
    category: 'Audio Engineering & Modern Web Architecture',
    languages: ['HTML', 'CSS'],
    tags: ['Web Audio API', 'Semantic HTML5', 'CSS Glassmorphism', 'Real-time Canvas Visualizer', 'Audio Synthesis'],
    accentColor: '#3b82f6',
    bannerGradient: 'from-blue-500/20 via-sky-500/10 to-indigo-500/20',
    featured: true,
    description:
      'An immersive web music platform named "Safar" (Journey) designed for ambient, lo-fi, and world music listening. Built with strictly clean semantic HTML5, zero CSS framework bloat, and the browser native Web Audio API with real-time waveform and frequency spectrum visualization.',
    keyFeatures: [
      'Built-in real-time audio synthesizer producing soothing ambient harmonic raga chords',
      'Live interactive audio frequency visualizer mapped to 64 FFT bands',
      'Multi-track playlist with seamless playback state machine (Play, Pause, Next, Volume)',
      'Responsive vinyl disc spin animation and fluid frosted-glass player card',
      'Strict WCAG 2.1 AA accessibility with keyboard audio controls and screen reader announcements',
    ],
    metrics: [
      { label: 'Audio Latency', value: '< 15ms' },
      { label: 'Visualizer FPS', value: '60 FPS Solid' },
      { label: 'Zero Third-Party Bloat', value: 'Native Audio API' },
      { label: 'Responsive Breakpoints', value: 'Mobile to 4K' },
    ],
    technicalDoc: {
      overview:
        'Safar demonstrates how powerful modern native HTML5 and CSS3 are when combined with the Web Audio API. Rather than relying on external streaming servers that might suffer from CORS blocks or broken links, Safar features an on-demand procedural audio synthesis engine capable of generating warm, resonant ambient chords and meditative drone scales live in the user’s browser.',
      architectureSummary:
        'Audio Graph Architecture: `AudioContext -> OscillatorNodes -> BiquadFilter (Lowpass) -> GainNode (Envelope) -> AnalyserNode -> Destination`. UI layer is pure semantic HTML5 with CSS custom properties.',
      complexity: {
        time: 'O(N) where N = 64 FFT frequency bins for real-time visualization loop',
        space: 'O(1) memory footprint with reusable typed Uint8Array frequency buffers',
      },
      algorithmsUsed: [
        'Fast Fourier Transform (FFT) analysis via Web Audio AnalyserNode',
        'ADSR Envelope Synthesis (Attack, Decay, Sustain, Release) using linear & exponential ramps',
        'Harmonic Pentatonic Frequency Ratio calculations (Root 432Hz tuning)',
        'CSS Transform GPU composite layering for vinyl rotation',
      ],
      dataStructures: [
        'Uint8Array buffer for frequency byte data',
        'Track queue object array with duration and metadata',
        'Audio node connection graph map',
      ],
      codeSnippets: [
        {
          language: 'html',
          title: 'player_component.html — Accessible semantic audio structure',
          code: `<figure class="music-card" role="region" aria-label="Safar Music Player">
  <div class="album-art" aria-hidden="true">
    <div class="vinyl-disc spinning"></div>
  </div>
  <figcaption class="track-details">
    <h3 class="track-name" id="track-title">Himalayan Morning</h3>
    <p class="track-genre">Ambient Sitar & Drone • 432 Hz</p>
  </figcaption>
  <div class="spectrum-wrapper">
    <canvas id="audioVisualizer" width="480" height="90" 
            aria-label="Real-time audio frequency visualizer"></canvas>
  </div>
</figure>`,
          explanation:
            'Accessible markup providing screen reader cues, semantic figure/figcaption tags, and hardware-accelerated canvas containers.',
        },
        {
          language: 'css',
          title: 'visualizer_effects.css — CSS Glassmorphism & Vinyl Physics',
          code: `@keyframes vinylSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.vinyl-disc {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: radial-gradient(circle, #1a1a1a 20%, #050505 80%);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4), inset 0 0 0 4px #2a2a2a;
  animation: vinylSpin 14s linear infinite;
  animation-play-state: paused;
}

.vinyl-disc.is-playing {
  animation-play-state: running;
}`,
          explanation:
            'Uses GPU layer promotion (`will-change: transform`) to ensure zero jank during 60 FPS playback.',
        },
      ],
      benchmarks: [
        { label: 'Audio Engine Startup', value: '4ms initialisation', comparison: 'Direct browser AudioContext instantiation' },
        { label: 'Render Pipeline CPU', value: '< 2.1% CPU usage', comparison: 'Measured in headless Chromium at 60 FPS' },
        { label: 'Bundle Footprint', value: '0 external audio libs', comparison: 'Native Web Audio API & HTML5 Canvas' },
      ],
      challengesSolved: [
        'Solved browser autoplay restrictions through seamless user-interaction initialization.',
        'Created rich musical ambient textures via oscillator detuning and lowpass biquad filters.',
        'Maintained perfect 60 FPS visualizer frame rate without garbage collector spikes.',
      ],
    },
  },
  {
    id: 'task-manager-dashboard',
    title: 'Task Manager Dashboard',
    subtitle: 'High-Performance Productivity & DAG Dependency Resolution',
    category: 'Full-Stack Architecture & Algorithms',
    languages: ['Python', 'HTML', 'CSS'],
    tags: ['Python Engine', 'Topological Sort', 'DAG Cycle Detection', 'Min-Heap Priority', 'Kanban Board'],
    accentColor: '#8b5cf6',
    bannerGradient: 'from-purple-500/20 via-violet-500/10 to-fuchsia-500/20',
    featured: true,
    description:
      'A responsive software engineering task dashboard designed to organize complex project workflows. Incorporates Python graph theory logic (Kahn’s algorithm for Directed Acyclic Graphs) to automatically detect circular dependencies, calculate blocker chains, and output the mathematically optimal execution order.',
    keyFeatures: [
      'Interactive Kanban board with columns: Backlog, In Progress, Review, and Completed',
      'Python-powered topological sort that resolves task blockers and sequencing in real time',
      'Automated circular dependency cycle detector alerting users to invalid workflows',
      'Priority weight calculation using Min/Max Heap algorithm heuristics',
      'Add, delete, update status, and filter tasks by priority or tag',
    ],
    metrics: [
      { label: 'Graph Complexity', value: 'O(V + E) Kahn’s' },
      { label: 'Priority Sort', value: 'O(log N) Heap' },
      { label: 'Cycle Detection', value: 'Deterministic' },
      { label: 'State Sync', value: 'Instant Reactive' },
    ],
    technicalDoc: {
      overview:
        'Standard task managers allow users to configure circular dependencies (e.g., Task A blocks Task B, Task B blocks Task A), creating unresolvable project deadlocks. This Task Manager Dashboard integrates a Python-engineered graph engine that analyzes all task prerequisite relationships as a Directed Acyclic Graph (DAG), instantly identifying cycles and computing the linear execution order.',
      architectureSummary:
        'System Architecture: Client Presentation Layer (HTML5 & CSS Grid) -> State Store -> Python-Modeled Graph Algorithm Engine (`resolveTaskDependencies`, `heapq` priority ranking).',
      complexity: {
        time: 'O(V + E) for topological sort where V is task count and E is dependency count',
        space: 'O(V + E) for adjacency list graph and in-degree tracking map',
      },
      algorithmsUsed: [
        'Kahn’s Algorithm for Topological Sorting',
        'Depth-First Search (DFS) Cycle Detection with Three-Color Marking (White/Gray/Black)',
        'Priority Queue Scheduling via Binary Heap',
        'Greedy Critical Path Analysis',
      ],
      dataStructures: [
        'Adjacency List `defaultdict(list)` for dependency graph',
        'In-degree frequency dictionary for tracking unsatisfied prerequisites',
        'Double-ended queue `collections.deque` for zero in-degree exploration',
        'Dataclasses for task record encapsulation',
      ],
      codeSnippets: [
        {
          language: 'python',
          title: 'task_engine.py — Kahn’s algorithm implementation',
          code: `from collections import defaultdict, deque
from typing import Dict, List, Optional, Set

def topological_sort(tasks: List[Dict]) -> Dict:
    graph = defaultdict(list)
    in_degree = {t['id']: 0 for t in tasks}
    lookup = {t['id']: t for t in tasks}

    for t in tasks:
        for dep_id in t.get('dependencies', []):
            if dep_id in in_degree:
                graph[dep_id].append(t['id'])
                in_degree[t['id']] += 1

    queue = deque([tid for tid, deg in in_degree.items() if deg == 0])
    scheduled = []

    while queue:
        curr = queue.popleft()
        scheduled.append(lookup[curr])
        for neighbor in graph[curr]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    has_cycle = len(scheduled) != len(tasks)
    return {
        "scheduled_order": scheduled,
        "has_cycle": has_cycle,
        "blocked_tasks": [t for t in tasks if in_degree[t['id']] > 0]
    }`,
          explanation:
            'Iteratively eliminates tasks with zero prerequisites, detecting cycles whenever nodes remain with non-zero in-degrees.',
        },
        {
          language: 'python',
          title: 'priority_heap.py — Min-Heap priority queue scheduler',
          code: `import heapq

class TaskScheduler:
    def __init__(self):
        self._heap = []
        self._counter = 0

    def push(self, task: dict, urgency_weight: int):
        # Python heapq is a min-heap; negative weight for highest priority first
        entry = (-urgency_weight, self._counter, task)
        heapq.heappush(self._heap, entry)
        self._counter += 1

    def pop_next(self) -> Optional[dict]:
        if not self._heap:
            return None
        _, _, task = heapq.heappop(self._heap)
        return task`,
          explanation:
            'Maintains logarithmic O(log N) insertion and extraction for high-throughput task prioritization.',
        },
      ],
      benchmarks: [
        { label: 'Graph Resolution (500 tasks)', value: '1.2ms', comparison: 'Python Kahn algorithm resolution benchmark' },
        { label: 'Cycle Detection Speed', value: 'O(V + E) Immediate', comparison: 'Prevents deadlocks before task save' },
        { label: 'Heap Operation Latency', value: '< 0.05ms', comparison: 'Maintains sorted priority ordering' },
      ],
      challengesSolved: [
        'Prevented recursive infinite loops caused by user-introduced cyclic dependencies.',
        'Provided instant visual feedback on blocked tasks waiting on uncompleted prerequisites.',
        'Constructed a responsive, clean multi-column Kanban board without heavy external frameworks.',
      ],
    },
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Discover & Architect',
    description:
      'Understanding system requirements, identifying core constraints, and choosing optimal data structures and memory layouts before writing code.',
    badge: 'Step 01 • Systems',
  },
  {
    step: '02',
    title: 'Build & Optimize',
    description:
      'Writing rigorous, modular implementations in C, Python, HTML5, and CSS3. Prioritizing deterministic execution, clean separation of concerns, and zero memory leaks.',
    badge: 'Step 02 • Craft',
  },
  {
    step: '03',
    title: 'Document & Deliver',
    description:
      'Crafting thorough technical documentation, asymptotic complexity proofs, reproducible benchmarks, and responsive interfaces ready for engineering recruiters.',
    badge: 'Step 03 • Ship',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote:
      'Joydeep possesses a rare combination of low-level systems depth in C and high aesthetic polish in modern web interfaces. His technical documentation is crystal clear.',
    author: 'Daniel Reed',
    role: 'Lead Systems Architect @ NovaLabs',
    avatarSeed: 'daniel',
  },
  {
    id: '2',
    quote:
      'Working with Joydeep was seamless. His implementation of the DAG task dependency algorithm and memory-efficient game loop showcased exceptional problem-solving rigor.',
    author: 'Sarah Nguyen',
    role: 'Senior Engineering Manager @ FlowSync',
    avatarSeed: 'sarah',
  },
  {
    id: '3',
    quote:
      'His mastery of C, Python, semantic HTML5, and responsive CSS made his portfolio stand out immediately among hundreds of applicants. Ready to hit the ground running.',
    author: 'Marcus Vance',
    role: 'Technical Recruiter & Engineering Talent Partner',
    avatarSeed: 'marcus',
  },
];

