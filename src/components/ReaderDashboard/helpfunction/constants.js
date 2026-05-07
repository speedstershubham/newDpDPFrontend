export const ORDERS = [
  {
    grn: "GRN/2026/DPB/001098",
    subject: "Right to erasure",
    respondent: "CloudStore Services",
    date: "2026-04-30",
    decision: "In favour of Complainant",
    fine: "₹5,00,000",
  },
  {
    grn: "GRN/2026/DPB/001034",
    subject: "Data breach",
    respondent: "NetSecure Ltd",
    date: "2026-04-28",
    decision: "Case Dismissed",
    fine: "—",
  },
];

export function filterOrders(orders, search) {
  const q = search.toLowerCase();
  return orders.filter(
    (o) =>
      o.grn.toLowerCase().includes(q) ||
      o.subject.toLowerCase().includes(q) ||
      o.respondent.toLowerCase().includes(q),
  );
}
