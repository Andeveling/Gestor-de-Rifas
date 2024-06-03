import { z } from "zod"; 
import { TicketSchema } from "./tickets.types";



export const RaffleSchema = z.object({
    id: z.string(),
    name: z.string().min(3).max(50),
    description: z.string().max(200).nullable().optional(),
    priceForTicket: z.string().refine((val) => {
        const numberVal = parseFloat(val);
        return numberVal > 0;
    }, {
        message: "El precio debe ser mayor a 0",
    }),
    playDate: z.string().refine((val) => new Date(val) > new Date(), {
        message: "La feha de juego debe ser posterior a la fecha actual",
    }),
    tickets: z.array(z.lazy(() => TicketSchema)).optional().default([]),
    isActive: z.boolean().default(true),
})

export const CreateRaffleSchema = RaffleSchema.omit({ id: true, tickets: true });
export const UpdateRaffleSchema = RaffleSchema.omit({  tickets: true }).partial({});
export const DeleteRaffleSchema = RaffleSchema.pick({ id: true });  


export type TRaffle = z.infer<typeof RaffleSchema>;
export type TCreateRaffle = z.infer<typeof CreateRaffleSchema>;
export type TUpdateRaffle = z.infer<typeof UpdateRaffleSchema>;