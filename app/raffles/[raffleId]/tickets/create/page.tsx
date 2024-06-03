import TicketCreateForm from "@/components/raffles/tickets/create-ticket";
import React from "react";

export default function CreateTicketPage({ params }: { params: { raffleId: string } }) {
  return <TicketCreateForm />;
}
