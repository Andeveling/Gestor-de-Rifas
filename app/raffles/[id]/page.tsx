import RaffleSection from "@/components/raffles/raffle-section";
import Loading from "@/components/shared/loading";
import { TicketList } from "@/components/tickets/ticket-list";
import { Suspense } from "react";

export default async function RafflePage({ params }: Readonly<{ params: { id: string } }>) {
  return (
    <section className="flex flex-col w-full gap-2 px-4">
      <Suspense fallback={<Loading />}>
        <RaffleSection raffleId={params.id} />
      </Suspense>

      <div className="flex flex-col w-full">
        <Suspense fallback={<Loading />}>
          <TicketList raffleId={params.id} />
        </Suspense>
      </div>
    </section>
  );
}
