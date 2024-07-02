import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaletteIcon, PresentationIcon, StoreIcon } from "lucide-react";

export default function HeroSectionGradientBackground() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden py-24 lg:py-32">
        {/* Gradients */}
        <div
          aria-hidden="true"
          className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
        >
          <div className="bg-gradient-to-r from-background/50 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
          <div className="bg-gradient-to-tl blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-primary-foreground via-primary-foreground to-background" />
        </div>
        {/* End Gradients */}
        <div className="relative z-10">
          <div className="container py-10 lg:py-16">
            <div className="max-w-2xl text-center mx-auto">
              <p className="">Elevate your projects</p>
              {/* Title */}
              <div className="mt-5 max-w-2xl">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Beautiful UI Blocks
                </h1>
              </div>
              {/* End Title */}
              <div className="mt-5 max-w-3xl">
                <p className="text-xl text-muted-foreground">
                  Over 10+ fully responsive, UI blocks you can drop into your
                  Shadcn UI projects and customize to your heart&apos;s content.
                </p>
              </div>
              {/* Buttons */}
              <div className="mt-8 gap-3 flex justify-center">
                <Button size={"lg"}>Get started</Button>
                <Button size={"lg"} variant={"outline"}>
                  Learn more
                </Button>
              </div>
              {/* End Buttons */}
            </div>
          </div>
        </div>
      </div>
      {/* Icon Blocks */}
      <div className="container py-24 lg:py-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-6 md:gap-10">
          {/* Card */}
          <Card>
            <CardHeader className="pb-4 flex-row items-center gap-4">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-2 bg-primary">
                <PaletteIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Build your portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              The simplest way to keep your portfolio always up-to-date.
            </CardContent>
          </Card>
          {/* End Card */}
          {/* Card */}
          <Card>
            <CardHeader className="pb-4 flex-row items-center gap-4">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-2 bg-primary">
                <PresentationIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Get freelance work</CardTitle>
            </CardHeader>
            <CardContent>
              New design projects delivered to your inbox each morning.
            </CardContent>
          </Card>
          {/* End Card */}
          {/* Card */}
          <Card>
            <CardHeader className="pb-4 flex-row items-center gap-4">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-2 bg-primary">
                <StoreIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Sell your goods</CardTitle>
            </CardHeader>
            <CardContent>
              Get your goods in front of millions of potential customers with
              ease.
            </CardContent>
          </Card>
          {/* End Card */}
          {/* Card */}
          <Card>
            <CardHeader className="pb-4 flex-row items-center gap-4">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-2 bg-primary">
                <StoreIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Get freelance work</CardTitle>
            </CardHeader>
            <CardContent>
              New design projects delivered to your inbox each morning.
            </CardContent>
          </Card>
          {/* End Card */}
          {/* Card */}
          <Card>
            <CardHeader className="pb-4 flex-row items-center gap-4">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-2 bg-primary">
                <StoreIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Sell your goods</CardTitle>
            </CardHeader>
            <CardContent>
              Get your goods in front of millions of potential customers with
              ease.
            </CardContent>
          </Card>
          {/* End Card */}
          {/* Card */}
          <Card>
            <CardHeader className="pb-4 flex-row items-center gap-4">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-2 bg-primary">
                <PaletteIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Build your portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              The simplest way to keep your portfolio always up-to-date.
            </CardContent>
          </Card>
          {/* End Card */}
        </div>
      </div>
      {/* End Icon Blocks */}
      {/* End Hero */}
    </>
  );
}


      