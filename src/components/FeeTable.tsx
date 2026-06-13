export type FeeRow = {
  category: string;
  type: string;
  amount: string;
  frequency: string;
  remarks?: string;
};

type Props = {
  title: string;
  rows: FeeRow[];
};

export default function FeeTable({ title, rows }: Props) {
  // group by category for visual hierarchy
  const grouped = rows.reduce<Record<string, FeeRow[]>>((acc, r) => {
    (acc[r.category] = acc[r.category] || []).push(r);
    return acc;
  }, {});

  return (
    <div className="border border-[var(--brand-rule)] rounded-md overflow-hidden">
      <div className="bg-[var(--brand-primary)] text-white px-4 py-3 font-bold">{title}</div>
      <div className="sm:hidden px-4 py-1.5 text-[11px] text-slate-500 bg-slate-50 border-b border-[var(--brand-rule)]">
        Swipe the table sideways to see all columns →
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-2 font-semibold text-slate-700">Category</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Fee Type</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Amount (SGD)</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Frequency</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(grouped).map(([cat, rs]) =>
              rs.map((r, i) => (
                <tr key={cat + i} className="border-t border-[var(--brand-rule)]">
                  <td className="px-4 py-3 text-slate-700 align-top">{i === 0 ? cat : ""}</td>
                  <td className="px-4 py-3 text-slate-700 align-top">{r.type}</td>
                  <td className="px-4 py-3 text-slate-700 align-top">{r.amount}</td>
                  <td className="px-4 py-3 text-slate-700 align-top">{r.frequency}</td>
                  <td className="px-4 py-3 text-slate-600 align-top text-xs">{r.remarks ?? "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
