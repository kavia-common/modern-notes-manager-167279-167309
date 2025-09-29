import React from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center p-6">
      <section className="container-card max-w-lg w-full p-8 text-center">
        <div className="mx-auto mb-4 h-14 w-14 rounded-xl bg-blue-100 ring-4 ring-blue-50" />
        <h1 className="text-xl font-semibold text-gray-800">404 – Page Not Found</h1>
        <p className="mt-2 text-sm text-gray-500">
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <Link href="/" className="inline-block mt-6">
          <Button variant="secondary">Go back home</Button>
        </Link>
      </section>
    </main>
  );
}
