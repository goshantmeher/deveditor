'use client';

import React, { useState } from 'react';
import { BoxShadowGenerator } from './BoxShadowGenerator';
import { BorderRadiusGenerator } from './BorderRadiusGenerator';
import { GradientGenerator } from './GradientGenerator';
import { FlexboxGenerator } from './FlexboxGenerator';
import { GridGenerator } from './GridGenerator';
import { TransformGenerator } from './TransformGenerator';
import { AnimationGenerator } from './AnimationGenerator';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface GeneratorConfig {
   id: string;
   name: string;
   icon: string;
   description: string;
   component: React.ComponentType;
}

const GENERATORS: GeneratorConfig[] = [
   {
      id: 'box-shadow',
      name: 'Box Shadow',
      icon: '🎭',
      description: 'Multi-layer box shadows',
      component: BoxShadowGenerator,
   },
   {
      id: 'border-radius',
      name: 'Border Radius',
      icon: '⬡',
      description: 'Corner rounding controls',
      component: BorderRadiusGenerator,
   },
   {
      id: 'gradient',
      name: 'Gradient',
      icon: '🌈',
      description: 'Linear, radial & conic gradients',
      component: GradientGenerator,
   },
   {
      id: 'flexbox',
      name: 'Flexbox',
      icon: '📐',
      description: 'Flex container & items',
      component: FlexboxGenerator,
   },
   {
      id: 'grid',
      name: 'CSS Grid',
      icon: '🔲',
      description: 'Grid columns, rows & gap',
      component: GridGenerator,
   },
   {
      id: 'transform',
      name: 'Transform',
      icon: '🔄',
      description: 'Rotate, scale, skew & translate',
      component: TransformGenerator,
   },
   {
      id: 'animation',
      name: 'Animation',
      icon: '✨',
      description: 'Keyframe animations and timings',
      component: AnimationGenerator,
   },
];

export function GeneratorView() {
   const [activeId, setActiveId] = useState('box-shadow');
   const active = GENERATORS.find((g) => g.id === activeId) || GENERATORS[0];
   const Component = active.component;

   return (
      <div className="flex flex-col h-full">
         {/* Generator Toolbar */}
         <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border/30 bg-muted/20 shrink-0 overflow-x-auto w-full">
            {/* Dropdown selector */}
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 gap-1.5 text-xs font-medium">
                     <span>{active.icon}</span>
                     <span className="hidden sm:inline">{active.name}</span>
                     <ChevronDown className="h-3 w-3 opacity-60" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="start" className="w-56">
                  {GENERATORS.map((gen) => (
                     <DropdownMenuItem
                        key={gen.id}
                        onClick={() => setActiveId(gen.id)}
                        className={`gap-2 cursor-pointer ${activeId === gen.id ? 'bg-accent' : ''}`}
                     >
                        <span className="text-base">{gen.icon}</span>
                        <div className="flex flex-col">
                           <span className="text-sm font-medium">{gen.name}</span>
                           <span className="text-xs text-muted-foreground">{gen.description}</span>
                        </div>
                     </DropdownMenuItem>
                  ))}
               </DropdownMenuContent>
            </DropdownMenu>

            {/* Quick access buttons */}
            <div className="hidden md:flex items-center gap-1">
               {GENERATORS.map((gen) => (
                  <button
                     key={gen.id}
                     onClick={() => setActiveId(gen.id)}
                     className={`px-2 py-0.5 rounded text-xs transition-colors ${
                        activeId === gen.id
                           ? 'bg-primary/15 text-primary font-medium'
                           : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                     }`}
                  >
                     {gen.icon} {gen.name}
                  </button>
               ))}
            </div>
         </div>

         {/* Active Generator */}
         <div className="flex-1 min-h-0">
            <Component />
         </div>
      </div>
   );
}
