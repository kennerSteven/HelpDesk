import { useState } from "react";
import type React from "react";

export interface StepItem {
  name: string;
  description?: string;
  status: string;
}

interface UseHandleTaskStepProps {
  initialSteps?: StepItem[];
  onChange?: (steps: StepItem[]) => void;
}

export default function useHandleTaskStep({
  initialSteps,
  onChange,
}: UseHandleTaskStepProps = {}) {
  const [steps, setSteps] = useState<StepItem[]>(() => initialSteps || []);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddStep = () => {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName && !trimmedDescription) return;

    const newStep: StepItem = {
      name: trimmedName || trimmedDescription,
      description:
        trimmedName && trimmedDescription ? trimmedDescription : undefined,
      status: "PENDING",
    };

    const updatedSteps = [...steps, newStep];
    setSteps(updatedSteps);
    onChange?.(updatedSteps);

    setName("");
    setDescription("");
  };

  const handleRemoveStep = (indexToRemove: number) => {
    const updatedSteps = steps.filter((_, idx) => idx !== indexToRemove);
    setSteps(updatedSteps);
    onChange?.(updatedSteps);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddStep();
    }
  };

  return {
    steps,
    name,
    setName,
    description,
    setDescription,
    handleAddStep,
    handleRemoveStep,
    handleKeyDown,
  };
}
