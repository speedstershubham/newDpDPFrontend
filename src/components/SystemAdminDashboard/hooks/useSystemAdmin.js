import { useState } from "react";

export function useSystemAdmin() {
  const [activeTab, setActiveTab] = useState("users");
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return {
    activeTab, setActiveTab,
    addUserOpen, setAddUserOpen,
    toast,
    showToast,
  };
}
