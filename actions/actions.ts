export type StateRaffle = {
  errors?: {
    id?: string[];
    name?: string[];
    description?: string[];
    playDate?: string[];
    priceForTicket?: string[];
    isActive?: string[];
  };
  message?: string | null;
};

export type StateTicket = {
  errors?: {
    number?: string[];
    raffle?: string[];
  };
  message?: string | null;
};

export type SellTicketState = {
  errors?: {
    clientCC?: string[];
    payment?: string[]
  };
  message?: string | null;
};
