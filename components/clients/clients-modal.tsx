"use client";
import Modal from "@/components/shared/modal";
import { useState, Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { ClientsFrom } from "./clients-form";
const ClientsModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
    return <Modal showModal={showModal} setShowModal={setShowModal} >
      <ClientsFrom setShowModal={setShowModal}/>
  </Modal>
};

export const useClientModal = () => {
  const [showClientsModal, setShowClientsModal] = useState(false);
  const ClientsModalCallback = useCallback(() => {
    return (
      <ClientsModal
        showModal={showClientsModal}
        setShowModal={setShowClientsModal}
      />
    );
  }, [showClientsModal, setShowClientsModal]);
  return useMemo(
    () => ({ setShowClientsModal, ClientsModal: ClientsModalCallback }),
    [setShowClientsModal, ClientsModalCallback],
  );
}