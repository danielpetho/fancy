"use client";

import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

export function RestartButton({
    onRestart,
}: {
    onRestart: () => void;
}) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onRestart}
      className="h-8 w-8"
    >
      <RotateCw className="h-4 w-4" />
    </Button>
  );
}
