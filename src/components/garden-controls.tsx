"use client";

import { Sprout, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { SoundType } from '@/app/page';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface GardenControlsProps {
  onPlantNew: () => void;
  isSoundOn: boolean;
  onToggleSound: () => void;
  soundType: SoundType;
  onSoundTypeChange: (value: SoundType) => void;
}

export default function GardenControls({ onPlantNew, isSoundOn, onToggleSound, soundType, onSoundTypeChange }: GardenControlsProps) {
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
        <Select value={soundType} onValueChange={(value: SoundType) => onSoundTypeChange(value)} disabled={!isSoundOn}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Soundscape" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="wind">Wind</SelectItem>
            <SelectItem value="crickets">Crickets</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
