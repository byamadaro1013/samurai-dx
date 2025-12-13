"use client";

import { HEADER_NAV } from "@/const/dx";
import Link from "next/link";
import React from "react";
import Image from "next/image";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-[375px] max-w-full bg-[#161616] transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col gap-16 px-6 py-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link href="/" onClick={onClose}>
              <Image
                src="/assets/images/logo/logo.svg"
                alt="SamurAI DX Logo"
                width={120}
                height={66}
                className="h-auto w-[120px]"
              />
            </Link>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex size-11 items-center justify-center transition-opacity hover:opacity-70"
              aria-label="メニューを閉じる"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col gap-16">
            <nav className="flex flex-col">
              {HEADER_NAV.map((nav, index) => (
                <div key={nav.label}>
                  <Link
                    href={nav.href}
                    onClick={onClose}
                    className="block py-[13.5px] transition-opacity hover:opacity-70"
                  >
                    <p className="font-['Helvetica_Neue',sans-serif] text-2xl font-normal text-white">
                      {nav.label}
                    </p>
                  </Link>
                  {index < HEADER_NAV.length - 1 && (
                    <div className="h-px w-full bg-white/20" />
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <Link
              href="/leasur"
              onClick={onClose}
              className="flex items-center justify-center gap-4 rounded-[40px] border border-solid border-white px-5 py-4 transition-colors hover:bg-white/10"
            >
              <p className="font-['A-OTF_A1Gothic_StdN',sans-serif] text-[13px] font-medium leading-[13px] text-white">
                サービスサイトはこちら
              </p>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 4L10 8L6 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 4L6 8L2 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
