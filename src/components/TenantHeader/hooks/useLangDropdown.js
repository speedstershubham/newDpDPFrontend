import { useState } from "react";
import { useTenant } from "../../../App";

export function useLangDropdown() {
  const tenant = useTenant();
  const [langOpen, setLangOpen] = useState(false);

  const selectLanguage = (code) => {
    tenant.setLanguage(code);
    setLangOpen(false);
  };

  return { tenant, langOpen, setLangOpen, selectLanguage };
}
