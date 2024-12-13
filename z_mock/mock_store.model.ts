import mongoose from 'mongoose';

const timingSlotSchema = new mongoose.Schema({
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
});

const timingSchema = new mongoose.Schema({
    day: { type: String, required: true },
    slots: [timingSlotSchema],
});

const translationSchema = new mongoose.Schema({
    language: { type: String, required: true },
    name: { type: String, required: true },
});

const platformDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    platform_store_id: { type: String, required: true },
});

const storeSchema = new mongoose.Schema({
    city: { type: String, required: true },
    name: { type: String, required: true },
    min_pickup_time: { type: Number, required: true },
    min_delivery_time: { type: Number, required: true },
    contact_phone: { type: String, required: true },
    notification_phones: { type: [String], required: true },
    ref_id: { type: String, required: true },
    min_order_value: { type: Number, required: true },
    hide_from_ui: { type: Boolean, required: true },
    address: { type: String, required: true },
    notification_emails: { type: [String], required: true },
    zip_codes: { type: [String], required: true },
    geo_longitude: { type: Number, required: true },
    geo_latitude: { type: Number, required: true },
    active: { type: Boolean, required: true },
    ordering_enabled: { type: Boolean, required: true },
    translations: [translationSchema],
    excluded_platforms: { type: [String], default: [] },
    included_platforms: { type: [String], default: [] },
    platform_data: [platformDataSchema],
    timings: [timingSchema],
});

// Export the model
const Store = mongoose.model('Store', storeSchema);

export default Store;
