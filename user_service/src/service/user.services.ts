import { Types } from 'mongoose';
import User from '../models/user.model';
import Store, { IStoreDocument } from '../models/store.model';
import Address from '../models/address.model';
import storeRegisteredIdSchema from '../models/storeRegistered.model';
import { generateUniqueId, generateApiKey, generateApiSecret } from '../utils/uniqueHelpers';
import { hashPassword } from '../utils/argon2.utils';
import { validateAddressData, validateStoreData, validateUserData } from '../utils/validator';

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    profilePicture?: string;
    role: 'super_admin' | 'admin' | 'manager' | 'staff';
    restaurantId: Types.ObjectId;
}

interface IStore {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    profilePicture?: string;
    role: 'super_admin' | 'admin' | 'manager' | 'staff';
    storeDetails: {
        storeName: string;
        posId: string;
        notificationPhone: string;
        openTime: string;
        closeTime: string;
        holidayList?: Date[];
        partnerWith: string;
        partnerReferenceId?: Types.ObjectId;
        deliveryRange?: number;
        storeStatus?: 'active' | 'busy';
        translation?: string[];
    };
    addressDetails: {
        location: string;
        city: string;
        state: string;
        country: string;
        postal_code: string;
        geo_longitude: number;
        geo_latitude: number;
    };
}

export const createAdminOrSuperAdmin = async (userData: IUser): Promise<IUser> => {
    const { firstName, lastName, email, password, phone, profilePicture, role } = userData;

    validateUserData({ firstName, lastName, email, password, phone, role });

    const hashedPassword = await hashPassword(password);

    const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        profilePicture,
        role,
        restaurantId: null,  // Admins don't have stores
    });

    await user.save();
    return user;
};

export const createManagerOrStaff = async (storeData: IStore): Promise<IStoreDocument> => {
    const { firstName, lastName, email, password, phone, profilePicture, role, storeDetails, addressDetails } = storeData;

    validateUserData({ firstName, lastName, email, password, phone, role });
    validateAddressData(addressDetails);
    validateStoreData(storeDetails);

    const hashedPassword = await hashPassword(password);

    // Generate unique storeRegistredId
    const storeRegistredId = generateUniqueId();

    // Generate API Key and API Secret
    const apiKey = generateApiKey();
    const apiSecret = generateApiSecret();

    // Create the Address
    const address = new Address(addressDetails);
    await address.save();

    // Create the Store
    const store = new Store({
        storeName: storeDetails.storeName,
        storeRegistredId: null,
        posId: storeDetails.posId,
        userDetails: null,
        address: address._id,
        notificationPhone: storeDetails.notificationPhone,
        openTime: storeDetails.openTime,
        closeTime: storeDetails.closeTime,
        holidayList: storeDetails.holidayList || [],
        partnerWith: storeDetails.partnerWith,
        partnerReferenceId: storeDetails.partnerReferenceId,
        deliveryRange: storeDetails.deliveryRange || 0,
        storeStatus: storeDetails.storeStatus || 'active',
        translation: storeDetails.translation || [],
    });

    // Create the User
    const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        profilePicture,
        role,
        restaurantId: store._id
    });

    // Save the generated values into the StoreRegisteredId collection
    const storeRegIdRecord = new storeRegisteredIdSchema({
        storeRegistredId,
        apiKey,
        apiSecret,
    });
    await storeRegIdRecord.save();

    store.userDetails = user._id as Types.ObjectId;
    store.storeRegistredId = storeRegIdRecord.storeRegistredId as string;
    await store.save();
    await user.save();

    return store;
};
