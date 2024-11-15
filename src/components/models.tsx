"use client";

import { SubscriptionModel } from "@/features/subscriptions/components/subscription-model";
import { useState, useEffect } from "react";

export const Models = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SubscriptionModel />
    </>
  )
};