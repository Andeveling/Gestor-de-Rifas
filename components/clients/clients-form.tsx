"use client";
import { CreateClientSchema, ICreateClientDTO } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export const ClientsFrom = ({setShowModal}: {setShowModal: Dispatch<SetStateAction<boolean>>}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isDirty, touchedFields },
  } = useForm<ICreateClientDTO>({
    resolver: zodResolver(CreateClientSchema),
    mode: "onChange",
  });

  // TODO: use useSWR to get data
  const onSubmit: SubmitHandler<ICreateClientDTO> = (data) => {
      console.log(data)
      toast.success(`Se agrego el nuevo cliente: ${data.name}`);
      setShowModal(false);
    //   TODO: save data
    reset();
  };

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl text-center">Crear nuevo cliente</h2>
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

        <label className="w-full max-w-xs form-control" htmlFor="cc">
          <div className="label">
            <span className="label-text">Cedula </span>
          </div>
          <input
            type="number"
            placeholder="Escribe aquí"
            className={` ${clsx("input input-bordered w-full max-w-xs", errors.cc && "input-error")} `}
            {...register("cc")}
            required
          />
          <div className="label">
            {errors && errors.cc?.message && (
              <span className="label-text-alt text-error">{errors.cc.message as string} </span>
            )}
          </div>
          <span className="sr-only">Campo de cedula de cliente</span>
        </label>

        <label className="w-full max-w-xs form-control" htmlFor="cellphone">
          <div className="label">
            <span className="label-text">Celular</span>
          </div>
          <input
            type="number"
            placeholder="Escribe aquí"
            className={` ${clsx("input input-bordered w-full max-w-xs", errors.cellphone && "input-error")} `}
            {...register("cellphone")}
            required
          />
          <div className="label">
            {errors && errors.cellphone?.message && (
              <span className="label-text-alt text-error">{errors.cellphone.message as string} </span>
            )}
          </div>
          <span className="sr-only">Campo de cédula de cliente</span>
        </label>

        <label className="w-full max-w-xs form-control" htmlFor="address">
          <div className="label">
            <span className="label-text">Dirección</span>
            <span className="badge badge-info">Opcional</span>
          </div>
          <input
            type="text"
            placeholder="Escribe aquí"
            className={` ${clsx("input input-bordered w-full max-w-xs", errors.address && "input-error")} `}
            {...register("address")}
          />
          <div className="label">
            {errors && errors.address?.message && (
              <span className="label-text-alt text-error">{errors.address?.message as string} </span>
            )}
          </div>
          <span className="sr-only">Campo de dirección de cliente</span>
        </label>

        <button type="submit" className="w-full btn btn-primary" disabled={!isDirty || !isValid}>
          Crear Cliente
        </button>
      </form>
    </div>
  );
};
