'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';

interface InfoButtonProps {
   title: string;
   children: React.ReactNode;
}

export default function InfoButton({ title, children }: InfoButtonProps) {
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
               <Info className="h-[1.2rem] w-[1.2rem]" />
               <span className="sr-only">Information</span>
            </Button>
         </DialogTrigger>
         <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
               <DialogDescription asChild>
                  <div className="mt-4 space-y-4 text-foreground">
                     {children}
                  </div>
               </DialogDescription>
            </DialogHeader>
         </DialogContent>
      </Dialog>
   );
}
