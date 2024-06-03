import { z } from "zod"; // Add new import

export const ClientSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(50),
  cellphone: z
    .string()
    .regex(/^\d{10}$/)
    .min(10)
    .max(10),
  cc: z
    .string()
    .regex(/^[0-9]*$/)
    .min(6),
  address: z.string().optional(),
  tickets: z.array(z.object({})),
  code: z.string().optional(),
});
export const CreateClientSchema = ClientSchema.omit({ id: true, tickets: true, code: true });
export const UpdateClientSchema = ClientSchema.partial({});
export const DeleteClientSchema = ClientSchema.pick({ id: true });

export type TClient = z.infer<typeof ClientSchema>;
export type TCreateClient = z.infer<typeof CreateClientSchema>;
