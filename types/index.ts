type sessionWithUser = {
  user?: {  
    id: string;
    email?: string;
    name?: string;
    role?: "user" | "admin";
    save: () => Promise<void>;
    destroy: () => Promise<void>;
  }
};
export type { sessionWithUser };