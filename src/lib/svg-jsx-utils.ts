export function convertSvgToJsx(svgString: string): string {
   if (!svgString || !svgString.trim()) return '';

   try {
      const parser = new DOMParser();
      // Ensure we have a valid browser environment
      if (typeof window === 'undefined') return '';

      const doc = parser.parseFromString(svgString, 'image/svg+xml');
      const parseError = doc.querySelector('parsererror');
      if (parseError) {
         return '// Error parsing SVG.\n// Please check for syntax errors in your SVG code.';
      }

      const toCamelCase = (str: string) => {
         if (str === 'class') return 'className';
         if (str === 'for') return 'htmlFor';
         // Keep data- and aria- attributes as kebab-case
         if (str.startsWith('data-') || str.startsWith('aria-')) return str;
         return str.replace(/([-_:][a-z])/g, (group) =>
            group.toUpperCase().replace('-', '').replace('_', '').replace(':', '')
         );
      };

      const processStyle = (styleStr: string): string => {
         const styles = styleStr.split(';').filter((s) => s.trim().length > 0);
         if (styles.length === 0) return '';

         const styleObj = styles
            .map((s) => {
               const [k, ...vParts] = s.split(':');
               const kStr = k.trim();
               const vStr = vParts.join(':').trim();
               if (kStr && vStr) {
                  const camelK = kStr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                  return `${camelK}: '${vStr}'`;
               }
               return '';
            })
            .filter(Boolean);

         return `{${styleObj.join(', ')}}`;
      };

      const processNode = (node: Node, indentLevel = 0): string => {
         const indent = '   '.repeat(indentLevel);

         if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent?.trim();
            return text ? `${indent}${text}\n` : '';
         }

         if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element;
            let openTag = `${indent}<${el.tagName}`;

            const attrs: string[] = [];
            for (let i = 0; i < el.attributes.length; i++) {
               const attr = el.attributes[i];
               const attrName = attr.name;
               // SVG sometimes includes namespace declarations. React handles them inconsistently.
               // Standard xmlns does not strictly need camelCase, but things like xmlns:xlink do.
               if (attrName === 'xmlns' && el.tagName === 'svg') {
                  attrs.push(`xmlns="${attr.value}"`);
                  continue;
               }

               const camelName = toCamelCase(attrName);

               if (camelName === 'style') {
                  const styleObjStr = processStyle(attr.value);
                  if (styleObjStr !== '') {
                     attrs.push(`style={${styleObjStr}}`);
                  }
               } else {
                  // Safely escape inner double quotes if any, though usually not present
                  const val = attr.value.replace(/"/g, '&quot;');
                  attrs.push(`${camelName}="${val}"`);
               }
            }

            if (attrs.length > 0) {
               openTag += ` ${attrs.join(' ')}`;
            }

            if (el.childNodes.length === 0) {
               return `${openTag} />\n`;
            }

            openTag += '>\n';
            let childrenJsx = '';
            for (let i = 0; i < el.childNodes.length; i++) {
               childrenJsx += processNode(el.childNodes[i], indentLevel + 1);
            }

            const closeTag = `${indent}</${el.tagName}>\n`;
            return openTag + childrenJsx + closeTag;
         }

         return '';
      };

      const rootSvg = doc.querySelector('svg');
      if (!rootSvg) return '// No <svg> tag found in the input.';

      const jsxBody = processNode(rootSvg, 1);

      return `export function SVGComponent(props) {\n   return (\n${jsxBody}   );\n}`;
   } catch (e) {
      console.error(e);
      return '// Error parsing SVG.';
   }
}
