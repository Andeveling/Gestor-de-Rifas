"use client";
import Modal from "@/components/shared/modal";
import { useState, Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { RafflesFrom } from "./raffles-form";

type RaffleModalProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};
const RaffleModal = ({ showModal, setShowModal }: RaffleModalProps) => {
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <RafflesFrom setShowModal={setShowModal} />
    </Modal>
  );
};

export const useRaffleModal = () => {
  const [showRaffleModal, setShowRaffleModal] = useState(false);
  const RaffleModalCallback = useCallback(() => {
    return <RaffleModal showModal={showRaffleModal} setShowModal={setShowRaffleModal} />;
  }, [showRaffleModal, setShowRaffleModal]);
  return useMemo(
    () => ({ setShowRaffleModal: setShowRaffleModal, RaffleModal: RaffleModalCallback }),
    [setShowRaffleModal, RaffleModalCallback],
  );
};
