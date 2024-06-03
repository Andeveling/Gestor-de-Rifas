import { fetchTicketsWithClientName } from "@/actions/raffle.actions";
import { adapterTicketStatus } from "@/lib/utils";
import { Ticket as TTicket } from "@prisma/client";
import clsx from "clsx";

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



const TicketCard = ({ accordionName,ticket, index }: { ticket: TTicket; index: number, accordionName: string }) => {
  
  return (
    <>
      <input type="radio" name={accordionName} defaultChecked={index === 0} />
      <div className="flex justify-between pr-4 text-3xl font-medium collapse-title">
        #{ticket.number}
        <span
          className={clsx("badge badge-primary badge-lg", {
            "badge-info": ticket.status === "PAID",
            "badge-warning": ticket.status === "PARTIALLY_PAID",
            badge: ticket.status === "FREE",
          })}
        >
          {adapterTicketStatus(ticket.status)}
        </span>
      </div>
      <div className="collapse-content">
        <p>{ticket.clientId ?? "Sin cliente"}</p>
        <button type="button" className="btn">Vender</button>
      </div>
    </>
  );
};


