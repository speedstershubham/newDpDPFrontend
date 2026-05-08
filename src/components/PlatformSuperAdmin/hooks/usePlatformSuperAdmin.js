import { useState } from "react";

export function usePlatformSuperAdmin() {
  const [provisionOpen, setProvisionOpen] = useState(false);
  const [provisionStep, setProvisionStep] = useState(1);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const openProvision = () => { setProvisionStep(1); setProvisionOpen(true); };
  const closeProvision = () => { setProvisionOpen(false); setProvisionStep(1); };

  return {
    provisionOpen,
    provisionStep, setProvisionStep,
    openProvision, closeProvision,
    toast,
    showToast,
  };
}
