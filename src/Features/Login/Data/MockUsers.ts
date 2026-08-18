export type role = 'SUPER_ADMIN' | 'ADMIN' | 'USER';

export interface UserMock {
  name: string;

  password: string;
  role: role;
}

export const MOCK_USERS: UserMock[] = [
  {
    
    name: "Juan",
    password: "123456",
    role: "USER",
  },
  {
    name: "Carlos",
    password: "123456",
    role: "USER",
  },
  {
    name: "Laura",
    password: "123456",
    role: "ADMIN",
  },
];
