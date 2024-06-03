"use client";
import { createTicket } from "@/services/tickets.service";
import { CreateTicketSchema, TCreateTicket } from "@/types/tickets.types";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";

export const TicketFrom = ({ setShowModal }: { setShowModal: Dispatch<SetStateAction<boolean>> }) => {
  const params = useParams()


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<TCreateTicket>({
    resolver: zodResolver(CreateTicketSchema),
      mode: "onChange",
      defaultValues: {
          raffle: params.id.toString(),
          client: null,
      }
  });
  const onSubmit: SubmitHandler<TCreateTicket> = async (data) => {
    setShowModal(false);
    try {
      const newTicket = await createTicket(data);
      if(!newTicket) throw new Error(`No se pudo crear la boleta: ${data.number}`);
      toast.success(`Se agrego nueva boleta: # ${data.number}`);
      mutate((key: string) => (typeof key === "string" && key.startsWith("/api/raffles") ? key : null));
    
    } catch (error) {
      toast.error(`No se pudo crear la boleta: ${data.number} verifica los datos`);
    } finally {
      reset();
    }
  };

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl text-center">Crear Nueva Boleta</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs mx-auto">
        <label className="w-full max-w-xs form-control" htmlFor="number">
          <div className="label">
            <span className="label-text">Numero</span>
          </div>
          <input
            type="text"
            placeholder="Escribe aquí"
            className={` ${clsx("input input-bordered w-full max-w-xs", errors.number && "input-error")} `}
            {...register("number")}
            required
          />
          <div className="label">
            {errors && errors.number?.message && (
              <span className="label-text-alt text-error">{errors.number.message as string} </span>
            )}
          </div>
          <span className="sr-only">Campo de nombre de cliente</span>
        </label>

        <button type="submit" className="w-full btn btn-primary" disabled={!isDirty || !isValid}>
          Crear Rifa
        </button>
      </form>
    </div>
  );
};
