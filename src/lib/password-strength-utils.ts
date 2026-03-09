/**
 * Wrapper utility for zxcvbn password strength checker.
 */
import zxcvbn, { ZXCVBNResult } from 'zxcvbn';

export function checkPasswordStrength(password: string): ZXCVBNResult {
   if (!password) {
      return {
         score: 0,
         guesses: 0,
         guesses_log10: 0,
         calc_time: 0,
         crack_times_seconds: { online_throttling_100_per_hour: 0, online_no_throttling_10_per_second: 0, offline_slow_hashing_1e4_per_second: 0, offline_fast_hashing_1e10_per_second: 0 },
         crack_times_display: { online_throttling_100_per_hour: 'instant', online_no_throttling_10_per_second: 'instant', offline_slow_hashing_1e4_per_second: 'instant', offline_fast_hashing_1e10_per_second: 'instant' },
         sequence: [],
         feedback: { warning: '', suggestions: [] },
      };
   }
   return zxcvbn(password);
}
