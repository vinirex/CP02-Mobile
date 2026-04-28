import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Task } from '../types/task';
import { taskStorage } from '../services/taskStorage';

interface TaskContextData {
  tasks: Task[];
  addTask: (task: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  loading: boolean;
}

export const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const savedTasks = await taskStorage.getTasks();
    setTasks(savedTasks);
    setLoading(false);
  };

  const addTask = async (task: Task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    await taskStorage.saveTasks(newTasks);
  };

  const updateTask = async (updatedTask: Task) => {
    const newTasks = tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
    setTasks(newTasks);
    await taskStorage.saveTasks(newTasks);
  };

  const removeTask = async (id: string) => {
    const newTasks = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);
    await taskStorage.saveTasks(newTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask, loading }}>
      {children}
    </TaskContext.Provider>
  );
};
