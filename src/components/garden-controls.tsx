"use client";

import { Sprout, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface GardenControlsProps {
  onPlantNew: () => void;
  isSoundOn: boolean;
  onToggleSound: (checked: boolean) => void;
}

export default function GardenControls({ onPlantNew, isSoundOn, onToggleSound }: GardenControlsProps) {
  return (
    <div className="absolute bottom-4 left-4 z-20 flex items-center gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onPlantNew}
              variant="default"
              size="lg"
              className="rounded-full w-16 h-16 bg-primary shadow-lg hover:bg-primary/90"
              aria-label="Plant a new seed"
            >
              <Sprout className="w-8 h-8 text-primary-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Plant a new seed</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
        {isSoundOn ? <Volume2 className="w-5 h-5"/> : <VolumeX className="w-5 h-5"/>}
        <Label htmlFor="sound-toggle" className="text-sm cursor-pointer">Ambient Sound</Label>
        <Switch
          id="sound-toggle"
          checked={isSoundOn}
          onCheckedChange={onToggleSound}
          aria-label="Toggle ambient sound"
        />
      </div>
    </div>
  );
}
