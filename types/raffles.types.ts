import { z } from "zod"; // Add new import



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
    tickets: z.array(z.object({})),
})

export const CreateRaffleSchema = RaffleSchema.omit({ id: true, tickets: true });
export const UpdateRaffleSchema = RaffleSchema.partial({});
export const DeleteRaffleSchema = RaffleSchema.pick({ id: true });  


export type TRaffle = z.infer<typeof RaffleSchema>;
export type TCreateRaffle = z.infer<typeof CreateRaffleSchema>;