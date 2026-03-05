import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';

export function JwtDecoderSeoContent() {
   const faqs = [
      {
         question: 'What is a JSON Web Token (JWT)?',
         answer:
            'A JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.',
      },
      {
         question: 'Why decode a JWT locally?',
         answer:
            'JWTs often contain sensitive authentication claims regarding users and their permissions. By decoding a JWT locally in your browser instead of sending it to an external server-side tool, you guarantee that your sensitive authentication tokens cannot be intercepted, logged, or misused by third parties.',
      },
      {
         question: 'What information is inside a JWT?',
         answer:
            'A JWT consists of three parts concatenated by dots (.): Header, Payload, and Signature. The Header contains metadata about the token (such as the signing algorithm). The Payload contains the actual "claims" (statements about an entity such as user ID, role, or expiration time). The Signature is used to verify that the sender of the JWT is who it says it is and to ensure the message wasn\'t changed along the way.',
      },
      {
         question: 'Can you edit the payload of a JWT?',
         answer:
            'While you can decode and edit the payload text of a JWT, doing so invalidates its digital signature. The receiving server will check the signature against the payload, and if it detects any tampering or changes to the payload or header that do not align with the cryptographic signature, it will reject the token entirely.',
      },
      {
         question: 'Does this tool verify the signature?',
         answer:
            'No. This tool is strictly a client-side JWT Decoder for debugging. Verifying a JWT\'s signature requires the private signing key or secret, which is safely kept on the authorization server. This tool structures and parses the data, but it assumes the token signature must be checked independently by your backend layers.',
      },
   ];

   return (
      <div className="container mx-auto px-4 max-w-5xl text-foreground">
         <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold mb-4">
               JWT Decoder — Inspect and Debug JSON Web Tokens Locally
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
               Safely decode your Authentication and API JSON Web Tokens natively within your browser. 
               Transform unreadable Base64Url-encoded strings into beautifully formatted JSON structures instantly.
            </p>
         </div>

         <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-muted/10 border-border/40 hover:bg-muted/20 transition-colors">
               <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                     <span className="text-primary">🛡️</span> Fully Client-Side & Secure
                  </CardTitle>
               </CardHeader>
               <CardContent className="text-sm text-muted-foreground space-y-4">
                  <p>
                     When dealing with authorization layers and Identity Providers (IdP), developers 
                     frequently need to inspect what data (Claims) a JWT authorization bearer token contains to debug 
                     role-based access issues.
                  </p>
                  <p>
                     However, pasting sensitive production API tokens into random third-party cloud tools poses a massive 
                     security violation. Our JWT Decoder parses everything <strong>locally via JavaScript</strong>. The tokens never leave your 
                     computer or touch our servers, protecting your users and architecture.
                  </p>
               </CardContent>
            </Card>

            <Card className="bg-muted/10 border-border/40 hover:bg-muted/20 transition-colors">
               <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                     <span className="text-primary">🕒</span> Human Readable Claims
                  </CardTitle>
               </CardHeader>
               <CardContent className="text-sm text-muted-foreground space-y-4">
                  <p>
                     JWT payloads store temporal information heavily—such as the creation time (`iat`), 
                     expiration time (`exp`), and "Not Before" boundaries (`nbf`). These are almost universally stored as 
                     Unix Time milliseconds, which are impossible for humans to read natively.
                  </p>
                  <p>
                     Our inspector automatically looks for these standardized time-based claims and elegantly formats 
                     them into local, readable timestamps alongside relative "time ago" counts to easily answer, 
                     <em>"Has this token expired yet?"</em>
                  </p>
               </CardContent>
            </Card>
         </div>

         <div className="max-w-3xl mx-auto bg-card rounded-xl border border-border/50 p-6 shadow-sm mb-8">
            <h3 className="text-xl font-semibold mb-6 text-center">
               Frequently Asked Questions
            </h3>
            <Accordion type="single" collapsible className="w-full">
               {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                     <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                     </AccordionTrigger>
                     <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                     </AccordionContent>
                  </AccordionItem>
               ))}
            </Accordion>
         </div>
      </div>
   );
}
