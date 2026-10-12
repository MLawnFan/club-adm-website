import { useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

export default function MemberLoginReturn() {
  const [, navigate] = useLocation();
  const auth = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (!auth.data) return;
    const path = sessionStorage.getItem("adm-onboarding-return");
    if (
      path === "/espace-membre/onboarding/rstart" ||
      path === "/espace-membre/onboarding/starter"
    ) {
      sessionStorage.removeItem("adm-onboarding-return");
      navigate(path);
    }
  }, [auth.data, navigate]);
  return null;
}
