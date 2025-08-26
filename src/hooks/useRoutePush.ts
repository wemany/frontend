"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useRoutePush = () => {
  const router = useRouter();

  const pushToRoute = useCallback(
    (path: string) => {
      if (path) {
        router.push(path);
      }
    },
    [router]
  );

  return { pushToRoute };
};
