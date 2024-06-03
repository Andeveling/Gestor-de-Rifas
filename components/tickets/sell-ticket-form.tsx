"use client";
import { Ticket } from "@prisma/client";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { sellTicket } from "@/actions/raffle.actions";
import clsx from "clsx";
import { SubmitButton } from "../shared/submit";
import { SellTicketState } from "@/actions/actions";

export function SellTicketForm({ ticket }: Readonly<{ ticket: Ticket }>) {
  const initialState = {
    message: null,
    errors: {},
  };
  const { register } = useForm();
  const { raffleId } = useParams();
  const [state, formAction] = useFormState<SellTicketState, FormData>(sellTicket, initialState);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-lg font-bold">Boleta numero #{ticket.number}</h1>
      <form action={formAction}>
        <input type="hidden" name="raffleId" value={raffleId} />
        <input type="hidden" name="ticketId" value={ticket.id} />
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Numero de cedula</span>
          </div>
          <input
            type="number"
            placeholder="Ejemplo: 123.445.021"
            className={` ${clsx("input input-bordered w-full max-w-xs", state.errors?.clientCC && "input-error")} `}
            {...register("clientCC", { required: true })}
            required
            aria-describedby="ticket-number-error"
          />
          <div className="label">
            {state.errors?.clientCC ? (
              <div id="ticket-number-error" aria-live="polite" className="mt-2 text-sm text-error">
                {state.errors.clientCC.map((error: string) => (
                  <p key={error} className="text-xs">
                    {error}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
          <span className="sr-only">Campo de numero de cedula</span>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Abono</span>
          </div>
          <input
            type="number"
            placeholder="Ejemplo: 20000"
            className={` ${clsx("input input-bordered w-full max-w-xs", state.errors?.clientCC && "input-error")} `}
            {...register("payment", { required: true })}
            required
            aria-describedby="payment-mount-error"
          />
          <div className="label">
            {state.errors?.payment ? (
              <div id="ticket-number-error" aria-live="polite" className="mt-2 text-sm text-error">
                {state.errors.payment.map((error: string) => (
                  <p key={error} className="text-xs">
                    {error}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
          <span className="sr-only">Campo de abono</span>
        </label>
        <SubmitButton className="w-full ">Vender</SubmitButton>
      </form>
    </div>
  );
}
