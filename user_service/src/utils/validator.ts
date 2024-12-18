import mongoose from "mongoose";

export const validateUserData = (userData: any): void => {
    const {
        firstName,
        lastName,
        email,
        password,
        phone,
        role,
    } = userData;

    // Validate first name
    if (!firstName || firstName.trim().length < 2) {
        throw new Error("First name is required and must be at least 2 characters long.");
    }

    // Validate last name
    if (!lastName || lastName.trim().length < 2) {
        throw new Error("Last name is required and must be at least 2 characters long.");
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        throw new Error("A valid email is required.");
    }

    // Validate password
    if (!password || password.length < 6) {
        throw new Error("Password is required and must be at least 6 characters long.");
    }

    // Validate phone
    const phoneRegex = /^[0-9]{10,15}$/; // Example: allows 10 to 15 digits
    if (!phone || !phoneRegex.test(phone)) {
        throw new Error("A valid phone number is required and must be between 10 to 15 digits.");
    }

    // Validate role
    const validRoles = ["super_admin", "admin", "manager", "staff"];
    if (!role || !validRoles.includes(role)) {
        throw new Error(`Role is required and must be one of: ${validRoles.join(", ")}`);
    }
};


export const validateAddressData = (addressData: any): void => {
    const {
        location,
        city,
        state,
        country,
        postal_code,
        geo_longitude,
        geo_latitude,
    } = addressData;

    // Check required fields
    if (!location || location.trim().length < 2) {
        throw new Error("Location is required and must be at least 2 characters long.");
    }

    if (!city || city.trim().length < 2) {
        throw new Error("City is required and must be at least 2 characters long.");
    }

    if (!state || state.trim().length < 2) {
        throw new Error("State is required and must be at least 2 characters long.");
    }

    if (!country || country.trim().length < 2) {
        throw new Error("Country is required and must be at least 2 characters long.");
    }

    if (!postal_code || !/^[0-9]{5,10}$/.test(postal_code)) {
        throw new Error("Postal code is required and must be a numeric value between 5 and 10 digits.");
    }

    if (geo_longitude === undefined || geo_longitude < -180 || geo_longitude > 180) {
        throw new Error("Longitude is required and must be between -180 and 180.");
    }

    if (geo_latitude === undefined || geo_latitude < -90 || geo_latitude > 90) {
        throw new Error("Latitude is required and must be between -90 and 90.");
    }
};

export const validateStoreData = (storeData: any): void => {
    const {
        storeName,
        notificationPhone,
        openTime,
        closeTime,
        partnerWith,
        partnerReferenceId,
        deliveryRange,
        storeStatus,
    } = storeData;

    // Validate store name
    if (!storeName || storeName.trim().length === 0 || storeName.length > 50) {
        throw new Error("Store name is required and must not exceed 50 characters.");
    }

    // Validate notification phone
    const phoneRegex = /^[0-9]{10,15}$/; // Example: allows 10 to 15 digits
    if (!notificationPhone || !phoneRegex.test(notificationPhone)) {
        throw new Error("A valid notification phone number is required (10-15 digits).");
    }

    // Validate open time and close time
    // const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Format: HH:mm (24-hour format)
    const timeRegex = /^([01]?[0-9]|12):([0-5][0-9]) (AM|PM)$/; 
    if (!openTime || !timeRegex.test(openTime)) {
        throw new Error("A valid open time is required (format: HH:mm AM/PM)");
    }
    if (!closeTime || !timeRegex.test(closeTime)) {
        throw new Error("A valid close time is required (format: HH:mm AM/PM)");
    }

    // Validate partnerWith
    if (!partnerWith || partnerWith.trim().length === 0) {
        throw new Error("Partner information is required.");
    }

    // Validate partnerReferenceId
    if (partnerReferenceId && !mongoose.isValidObjectId(partnerReferenceId)) {
        throw new Error("Invalid partner reference ID.");
    }

    // Validate delivery range
    if (deliveryRange !== undefined && (typeof deliveryRange !== "number" || deliveryRange < 0)) {
        throw new Error("Delivery range must be a non-negative number.");
    }

    // Validate store status
    const validStatuses = ["active", "busy"];
    if (storeStatus && !validStatuses.includes(storeStatus)) {
        throw new Error(`Store status must be one of: ${validStatuses.join(", ")}`);
    }
};
