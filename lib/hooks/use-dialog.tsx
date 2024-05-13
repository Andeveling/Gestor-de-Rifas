"use client"
import { useRef } from "react";
export const useDialog = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const onOpen = () => dialogRef.current?.showModal();
    const onClose = () => dialogRef.current?.close();
    return {
      dialogRef,
      onOpen,
      onClose,
    };
}