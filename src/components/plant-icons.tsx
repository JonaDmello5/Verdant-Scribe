"use client";

import type { SVGProps } from 'react';

interface PlantIconProps extends SVGProps<SVGSVGElement> {
  growth: number; // A value from 0.0 to 1.0
}

export function FlowerIcon({ growth, ...props }: PlantIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `scale(${0.5 + growth * 0.8})`, opacity: 0.5 + growth * 0.5, transition: 'transform 0.5s, opacity 0.5s' }}
      {...props}
    >
      <g fill="#fde047" stroke="#ca8a04">
        <circle cx="12" cy="12" r={1.5 * growth} />
        <path d={`M12 10.5 A ${2*growth} ${2*growth} 0 0 1 14.5 10.5`} transform={`rotate(0 12 12)`} />
        <path d={`M12 10.5 A ${2*growth} ${2*growth} 0 0 1 14.5 10.5`} transform={`rotate(60 12 12)`} />
        <path d={`M12 10.5 A ${2*growth} ${2*growth} 0 0 1 14.5 10.5`} transform={`rotate(120 12 12)`} />
        <path d={`M12 10.5 A ${2*growth} ${2*growth} 0 0 1 14.5 10.5`} transform={`rotate(180 12 12)`} />
        <path d={`M12 10.5 A ${2*growth} ${2*growth} 0 0 1 14.5 10.5`} transform={`rotate(240 12 12)`} />
        <path d={`M12 10.5 A ${2*growth} ${2*growth} 0 0 1 14.5 10.5`} transform={`rotate(300 12 12)`} />
      </g>
      <path d="M12 14v8" stroke="#4d7c0f" strokeWidth={1 + growth} />
      {growth > 0.4 && <path d="M9 17c1 1 2 2 3 0" stroke="#4d7c0f" fill="none"/>}
    </svg>
  );
}

export function TreeIcon({ growth, ...props }: PlantIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `scale(${0.5 + growth * 0.8})`, opacity: 0.5 + growth * 0.5, transition: 'transform 0.5s, opacity 0.5s' }}
      {...props}
    >
      <path d="M12 22V10" stroke="#8d5b36" strokeWidth={2 + growth * 2} />
      {growth > 0.2 && <path d="M12 10l-4-4" stroke="#8d5b36" strokeWidth={1 + growth} />}
      {growth > 0.4 && <path d="M12 10l4-4" stroke="#8d5b36" strokeWidth={1 + growth} />}
      {growth > 0.6 && <path d="M5 14l-2-2" stroke="#8d5b36" strokeWidth={1 + growth} />}
      {growth > 0.8 && <path d="M19 14l2-2" stroke="#8d5b36" strokeWidth={1 + growth} />}
      <circle cx="12" cy="6" r={3 + growth * 3} fill="#22c55e" stroke="#166534" />
      <circle cx="8" cy="7" r={2 + growth * 2} fill="#22c55e" stroke="#166534" style={{opacity: growth > 0.3 ? 1 : 0}} />
      <circle cx="16" cy="7" r={2 + growth * 2} fill="#22c55e" stroke="#166534" style={{opacity: growth > 0.5 ? 1 : 0}}/>
    </svg>
  );
}


export function VineIcon({ growth, ...props }: PlantIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `scale(${0.5 + growth * 0.8})`, opacity: 0.5 + growth * 0.5, transition: 'transform 0.5s, opacity 0.5s' }}
      {...props}
    >
      <path d="M3 21 S 6 18, 9 15" stroke="#4d7c0f" strokeWidth={1 + growth} />
      {growth > 0.2 && <path d="M9 15 S 12 12, 15 9" stroke="#4d7c0f" strokeWidth={1 + growth} />}
      {growth > 0.4 && <path d="M15 9 S 18 6, 21 3" stroke="#4d7c0f" strokeWidth={1 + growth} />}
      
      {growth > 0.3 && <circle cx="6" cy="18" r="1.5" fill="#a3e635" />}
      {growth > 0.5 && <circle cx="12" cy="12" r="1.5" fill="#a3e635" />}
      {growth > 0.7 && <circle cx="18" cy="6" r="1.5" fill="#a3e635" />}
      {growth > 0.9 && <circle cx="9.5" cy="14.5" r="1" fill="#a3e635" />}
    </svg>
  );
}

