'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface SearchPanelProps {
   onSearch: (query: string) => void;
   onClear: () => void;
   onClose: () => void;
   currentFilter?: string;
}

export function SearchPanel({ onSearch, onClear, onClose, currentFilter }: SearchPanelProps) {
   const [searchQuery, setSearchQuery] = useState(currentFilter || '');

   const handleSearch = () => {
      if (searchQuery.trim()) {
         onSearch(searchQuery.trim());
      } else {
         onClear();
      }
   };

   const handleClear = () => {
      setSearchQuery('');
      onClear();
   };

   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
         handleSearch();
      }
   };

   return (
      <div className="search-panel-wrapper p-2 bg-background border-b border-border flex justify-between items-center gap-2">
         <Input
            type="text"
            placeholder="e.g., favorites.books or favorites"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
            autoFocus
         />
         <div className="flex gap-2">
            <Button onClick={handleSearch} size="sm" variant="ghost">
               Search
            </Button>
            {currentFilter && (
               <Button onClick={handleClear} size="sm" variant="ghost">
                  Clear Filter
               </Button>
            )}
            <Button onClick={onClose} size="sm" variant="ghost" aria-label="Close search panel">
               <X className="h-4 w-4" />
            </Button>
         </div>
      </div>
   );
}
