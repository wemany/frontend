import { useState } from "react";
import { type LucideIcon } from "lucide-react";

export type OperationType = "create" | "update" | "delete" | null;

interface Step {
  id: number;
  text: string;
  icon: LucideIcon;
  duration: number;
}

interface OverlayProps {
  title: string;
  description: string;
  completionTitle: string;
  completionDescription: string;
  errorTitle: string;
  errorDescription: string;
  steps: Step[];
}

interface OperationProps {
  [key: string]: OverlayProps;
}

export const useActionsOverlay = (operationProps: OperationProps) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayError, setOverlayError] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<OperationType>(null);

  const handleComplete = () => {
    setIsOverlayOpen(false);
    setCurrentOperation(null);
    setOverlayError(false);
  };

  const handleError = () => {
    setOverlayError(true);
  };

  const startOverlay = (operation: OperationType) => {
    setCurrentOperation(operation);
    setIsOverlayOpen(true);
    setOverlayError(false);
  };

  const currentProps = currentOperation
    ? operationProps[currentOperation]
    : null;

  return {
    isOverlayOpen,
    overlayError,
    currentProps: currentProps as OverlayProps,
    handleComplete,
    handleError,
    startOverlay,
  };
};