export function BonsaiIcon({ growth, ...props }: PlantIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `scale(${0.5 + growth * 0.8})`, opacity: 0.5 + growth * 0.5, transition: 'transform 0.5s, opacity 0.5s' }}
      {...props}
    >
      <path d="M4 20h16" stroke="#78350f" strokeWidth="2" />
      <path d="M10 20v-3c0-1.1.9-2 2-2h0" stroke="#a16207" strokeWidth={1.5 + growth * 0.5} />
      <path d="M12 15s-2 0-2-2c0-2 2-2 2-2" stroke="#a16207" strokeWidth={1.5 + growth * 0.5} />
      <path d="M14 20v-4c0-1.1-.9-2-2-2h0" stroke="#a16207" strokeWidth={1.5 + growth * 0.5} />
      <path d="M12 14s2 0 2-2c0-2-2-2-2-2" stroke="#a16207" strokeWidth={1.5 + growth * 0.5} />
      
      {growth > 0.2 && <circle cx="8" cy="11.5" r={2.5 + growth} fill="#166534" stroke="#15803d" />}
      {growth > 0.5 && <circle cx="15" cy="12.5" r={3 + growth} fill="#16a34a" stroke="#15803d" />}
      {growth > 0.8 && <circle cx="11" cy="8" r={2 + growth} fill="#22c55e" stroke="#16a34a" />}
    </svg>
  );
}

export function WildflowerIcon({ growth, ...props }: PlantIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `scale(${0.5 + growth * 0.8})`, opacity: 0.5 + growth * 0.5, transition: 'transform 0.5s, opacity 0.5s' }}
      {...props}
    >
      <g transform={`scale(${growth + 0.5}) translate(-6, -6)`}>
        {growth > 0.1 && <path d="M12 22V10" stroke="#378805" strokeWidth={1 + growth} />}
        {growth > 0.3 && <path d="M12 16L8 12" stroke="#378805" strokeWidth={1 + growth} />}
        {growth > 0.5 && <path d="M12 14L15 11" stroke="#378805" strokeWidth={1 + growth} />}

        <ellipse cx="10" cy="8" rx="2" ry="3" fill="#8b5cf6" transform="rotate(-30 10 8)" />
        <ellipse cx="15" cy="7" rx="2.5" ry="3.5" fill="#ec4899" transform="rotate(20 15 7)" style={{ opacity: Math.max(0, (growth - 0.4) * 2.5) }} />
        <ellipse cx="12" cy="3" rx="2" ry="3" fill="#3b82f6" transform="rotate(10 12 3)" style={{ opacity: Math.max(0, (growth - 0.7) * 3) }} />

        <circle cx="12" cy="10" r={1.5} fill="#fde047" stroke="#eab308" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

export function MushroomIcon({ growth, ...props }: PlantIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `scale(${0.5 + growth * 0.8})`, opacity: 0.5 + growth * 0.5, transition: 'transform 0.5s, opacity 0.5s' }}
      {...props}
    >
      <path d={`M4 11.5c0-4.42 3.58-8 8-8s8 3.58 8 8a${3 + growth * 2} ${3 + growth * 2} 0 0 1 -16 0z`} fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
      <path d="M12 21.5v-10" stroke="#fef3c7" strokeWidth={1.5 + growth * 2} />
      {growth > 0.5 && <circle cx="10" cy="8.5" r="0.8" fill="#fde047" />}
      {growth > 0.6 && <circle cx="14" cy="8.5" r="1" fill="#fde047" />}
      {growth > 0.7 && <circle cx="12" cy="5.5" r="0.7" fill="#fde047" />}
    </svg>
  );
}
