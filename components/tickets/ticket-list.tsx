import { fetchTicketsWithClientName } from "@/actions/raffle.actions";
import { TicketCard } from "./ticket-card";

export const TicketList = async  ({ raffleId }: {  raffleId: string }) => {
  const accordionName = `accordion${raffleId}`;
  const ticketsData = await fetchTicketsWithClientName(raffleId)

  return ticketsData.tickets.length ? (
    <ul className="w-full space-y-2">
      {ticketsData.tickets.map((ticket, index) => (
        <li key={ticket.id} className="w-full border collapse glass">
          <TicketCard index={index} ticket={ticket} accordionName={accordionName} />
        </li>
      ))}
    </ul>
  ): <p className="text-center">No hay tickets en esta rifa</p>
};






