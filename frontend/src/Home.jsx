import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaletteIcon, PresentationIcon, StoreIcon } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login'); // Navigate to the login screen
  };

  const handleLearnMore = () => {
    window.scrollTo({
      top: document.getElementById('feature-cards').offsetTop,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden py-24 lg:py-32">
        {/* Background Gradients */}
        <div
          aria-hidden="true"
          className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
        >
          <div className="bg-gradient-to-r from-background/50 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
          <div className="bg-gradient-to-tl blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-primary-foreground via-primary-foreground to-background" />
        </div>
        {/* Content */}
        <div className="relative z-10">
          <div className="container py-10 lg:py-16">
            <div className="max-w-2xl text-center mx-auto">
              <p className="text-md text-muted-foreground">
                Embrace eco-friendly eating
              </p>
              {/* Title */}
              <div className="mt-5 max-w-2xl">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  SUSTAIN EATS
                </h1>
              </div>
              {/* End Title */}
              <div className="mt-5 max-w-3xl">
                <p className="text-xl text-muted-foreground">
                  Your guide to sustainable eating, making every meal count for
                  the planet.
                </p>
              </div>
              {/* Buttons */}
              <div className="mt-8 gap-3 flex justify-center">
                <Button size="lg" onClick={handleGetStarted}>
                  Get started
                </Button>
                <Button size="lg" variant="outline" onClick={handleLearnMore}>
                  Learn more
                </Button>
              </div>
              {/* End Buttons */}
            </div>
          </div>
        </div>
      </div>
      {/* End Hero Section */}

      {/* Feature Cards */}
      <div id="feature-cards" className="container py-24 lg:py-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-6 md:gap-10">
          {/* Customizable Meal Plans Card */}
          <Card>
            <CardHeader className="pb-4 flex-row items-center gap-4">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-2 bg-primary">
                <PaletteIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Customizable Meal Plans</CardTitle>
            </CardHeader>
            <CardContent>
              Create personalized meal plans based on your dietary preferences,
              allergies, and desired carbon footprint.
            </CardContent>
          </Card>
          {/* End Customizable Meal Plans Card */}

          {/* Diverse Foods Card */}
          <Card>
            <CardHeader className="pb-4 flex-row items-center gap-4">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-2 bg-primary">
                <PresentationIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Diverse Foods</CardTitle>
            </CardHeader>
            <CardContent>
              Explore a comprehensive database of foods and recipes, catering
              to different tastes and dietary needs.
            </CardContent>
          </Card>
          {/* End Diverse Foods Card */}

          {/* Sustainability Scores Card */}
          <Card>
            <CardHeader className="pb-4 flex-row items-center gap-4">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-2 bg-primary">
                <StoreIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Sustainability Scores</CardTitle>
            </CardHeader>
            <CardContent>
              Get insights into the sustainability of recipes based on
              ingredients, sourcing, and preparation methods.
            </CardContent>
          </Card>
          {/* End Sustainability Scores Card */}

          {/* Sustainability Interface Card */}
          <Card>
            <CardHeader className="pb-4 flex-row items-center gap-4">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-2 bg-primary">
                <PaletteIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Sustainability Interface</CardTitle>
            </CardHeader>
            <CardContent>
              An interactive interface making it easy to navigate and personalize
              your sustainable eating habits.
            </CardContent>
          </Card>
          {/* End Sustainability Interface Card */}

          {/* Carbon Footprint Analysis Card */}
          <Card>
            <CardHeader className="pb-4 flex-row items-center gap-4">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-2 bg-primary">
                <PresentationIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Carbon Footprint Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              Detailed analysis of each meal's carbon footprint, helping you
              track and optimize your environmental impact.
            </CardContent>
          </Card>
          {/* End Carbon Footprint Analysis Card */}

          {/* Eco-friendly Tips Card */}
          <Card>
            <CardHeader className="pb-4 flex-row items-center gap-4">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-2 bg-primary">
                <StoreIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Eco-friendly Tips</CardTitle>
            </CardHeader>
            <CardContent>
              Tips and tricks to enhance your eco-friendly eating journey,
              making sustainable choices easier.
            </CardContent>
          </Card>
          {/* End Eco-friendly Tips Card */}
        </div>
      </div>
      {/* End Feature Cards */}
    </>
  );
}
