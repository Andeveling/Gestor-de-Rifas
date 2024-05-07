import { TCreateRaffle, TRaffle } from "@/types/raffles.types";

export const createRaffle = async (data: TCreateRaffle) => {
  try {
    const response = await fetch("/api/raffles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create raffle");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
