import { useCallback, useState } from "react";

export default function useShowToast(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const showToast = useCallback(() => setIsOpen(true), []);
  const closeToast = useCallback(() => setIsOpen(false), []);

  return {
    isOpen,
    showToast,
    closeToast,
  };
}
