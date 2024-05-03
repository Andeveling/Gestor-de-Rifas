import { fetcher } from "@/lib/fetcher";
import { TClient } from "@/types/client.types";
import React from "react";
import useSWR from "swr";
import { ClientCard } from "./client-card";

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
