
import { deleteRaffle } from "@/actions/raffle.actions";
import React from "react";


export const DeleteForm = ({id,setShowModal}: {id: string,setShowModal: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <form action={deleteRaffle} className="w-full text-center card">
      <input type="hidden" name="id" value={id} />
      <div className="items-center text-center card-body">
        <h2 className="text-3xl card-title">Eliminar</h2>
        <p className="text-lg">¿Estas seguro de eliminar este elemento?</p>
        <div className="justify-between w-full card-actions">
          <button type="submit" className="btn btn-error">
            Borrar
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
