import { fetchRaffleById } from "@/actions/raffle.actions";
import { currencyFormat } from "@/lib/utils";
import clsx from "clsx";
import { DeleteConfirm } from "./delete-raffe";
import DropdownCardRaffle from "./dropdown-card-raffle";

export default async function RaffleSection({raffleId}: {raffleId: string}) {
  const raffle = await fetchRaffleById(raffleId);

  return raffle ? (
    <>
      <div className="relative card glass">
        <div>
          <DropdownCardRaffle />
          <span
            className={`badge absolute right-2 top-2 ${clsx({
              "badge-success": raffle?.isActive,
              "badge-error": !raffle?.isActive,
            })}`}
          >
            {raffle?.isActive ? "Activa" : "Inactiva"}
          </span>
        </div>

        <div className="pt-0 mt-0 card-body">
          <div className="flex justify-between w-full gap-10">
            <h2 className="text-4xl card-title">{raffle?.name}</h2>
            <p className="text-4xl font-bold text-right">{currencyFormat(raffle?.priceForTicket ?? 0)}</p>
          </div>
          <p className="w-full text-lg text-right">{raffle?.playDate.toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex justify-between w-full">
        <h2 className="my-4 text-xl font-bold">Lista de boletas:</h2>
      </div>
    </>
  ) : null;
}
