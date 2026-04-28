import { User } from '../types/user';
import { Task } from '../types/task';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = '@TaskFlow:tasks';
const USER_KEY = '@TaskFlow:user';
const THEME_KEY = '@TaskFlow:theme';

export const taskStorage = {
  // Tasks
  async getTasks(): Promise<Task[]> {
    try {
      const data = await AsyncStorage.getItem(TASKS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error getting tasks', e);
      return [];
    }
  },

  async saveTasks(tasks: Task[]): Promise<void> {
    try {
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Error saving tasks', e);
    }
  },

  // User
  async getUser(): Promise<User | null> {
    try {
      const data = await AsyncStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error getting user', e);
      return null;
    }
  },

  async saveUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Error saving user', e);
    }
  },

  async removeUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USER_KEY);
    } catch (e) {
      console.error('Error removing user', e);
    }
  },

  // Theme
  async getTheme(): Promise<'light' | 'dark' | null> {
    try {
      const theme = await AsyncStorage.getItem(THEME_KEY);
      if (theme === 'light' || theme === 'dark') {
        return theme;
      }
      return null;
    } catch (e) {
      console.error('Error getting theme', e);
      return null;
    }
  },

  async saveTheme(theme: 'light' | 'dark'): Promise<void> {
    try {
      await AsyncStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.error('Error saving theme', e);
    }
  }
};
