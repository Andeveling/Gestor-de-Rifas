"use client";
import Modal from "@/components/shared/modal";
import { useState, Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { TicketFrom } from "./ticket-form";

type TicketsModalProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};
const TicketsModal = ({ showModal, setShowModal }: TicketsModalProps) => {
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <TicketFrom setShowModal={setShowModal} />
    </Modal>
  );
};

export const useTicketModal = () => {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const TicketModalCallback = useCallback(() => {
    return <TicketsModal showModal={showTicketModal} setShowModal={setShowTicketModal} />;
  }, [showTicketModal, setShowTicketModal]);
  return useMemo(
    () => ({ setShowTicketModal: setShowTicketModal, TicketModal: TicketModalCallback }),
    [setShowTicketModal, TicketModalCallback],
  );
};
