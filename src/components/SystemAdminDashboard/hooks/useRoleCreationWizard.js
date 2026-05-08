import { useState } from "react";

export function useRoleCreationWizard() {
  const [roleName, setRoleName]       = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor]             = useState("blue");

  const isValid = roleName.trim().length > 0;

  const reset = () => {
    setRoleName("");
    setDescription("");
    setColor("blue");
  };

  const getValues = () => ({ roleName: roleName.trim(), description, color });

  return {
    roleName, setRoleName,
    description, setDescription,
    color, setColor,
    isValid, reset, getValues,
  };
}
