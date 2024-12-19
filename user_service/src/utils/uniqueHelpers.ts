import crypto from 'crypto';

// Generate a unique storeRegistredId (could be a combination of random string and timestamp)
export const generateUniqueId = (): string => {
    return `STORE-${crypto.randomBytes(16).toString('hex').toUpperCase()}-${Date.now()}`;
};

// Generate a secure API key (base64 encoded string)
export const generateApiKey = (): string => {
    return crypto.randomBytes(32).toString('base64');
};

// Generate a secure API secret (base64 encoded string)
export const generateApiSecret = (): string => {
    return crypto.randomBytes(64).toString('base64');
};
