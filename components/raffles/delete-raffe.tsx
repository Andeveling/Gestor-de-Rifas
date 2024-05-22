"use client";
import { deleteRaffle } from "@/actions/raffle.actions";
import { SubmitButton } from "../shared/submit";
import { toast } from "sonner";

export function DeleteConfirm({ raffleId }: { raffleId: string }) {
  return (
    <form
      action={(formData: FormData) => {
        deleteRaffle(formData)
          .then(() => {
            toast.success("Rifa borrada");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }}
      className="z-10 justify-end inline-block w-full"
    >
      <input type="hidden" name="id" value={raffleId} />
      <div className="flex justify-end w-full">
        <SubmitButton>Borrar</SubmitButton>
      </div>
    </form>
  );
}
