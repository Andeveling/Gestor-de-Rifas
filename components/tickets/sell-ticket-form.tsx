"use client";
import { Ticket } from "@prisma/client";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { sellTicket } from "@/actions/raffle.actions";
import clsx from "clsx";
import { SubmitButton } from "../shared/submit";

export function SellTicketForm({ ticket }: { ticket: Ticket }) {
  const initialState = {
    message: null,
    errors: {},
  };
  const { register } = useForm();
  const params = useParams();
  const [state, formAction] = useFormState<any, FormData>(sellTicket, initialState);

  return (
    <div>
      <h1 className="text-lg font-bold">Boleta numero #{ticket.number}</h1>
      <form action={formAction}>
        <label className="form-control w-full max-w-xs" htmlFor="name">
          <div className="label">
            <span className="label-text">Numero de cedula</span>
          </div>
          <input
            type="number"
            placeholder="Ejemplo: 123.445.021"
            className={` ${clsx("input input-bordered w-full max-w-xs", state.errors?.number && "input-error")} `}
            {...register("number")}
            required
            aria-describedby="ticket-number-error"
          />
          <div className="label">
            {state.errors?.number ? (
              <div id="ticket-number-error" aria-live="polite" className="mt-2 text-sm text-error">
                {state.errors.number.map((error: string) => (
                  <p key={error} className="text-xs">
                    {error}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
          <span className="sr-only">Campo de numero de cedula</span>
        </label>

        <SubmitButton>Vender</SubmitButton>
      </form>
    </div>
  );
}
