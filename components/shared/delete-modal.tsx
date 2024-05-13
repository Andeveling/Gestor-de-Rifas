"use client";
import Modal from "@/components/shared/modal";
import { useState, Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { DeleteForm } from "./delete-form";
const DeleteModal = ({
  id,
  showModal,
  setShowModal,
}: {
  id: string;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <DeleteForm id={id} setShowModal={setShowModal} />
    </Modal>
  );
};

export const useDeleteModal = ({id}: {id: string}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const DeleteModalCallback = useCallback(() => {
    return <DeleteModal id={id} showModal={showDeleteModal} setShowModal={setShowDeleteModal} />;
  }, [showDeleteModal, setShowDeleteModal, id]);
  return useMemo(
    () => ({ setShowDeleteModal: setShowDeleteModal, DeleteModal: DeleteModalCallback }),
    [setShowDeleteModal, DeleteModalCallback],
  );
};
