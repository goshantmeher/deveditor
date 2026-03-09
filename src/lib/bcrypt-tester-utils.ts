import bcrypt from 'bcryptjs';

export async function compareBcrypt(plaintext: string, hash: string): Promise<boolean> {
   if (!plaintext || !hash) return false;
   try {
      // bcrypt.compare is usually async in the npm package
      // bcryptjs compare is also async or sync depending on usage
      return await new Promise((resolve) => {
         bcrypt.compare(plaintext, hash, (err, result) => {
            if (err) resolve(false);
            else resolve(result || false);
         });
      });
   } catch {
      return false;
   }
}

export async function hashBcrypt(plaintext: string, rounds: number = 10): Promise<string> {
   if (!plaintext) return '';
   return await new Promise((resolve) => {
      bcrypt.hash(plaintext, rounds, (err, result) => {
         if (err) resolve('');
         else resolve(result || '');
      });
   });
}
