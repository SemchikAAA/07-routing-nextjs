"use client";

import React, { useEffect } from "react";
// import NoteForm from "../NoteForm/NoteForm";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";
// import { useRouter } from "next/navigation";

interface NoteModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: NoteModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        {children}
        {/* <div className={css.modal}>{<NoteForm onClose={onClose} />}</div> */}
      </div>
    </div>,
    document.body
  );
}
