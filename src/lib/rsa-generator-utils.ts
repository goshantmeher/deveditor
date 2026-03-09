/**
 * Utilities for generating RSA Public/Private Key pairs securely in the browser.
 */

export type RsaKeySize = 1024 | 2048 | 4096;
export type RsaFormat = 'PKCS8' | 'SPKI';

export interface RsaKeyPairPEM {
   publicKey: string;
   privateKey: string;
}

export async function generateRsaKeyPair(modulusLength: RsaKeySize = 2048): Promise<RsaKeyPairPEM> {
   if (typeof crypto === 'undefined' || !crypto.subtle) {
      throw new Error('Web Crypto API is not supported in this environment');
   }

   const keyPair = await crypto.subtle.generateKey(
      {
         name: 'RSA-OAEP',
         modulusLength,
         publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // 65537
         hash: 'SHA-256',
      },
      true,
      ['encrypt', 'decrypt']
   );

   const exportedPublicKey = await crypto.subtle.exportKey('spki', keyPair.publicKey);
   const exportedPrivateKey = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

   const pubPem = convertBufferToPem(exportedPublicKey, 'PUBLIC KEY');
   const privPem = convertBufferToPem(exportedPrivateKey, 'PRIVATE KEY');

   return {
      publicKey: pubPem,
      privateKey: privPem,
   };
}

function convertBufferToPem(buffer: ArrayBuffer, type: string): string {
   const base64 = arrayBufferToBase64(buffer);
   // Insert line breaks every 64 chars
   const formattedStr = base64.match(/.{1,64}/g)?.join('\n') || '';
   return `-----BEGIN ${type}-----\n${formattedStr}\n-----END ${type}-----`;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
   let binary = '';
   const bytes = new Uint8Array(buffer);
   const len = bytes.byteLength;
   for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
   }
   return btoa(binary);
}
