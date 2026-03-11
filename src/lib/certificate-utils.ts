import forge from 'node-forge';

export interface CertificateDetails {
   subject: Record<string, string>;
   issuer: Record<string, string>;
   validFrom: string;
   validTo: string;
   serialNumber: string;
   signatureAlgorithm: string;
   publicKey: {
      algorithm: string;
      bitLength?: number;
   };
   extensions: Array<{
      name: string;
      value: string;
   }>;
   fingerprints: {
      sha1: string;
      sha256: string;
   };
}

/**
 * Normalizes forge attributes (like commonName, organizationName) into a readable record
 */
function normalizeAttributes(attributes: forge.pki.CertificateField[]): Record<string, string> {
   const res: Record<string, string> = {};
   attributes.forEach((attr) => {
      const name = (attr.shortName || attr.name) as string | undefined;
      if (name) {
         res[name] = String(attr.value);
      }
   });
   return res;
}

/**
 * Parses a PEM formatted certificate string
 */
export function parseCertificate(pem: string): CertificateDetails {
   try {
      const cert = forge.pki.certificateFromPem(pem);

      const details: CertificateDetails = {
         subject: normalizeAttributes(cert.subject.attributes),
         issuer: normalizeAttributes(cert.issuer.attributes),
         validFrom: cert.validity.notBefore.toISOString(),
         validTo: cert.validity.notAfter.toISOString(),
         serialNumber: cert.serialNumber,
         signatureAlgorithm: forge.pki.oids[cert.siginfo.algorithmOid as keyof typeof forge.pki.oids] || cert.siginfo.algorithmOid,
         publicKey: {
            algorithm: 'RSA', // forge default if rsa
         },
         extensions: cert.extensions.map((ext) => ({
            name: ext.name || ext.id,
            value: String(ext.value || ''),
         })),
         fingerprints: {
            sha1: '',
            sha256: '',
         },
      };

      // Try to get public key bit length
      if (cert.publicKey) {
         const pk = cert.publicKey as unknown as { n?: { bitLength: () => number } };
         if (pk.n) {
            details.publicKey.bitLength = pk.n.bitLength();
         }
      }

      // Fingerprints
      const der = forge.asn1.toDer(forge.pki.certificateToAsn1(cert)).getBytes();
      
      const mdSha1 = forge.md.sha1.create();
      mdSha1.update(der);
      details.fingerprints.sha1 = mdSha1.digest().toHex().match(/.{2}/g)?.join(':').toUpperCase() || '';

      const mdSha256 = forge.md.sha256.create();
      mdSha256.update(der);
      details.fingerprints.sha256 = mdSha256.digest().toHex().match(/.{2}/g)?.join(':').toUpperCase() || '';

      return details;
   } catch (error) {
      console.error('Forge parse error:', error);
      throw new Error('Invalid certificate format or unsupported PEM.');
   }
}
