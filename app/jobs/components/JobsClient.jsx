"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function JobToastClient() {
  const params = useSearchParams();

  useEffect(() => {
    if (params.get("notice") === "login-required") {
      toast.error("Login to view Jobs");
    }
  }, [params]);

  return null;
}
