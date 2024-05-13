import { TRaffle } from "@/types/raffles.types";
import { create } from "zustand";

interface RaffleState {
  raffle: TRaffle;
  setRaffle: (raffle: TRaffle) => void;
}

export const raffleStore = create<RaffleState>((set) => ({
  raffle: {} as TRaffle,
  setRaffle: (raffle: TRaffle) => set({ raffle }),
}));
