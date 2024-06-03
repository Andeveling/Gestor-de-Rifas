"use client";
import { adapterTicketStatus } from "@/lib/utils";
import clsx from "clsx";
import { Ticket } from "@prisma/client";
import { useDialog } from "@/lib/hooks/use-dialog";
import { SellTicketForm } from "./sell-ticket-form";
import { X } from "lucide-react";


export const TicketCard = ({
  accordionName,
  ticket,
  index,
}: {
  ticket: Ticket;
  index: number;
  accordionName: string;
}) => {
  const { dialogRef, onClose, onOpen } = useDialog();

  return (
    <>
      <input type="radio" name={accordionName} defaultChecked={index === 0} />
      <div className="collapse-title flex justify-between pr-4 text-3xl font-medium">
        #{ticket.number}
        <span
          className={clsx("badge badge-primary badge-outline badge-lg", {
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
        <div className="flex justify-end">
          <button type="button" className="btn btn-primary btn-sm" onClick={onOpen}>
            Vender
          </button>
          <dialog ref={dialogRef} className="modal">
            <div className="modal-box">
              <form method="dialog">
                  
                <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2" onClick={onClose}>
                  <X />
                </button>
              </form>
              <h3 className="text-2xl font-bold text-center">Vender Boleta</h3>
              <SellTicketForm ticket={ticket} />
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
};
