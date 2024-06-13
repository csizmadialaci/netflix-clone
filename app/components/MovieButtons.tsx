"use client";

import { Button } from "@/components/ui/button";
import { InfoIcon, PlayCircle } from "lucide-react";

export default function MovieButtons() {
  return (
    <>
      <Button className="mt-4 mr-4 text-lg font-medium">
        <PlayCircle className="mr-2 h-6 w-6" />
        Play
      </Button>
      <Button>
        <InfoIcon className="mr-2 h-6 w-6" />
        Learn more
      </Button>
    </>
  );
}
