import test from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveTaskDependencies,
  calculatePriorityWeight,
  manhattanDistance,
  findNextStepOnGrid,
  validateContactForm,
  TaskNode,
} from './engine';

test('resolveTaskDependencies correctly orders linear dependency chain', () => {
  const tasks: TaskNode[] = [
    { id: 't3', title: 'Deploy', priority: 'medium', dependencies: ['t2'], status: 'todo' },
    { id: 't1', title: 'Schema Design', priority: 'high', dependencies: [], status: 'done' },
    { id: 't2', title: 'Implement API', priority: 'urgent', dependencies: ['t1'], status: 'in_progress' },
  ];

  const result = resolveTaskDependencies(tasks);
  assert.equal(result.hasCycle, false);
  assert.deepEqual(result.order, ['t1', 't2', 't3']);
});

test('resolveTaskDependencies detects cyclic dependency error', () => {
  const tasks: TaskNode[] = [
    { id: 't1', title: 'Task A', priority: 'medium', dependencies: ['t2'], status: 'todo' },
    { id: 't2', title: 'Task B', priority: 'medium', dependencies: ['t1'], status: 'todo' },
  ];

  const result = resolveTaskDependencies(tasks);
  assert.equal(result.hasCycle, true);
  assert.ok(result.cycleNodes && result.cycleNodes.length > 0);
});

test('calculatePriorityWeight assigns correct ordered values', () => {
  assert.equal(calculatePriorityWeight('urgent'), 4);
  assert.equal(calculatePriorityWeight('high'), 3);
  assert.equal(calculatePriorityWeight('medium'), 2);
  assert.equal(calculatePriorityWeight('low'), 1);
});

test('manhattanDistance accurately computes L1 metric', () => {
  assert.equal(manhattanDistance(0, 0, 3, 4), 7);
  assert.equal(manhattanDistance(5, 5, 5, 5), 0);
  assert.equal(manhattanDistance(2, 8, 4, 1), 9);
});

test('findNextStepOnGrid moves toward goal avoiding obstacles', () => {
  const obstacles = new Set<string>(['1,0']); // block direct right
  const next = findNextStepOnGrid({ x: 0, y: 0 }, { x: 2, y: 0 }, 5, 5, obstacles);
  // Should step down to (0, 1) to navigate around obstacle (1, 0)
  assert.deepEqual(next, { x: 0, y: 1 });
});

test('validateContactForm rejects empty/invalid data and accepts valid inputs', () => {
  const invalid = validateContactForm({ name: '', email: 'not-an-email', message: 'hi' });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Joydeep Sasmal',
    email: 'recruiter@techcorp.com',
    message: 'We are very impressed with your C and Python engineering projects!',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
