"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function EventPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const hasSeenPopup = sessionStorage.getItem("eventPopupSeen");

    if (!hasSeenPopup) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("eventPopupSeen", "true");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Prevent body scroll when popup is open
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 animate-fadeIn"
          onClick={handleBackdropClick}
        >
          {/* Popup Container - Smaller size for desktop */}
          <div className="relative w-full max-w-md animate-popupSlideIn">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-navy text-bone shadow-xl transition-all hover:bg-navy-2 hover:scale-110"
              aria-label="Close popup"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Popup Content - Split Design */}
            <div className="panel-solid overflow-hidden">
              {/* Top Half - Design Dialect 2.0 */}
              <Link
                href="/register"
                onClick={handleClose}
                className="block transition-transform hover:scale-[1.02]"
              >
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-navy-2">
                  <Image
                    src="/event-popup-poster.png"
                    alt="Design Dialect 2.0 - Architecture Event in Ludhiana"
                    fill
                    className="object-cover object-top"
                    priority
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-copper">
                      Design Dialect 2.0
                    </p>
                    <p className="mt-1 text-sm text-bone">
                      Click to register for the event →
                    </p>
                  </div>
                </div>
              </Link>

              {/* Divider */}
              <div className="h-px bg-hairline" />

              {/* Bottom Half - Build Right Advisory */}
              <Link
                href="/build-right"
                onClick={handleClose}
                className="block transition-transform hover:scale-[1.02]"
              >
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-navy-2">
                  <Image
                    src="/event-popup-poster.png"
                    alt="Build Right Advisors - Construction Advisory Services"
                    fill
                    className="object-cover object-bottom"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-copper">
                      Build Right Advisors
                    </p>
                    <p className="mt-1 text-sm text-bone">
                      Expert construction advisory →
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popupSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-popupSlideIn {
          animation: popupSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
}
