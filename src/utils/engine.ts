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
  while (queue.length > 0) {
    const current = queue.shift()!;
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
  if (start.x === target.x && start.y === target.y) {
    return start;
  }

  const directions = [
    { x: 0, y: -1 }, // North
    { x: 1, y: 0 },  // East
    { x: 0, y: 1 },  // South
    { x: -1, y: 0 }, // West
  ];

  let bestNext: GridPoint = start;
  let minCost = Infinity;

  for (const dir of directions) {
    const nextX = start.x + dir.x;
    const nextY = start.y + dir.y;

    // Bounds check
    if (nextX < 0 || nextX >= gridWidth || nextY < 0 || nextY >= gridHeight) {
      continue;
    }

    const key = `${nextX},${nextY}`;
    if (obstacles.has(key)) {
      continue;
    }

    const cost = 1 + manhattanDistance(nextX, nextY, target.x, target.y);
    if (cost < minCost) {
      minCost = cost;
      bestNext = { x: nextX, y: nextY };
    }
  }

  return bestNext;
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
