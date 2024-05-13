"use client";
import { deleteRaffle } from "@/actions/raffle.actions";
import { useFormStatus } from "react-dom";

export function DeleteConfirm({ raffleId }: { raffleId: string }) {
  return (
    <form action={deleteRaffle} className="z-10 justify-end inline-block w-full">
      <input type="hidden" name="id" value={raffleId} />
      <SubmitButton />
    </form>
  );
}



const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      aria-disabled={pending}
      disabled={pending}
    >
      Borrar
    </button>
  );
}