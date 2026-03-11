export interface IconData {
   id: string;
   name: string;
   tags: string[];
   svg: string; // Inner SVG content (e.g. <path ... />)
   viewBox: string;
}

export interface IconLibrary {
   id: string;
   name: string;
   author: string;
   license: string;
   url: string;
   icons: IconData[];
}
