export const checkNotEmpty = value => typeof value !== 'string' || (typeof value === 'string' && value.length > 0);
