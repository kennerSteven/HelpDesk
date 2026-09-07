import { useState } from "react";

export default function useShowToast(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const showToast = () => setIsOpen(true);
  const closeToast = () => setIsOpen(false);

  return {
    isOpen,
    showToast,
    closeToast,
  };
}
