export function Base64EncoderSeoContent() {
   return (
      <div className="max-w-4xl mx-auto px-4 text-muted-foreground text-sm leading-relaxed space-y-8">
         <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">What is Base64 Encoding?</h2>
            <p>
               Base64 is a binary-to-text encoding scheme that converts binary data into a string of ASCII characters.
               It uses 64 printable characters (A-Z, a-z, 0-9, +, /) plus <code>=</code> for padding. Base64 encoding
               increases data size by approximately 33%, but ensures the data can be safely transmitted through
               text-based protocols like HTTP, email (MIME), and JSON.
            </p>
         </section>

         <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Common Use Cases</h2>
            <ul className="list-disc list-inside space-y-2">
               <li>
                  <strong className="text-foreground">API Authentication:</strong> HTTP Basic Auth encodes credentials
                  as <code>username:password</code> in Base64.
               </li>
               <li>
                  <strong className="text-foreground">Data URIs:</strong> Embed images, fonts, or other assets directly
                  in HTML and CSS using <code>data:image/png;base64,...</code> syntax.
               </li>
               <li>
                  <strong className="text-foreground">Email Attachments:</strong> MIME encoding uses Base64 to safely
                  transmit binary files through email.
               </li>
               <li>
                  <strong className="text-foreground">JSON Payloads:</strong> Binary data embedded in JSON APIs is
                  typically Base64-encoded since JSON is text-only.
               </li>
               <li>
                  <strong className="text-foreground">JWT Tokens:</strong> JSON Web Tokens use URL-safe Base64 to encode
                  the header and payload segments.
               </li>
            </ul>
         </section>

         <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Standard vs URL-safe Base64</h2>
            <p className="mb-3">
               Standard Base64 uses <code>+</code> and <code>/</code> characters, which have special meaning in URLs.
               URL-safe Base64 (RFC 4648 §5) replaces these with <code>-</code> and <code>_</code>, and typically omits
               padding (<code>=</code>), making it safe for use in URLs, filenames, and other contexts where special
               characters cause problems.
            </p>
            <div className="overflow-x-auto">
               <table className="w-full text-xs border border-border/30 rounded-lg">
                  <thead>
                     <tr className="bg-muted/20">
                        <th className="px-4 py-2 text-left text-foreground">Feature</th>
                        <th className="px-4 py-2 text-left text-foreground">Standard</th>
                        <th className="px-4 py-2 text-left text-foreground">URL-safe</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr className="border-t border-border/20">
                        <td className="px-4 py-2">Character 62</td>
                        <td className="px-4 py-2">
                           <code>+</code>
                        </td>
                        <td className="px-4 py-2">
                           <code>-</code>
                        </td>
                     </tr>
                     <tr className="border-t border-border/20">
                        <td className="px-4 py-2">Character 63</td>
                        <td className="px-4 py-2">
                           <code>/</code>
                        </td>
                        <td className="px-4 py-2">
                           <code>_</code>
                        </td>
                     </tr>
                     <tr className="border-t border-border/20">
                        <td className="px-4 py-2">Padding</td>
                        <td className="px-4 py-2">
                           Required (<code>=</code>)
                        </td>
                        <td className="px-4 py-2">Optional / Removed</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </section>

         <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">About This Tool</h2>
            <p>
               This free online Base64 encoder/decoder supports text encoding and decoding with multiple character sets
               (UTF-8, ASCII, Latin-1), file-to-Base64 conversion with automatic image preview and data URI generation,
               and URL-safe Base64 variants. All processing is done entirely in your browser — no data is sent to any
               server.
            </p>
         </section>
      </div>
   );
}
