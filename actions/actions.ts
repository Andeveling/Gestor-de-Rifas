

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

