"use client";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true); // รอให้ window.localStorage ใช้ได้ก่อน
  }, []);

  if (!isReady) return null; // ป้องกัน hydration mismatch

  return <Provider store={store}>{children}</Provider>;
}
