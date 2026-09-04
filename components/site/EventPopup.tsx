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
          {/* Popup Container - Same layout for all screens */}
          <div className="relative w-full max-w-2xl animate-popupSlideIn">
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

            {/* Popup Content */}
            <div className="panel-solid overflow-hidden">
              {/* Event Poster */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-navy-2">
                <Image
                  src="/DD 2.0_Page (1).png"
                  alt="Design Dialects 2.0 - Architecture Event in Ludhiana"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>

              {/* CTA Buttons */}
              <div className="p-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/register/architect"
                    onClick={handleClose}
                    className="btn btn-fill flex-1 justify-center"
                  >
                    Register as Architect
                  </Link>
                  <Link
                    href="/register/sponsor"
                    onClick={handleClose}
                    className="btn btn-line flex-1 justify-center"
                  >
                    Book Your Stall
                  </Link>
                </div>

                {/* Additional Info */}
                <p className="mt-4 text-center text-[11px] text-slate">
                  Limited seats • Early bird offers available
                </p>
              </div>
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
