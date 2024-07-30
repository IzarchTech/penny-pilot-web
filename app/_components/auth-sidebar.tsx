"use client";

import React from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function AuthSidebar() {
  return (
    <div className="hidden lg:grid h-full grid-rows-[auto_1fr] bg-secondary">
      <div className="w-full flex gap-4 items-center p-4 border-b dark:border-secondary/60">
        <div className="size-[72px] relative object-center rounded-lg ring-2 ring-offset-1">
          <Image
            src={logo}
            alt="penny pilot logo"
            objectFit="cover"
            fill
            priority
            className="rounded-lg"
          />
        </div>
        <div className="uppercase font-bold tracking-widest">
          <div className="h-[72px] flex items-center">
            <p className="text-6xl inline-block text-transparent bg-clip-text from-blue-900 to-blue-700 bg-gradient-to-tr">
              P
            </p>
            <div className="flex flex-col text-2xl">
              <p className="leading-none inline-block text-transparent bg-clip-text from-blue-700 to-blue-900 bg-gradient-to-tr">
                enny
              </p>
              <p className="leading-none -ml-2 inline-block text-transparent bg-clip-text from-yellow-500 to-orange-900 bg-gradient-to-b">
                ilot
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Link
          href="/overview"
          className="p-4 hover:bg-gray-800/25 hover:font-semibold hover:dark:bg-background/55 hover:dark:border-background/65 border-l-8 border-slate-800/45 dark:border-background/45"
        >
          Overview
        </Link>
        <Link
          href="/budgets"
          className="p-4 hover:bg-gray-800/25 hover:font-semibold hover:dark:bg-background/55 hover:dark:border-background/65 border-l-8 hover:border-slate-800/45 border-transparent"
        >
          Budgets
        </Link>
        <Link
          href="/dashboard"
          className="p-4 hover:bg-gray-800/25 hover:font-semibold hover:dark:bg-background/55 hover:dark:border-background/65 border-l-8 hover:border-slate-800/45 border-transparent"
        >
          Transaction History
        </Link>
      </div>
    </div>
  );
}
