"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

type Props = {
  reference?: string;
  source?: string;
};

export default function ThankYouTracking({ reference, source }: Props) {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "generate_lead",
      form_source: source || "submission",
      inquiry_reference: reference,
    });
  }, [reference, source]);

  return null;
}
