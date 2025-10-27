import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
// src/types/user.types.ts
export interface User {
  id: string;
  name: string;
  email: string;
}
