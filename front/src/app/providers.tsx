'use client'
import { UIProvider } from "@/context";
import { getUser } from "@/helper";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();
  useEffect(() => {
    const user = getUser();
    if (user) {
      router.push("/dashboard");
      return;
    }
    router.replace("/signin");
  }, [router]);
  return (
    <UIProvider>
      {children}
    </UIProvider>
  );
}
