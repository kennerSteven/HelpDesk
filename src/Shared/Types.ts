export type role = 'SUPER_ADMIN' | 'ADMIN' | 'USER';

export interface User {
  id?: string;
  name: string;
  role: role;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}