"use client";
import Popover from "@/components/shared/popover";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";

export default function ClientPage({ params }: { params: { id: string } }) {

    return (
      <section className="w-full px-4">
        <h1 className="mb-4 text-xl font-bold">Información del cliente</h1>
        <div className="container flex flex-col items-center p-4 border card glass">
          <div className="avatar placeholder">
            <div className="w-24 rounded-full">
              <span className="text-3xl">D</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold">Andres Parra</h2>
          <p>CC: 123456789</p>
          <p>Cel:123456789</p>

          <div className="flex gap-2 p-2 w-fit">
            <button type="button" className="btn btn-primary">
              <Edit className="w-4 h-4" />
              <span className="sr-only ">Editar</span>
            </button>
            <button type="button" className="btn btn-error">
              <Trash className="w-4 h-4" />
              <span className="sr-only">Eliminar</span>
            </button>
          </div>
        </div>

        <h2 className="my-4 text-xl font-bold">Lista de boletas:</h2>
      </section>
    );
}