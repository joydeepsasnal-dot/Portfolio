/**
 * Pure application logic for portfolio engines:
 * - Topological Sort & Cycle Detection (Python Task Manager backend logic)
 * - Priority Queue Scoring
 * - 2D Grid Pathfinding & Simulation (C Echoes of the Wild engine logic)
 * - Contact Form Validation
 */

import { ContactFormData } from '../types';

export interface TaskNode {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dependencies: string[];
  status: 'todo' | 'in_progress' | 'done';
}

/**
 * Resolves optimal task execution order using Kahn's algorithm (Topological Sort).
 * Detects circular dependency cycles.
 */
export function resolveTaskDependencies(tasks: TaskNode[]): {
  order: string[];
  hasCycle: boolean;
  cycleNodes?: string[];
} {
  const inDegree: Map<string, number> = new Map();
  const graph: Map<string, string[]> = new Map();
  const taskIds = new Set(tasks.map((t) => t.id));

  // Initialize
  for (const t of tasks) {
    inDegree.set(t.id, 0);
    graph.set(t.id, []);
  }

  // Populate graph and calculate in-degrees
  for (const t of tasks) {
    for (const depId of t.dependencies) {
      if (taskIds.has(depId)) {
        // depId must complete before t.id can start
        graph.get(depId)!.push(t.id);
        inDegree.set(t.id, (inDegree.get(t.id) || 0) + 1);
      }
    }
  }

  // Queue of nodes with 0 in-degree
  const queue: string[] = [];
  for (const [id, deg] of inDegree.entries()) {
    if (deg === 0) {
      queue.push(id);
    }
  }

  const order: string[] = [];
  for (let head = 0; head < queue.length; head++) {
    const current = queue[head];
    order.push(current);

    for (const neighbor of graph.get(current) || []) {
      const newDeg = (inDegree.get(neighbor) || 0) - 1;
      inDegree.set(neighbor, newDeg);
      if (newDeg === 0) {
        queue.push(neighbor);
      }
    }
  }

  const hasCycle = order.length !== tasks.length;
  const cycleNodes = hasCycle
    ? tasks.filter((t) => (inDegree.get(t.id) || 0) > 0).map((t) => t.id)
    : undefined;

  return { order, hasCycle, cycleNodes };
}

/**
 * Calculates priority weight matching Min/Max heap logic.
 */
export function calculatePriorityWeight(priority: TaskNode['priority']): number {
  switch (priority) {
    case 'urgent':
      return 4;
    case 'high':
      return 3;
    case 'medium':
      return 2;
    case 'low':
      return 1;
    default:
      return 0;
  }
}

/**
 * Pure 2D Grid Manhattan distance heuristic for A* pathfinding.
 */
export function manhattanDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export interface GridPoint {
  x: number;
  y: number;
}

/**
 * Finds shortest step on a 2D tile grid avoiding obstacles (Echoes of the Wild C-engine logic).
 */
export function findNextStepOnGrid(
  start: GridPoint,
  target: GridPoint,
  gridWidth: number,
  gridHeight: number,
  obstacles: Set<string>
): GridPoint {
  const valid = (p: GridPoint) => Number.isInteger(p.x) && Number.isInteger(p.y)
    && p.x >= 0 && p.x < gridWidth && p.y >= 0 && p.y < gridHeight
    && !obstacles.has(`${p.x},${p.y}`);
  if (!valid(start) || !valid(target)) return start;
  if (start.x === target.x && start.y === target.y) return start;

  // Breadth-first search guarantees a shortest route on this unweighted grid,
  // including detours that initially move away from the target.
  const queue: { point: GridPoint; first?: GridPoint }[] = [{ point: start }];
  const visited = new Set([`${start.x},${start.y}`]);
  const directions = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];
  for (let i = 0; i < queue.length; i++) {
    const { point, first } = queue[i];
    for (const dir of directions) {
      const next = { x: point.x + dir.x, y: point.y + dir.y };
      const key = `${next.x},${next.y}`;
      if (!valid(next) || visited.has(key)) continue;
      const firstStep = first ?? next;
      if (next.x === target.x && next.y === target.y) return firstStep;
      visited.add(key);
      queue.push({ point: next, first: firstStep });
    }
  }
  return start;
}

/**
 * Validates recruiter contact form submission.
 */
export function validateContactForm(data: Partial<ContactFormData>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please provide your name (at least 2 characters).';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Please provide a detailed message (at least 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

