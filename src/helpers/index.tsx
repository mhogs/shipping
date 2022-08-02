import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { Platform } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import Toast from "react-native-toast-message";
import { currentUserType, MessageResponseType, MessageSocketResponseType, userType } from "../@types";
import { USER_STORAGE_KEY } from "../constants";
import * as ImagePicker from 'expo-image-picker';

export async function ChoosePhotoFromMediaLib() {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
    });
    if (result.cancelled) return;
    let localUri = result.uri;
    let filename = localUri.split('/').pop() || new Date().toString();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    return { uri: localUri, name: filename, type }
};
export async function TakePhoto() {
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
    });
    if (result.cancelled) return;
    let localUri = result.uri;
    let filename = localUri.split('/').pop() || new Date().toString();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    return { uri: localUri, name: filename, type }
};

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
export function matrixToList<T>(table?: T[][]): T[] {
    if (!table) return []
    const arr: T[] = [];
    for (const row of table) {
        for (const item of row)
            arr.push(item);
    }
    return arr
}


export const createFormData = (body: any) => {
    const data = new FormData();

    Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
    });

    return data;
};

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
export function showErrorToast(status: string, detail: string) {
    Toast.show({
        type: 'error',
        text1: status,
        text2: detail,
    });
}
export function showsuccessToast(message: string) {
    Toast.show({
        type: 'success',
        text1: "Ok",
        text2: message,
    });
}

export function formatMessageApiResponse_To_IMessage(msg: MessageResponseType, currentUserId?: number): IMessage {
    return {
        _id: msg.id,
        text: msg.text,
        createdAt: moment.unix(msg.created).toDate(),
        user: {
            _id: currentUserId === msg.sender.id ? 1 : 2,
            name: msg.sender_username,
            avatar: msg.sender.picture
        },
        received: msg.read,
        sent: true,
    }
}
export function generateRondomMessageID() {
    return - Math.floor(Math.random() * 100000)
}

export function formatSocketMessage_To_IMessage(msg: MessageSocketResponseType): IMessage {
    return {
        _id: msg.random_id,
        text: msg.text,
        createdAt: new Date(),
        user: {
            _id: 2,
            name: msg.sender_username,

        },
        received: true
    }
}


export function extractErrorMessage(errorResponse: any): { status: string, detail: string } {

    const errorData = errorResponse.response?.data


    const errorStatus: "400" | "404" | "301" | "500" = errorResponse.response?.status
    const ERRORS_STATUS_MAP = {
        "400": "Bad Request",
        "404": "Not Found",
        "301": "Unautherized",
        "500": "Server Error"
    }
    let errMessage = ""
    if (errorData !== undefined) {
        errMessage = errorData.detail
        if (!errMessage) {
            errMessage = Object.values(errorData).map((item: any) => {
                if (typeof (item) === "string") return item
                if (item.length) return item[0]
            })[0]
        }
    }
    return { status: ERRORS_STATUS_MAP[errorStatus], detail: errMessage }
}




