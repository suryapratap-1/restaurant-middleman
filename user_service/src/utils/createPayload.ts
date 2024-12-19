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
export const createAdminUpdatePayload = (inputData: any): Partial<any> => {

    const filteredData: any = {};

    for (const key in inputData) {
        if (inputData[key] !== undefined && inputData[key] !== null) {
            filteredData[key] = inputData[key];
        }
    }

    return filteredData;
}