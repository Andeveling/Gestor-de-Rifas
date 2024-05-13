"use client";
import { StateRaffle } from "@/actions/actions";
import { updateRaffle } from "@/actions/raffle.actions";
import { TUpdateRaffle, UpdateRaffleSchema } from "@/types/raffles.types";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../shared/submit";




export const RafflesEditFrom = () => {
  const initialState = {
    message: null,
    errors: {},
  };
  const params = useParams();
  const [state, formAction] = useFormState<StateRaffle, FormData>(updateRaffle, initialState);
  const { register } = useForm<TUpdateRaffle>({ resolver: zodResolver(UpdateRaffleSchema) })

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl text-center">Actualizar Rifa</h2>

      <form action={formAction} className="w-full max-w-xs mx-auto">
        <input type="text"  value={params.id} className="hidden" {...register("id")} />

        <div className="border btn btn-info form-control rounded-xl">
          <label className="space-x-3 cursor-pointer label">
            <span className="text-xl label-text">Activar o Desactivar</span>
            <input
              type="checkbox"
              defaultChecked={true}
              className="checkbox-primary checkbox checkbox-lg"
              {...register("isActive")}
            />
          </label>
        </div>

        <div className="divider" />

        <label className="w-full max-w-xs form-control" htmlFor="name">
          <div className="label">
            <span className="label-text">Nombre </span>
          </div>
          <input
            type="text"
            placeholder={"Escribe aquí"}
            className={` ${clsx("input input-bordered w-full max-w-xs", state.errors?.name && "input-error")} `}
            {...register("name")}
            aria-describedby="raffle-name-error"
          />
          <div className="label">
            {state.errors?.name ? (
              <div id="raffle-name-error" aria-live="polite" className="mt-2 text-sm text-error">
                {state.errors.name.map((error: string) => (
                  <p key={error} className="text-xs">
                    {error}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
          <span className="sr-only">Campo de nombre de cliente</span>
        </label>

        <label className="w-full max-w-xs form-control" htmlFor="priceForTicket">
          <div className="label">
            <span className="label-text">Precio por boleta</span>
          </div>
          <input
            type="number"
            placeholder="Escribe aquí"
            className={` ${clsx(
              "input input-bordered w-full max-w-xs",
              state.errors?.priceForTicket && "input-error",
            )} `}
            {...register("priceForTicket")}
            aria-describedby="raffle-priceForTicket-error"
          />
          <div className="label">
            {state.errors?.priceForTicket ? (
              <div id="raffle-name-error" aria-live="polite" className="mt-2 text-sm text-error">
                {state.errors.priceForTicket.map((error: string) => (
                  <p key={error} className="text-xs">
                    {error}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
          <span className="sr-only">Campo de precio por boleta</span>
        </label>

        <label className="w-full max-w-xs form-control" htmlFor="playDate">
          <div className="label">
            <span className="label-text">Fecha de la rifa</span>
          </div>
          <input
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            className={` ${clsx("input input-bordered w-full max-w-xs", state.errors?.playDate && "input-error")} `}
            {...register("playDate")}
            required
          />
          <div className="label">
            {state.errors?.playDate ? (
              <div id="raffle-name-error" aria-live="polite" className="mt-2 text-sm text-error">
                {state.errors.playDate.map((error: string) => (
                  <p key={error} className="text-xs">
                    {error}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
          <span className="sr-only">Campo de cédula de fecha de la rifa</span>
        </label>

        <label className="w-full max-w-xs mb-4 form-control">
          <div className="label">
            <span className="label-text">Descripción</span>
            <span className="badge badge-info label-text-alt text-neutral">Opcional</span>
          </div>
          <textarea
            rows={6}
            className="h-24 textarea textarea-bordered"
            placeholder="Escribe aquí "
            {...register("description")}
            aria-label="Descripción"
          ></textarea>
        </label>

        <div className="flex justify-between w-full">
          <Link href={`/raffles/${params.id}`} className="btn btn-secondary">
            Cancelar
          </Link>

          <SubmitButton>Actualizar</SubmitButton>
        </div>
      </form>
    </div>
  );
};
