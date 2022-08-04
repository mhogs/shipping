import React from 'react'
import { ServiceType } from '../../@types'
import { useFetcher } from '../useFetcher'

export const useServices = () => {

    const result = useFetcher<ServiceType>('services', '/orders/services', { retry: 1 })

    return result
}
