import { useState } from "react";

export function useDataFiduciary() {
  const [replyOpen, setReplyOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [profileDismissed, setProfileDismissed] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const openReply = (notice) => {
    setSelectedNotice(notice);
    setReplyOpen(true);
  };

  return {
    replyOpen, setReplyOpen,
    selectedNotice,
    replyText, setReplyText,
    profileDismissed, setProfileDismissed,
    toast,
    showToast,
    openReply,
  };
}
