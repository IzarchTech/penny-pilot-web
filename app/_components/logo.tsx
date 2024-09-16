import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";

/**
 * A component that renders a logo of the application.
 * The logo is an image wrapped in a link, which links to the given path.
 * The logo is designed to be responsive and should be used as a direct replacement for the Next.js Link component.
 * @param {string} path The path the logo should link to.
 * @returns {JSX.Element} The logo component.
 */
export default function Logo({
  path = "/",
}: Readonly<{ path?: string }>): JSX.Element {
  return (
    <Link href={path} className="flex gap-1 items-center select-none">
      <div className="rounded-md relative size-10 md:size-14">
        <Image
          // The logo should be prioritized and should not be lazy loaded.
          fill
          priority
          objectFit="cover"
          alt="Penny Pilot Logo"
          src={logo}
          className="rounded-md"
        />
      </div>
      <div className="uppercase font-bold tracking-widest">
        <div className="h-[72px] flex items-center">
          <p className="text-4xl md:text-6xl inline-block text-transparent bg-clip-text from-blue-900 to-blue-700 bg-gradient-to-tr">
            P
          </p>
          <div className="flex flex-col text-sm md:text-2xl">
            <p className="leading-none inline-block text-transparent bg-clip-text from-blue-700 to-blue-900 bg-gradient-to-tr">
              enny
            </p>
            <p className="leading-none md:-ml-2 inline-block text-transparent bg-clip-text from-yellow-500 to-orange-900 bg-gradient-to-b">
              ilot
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
