"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { formatTimeLeft } from "../lib/formatTimeLeft";

const COUPON_CODE = "SAVE20";
const STORAGE_KEY = "flashSaleDismissedAt";
const HIDE_DURATION_MS = 24 * 60 * 60 * 1000;

type Variant = "A" | "B";

const HEADLINE_VARIANTS: Record<Variant, string> = {
  A: "Flash Sale: Save 20% today",
  B: "Today Only: 20% off deep cleans"
};

const pushToDataLayer = (payload: Record<string, unknown>) => {
  if (typeof window === "undefined") {
    return;
  }

  const win = window as typeof window & { dataLayer?: Array<Record<string, unknown>> };
  win.dataLayer = win.dataLayer ?? [];
  win.dataLayer.push(payload);
};


export function FlashSaleBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState("00h 00m 00s");
  const [variant, setVariant] = useState<Variant>("A");
  const [isApplied, setIsApplied] = useState(false);
  const headingCopy = HEADLINE_VARIANTS[variant];

  const headingId = useMemo(() => `flash-sale-heading-${Math.random().toString(36).slice(2, 8)}`, []);
  const timerLabelId = useMemo(() => `flash-sale-timer-${Math.random().toString(36).slice(2, 8)}`, []);
  const variantAssignedRef = useRef(false);
  const hasLoggedViewRef = useRef(false);

  useEffect(() => {
    if (!variantAssignedRef.current) {
      setVariant(Math.random() < 0.5 ? "A" : "B");
      variantAssignedRef.current = true;
    }

    if (typeof window === "undefined") {
      return;
    }

    const url = new URL(window.location.href);
    const couponParam = url.searchParams.get("coupon");
    if (!couponParam || couponParam.toUpperCase() !== COUPON_CODE) {
      setIsVisible(false);
      hasLoggedViewRef.current = false;
      return;
    }

    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 0, 0);

    if (now >= endOfDay) {
      setIsVisible(false);
      hasLoggedViewRef.current = false;
      return;
    }

    const storedDismissal = window.localStorage.getItem(STORAGE_KEY);
    if (storedDismissal) {
      const dismissedAt = Number.parseInt(storedDismissal, 10);
      if (!Number.isNaN(dismissedAt) && now.getTime() - dismissedAt < HIDE_DURATION_MS) {
        setIsVisible(false);
        hasLoggedViewRef.current = false;
        return;
      }
    }

    setIsVisible(true);

    let timer: number | undefined;

    const clearTimer = () => {
      if (timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
    };

    const updateCountdown = () => {
      const current = new Date();
      if (current >= endOfDay) {
        setIsVisible(false);
        window.localStorage.removeItem(STORAGE_KEY);
        clearTimer();
        return;
      }
      setTimeLeft(formatTimeLeft(endOfDay.getTime() - current.getTime()));
    };

    updateCountdown();
    timer = window.setInterval(updateCountdown, 1000);
    return () => clearTimer();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      hasLoggedViewRef.current = false;
      setIsApplied(false);
      return;
    }

    if (hasLoggedViewRef.current) {
      return;
    }

    pushToDataLayer({ event: "promo_view", code: COUPON_CODE, variant });
    hasLoggedViewRef.current = true;
  }, [isVisible, variant]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const url = new URL(window.location.href);
    if (url.searchParams.get("coupon")?.toUpperCase() !== COUPON_CODE) {
      url.searchParams.set("coupon", COUPON_CODE);
      window.history.replaceState(null, "", url.toString());
    }
  }, [isVisible]);

  const handleApplyClick = () => {
    pushToDataLayer({ event: "promo_apply", code: COUPON_CODE, variant });
    setIsApplied(true);
  };

  const handleDismiss = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      className="flash-banner"
      role="region"
      aria-label="Flash sale promotion"
      aria-labelledby={headingId}
      aria-describedby={timerLabelId}
      data-testid="flash-sale-banner"
    >
      <div className="flash-banner__content">
        <div className="flash-banner__copy">
          <p id={headingId} className="flash-banner__headline">{headingCopy}</p>
          <p className="flash-banner__subtext">
            Use code <span className="flash-banner__code">{COUPON_CODE}</span> at checkout
          </p>

        </div>
        <div className="flash-banner__copy">
          <p id={timerLabelId} className="flash-banner__timer" aria-live="polite">
            Ends in <span>{timeLeft}</span>
          </p>
        </div>        
        <div className="flash-banner__actions">
          <button type="button" className="button button--primary flash-banner__cta" onClick={handleApplyClick} aria-live="polite">
            {isApplied ? "Applied" : "Apply Code"}
          </button>
          <button type="button" className="flash-banner__dismiss" onClick={handleDismiss} aria-label="Dismiss flash sale banner">
            X
          </button>
        </div>
      </div>
    </aside>
  );
}
