export const checkNotEmpty = value => (Array.isArray(value) && value.length) ||
(typeof value === 'string' && value.length > 0);
