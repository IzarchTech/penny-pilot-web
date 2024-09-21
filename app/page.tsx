import { ScrollArea } from "@/components/ui/scroll-area";
import Logo from "./_components/logo";
import { DarkModeToggle } from "./_components/dark-mode-toggle";
import GetStarted from "./_components/get-started";
import Image from "next/image";
import finImg from "@/assets/Revenue-bro.png";
import FeaturesSection from "./_components/features-section";
import WhyChooseSection from "./_components/why-choose-us-section";

export default function Home() {
  return (
    <main className="h-full grid grid-rows-[auto_1fr]">
      <div className="w-full border-b bg-card text-card-foreground shadow flex items-center justify-between h-20 md:h-24 pl-2 md:pl-4">
        <Logo />
        <div className="md:flex gap-4 items-center hidden">
          <DarkModeToggle />
          <GetStarted />
        </div>
      </div>
      <ScrollArea className="flex flex-col justify-center pt-4">
        <div className="container grid grid-cols-[auto_1fr] place-items-center justify-items-center px-4">
          <div className="w-full max-w-[40ch] text-left">
            <h1>Take Control of Your Finances Effortlessly</h1>
            <p>
              Stay on top of your finances with our intuitive and user-friendly
              expense and income tracker. Whether you’re managing your personal
              budget, saving for a goal, or monitoring your business expenses,
              Penny Pilot provides the tools you need to stay organized and in
              control.
            </p>
          </div>
          <div className="relative h-[500px] w-full">
            <Image
              src={finImg}
              alt={"finance control"}
              objectFit="contain"
              fill
              priority
            />
          </div>
        </div>

        <FeaturesSection />
        <WhyChooseSection />
        <div className="flex-1"></div>
        <div className="w-full border-t bg-card text-card-foreground shadow flex items-center justify-center h-20 md:h-24 pl-2 md:pl-4">
          Penny Pilot © {new Date().getFullYear()}
        </div>
      </ScrollArea>
    </main>
  );
}
