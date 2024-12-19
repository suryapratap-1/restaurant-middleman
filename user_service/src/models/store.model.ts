import mongoose, { Document, Model, Schema } from "mongoose";

export interface IStore {
    storeRegistredId: string;
    posId: string;
    storeName: string;
    userDetails: mongoose.Types.ObjectId;
    address: mongoose.Types.ObjectId;
    paymentDetails: mongoose.Types.ObjectId,
    notificationPhone: string;
    openTime: string;
    closeTime: string;
    holidayList: Date[];
    partnerWith: string;
    partnerReferenceId: mongoose.Types.ObjectId;
    deliveryRange: number;
    storeStatus: "active" | "busy";
    translation?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IStoreDocument extends IStore, Document { }

interface IStoreModel extends Model<IStoreDocument> { }

const storeSchema = new Schema<IStoreDocument>(
    {
        storeRegistredId: { type: String },
        posId: { type: String, required: true },
        storeName: {
            type: String,
            maxlength: 50,
            required: true,
        },
        userDetails: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        address: {
            type: Schema.Types.ObjectId,
            ref: "Address",
        },
        notificationPhone: { type: String, required: true },
        openTime: { type: String, required: true },
        closeTime: { type: String, required: true },
        holidayList: { type: [Date], default: [] },
        partnerWith: { type: String, required: true },
        partnerReferenceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DeliveryPartner",
        },
        deliveryRange: { type: Number, default: 0 },
        storeStatus: {
            type: String,
            enum: ["active", "busy"],
            default: "active",
        },
        translation: { type: [String], default: [] },
    },
    { timestamps: true }
);

const Store = mongoose.model<IStoreDocument, IStoreModel>("Store", storeSchema);

export default Store;