import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { currentUserType, userType } from "../@types";
import { USER_STORAGE_KEY } from "../constants";


export function listToMatrix(list: Array<any>, elementsPerSubArray: number) {
    let matrix: Array<Array<any>> = [], i, k;
    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }
        matrix[k].push(list[i]);
    }
    return matrix;
}
export async function getUserFromStorage(): Promise<currentUserType> {
    const user_str = await AsyncStorage.getItem(USER_STORAGE_KEY)
    if (user_str === null) return null
    const user: userType = JSON.parse(user_str)
    return user

}

export async function getAuthHeaders() {
    const user = await getUserFromStorage()
    return {
        Authorization: `JWT ${user?.access}`
    }
}
export function showErrorToast(message: any) {
    Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
        visibilityTime: 7000
    });
}



