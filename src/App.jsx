import PharmacyList from "./components/PharmacyList";

export default function App() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
        Pharmacy Directory
      </h1>

      <PharmacyList />
    </main>
  );
}
