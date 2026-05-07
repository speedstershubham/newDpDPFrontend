import { useState } from "react";

export function useDataFiduciary() {
  const [activeTab, setActiveTab] = useState("overview");
  const [responseOpen, setResponseOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return {
    activeTab, setActiveTab,
    responseOpen, setResponseOpen,
    selectedComplaint, setSelectedComplaint,
    toast,
    showToast,
  };
}
