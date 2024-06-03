import { fetchRafflesWithOutTickets } from "@/actions/raffle.actions";
import { RaffleCard } from "./raffle-card";

export default async function RaffleList() {
  const { raffles, totalRaffles } = await fetchRafflesWithOutTickets();
 
  return (
    <>
      <h2 className="flex justify-between pb-2 text-2xl font-bold">
        <span>Lista de rifas</span>
        <span>Total {totalRaffles}</span>
      </h2>
      <div className="flex flex-col gap-2">
        {raffles.length > 0 ? (
          raffles.map((raffle) => (
            <RaffleCard
              key={raffle.id}
              id={raffle.id}
              title={raffle.name}
              playDate={raffle.playDate}
              priceForTicket={raffle.priceForTicket}
            />
          ))
        ) : (
          <p>No hay rifas registradas</p>
        )}
      </div>
    </>
  );
};


