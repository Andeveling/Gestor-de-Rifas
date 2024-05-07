"use client";
import { RaffleList } from '@/components/raffles/raffle-list';
import { useRaffleModal } from '@/components/raffles/raffles-modal';
import { ModalButton } from '@/components/shared/modal-button';
import { fetcher } from '@/lib/fetcher';
import { TRaffle } from '@/types/raffles.types';
import { PlusCircle } from 'lucide-react';
import useSWR from 'swr';

type TRaffleData = {
  raffles: TRaffle[];
  totalRaffles: number;
}

export default function RafflesPage() {
  const { data, error, isLoading } = useSWR<TRaffleData>("/api/raffles", fetcher);
  const { RaffleModal, setShowRaffleModal } = useRaffleModal();
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <section className="flex flex-col w-full gap-2 px-4">
      <RaffleModal />
      <div className="justify-between navbar bg-base-100">
        <div className="flex flex-col justify-start text-left">
          <div>
            <h1 className="text-2xl font-bold ">Rifas</h1>
          </div>
        </div>
        <div className="navbar-end">
          <ModalButton text='Nueva Rifa' setShowModal={setShowRaffleModal} />
        </div>
      </div>

      {/* <Search placeholder="Buscar rifa" /> */}
      <div className="flex flex-col w-full">
        <RaffleList raffles={data?.raffles as TRaffle[]} totalRaffles={data?.totalRaffles as number} />
      </div>

     
    </section>
  );
}

