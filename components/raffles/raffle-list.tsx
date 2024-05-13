import { fetchRafflesWithOutTickets } from "@/actions/raffle.actions";

const RaffleList = async () => {
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


import { currencyFormat } from "@/lib/utils";
import Link from "next/link";

const RaffleCard = ({
  id,
  title,
  playDate,
  priceForTicket,
}: {
  id: string;
  title: string;
  playDate: Date;
  priceForTicket: number;
}) => {
  const date = new Date(playDate).toLocaleDateString();
  const price = currencyFormat(priceForTicket);

  return (
    <div className="p-0 card glass">
      <div className="card-body">
        <h2 className="text-4xl card-title">{title}</h2>
        <p className="text-lg">Juega el dia: {date}</p>
        <p className="text-3xl font-bold">{price}</p>
        <div className="justify-end card-actions">
          <Link href={`/raffles/${id}`} className="text-lg link link-primary">
            Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RaffleList;
