import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, Role } from '../types/user';
import { taskStorage } from '../services/taskStorage';

interface AuthContextData {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const MOCK_USERS = [
  {
    id: 1,
    username: 'admin',
    password: '123',
    role: 'admin' as Role,
    name: 'Administrador',
  },
  {
    id: 2,
    username: 'user',
    password: '123',
    role: 'user' as Role,
    name: 'Usuário Comum',
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  const loadStorageData = async () => {
    const savedUser = await taskStorage.getUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    const foundUser = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        username: foundUser.username,
        role: foundUser.role,
        name: foundUser.name,
      };
      setUser(userData);
      await taskStorage.saveUser(userData);
      return true;
    }
    return false;
  };

  const logout = async () => {
    setUser(null);
    await taskStorage.removeUser();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
