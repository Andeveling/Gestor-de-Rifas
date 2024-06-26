import { z } from "zod";
import { ClientSchema } from "./client.types";

export enum TicketStatus {
  FREE = "FREE",
  PENDING = "PENDING",
  PAID = "PAID",
  PARTIALLY_PAID = "PARTIALLY_PAID",
}

export const TicketSchema = z.object({
  id: z.string(),
  number: z.string().refine(
    (val) => {
      return val.length === 4 && /^[0-9]+$/.test(val);
    },
    {
      message: "El numero debe ser de 4 cifras",
    },
  ),
  raffle: z.string(),
  client: z
    .array(z.lazy(() => ClientSchema.shape.id))
    .nullable()
    .optional(),
  status: z
    .enum([TicketStatus.FREE, TicketStatus.PENDING, TicketStatus.PAID, TicketStatus.PARTIALLY_PAID])
    .default(TicketStatus.FREE),
});


export const SellTicketSchema = z.object({
  clientCC: z
    .string()
    .regex(/^[0-9]*$/)
    .min(6),
  ticketId: z.string(),
  raffleId: z.string(),
  payment: z.string().refine(val=> parseInt(val) > 0, {message: "El monto debe ser mayor a 0"}),
});

export const CreateTicketSchema = TicketSchema.pick({ number: true, raffle: true });
export const UpdateTicketSchema = TicketSchema.partial({});
export const DeleteTicketSchema = TicketSchema.pick({ id: true });

export type TTicket = z.infer<typeof TicketSchema>;
export type TCreateTicket = z.infer<typeof CreateTicketSchema>;
export type TUpdateTicket = z.infer<typeof UpdateTicketSchema>;
export type TDeleteTicket = z.infer<typeof DeleteTicketSchema>;
