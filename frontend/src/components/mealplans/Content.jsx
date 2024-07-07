import React, { useState, useEffect } from "react";
import { CardContent, CardHeader, CardTitle, CardWithoutHover } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

export default function AISuggestions({ aiSuggestions, isLoading }) {
  const [parsedSuggestions, setParsedSuggestions] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    let interval;
    if (isLoading) {
      setProgress(0);
      setShowContent(false);
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return Math.min(prevProgress + 0.75, 100);
        });
      }, 50);
    } else {
      clearInterval(interval);
      setProgress(100);
      setShowContent(true);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (aiSuggestions) {
      try {
        setParsedSuggestions(JSON.parse(aiSuggestions));
      } catch (error) {
        console.error("Failed to parse AI suggestions:", error);
      }
    }
  }, [aiSuggestions]);

  useEffect(() => {
    if (progress === 100) {
      setShowContent(true);
    }
  }, [progress]);

  return (
    <>
      {!showContent ? (
        <div className="space-y-4 h-[calc(100vh-2rem)]">
          <Progress value={progress} className="w-full" />
          <p className="text-center text-sm text-gray-500">
            {isLoading ? "Generating AI suggestions..." : "Preparing content..."}
          </p>
        </div>
      ) : parsedSuggestions ? (
        <ScrollArea className="h-[calc(100vh-300px)] pr-4">
          <div className="space-y-6">
            {Object.entries(parsedSuggestions).map(([mealType, mealInfo]) => (
              <CardWithoutHover key={mealType} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800">{mealType}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 italic">
                    <span className="font-semibold">Current:</span> {mealInfo.Current}
                  </p>
                  <div>
                    <h4 className="text-lg font-semibold text-emerald-600 mb-2">
                      Suggestion: {mealInfo.Suggestion}
                    </h4>
                    <div className="space-y-2">
                      <h5 className="text-md font-semibold text-gray-700">Sustainability:</h5>
                      <p className="text-sm text-gray-600 pl-4">
                        {mealInfo.Sustainability.split('**')[0]}
                      </p>
                      <p className="text-lg font-bold text-green-600 pl-4">
                        {mealInfo.Sustainability.split('**')[1]}
                      </p>
                    </div>
                    <div className="mt-4">
                      <h5 className="text-md font-semibold text-gray-700">Health:</h5>
                      <p className="text-sm text-gray-600 pl-4">{mealInfo.Health}</p>
                    </div>
                  </div>
                </CardContent>
              </CardWithoutHover>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <p className="text-center text-gray-500">No suggestions available. Generate some to see them here.</p>
      )}
    </>
  );
}