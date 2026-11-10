import React, { useState, useMemo, useRef } from 'react';
import { TaskNode, resolveTaskDependencies, calculatePriorityWeight } from '../utils/engine';
import { CheckCircle2, Clock, AlertTriangle, Plus, ArrowRight, ShieldCheck, Info, Trash2, ArrowUpDown } from 'lucide-react';

interface TaskManagerDemoProps {
  onOpenDoc?: () => void;
}

const INITIAL_TASKS: TaskNode[] = [
  { id: 'T-101', title: 'Design Postgres & SQLite Relational Schema', priority: 'high', dependencies: [], status: 'done' },
  { id: 'T-102', title: 'Implement C Arena Allocator Memory Pool', priority: 'urgent', dependencies: ['T-101'], status: 'in_progress' },
  { id: 'T-103', title: 'Write Python Kahn’s DAG Cycle Detector', priority: 'high', dependencies: ['T-101'], status: 'in_progress' },
  { id: 'T-104', title: 'Synthesize Web Audio Harmonic Chords (Safar)', priority: 'medium', dependencies: [], status: 'todo' },
  { id: 'T-105', title: 'End-to-End Playwright Automation Tests', priority: 'urgent', dependencies: ['T-102', 'T-103'], status: 'todo' },
  { id: 'T-106', title: 'Recruiter Portfolio Documentation & Benchmarks', priority: 'medium', dependencies: ['T-105'], status: 'todo' },
];

