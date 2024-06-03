import RaffleSection from "@/components/raffles/raffle-section";
import Loading from "@/components/shared/loading";
import { TicketList } from "@/components/tickets/ticket-list";
import { PlusCircle } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";



export default async function RafflePage({ params }: Readonly<{ params: { raffleId: string } }>) {
  return (
    <section className="flex flex-col w-full gap-2 px-4">
      <Suspense fallback={<Loading />}>
        <RaffleSection raffleId={params.raffleId} />
      </Suspense>
      <div className="flex justify-between w-full">
        <h2 className="my-4 text-xl font-bold">Lista de boletas:</h2>
        <div>
          <Link href={`/raffles/${params.raffleId}/tickets/create`} className="btn btn-primary">
            <PlusCircle className="w-6 h-6 " />
            <span>Nueva Boleta</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <Suspense fallback={<Loading />}>
          <TicketList raffleId={params.raffleId} />
        </Suspense>
      </div>
    </section>
  );
}
