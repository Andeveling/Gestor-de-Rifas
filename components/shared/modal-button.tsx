import { PlusCircle } from "lucide-react";

export const ModalButton = ({
    text,
  setShowModal,
}: {
  text: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
      <PlusCircle className="w-6 h-6 " />
      <span className="">{text}</span>
    </button>
  );
};
