'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, ShoppingCart, Download, Check, Trash2 } from 'lucide-react';
import { useIconStore } from '@/hooks/use-icon-store';
import { IconData } from '@/types/icon-builder';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePersistence } from '@/contexts/PersistenceContext';
import { ExportModal } from './ExportModal';

// Temporary predefined list. Later this could be fetched dynamically.
const AVAILABLE_LIBRARIES = [
   { id: 'lucide', name: 'Lucide', path: '/data/icons/lucide.json' },
   { id: 'material', name: 'Material Design', path: '/data/icons/material.json' },
   { id: 'fontawesome', name: 'FontAwesome', path: '/data/icons/fontawesome.json' },
];

export function IconBuilderView() {
   const [libraries, setLibraries] = useState<Record<string, IconData[]>>({});
   const [activeLibraryId, setActiveLibraryId] = useState<string>('lucide');
   const [searchQuery, setSearchQuery] = useState('');
   const [exportModalOpen, setExportModalOpen] = useState(false);

   const { isMounted } = usePersistence();
   const store = useIconStore();

   // Safe access to cart to prevent hydration mismatch
   const cart = isMounted ? store.cart : [];
   const { toggleInCart, clearCart } = store;

   // Fetch library data on selection
   useEffect(() => {
      const fetchLibrary = async () => {
         if (!libraries[activeLibraryId]) {
            try {
               const libraryMeta = AVAILABLE_LIBRARIES.find((l) => l.id === activeLibraryId);
               if (libraryMeta) {
                  const res = await fetch(libraryMeta.path);
                  const data: IconData[] = await res.json();
                  setLibraries((prev) => ({ ...prev, [activeLibraryId]: data }));
               }
            } catch (error) {
               console.error(`Failed to load ${activeLibraryId} library.`, error);
            }
         }
      };
      fetchLibrary();
   }, [activeLibraryId, libraries]);

   const activeIcons = useMemo(() => {
      const allIcons = libraries[activeLibraryId] || [];
      if (!searchQuery) return allIcons;

      const query = searchQuery.toLowerCase();
      return allIcons.filter(
         (icon) => icon.name.toLowerCase().includes(query) || icon.tags.some((tag) => tag.toLowerCase().includes(query))
      );
   }, [libraries, activeLibraryId, searchQuery]);

   return (
      <div className="flex h-full w-full bg-background border rounded-lg overflow-hidden shadow-sm">
         {/* Sidebar - Library Selection & Cart Summary */}
         <aside className="w-64 border-r border-border/50 bg-muted/20 hidden md:flex flex-col">
            <div className="p-4 border-b border-border/50">
               <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Libraries</h2>
            </div>
            <div className="flex-1 p-2 overflow-y-auto">
               <div className="space-y-1">
                  {AVAILABLE_LIBRARIES.map((lib) => (
                     <button
                        key={lib.id}
                        onClick={() => setActiveLibraryId(lib.id)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                           activeLibraryId === lib.id
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                     >
                        {lib.name}
                     </button>
                  ))}
               </div>
            </div>

            {/* Cart Summary Header */}
            <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur">
               <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                     <h3 className="font-medium flex items-center gap-2">
                        <ShoppingCart size={16} /> Collection
                     </h3>
                     <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                        {cart?.length || 0}
                     </span>
                  </div>
                  {cart?.length > 0 && (
                     <button
                        onClick={clearCart}
                        className="text-[11px] text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors uppercase font-medium tracking-wider"
                     >
                        <Trash2 size={12} /> Clear
                     </button>
                  )}
               </div>
               <Button
                  variant="default"
                  className="w-full mt-2"
                  size="sm"
                  disabled={!cart?.length}
                  onClick={() => setExportModalOpen(true)}
               >
                  <Download size={14} className="mr-2" /> Export Icons
               </Button>
            </div>
         </aside>

         {/* Main Content Area */}
         <main className="flex-1 flex flex-col h-full bg-background min-w-0">
            {/* Topbar - Search & Filters */}
            <header className="p-4 border-b border-border/50 flex items-center justify-between shrink-0 gap-4 bg-muted/10">
               <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                     type="text"
                     placeholder={`Search ${activeIcons.length} icons in ${AVAILABLE_LIBRARIES.find((l) => l.id === activeLibraryId)?.name}...`}
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="pl-9 bg-background focus-visible:ring-1"
                  />
               </div>
               <div className="flex items-center gap-2 md:hidden">
                  {cart?.length > 0 && (
                     <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearCart}
                        className="text-destructive hover:text-destructive/80 mr-2 md:hidden"
                     >
                        <Trash2 size={16} />
                     </Button>
                  )}
                  {/* Mobile Cart Button */}
                  <Button variant="outline" size="sm" className="relative" onClick={() => setExportModalOpen(true)}>
                     <ShoppingCart size={16} />
                     {cart?.length > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                           {cart.length}
                        </span>
                     )}
                  </Button>
               </div>
            </header>

            {/* Icons Grid */}
            <div className="flex-1 p-6 overflow-y-auto">
               {activeIcons.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                     {activeIcons.map((icon) => {
                        const isSelected = cart?.some((c: IconData) => c.id === icon.id);
                        return (
                           <button
                              key={icon.id}
                              onClick={() => toggleInCart?.(icon)}
                              className={`group relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 aspect-square ${
                                 isSelected
                                    ? 'bg-primary/5 border-primary shadow-sm'
                                    : 'bg-background hover:bg-muted/50 border-border/40 hover:border-border'
                              }`}
                              title={icon.name}
                           >
                              <div
                                 className={`mb-3 transition-transform duration-200 ${isSelected ? 'scale-110 text-primary' : 'text-foreground group-hover:scale-110'}`}
                              >
                                 <svg
                                    width="24"
                                    height="24"
                                    viewBox={icon.viewBox || '0 0 24 24'}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    dangerouslySetInnerHTML={{ __html: icon.svg }}
                                 />
                              </div>
                              <span className="text-[10px] md:text-xs text-muted-foreground truncate w-full text-center group-hover:text-foreground transition-colors">
                                 {icon.name}
                              </span>

                              {isSelected && (
                                 <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-[2px]">
                                    <Check size={10} />
                                 </div>
                              )}
                           </button>
                        );
                     })}
                  </div>
               ) : (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-20">
                     <Search size={48} className="mb-4 opacity-20" />
                     <p>No icons found matching "{searchQuery}"</p>
                     <Button variant="link" onClick={() => setSearchQuery('')} className="mt-2 text-primary">
                        Clear Search
                     </Button>
                  </div>
               )}
            </div>
         </main>

         <ExportModal open={exportModalOpen} onOpenChange={setExportModalOpen} cart={cart} />
      </div>
   );
}
