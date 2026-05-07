import { useState } from "react";

export function usePlatformSuperAdmin() {
  const [activeTab, setActiveTab] = useState("tenants");
  const [addTenantOpen, setAddTenantOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return {
    activeTab, setActiveTab,
    addTenantOpen, setAddTenantOpen,
    toast,
    showToast,
  };
}
