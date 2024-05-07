"use client";
import { createRaffle } from "@/services/raffles.service";
import { CreateRaffleSchema, TCreateRaffle } from "@/types/raffles.types";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";

export const RafflesFrom = ({ setShowModal }: { setShowModal: Dispatch<SetStateAction<boolean>> }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty},
  } = useForm<TCreateRaffle>({
    resolver: zodResolver(CreateRaffleSchema),
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<TCreateRaffle> = async (data) => {
    setShowModal(false);
    try {
      await createRaffle(data).then(res=>console.log(res))
      mutate((key: string) => (typeof key === "string" && key.startsWith("/api/raffles") ? key : null));

      toast.success(`Se agrego nueva rifa: ${data.name}`);
    } catch (error) {
      toast.error("No se pudo crear la rifa");
    } finally {
      reset();
    }
  };

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl text-center">Crear Nueva Rifa</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs mx-auto">
        <label className="w-full max-w-xs form-control" htmlFor="name">
          <div className="label">
            <span className="label-text">Nombre </span>
          </div>
          <input
            type="text"
            placeholder="Escribe aquí"
            className={` ${clsx("input input-bordered w-full max-w-xs", errors.name && "input-error")} `}
            {...register("name")}
            required
          />
          <div className="label">
            {errors && errors.name?.message && (
              <span className="label-text-alt text-error">{errors.name.message as string} </span>
            )}
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
            className={` ${clsx("input input-bordered w-full max-w-xs", errors.priceForTicket && "input-error")} `}
            {...register("priceForTicket")}
            required
          />
          <div className="label">
            {errors && errors.priceForTicket?.message && (
              <span className="label-text-alt text-error">{errors.priceForTicket.message as string} </span>
            )}
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
            className={` ${clsx("input input-bordered w-full max-w-xs", errors.playDate && "input-error")} `}
            {...register("playDate")}
            required
          />
          <div className="label">
            {errors && errors.playDate?.message && (
              <span className="label-text-alt text-error">{errors.playDate.message as string} </span>
            )}
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

        <button type="submit" className="w-full btn btn-primary" disabled={!isDirty || !isValid}>
          Crear Rifa
        </button>
      </form>
    </div>
  );
};

