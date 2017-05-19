/**
 * Check if the value is empty.
 * @param value value to check.
 */
export const checkNotEmpty = value => (Array.isArray(value) && value.length) ||
(typeof value === 'string' && value.length > 0) || (typeof value === 'object');
