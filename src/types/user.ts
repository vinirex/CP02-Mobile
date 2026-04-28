export type Role = 'admin' | 'user';

export interface User {
  id: number;
  username: string;
  role: Role;
  name: string;
}
