import RaffleList from "@/components/raffles/raffle-list";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function RafflesPage() {
  return (
    <section className="flex flex-col w-full gap-2 px-4">
      <div className="justify-between navbar bg-base-100">
        <div className="flex flex-col justify-start text-left">
          <div>
            <h1 className="text-2xl font-bold ">Rifas</h1>
          </div>
        </div>
        <div className="navbar-end">
          <Link href="/raffles/create" className="btn btn-primary">
            <PlusCircle className="w-6 h-6 " />
            <span>Nueva Rifa</span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <Suspense fallback={<span className="loading loading-bars loading-lg"></span>}>
          <RaffleList />
        </Suspense>
      </div>
    </section>
  );
}
