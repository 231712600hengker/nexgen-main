import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  username: string;
  role: 'admin' | 'user';
}

interface AuthState {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (username: string, password: string) => {
        if (username === 'admin123' && password === '12345') {
          set({ user: { username, role: 'admin' } });
          return true;
        } else if (username === 'user123' && password === '12345') {
          set({ user: { username, role: 'user' } });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;