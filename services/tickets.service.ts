import { TCreateTicket } from "@/types/tickets.types";

export const createTicket = async (data: TCreateTicket) => {
  try {
    const response = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create ticket");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
