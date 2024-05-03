
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