export const TaskManagerDemo: React.FC<TaskManagerDemoProps> = ({ onOpenDoc }) => {
  const nextTaskId = useRef(107);
  const [tasks, setTasks] = useState<TaskNode[]>(INITIAL_TASKS);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newPriority, setNewPriority] = useState<TaskNode['priority']>('high');
  const [newDep, setNewDep] = useState<string>('');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Compute Topological DAG order & Cycle detection live
  const dagResult = useMemo(() => {
    return resolveTaskDependencies(tasks);
  }, [tasks]);

  const handleMoveStatus = (id: string, newStatus: TaskNode['status']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) =>
      prev
        .filter((t) => t.id !== id)
        .map((t) => ({
          ...t,
          dependencies: t.dependencies.filter((d) => d !== id),
        }))
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: TaskNode = {
      id: `T-${nextTaskId.current++}`,
      title: newTitle.trim(),
      priority: newPriority,
      dependencies: newDep ? [newDep] : [],
      status: 'todo',
    };

    setTasks((prev) => [newTask, ...prev]);
    setNewTitle('');
    setNewDep('');
    setShowAddModal(false);
  };

  // Test intentionally introducing a cycle to demonstrate Kahn's algorithm cycle detection
  const handleToggleSampleCycle = () => {
    // If not in cycle, create cyclic dependency: T-101 depends on T-105 (which depends on T-102 which depends on T-101)
    if (!dagResult.hasCycle) {
      setTasks((prev) =>
        prev.map((t) => (t.id === 'T-101' ? { ...t, dependencies: ['T-105'] } : t))
      );
    } else {
      // Restore normal
      setTasks((prev) =>
        prev.map((t) => (t.id === 'T-101' ? { ...t, dependencies: [] } : t))
      );
    }
  };

  const filteredTasks = tasks.filter(
    (t) => filterPriority === 'all' || t.priority === filterPriority
  );

  const columns: { id: TaskNode['status']; label: string; bg: string }[] = [
    { id: 'todo', label: 'Backlog / To Do', bg: 'bg-stone-100/70' },
    { id: 'in_progress', label: 'In Progress', bg: 'bg-blue-50/70' },
    { id: 'done', label: 'Completed', bg: 'bg-emerald-50/70' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 text-stone-900 shadow-xl border border-stone-200">
      {/* Top Header & Python Engine Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
            <h3 className="text-xl font-bold font-sans tracking-tight text-stone-900">
              Task Manager Dashboard
            </h3>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-semibold border border-purple-200">
              Python DAG Engine
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Kahn’s Topological Sorting • Min-Heap Priority Queue • Cycle Deadlock Detection
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleToggleSampleCycle}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
              dagResult.hasCycle
                ? 'bg-rose-50 text-rose-700 border-rose-300'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{dagResult.hasCycle ? 'Resolve Injected Cycle' : 'Simulate Dependency Cycle'}</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Task</span>
          </button>

          {onOpenDoc && (
            <button
              onClick={onOpenDoc}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-semibold transition cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Python Code</span>
            </button>
          )}
        </div>
      </div>

      {/* DAG Cycle Warning or Optimal Order Bar */}
      <div className="mt-6 mb-6">
        {dagResult.hasCycle ? (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Circular Dependency Deadlock Detected by Kahn’s Algorithm!</p>
              <p className="text-rose-700 mt-0.5">
                Tasks in cycle: <span className="font-mono font-semibold">{dagResult.cycleNodes?.join(' ⇄ ')}</span>. The system prevents execution to avoid an infinite recursion deadlock.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-900 text-xs flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">Python DAG Optimal Execution Sequence:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-emerald-800">
              {dagResult.order.map((taskId, idx) => (
                <React.Fragment key={taskId}>
                  <span className="bg-white/80 px-2 py-0.5 rounded-md border border-emerald-300 font-bold">
                    {taskId}
                  </span>
                  {idx < dagResult.order.length - 1 && <span className="text-emerald-500">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);
          return (
            <div
              key={col.id}
              className={`rounded-2xl p-4 border border-stone-200/80 ${col.bg} flex flex-col min-h-[320px]`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200/60">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-stone-800">{col.label}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white text-stone-600 text-xs font-mono font-bold shadow-2xs border border-stone-200">
                    {colTasks.length}
                  </span>
                </div>
              </div>

              {/* Task Cards in Column */}
              <div className="space-y-3 flex-1">
                {colTasks.length === 0 ? (
                  <div className="h-28 flex items-center justify-center text-xs text-stone-400 italic">
                    No tasks in this lane
                  </div>
                ) : (
                  colTasks.map((task) => {
                    const isBlocked = task.dependencies.some((depId) => {
                      const depTask = tasks.find((t) => t.id === depId);
                      return depTask && depTask.status !== 'done';
                    });

                    return (
                      <div
                        key={task.id}
                        className="bg-white p-3.5 rounded-xl border border-stone-200/90 shadow-2xs hover:shadow-md transition space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] font-bold text-stone-500">
                            {task.id}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                task.priority === 'urgent'
                                  ? 'bg-rose-100 text-rose-700'
                                  : task.priority === 'high'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-stone-100 text-stone-600'
                              }`}
                            >
                              {task.priority}
                            </span>
                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="text-stone-300 hover:text-rose-500 p-1 transition cursor-pointer"
                              aria-label={`Delete ${task.id}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs font-medium text-stone-800 leading-snug">
                          {task.title}
                        </p>

                        {/* Dependencies display */}
                        {task.dependencies.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1 text-[10px] font-mono">
                            <span className="text-stone-400">Depends on:</span>
                            {task.dependencies.map((dep) => (
                              <span
                                key={dep}
                                className={`px-1.5 py-0.5 rounded-sm border ${
                                  isBlocked
                                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                                    : 'bg-stone-100 text-stone-600 border-stone-200'
                                }`}
                              >
                                {dep}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Status Mover Buttons */}
                        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                          {col.id !== 'todo' && (
                            <button
                              onClick={() =>
                                handleMoveStatus(
                                  task.id,
                                  col.id === 'done' ? 'in_progress' : 'todo'
                                )
                              }
                              className="text-stone-500 hover:text-stone-900 cursor-pointer"
                            >
                              ← Move Back
                            </button>
                          )}
                          <div className="flex-1" />
                          {col.id !== 'done' && (
                            <button
                              onClick={() =>
                                handleMoveStatus(
                                  task.id,
                                  col.id === 'todo' ? 'in_progress' : 'done'
                                )
                              }
                              className="text-emerald-700 font-semibold hover:text-emerald-900 cursor-pointer flex items-center gap-0.5"
                            >
                              <span>Advance</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
            <h4 className="text-lg font-bold text-stone-900 mb-4">Add Engineering Task</h4>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Implement Cache-Aware Linked List"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Priority (Heap Weight)
                </label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as TaskNode['priority'])}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white"
                >
                  <option value="urgent">Urgent (Weight 4)</option>
                  <option value="high">High (Weight 3)</option>
                  <option value="medium">Medium (Weight 2)</option>
                  <option value="low">Low (Weight 1)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Prerequisite Dependency (DAG Node)
                </label>
                <select
                  value={newDep}
                  onChange={(e) => setNewDep(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white font-mono"
                >
                  <option value="">No prerequisite (Root task)</option>
                  {tasks.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.id}: {t.title.slice(0, 32)}...
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-sm cursor-pointer"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

