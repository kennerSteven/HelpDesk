export type Role = "USER" | "AGENT" | "ADMIN";

export interface UserMock {
  name: string;

  password: string;
  role: Role;
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
    role: "AGENT",
  },
  {
    name: "Laura",
    password: "123456",
    role: "ADMIN",
  },
];
