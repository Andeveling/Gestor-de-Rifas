import { currencyFormat } from "@/lib/utils";
import Link from "next/link";

export const RaffleCard = ({
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
    <div className="card glass p-0">
      <div className="card-body">
        <h2 className="card-title text-4xl">{title}</h2>
        <p className="text-lg">Juega el dia: {date}</p>
        <p className="text-3xl font-bold">{price}</p>
        <div className="card-actions justify-end">
          <Link href={`/raffles/${id}`} className="link link-primary text-lg">
            Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};
