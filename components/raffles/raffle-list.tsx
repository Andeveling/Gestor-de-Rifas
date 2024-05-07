import { currencyFormat } from "@/lib/utils";
import { TRaffle } from "@/types/raffles.types";
import Link from "next/link";

type Props = {
  raffles: TRaffle[];
  totalRaffles: number;
};

export const RaffleList = ({ raffles, totalRaffles }: Props) => {
  return (
    <>
      <h2 className="flex justify-between pb-2 text-2xl font-bold">
        <span>Lista de rifas</span>
        <span>Total {totalRaffles}</span>
      </h2>
      <div className="flex flex-col gap-2">
        {raffles.length > 0 ? (
          raffles.map((raffle: TRaffle) => <RaffleCard key={raffle.id} raffle={raffle} />)
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
    </>
  );
};

const RaffleCard = ({ raffle }: { raffle: TRaffle }) => {
  const { name, playDate, priceForTicket } = raffle;
  const date = new Date(playDate).toLocaleDateString();
  const price = currencyFormat(priceForTicket);

  return (
    <div className="p-0 card glass">
      <div className="card-body">
        <h2 className="text-4xl card-title">{name}</h2>
        <p className="text-lg">Juega el dia: {date}</p>
        <p className="text-3xl font-bold">{price}</p>
        <div className="justify-end card-actions">
          <Link href={`/raffles/${raffle.id}`} className="text-lg link link-primary">
            Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};
