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