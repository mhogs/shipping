import React from 'react'

import { useQuery } from 'react-query';
import axios from 'axios';
import { Apis } from '../../helpers/restApi';
import { orderHistoryType } from './orders-list-scene';

const fetchOrders = async () => {

    const data = await Apis.get_all({
        methode: 'GET',
        route: 'orders',
    })
    return data;
};


export const useOrdersHistory = () => {
    const retryIfQueryFails = 1
    
    const { data, error, isLoading, isError } = useQuery<orderHistoryType[], Error>('orders', fetchOrders, {
        retry: retryIfQueryFails
    });

    return { data, error, isLoading, isError }
}
