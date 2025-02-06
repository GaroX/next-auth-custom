"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const logout = () => {
    document.cookie =
      "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/login");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Dashboard</h1>
      <button className="button is-danger mt-4" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
}
