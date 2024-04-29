import {  z, ZodType } from "zod"; // Add new import

export interface IClient {
  id: string;
  name: string;
  cellphone: string;
  cc: string;
  address?: string | null;
  tickets: Array<ITicket>;
}
// Client DTOs
export interface ICreateClientDTO extends Omit<IClient, "id" | "tickets"> {}
export interface IUpdateClientDTO extends Partial<Omit<IClient, "id">> {}

export interface ITicket {
  id: string;
  number: string;
  raffle: IRaffle;
  client: IClient;
}
export interface IRaffle {
  id: string;
  name: string;
  description?: string;
  priceForTicket: number;
  playDate: Date;
  tickets: Array<ITicket>;
}

export const CreateClientSchema: ZodType<ICreateClientDTO> = z.object({
  name: z.string().min(3).max(50),
  cellphone: z.string().regex(/^\d{10}$/).min(10).max(10),
  cc: z.string().regex(/^[0-9]*$/).min(6),
  address: z.string().optional(),
});
