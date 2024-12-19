// utils/tokenUtils.ts
import jwt from 'jsonwebtoken';
import { config } from '../config/variables.config';
import StoreRegisteredId from '../models/storeRegistered.model';

export const generateToken = (payload: string | object): any => {
    return jwt.sign(payload, config.jwtSecret as string, { expiresIn: config.jwtExpiration as string });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, config.jwtSecret!);
    } catch {
        return null;
    }
};

// Validate API Key and Secret
export const validateApiKeyAndSecret = async (apiKey: string, apiSecret: string): Promise<any> => {
    const store = await StoreRegisteredId.findOne({ apiKey });
    if (!store || store.apiSecret !== apiSecret) {
        throw new Error('Invalid API key or secret');
    }

    return store;
}