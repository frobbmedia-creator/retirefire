"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent, type AnalyticsProps } from "@/lib/analytics";

type Props = ComponentProps<typeof Link> & {
  eventName: string;
  eventProps?: AnalyticsProps;
};

export function TrackedLink({
  eventName,
  eventProps,
  onClick,
  ...props
}: Props) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventProps);
        onClick?.(event);
      }}
    />
  );
}
