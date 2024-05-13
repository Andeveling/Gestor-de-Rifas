"use client";
import Modal from "@/components/shared/modal";
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";
import { RafflesEditFrom } from "./raffle-edit-form";
import { TRaffle } from "@/types/raffles.types";

type RaffleEditModalProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};
const RaffleEditModal = ({ showModal, setShowModal }: RaffleEditModalProps) => {
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <RafflesEditFrom setShowModal={setShowModal} />
    </Modal>
  );
};

export const useRaffleEditModal = () => {
  const [showRaffleEditModal, setShowRaffleEditModal] = useState(false);
  const RaffleEditModalCallback = useCallback(() => {
    return <RaffleEditModal showModal={showRaffleEditModal} setShowModal={setShowRaffleEditModal} />;
  }, [showRaffleEditModal, setShowRaffleEditModal]);
  return useMemo(
    () => ({ setShowRaffleEditModal: setShowRaffleEditModal, RaffleEditModal: RaffleEditModalCallback }),
    [setShowRaffleEditModal, RaffleEditModalCallback],
  );
};
