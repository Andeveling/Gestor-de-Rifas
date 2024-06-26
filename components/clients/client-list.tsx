import { TClient } from "@/types/client.types";
import React from "react";
import { Phone, User, ChevronRight, Copy } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

type Props = {
  clients: TClient[];
  totalClients: number;
};



export const ClientList = ({clients, totalClients}: Props) => {

  return (
    <>
      <h2 className="flex justify-between pb-2 text-2xl font-bold">
              <span>Lista de clientes</span>
              <span>Total {totalClients}</span>
      </h2>
      <div className="flex flex-col gap-2">
        {clients.length > 0 ? (
         clients.map((client: TClient) => <ClientCard key={client.id} client={client} />)
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
    </>
  );
};



 const ClientCard = ({ client }: { client: Pick<TClient, "id" | "name" | "cellphone"> }) => {
  const { id, name, cellphone } = client;
  const copyToClipboard = () => {
    toast.success("Celular copiado al portapapeles");
    navigator.clipboard.writeText(cellphone);
  };
  return (
    <div className="shadow-xl card glass h-fit bg-base-100">
      <div className="flex flex-row items-center gap-4 p-2">
        <div>
          <h2 className="text-lg card-title">
            <User className="w-4 h-4" /> {name}
          </h2>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" /> <p>{cellphone}</p>
            <Copy className="w-4 h-4 cursor-pointer" onClick={copyToClipboard}></Copy>
          </div>
        </div>
        <Link href={`/clients/${id}`} className="absolute btn btn-circle btn-outline btn-primary btn-sm right-2 top-4">
          <ChevronRight className="w-6 h-6" />
          <span className="sr-only">Ir al cliente</span>
        </Link>
      </div>
    </div>
  );
};