"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

const SESSION_DISMISS_KEY = "monblog-pwa-install-dismissed";

function isStandaloneMode() {
  const navigatorWithStandalone = window.navigator as Navigator & {
    standalone?: boolean;
  };

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    navigatorWithStandalone.standalone === true
  );
}

function isIosDevice() {
  const userAgent = window.navigator.userAgent.toLowerCase();

  return (
    /iphone|ipad|ipod/.test(userAgent) ||
    (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1)
  );
}

function isMobileDevice() {
  const userAgent = window.navigator.userAgent.toLowerCase();

  return (
    /android|iphone|ipad|ipod|mobile/.test(userAgent) ||
    (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1)
  );
}

export function PwaInstallPrompt() {
  const pathname = usePathname();
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showIosInstructions, setShowIosInstructions] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Ignore registration failures so the public experience still works.
    });
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/admin") || typeof window === "undefined") {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      if (!isMobileDevice() || isStandaloneMode()) {
        return;
      }

      if (window.sessionStorage.getItem(SESSION_DISMISS_KEY) === "1") {
        return;
      }

      if (isIosDevice()) {
        setShowIosInstructions(true);
        setShowPrompt(true);
      }
    });

    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setShowIosInstructions(false);
      setShowPrompt(true);
    }

    function handleAppInstalled() {
      setShowPrompt(false);
      setDeferredPrompt(null);
      setShowIosInstructions(false);
    }

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener,
    );
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [pathname]);

  async function handleInstall() {
    if (!deferredPrompt) {
      return;
    }

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowPrompt(false);
  }

  function handleDismiss() {
    window.sessionStorage.setItem(SESSION_DISMISS_KEY, "1");
    setShowPrompt(false);
  }

  if (!showPrompt || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 md:hidden">
      <div className="rounded-[1.35rem] border border-black/10 bg-white/95 p-4 shadow-[0_18px_45px_rgba(17,17,17,0.14)] backdrop-blur">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-stone-950">
              Install Monblog
            </p>
            <p className="text-sm leading-6 text-stone-600">
              {showIosInstructions
                ? "Add this blog to your home screen from the browser share menu for a full app-like experience."
                : "Install this blog on your phone to open it like a real app from your home screen."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="shrink-0 rounded-full border border-black/10 px-2.5 py-1 text-xs font-semibold text-stone-500 transition hover:text-stone-900"
            aria-label="Dismiss install prompt"
          >
            Close
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {deferredPrompt ? (
            <button
              type="button"
              onClick={handleInstall}
              className="inline-flex items-center rounded-full bg-stone-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700"
            >
              Install app
            </button>
          ) : null}

          {showIosInstructions ? (
            <p className="text-xs leading-5 text-stone-500">
              On iPhone or iPad: tap Share, then choose Add to Home Screen.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
