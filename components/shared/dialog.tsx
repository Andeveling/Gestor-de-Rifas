import { XIcon } from "lucide-react";
import React, { forwardRef, MouseEventHandler } from "react";

interface DialogProps {
  title: string;
  message?: string;
  children: React.ReactNode;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export type Ref = HTMLDialogElement;

export default forwardRef(function Dialog(
  { title, children, message, onClose }: DialogProps,
  ref: React.ForwardedRef<Ref>,
) {
  return (
    <dialog ref={ref} className="justify-center modal modal-middle">
      <div className="modal-box w-11/12 min-w-[90vw] max-w-5xl">
        <form method="dialog">
          <button type="button" className="absolute font-bold btn btn-circle btn-outline btn-sm right-2 top-2" onClick={onClose}>
            <XIcon className="w-6 h-6" />
          </button>
        </form>
        <h3 className="text-lg font-bold">{title}</h3>
        {message && <p className="py-4">{message}</p>}
        <div className="">{children}</div>
      </div>
    </dialog>
  );
});
