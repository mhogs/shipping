import React from 'react'

import { useQuery } from 'react-query';
import axios from 'axios';
import { Apis } from '../../helpers/restApi';


export type QuestionType={
    title: string;
    content: string;
}
const fetchQuestions = async () => {
    const data = await Apis.get_all({
        methode: 'GET',
        route: 'questions',
    })
    return data;
};


export const useQuestions = () => {
    const retryIfQueryFails = 1
    
    const { data, error, isLoading, isError } = useQuery<QuestionType[], Error>('questions', fetchQuestions, {
        retry: retryIfQueryFails
    });

    return { data, error, isLoading, isError }
}
