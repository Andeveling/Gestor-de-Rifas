"use client";
import { ClientList } from "@/components/clients/client-list";
import { useClientModal } from "@/components/clients/clients-modal";
import { Pagination } from "@/components/shared/pagination";
import { Search } from "@/components/shared/search";
import { fetcher } from "@/lib/fetcher";
import { TClient } from "@/types/client.types";
import { PlusCircle } from "lucide-react";
import useSWR from "swr";

type TClientData = {
  clients: TClient[];
  totalClients: number;
  totalPages: number;
};

export default function ClientsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1;
  const query = searchParams?.query ? searchParams.query : "";
  const { ClientsModal, setShowClientsModal } = useClientModal();
    const { data, error, isLoading } = useSWR<TClientData>(`/api/clients?page=${currentPage}&query=${query}`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <section className="flex flex-col w-full gap-2 px-4">
      <ClientsModal />
      <div className="justify-between navbar bg-base-100">
        <div className="flex flex-col justify-start text-left">
          <div>
            <h1 className="text-2xl font-bold ">Clientes</h1>
          
          </div>
        </div>
        <div className="navbar-end">
          <button onClick={() => setShowClientsModal(true)} type="button" className="btn btn-primary text-base-content">
            <PlusCircle className="w-6 h-6 " />
            <span className="">Nuevo Cliente</span>
          </button>
        </div>
      </div>

      {/* <Search placeholder="Buscar cliente" /> */}
      <div className="flex flex-col w-full">
        
        <ClientList clients={data?.clients as TClient[]} totalClients={data?.totalClients as number}  />
      </div>

      {data?.totalPages && <Pagination totalPages={data?.totalPages as number} />}
    </section>
  );
}
