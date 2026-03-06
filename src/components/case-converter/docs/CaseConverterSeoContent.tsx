import React from 'react';

export function CaseConverterSeoContent() {
   return (
      <article className="max-w-4xl mx-auto px-4 prose prose-slate dark:prose-invert">
         <h1 className="text-3xl font-bold mb-6">
            Case Converter: Transform Text into camelCase, snake_case, and More
         </h1>

         <p className="lead text-lg mb-8">
            DevEditor's free online <strong>Case Converter</strong> tool helps developers format strings, variables, and
            entire blocks of text into standard programming cases. Switch seamlessly between camelCase, snake_case,
            PascalCase, and other formats without sending any data to a server.
         </p>

         <div className="grid md:grid-cols-2 gap-8 my-10">
            <div className="bg-muted/10 p-6 rounded-lg border border-border/50">
               <h3 className="font-semibold text-xl mb-4 text-primary">Supported Programming Cases</h3>
               <ul className="space-y-2 mt-0">
                  <li>
                     <strong>camelCase</strong>: <code>myVariableName</code> - Popular in JavaScript and Java.
                  </li>
                  <li>
                     <strong>PascalCase</strong>: <code>MyVariableName</code> - Common for classes and components.
                  </li>
                  <li>
                     <strong>snake_case</strong>: <code>my_variable_name</code> - Standard in Python and Ruby.
                  </li>
                  <li>
                     <strong>CONSTANT_CASE</strong>: <code>MY_VARIABLE_NAME</code> - Used for constants in many
                     languages.
                  </li>
                  <li>
                     <strong>kebab-case</strong>: <code>my-variable-name</code> - Common in URLs and CSS identifiers.
                  </li>
               </ul>
            </div>

            <div className="bg-muted/10 p-6 rounded-lg border border-border/50">
               <h3 className="font-semibold text-xl mb-4 text-primary">Supported Text Formats</h3>
               <ul className="space-y-2 mt-0">
                  <li>
                     <strong>Sentence case</strong>: Capitalizes only the first letter of the string.
                  </li>
                  <li>
                     <strong>Title Case</strong>: Capitalizes the first letter of every word.
                  </li>
                  <li>
                     <strong>lowercase</strong>: Converts all letters to lowercase.
                  </li>
                  <li>
                     <strong>UPPERCASE</strong>: Converts all letters to uppercase.
                  </li>
                  <li>
                     <strong>dot.case & path/case</strong>: Formats strings with dots or slashes.
                  </li>
               </ul>
            </div>
         </div>

         <h2 className="text-2xl font-semibold mt-10 mb-4">How to Use the Case Converter</h2>
         <ol className="space-y-3">
            <li>
               <strong>Paste your text:</strong> Enter a single string, a sentence, or multiple lines of variable names
               spanning a whole block of code into the input pane.
            </li>
            <li>
               <strong>Select your target case:</strong> Choose your desired output format from the toolbar dropdown
               (e.g., camelCase, snake_case).
            </li>
            <li>
               <strong>Copy the result:</strong> The tool instantly processes your text, preserving original line
               breaks. Click 'Copy' to copy the converted format.
            </li>
         </ol>

         <h2 className="text-2xl font-semibold mt-10 mb-4">Privacy First: 100% Client-Side Conversion</h2>
         <p>
            This <strong>Case Converter</strong> runs entirely within your browser using JavaScript. When you paste your
            text, variables, or code snippets, they stay completely safe because{' '}
            <strong>no data is ever transmitted to a server</strong>.
         </p>

         <h2 className="text-xl font-semibold mt-8 mb-4">Smart Tokenization Engine</h2>
         <p>
            Unlike simple <code>toLowerCase()</code> tools, our converter uses an advanced tokenization engine capable
            of automatically splitting apart incorrectly formatted humps like <code>XMLParser</code> or decoding
            space-delimited text. This makes it perfect for converting APIs that use snake_case into frontend-friendly
            camelCase responses instantly.
         </p>

         <div className="mt-12 text-sm text-muted-foreground border-t border-border/50 pt-6">
            <p>
               Looking for other text manipulation tools? Check out DevEditor's{' '}
               <a href="/base64-encoder" className="text-primary hover:underline">
                  Base64 Encoder
               </a>{' '}
               or explore the full suite of{' '}
               <a href="/" className="text-primary hover:underline">
                  Developer Tools
               </a>
               .
            </p>
         </div>
      </article>
   );
}
