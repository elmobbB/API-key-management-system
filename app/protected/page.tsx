import ProtectedPageClient from "./ProtectedPageClient";
import { Suspense } from "react";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default function Page({ searchParams }: { searchParams?: any }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProtectedPageClient
        apiKey={
          typeof searchParams?.apiKey === "string"
            ? searchParams.apiKey
            : undefined
        }
      />
    </Suspense>
  );
}
