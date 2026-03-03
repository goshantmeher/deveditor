import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface SearchButtonProps {
   onClick: () => void;
   variant?: 'ghost' | 'default' | 'secondary';
   title?: string;
}
function SearchButton(props: SearchButtonProps) {
   return (
      <div className="search-button-wrapper">
         <Tooltip>
            <TooltipTrigger asChild>
               <div>
                  <Button
                     variant={props.variant || 'ghost'}
                     className="cursor-pointer"
                     size="sm"
                     onClick={props.onClick}
                     aria-label={props.title || 'Search'}
                  >
                     <Search />
                  </Button>
               </div>
            </TooltipTrigger>
            <TooltipContent>
               <p>{props.title || 'Search'}</p>
            </TooltipContent>
         </Tooltip>
      </div>
   );
}

export default SearchButton;
