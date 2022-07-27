import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { OrdersResponseDataType } from '../../@types';
import { OrdersServices } from '../../services';




export const useOrdersHistory = () => {
    const retryIfQueryFails = 1

    const { data, error, isLoading, isError,refetch } = useQuery<OrdersResponseDataType[], Error>(
       [ "orders_history"],
        OrdersServices.fetchOrders,
        {
            retry: retryIfQueryFails, 
        }
    );
        
    return { data, error, isLoading, isError,refetch }
}
