import { z } from "zod";

export const EnvSchema = z.object({
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  DATABASE_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

EnvSchema.parse(process.env);

export type Env = z.infer<typeof EnvSchema>;


declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

