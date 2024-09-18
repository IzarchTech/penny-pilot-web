import { ReactNode } from "react";

export default function ProtectedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="h-full w-full grid grid-rows-[auto_1fr]">{children}</div>
  );
}
