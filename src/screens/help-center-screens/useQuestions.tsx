import React from 'react'

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';



export type QuestionType={
    title: string;
    content: string;
}



export const useQuestions = () => {
    const retryIfQueryFails = 1
    
    const { data, error, isLoading, isError } = useQuery<QuestionType[], Error>('questions', fetchQuestions, {
        retry: retryIfQueryFails
    });

    return { data, error, isLoading, isError }
}
