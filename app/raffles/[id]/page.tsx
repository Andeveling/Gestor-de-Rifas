"use client";
import Ellipsis from "@/components/shared/icons/ellipsis";
import { ModalButton } from "@/components/shared/modal-button";
import { useTicketModal } from "@/components/tickets/tickets-modal";
import { currencyFormat, fetcher } from "@/lib/utils";
import { TRaffle } from "@/types/raffles.types";
import { Edit, Trash } from "lucide-react";
import useSWR from "swr";


type RaffleData = {
  raffle: TRaffle;
};

export default function RafflePage({ params }: { params: { id: string } }) {
    const { data, error, isLoading } = useSWR<RaffleData>(`/api/raffles/${params.id}`, fetcher);
    const { TicketModal, setShowTicketModal } = useTicketModal();
  
  console.log(data)
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;
  if (data) {
    const date = new Date(data.raffle.playDate).toLocaleDateString("es-ES");
      const price = currencyFormat(data.raffle.priceForTicket);
      
    return (
      <section className="w-full px-4">
        <TicketModal />
        <div className="relative card glass">
          <details className="dropdown">
            <summary className="m-1 btn btn-sm">
              <Ellipsis className="w-6 h-6" />
              <span className="sr-only">menu</span>
            </summary>
            <ul className="menu dropdown-content left-2 z-[1] w-36 gap-2 rounded-box bg-base-100 p-2 shadow">
              <li className="flex">
                <button type="button" className="btn btn-primary btn-sm">
                  <Edit className="w-4 h-4" /> Editar
                </button>
              </li>
              <li>
                <button type="button" className="btn btn-error btn-sm">
                  <Trash className="w-4 h-4" /> Eliminar
                </button>
              </li>
            </ul>
          </details>
          <div className="card-body">
            <div className="flex justify-between w-full gap-10">
              <h2 className="text-4xl card-title">{data.raffle.name}</h2>
              <p className="text-4xl font-bold text-right">{price}</p>
            </div>
            <p className="w-full text-lg text-right">{date}</p>
          </div>
        </div>

        <div className="flex justify-between w-full">
          <h2 className="my-4 text-xl font-bold">Lista de boletas:</h2>
          <ModalButton text='Nueva Boleta' setShowModal={setShowTicketModal}  />
        </div>
      </section>
    );
  }
}

