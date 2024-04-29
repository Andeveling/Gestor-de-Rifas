"use client";
import { ClientCard } from "@/components/clients/client-card";
import { useClientModal } from "@/components/clients/clients-modal";
import { PlusCircle } from "lucide-react";
export default function Home() {
  const { ClientsModal, setShowClientsModal } = useClientModal();

  return (
    <>
      <ClientsModal />
      <div className="navbar bg-base-100">
        <div className="flex flex-col justify-start text-left navbar-start">
          <div>
            <h1 className="text-2xl font-bold ">Clientes</h1>
            <p>Clientes totales: 5</p>
          </div>
        </div>
        <div className="navbar-end">
          <button onClick={() => setShowClientsModal(true)} type="button" className="btn btn-primary text-base-content">
            <PlusCircle className="w-6 h-6 " />
            <span className="">Nuevo Cliente</span>
          </button>
        </div>
      </div>

      <label className="z-10 flex items-center max-w-sm gap-2 my-2 input input-bordered">
        <input type="text" className="grow" placeholder="Buscar cliente" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <div className="flex flex-col items-center w-full">
        <h2 className="pb-2 text-2xl font-bold text-center">Lista de clientes:</h2>
       <ClientCard client={{ name: "Juan Perez", cellphone: "1234567890"}} />
      </div>
    </>
  );
}
