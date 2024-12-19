import { Schema, model, Document } from 'mongoose';

export interface IStoreRegisteredId extends Document {
    storeRegistredId: string;
    apiKey: string;
    apiSecret: string;
}

// Schema for StoreRegisteredId
const storeRegisteredIdSchema = new Schema({
    storeRegistredId: { type: String, required: true, unique: true },
    apiKey: { type: String, required: true },
    apiSecret: { type: String, required: true },
}, { timestamps: true });

const StoreRegisteredId = model<IStoreRegisteredId>('StoreRegisteredId', storeRegisteredIdSchema);

export default StoreRegisteredId;
