type TUser = {
  user_id: number;
  username: string;
  email: string;
  password_hash: string;
  role: "admin" | "user" | "developer";
  created_at: Date;
};

export const users: TUser[] = [
  {
    user_id: 1,
    username: "rado",
    email: "rado@test.com",
    password_hash: "test123",
    role: "developer",
    created_at: new Date(),
  },
  {
    user_id: 2,
    username: "john",
    email: "john@test.com",
    password_hash: "test123",
    role: "user",
    created_at: new Date(),
  },
  {
    user_id: 3,
    username: "peter",
    email: "peter@test.com",
    password_hash: "test123",
    role: "admin",
    created_at: new Date(),
  },
  {
    user_id: 4,
    username: "abdullah",
    email: "abdullah@test.com",
    password_hash: "test123",
    role: "user",
    created_at: new Date(),
  },
  {
    user_id: 5,
    username: "stanislavojskis",
    email: "stanislavojskis@test.com",
    password_hash: "test123",
    role: "user",
    created_at: new Date(),
  },
];
