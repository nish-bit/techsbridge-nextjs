"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Script from "next/script";
import { cn } from "@/lib/utils";

type OrderResponse = {
  order_id?: string;
  amount?: number;
  currency?: string;
  key_id?: string;
  name?: string;
  description?: string;
  error?: string;
};

type VerifyResponse = {
  verified?: boolean;
  error?: string;
};

type RazorpayPaymentResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayFailureResponse = {
  error?: {
    description?: string;
  };
};

type RazorpayCheckoutOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => Promise<void>;
  modal: {
    ondismiss: () => void;
  };
};

type RazorpayCheckoutInstance = {
  open: () => void;
  on: (
    event: "payment.failed",
    handler: (response: RazorpayFailureResponse) => void
  ) => void;
};

declare global {
  interface Window {
    Razorpay?: new (
      options: RazorpayCheckoutOptions
    ) => RazorpayCheckoutInstance;
  }
}

type RazorpayScriptStatus = {
  ready: boolean;
  error?: string;
};

type RazorpayScriptState = RazorpayScriptStatus & {
  checkoutInProgress: boolean;
  startCheckout: () => boolean;
  finishCheckout: () => void;
};

const RazorpayScriptContext = createContext<RazorpayScriptState>({
  ready: false,
  checkoutInProgress: false,
  startCheckout: () => false,
  finishCheckout: () => {},
});

export function RazorpayCheckoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  const checkoutInProgressRef = useRef(false);
  const [checkoutInProgress, setCheckoutInProgress] = useState(false);
  const [scriptState, setScriptState] = useState<RazorpayScriptStatus>({
    ready: false,
  });
  const checkoutContext: RazorpayScriptState = {
    ...scriptState,
    checkoutInProgress,
    startCheckout: () => {
      if (checkoutInProgressRef.current) return false;
      checkoutInProgressRef.current = true;
      setCheckoutInProgress(true);
      return true;
    },
    finishCheckout: () => {
      checkoutInProgressRef.current = false;
      setCheckoutInProgress(false);
    },
  };

  return (
    <RazorpayScriptContext.Provider value={checkoutContext}>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onReady={() => setScriptState({ ready: true })}
        onError={() =>
          setScriptState({
            ready: false,
            error: "Secure checkout could not be loaded. Please try again later.",
          })
        }
      />
      {children}
    </RazorpayScriptContext.Provider>
  );
}

type RazorpayCheckoutProps = {
  planId: string;
  planName: string;
  amountInPaise: number;
  popular?: boolean;
};

export function RazorpayCheckout({
  planId,
  planName,
  amountInPaise,
  popular,
}: RazorpayCheckoutProps) {
  const [notice, setNotice] = useState("");
  const [noticeIsError, setNoticeIsError] = useState(false);
  const scriptState = useContext(RazorpayScriptContext);
  const paymentSubmittedRef = useRef(false);
  const paymentFailedRef = useRef(false);

  function showNotice(message: string, isError = false) {
    setNotice(message);
    setNoticeIsError(isError);
  }

  async function handlePay() {
    if (!scriptState.ready || !window.Razorpay) {
      showNotice("Secure checkout is still loading. Please try again.", true);
      return;
    }
    if (!scriptState.startCheckout()) return;

    paymentSubmittedRef.current = false;
    paymentFailedRef.current = false;
    setNotice("");

    try {
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const order = (await orderResponse.json().catch(() => null)) as
        | OrderResponse
        | null;

      if (
        !orderResponse.ok ||
        !order?.order_id ||
        typeof order.amount !== "number" ||
        !order.currency ||
        !order.key_id ||
        !order.name ||
        !order.description ||
        order.amount !== amountInPaise
      ) {
        throw new Error(order?.error ?? "Unable to start checkout.");
      }

      const RazorpayConstructor = window.Razorpay;
      if (!RazorpayConstructor) {
        throw new Error("Secure checkout is unavailable. Please try again.");
      }

      const checkout = new RazorpayConstructor({
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: order.name,
        description: order.description,
        order_id: order.order_id,
        handler: async (payment) => {
          if (paymentSubmittedRef.current) return;
          paymentSubmittedRef.current = true;
          try {
            const verificationResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payment),
            });
            const verification = (await verificationResponse
              .json()
              .catch(() => null)) as VerifyResponse | null;

            if (!verificationResponse.ok || verification?.verified !== true) {
              throw new Error(
                verification?.error ?? "Payment could not be verified."
              );
            }

            showNotice(
              "Payment verified successfully. We’ll contact you to confirm the next steps."
            );
          } catch (error) {
            showNotice(
              error instanceof Error
                ? error.message
                : "Payment could not be verified. Please contact us.",
              true
            );
          } finally {
            scriptState.finishCheckout();
          }
        },
        modal: {
          ondismiss: () => {
            if (paymentSubmittedRef.current) return;
            scriptState.finishCheckout();
            if (!paymentFailedRef.current) {
              showNotice("Checkout was closed before completing payment.");
            }
          },
        },
      });

      checkout.on("payment.failed", (payment) => {
        paymentFailedRef.current = true;
        showNotice(
          payment.error?.description ??
            "Payment failed. Please try another payment method.",
          true
        );
      });

      showNotice("Complete your payment in the secure Razorpay window.");
      checkout.open();
    } catch (error) {
      scriptState.finishCheckout();
      showNotice(
        error instanceof Error
          ? error.message
          : "Unable to start checkout. Please try again.",
        true
      );
    }
  }

  return (
    <div className="mt-7">
      <button
        type="button"
        onClick={handlePay}
        disabled={scriptState.checkoutInProgress || !scriptState.ready}
        className={cn(
          "mt-5 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60",
          popular
            ? "bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] text-white shadow-[0_14px_34px_-12px_var(--glow)]"
            : "border border-[var(--border)] bg-[var(--surface-3)] text-[var(--text-1)] hover:border-[var(--blue-2)]"
        )}
      >
        {scriptState.checkoutInProgress
          ? "Checkout in progress..."
          : scriptState.ready
            ? "Pay Now"
            : "Loading secure checkout..."}
      </button>
      {(notice || scriptState.error) && (
        <p
          className={`mt-3 text-sm ${noticeIsError || scriptState.error ? "text-red-400" : "text-[var(--blue-2)]"}`}
          role="status"
          aria-live="polite"
        >
          {planName}: {notice || scriptState.error}
        </p>
      )}
    </div>
  );
}
