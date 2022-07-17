import React from 'react'

import { useQuery } from 'react-query';
import axios from 'axios';
import { Apis } from '../../helpers/restApi';


type messageType={
    picture: string;
    fullName: string;
    messageText: string;
    time: string;
}
const fetchMessages = async () => {
    const data = await Apis.get_all({
        methode: 'GET',
        route: 'messages',
    })
    return data;
};


export const useMessages = () => {
    const retryIfQueryFails = 1
    
    const { data, error, isLoading, isError } = useQuery<messageType[], Error>('messages', fetchMessages, {
        retry: retryIfQueryFails
    });

    return { data, error, isLoading, isError }
}
