import { useEffect, useState } from "react";
import pharmacyData from "../data/pharmacies.json";

export default function PharmacyList() {
  const [pharmacies, setPharmacies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [onlyActive, setOnlyActive] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    // Simulate network latency so the loading UI can be reviewed with local data.
    const timeoutId = setTimeout(() => {
      setPharmacies(pharmacyData);
      setIsLoading(false);
    }, 1000);

    // Cancel pending work on unmount and during Strict Mode's effect cleanup.
    return () => clearTimeout(timeoutId);
  }, []);

  // Derive normalization from the latest input once per render to keep matching consistent.
  const normalizedQuery = query.trim().toLowerCase();
  // Defer useMemo because this small dataset makes recalculation trivial and keeps the code simple.
  const visiblePharmacies = pharmacies
    .filter((pharmacy) =>
      pharmacy.name.toLowerCase().includes(normalizedQuery) ||
      pharmacy.city.toLowerCase().includes(normalizedQuery)
    )
    .filter((pharmacy) => !onlyActive || pharmacy.status === "active")
    .sort((a, b) => {
      // Use locale-aware ordering that treats case and accent variations as equivalent.
      const comparison = a.name.localeCompare(b.name, "en", {
        sensitivity: "base",
      });
      return sortDirection === "asc" ? comparison : -comparison;
    });

  if (isLoading) {
    return (
      <p
        role="status"
        className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600"
      >
        Loading...
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label
              htmlFor="pharmacy-search"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Search by name or city
            </label>
            <input
              id="pharmacy-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Enter a pharmacy name or city"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            />
          </div>
          <button
            type="button"
            onClick={() =>
              setSortDirection((direction) => (direction === "asc" ? "desc" : "asc"))
            }
            aria-label={`Sort by name. Current order ${sortDirection === "asc" ? "A to Z" : "Z to A"}. Switch to ${sortDirection === "asc" ? "Z to A" : "A to Z"}.`}
            className="shrink-0 rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            Sort by Name {sortDirection === "asc" ? "A→Z" : "Z→A"}
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={onlyActive}
              onChange={(event) => setOnlyActive(event.target.checked)}
              className="h-4 w-4 shrink-0 accent-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            />
            Show only active pharmacies
          </label>

          {(query.length > 0 || onlyActive) && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setOnlyActive(false);
              }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <p role="status" className="text-sm text-slate-600">
        Showing {visiblePharmacies.length} of {pharmacyData.length} pharmacies
      </p>

      <div
        role="region"
        aria-label="Pharmacy directory"
        tabIndex={0}
        className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">
            Pharmacies with their city, phone number, and status
          </caption>

          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
                Name
              </th>
              <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
                City
              </th>
              <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
                Phone
              </th>
              <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {visiblePharmacies.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-600">
                  <p role="status">No pharmacies found</p>
                </td>
              </tr>
            )}
            {visiblePharmacies.map((pharmacy) => (
              <tr key={pharmacy.id} className="hover:bg-slate-50">
                <th
                  scope="row"
                  className="px-4 py-4 font-medium text-slate-900 sm:px-6"
                >
                  {pharmacy.name}
                </th>
                <td className="px-4 py-4 text-slate-600 sm:px-6">
                  {pharmacy.city}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-slate-600 sm:px-6">
                  {pharmacy.phone}
                </td>
                <td className="px-4 py-4 sm:px-6">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      pharmacy.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {pharmacy.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
