"use client";
import { useDialog } from "@/lib/hooks/use-dialog";
import { Edit, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import Dialog from "../shared/dialog";
import Ellipsis from "../shared/icons/ellipsis";
import { DeleteConfirm } from "./delete-raffe";
import Link from "next/link";

export default function DropdownCardRaffle() {
  const { dialogRef, onOpen, onClose } = useDialog();
  const {id} = useParams();

  return (
    <details className="dropdown">
      <summary className="m-1 btn btn-sm">
        <Ellipsis className="w-6 h-6" />
        <span className="sr-only">menu</span>
      </summary>
      <ul className="menu dropdown-content left-2 z-[1] w-36 gap-2 rounded-box bg-base-100 p-2 shadow">
        <Link href={`/raffles/${id}/edit`} className="btn btn-primary btn-sm">
          <Edit className="w-4 h-4" /> Editar
        </Link>
        <li className="flex">
          <button type="button" className="btn btn-error btn-sm" onClick={onOpen}>
            <Trash className="w-4 h-4" /> Eliminar
          </button>
          <Dialog ref={dialogRef} title="Eliminar" message="¿Estas seguro de eliminar este elemento?" onClose={onClose}>
            <DeleteConfirm raffleId={id as string} />
          </Dialog>
        </li>
        
      </ul>
    </details>
  );
}
