"use client";
import { StateTicket } from "@/actions/actions";
import { createTicket } from "@/actions/raffle.actions";
import { SubmitButton } from "@/components/shared/submit";
import { clsx } from "clsx";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

export default function TicketCreateForm() {
  const initialState = {
    message: null,
    errors: {},
  };
  const { register } = useForm();
  const params = useParams();
  const [state, formAction] = useFormState<StateTicket, FormData>(createTicket, initialState);

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl text-center">Nueva Boleta</h2>
      <form action={formAction} className="w-full max-w-xs mx-auto">
        <label className="w-full max-w-xs form-control" htmlFor="name">
          <div className="label">
            <span className="label-text">Numero de 4 dígitos</span>
          </div>
          <input
            type="text"
            placeholder="Escribe aquí"
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
          <span className="sr-only">Campo de numero de 4 dígitos</span>
        </label>

        <input type="text" value={params.raffleId} className="hidden" {...register("raffle")} />

        <div className="flex justify-between gap-4">
          <Link href={`/raffles/${params.raffleId}`} className="btn btn-secondary">
            Cancelar
          </Link>
          <SubmitButton type="submit">Crear Boleta</SubmitButton>
          <span aria-live="polite" className="sr-only" role="status">
            {state?.message}
          </span>
        </div>
      </form>
    </div>
  );
}
