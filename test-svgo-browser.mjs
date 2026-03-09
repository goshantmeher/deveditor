import { optimize } from 'svgo/browser';

const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="lucide lucide-sparkles">
<path d="M5 3v4"/>
</svg>`;

const result = optimize(SAMPLE_SVG, {
    multipass: true,
         plugins: [
            {
               name: 'preset-default',
               params: {
                  overrides: {
                     removeUnknownsAndDefaults: false,
                  },
               },
            },
            'sortAttrs',
         ],
});
console.log(result.data);
