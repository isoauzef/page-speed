"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ComponentProps } from "react";

const COUPON_CODE = "SAVE20";

type CouponLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

const isExternalLink = (href: string): boolean => /^(?:[a-z]+:)?\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");

const appendCoupon = (href: string, coupon: string | null, fallbackPath: string): string => {
  if (!coupon || isExternalLink(href)) {
    return href;
  }

  const [base, hash] = href.split("#");
  const [pathPart, queryPart] = base.split("?");
  const path = pathPart ?? "";
  const params = new URLSearchParams(queryPart ?? "");

  if (params.get("coupon")?.toUpperCase() === coupon) {
    return hash ? `${path}${params.toString() ? `?${params.toString()}` : ""}#${hash}` : href;
  }

  params.set("coupon", coupon);
  const queryString = params.toString();
  const targetPath = path || fallbackPath;
  const withQuery = queryString ? `${targetPath}?${queryString}` : targetPath;
  return hash ? `${withQuery}#${hash}` : withQuery;
};

export function CouponLink({ href, ...props }: CouponLinkProps) {
  const [coupon, setCoupon] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const url = new URL(window.location.href);
    const normalizedCoupon = url.searchParams.get("coupon")?.toUpperCase() === COUPON_CODE ? COUPON_CODE : null;
    setCoupon(normalizedCoupon);
    setCurrentPath(url.pathname || "/");
  }, []);

  const resolvedHref = useMemo(() => appendCoupon(href, coupon, currentPath), [href, coupon, currentPath]);

  if (!coupon || isExternalLink(href)) {
    return <Link href={href} {...props} />;
  }

  return <Link href={resolvedHref} {...props} />;
}
