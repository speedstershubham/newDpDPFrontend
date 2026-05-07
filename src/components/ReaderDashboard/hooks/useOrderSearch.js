import { useState } from "react";
import { ORDERS, filterOrders } from "../helpfunction/constants";

export function useOrderSearch() {
  const [search, setSearch] = useState("");
  const filtered = filterOrders(ORDERS, search);
  return { search, setSearch, filtered };
}
