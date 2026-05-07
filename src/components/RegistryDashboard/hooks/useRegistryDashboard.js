import { useState } from "react";

export function useRegistryDashboard() {
  const [activeTab, setActiveTab] = useState("calendar");
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [selectedHearing, setSelectedHearing] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [copied, setCopied] = useState(null);
  const [calendarYear, setCalendarYear] = useState(2026);
  const [calendarMonth, setCalendarMonth] = useState(4); // 0-indexed: 4 = May

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const copyVcLink = (link, key) => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
    showToast("Bharat VC link copied to clipboard");
  };

  return {
    activeTab, setActiveTab,
    scheduleOpen, setScheduleOpen,
    selectedHearing, setSelectedHearing,
    drawerOpen, setDrawerOpen,
    toast, copied,
    showToast, copyVcLink,
    calendarYear, setCalendarYear,
    calendarMonth, setCalendarMonth,
  };
}
