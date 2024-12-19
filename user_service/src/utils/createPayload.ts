import argon2 from "argon2";
import { IStore } from "../models/store.model";

export const createStoreUpdatePayload = (inputData: any): Partial<IStore> => {

    const filteredData: any = {};

    for (const key in inputData) {
        if (inputData[key] !== undefined && inputData[key] !== null) {
            filteredData[key] = inputData[key];
        }
    }

    return filteredData;

}
export const createAdminUpdatePayload = async (inputData: any): Promise<Partial<any>> => {

    const filteredData: any = {};

    for (const key in inputData) {
        if (inputData[key] !== undefined && inputData[key] !== null) {
            // If the key is "password", hash it before adding to filteredData
            if (key === "password") {
                filteredData[key] = await argon2.hash(inputData[key]);
            } else {
                filteredData[key] = inputData[key];
            }
        }
    }

    return filteredData;
}