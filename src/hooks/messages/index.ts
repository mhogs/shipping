import { useInfinitFetche } from '../../hooks/useFetche';
import { dialogResponseType, dialogType } from '../../@types';
import moment from 'moment';




export const useDialogs = (filter?: any) => {
    const PAGESIZE = 10
    const {
        results: data,
        isLoading,
        isFetchingNextPage: loading_more,
        fetchNextPage: loadMore,
        refetch,
        resultsCount
    } = useInfinitFetche<dialogResponseType>("my_dialogs","/chat/dialogs", filter, PAGESIZE)


    const dialogs: dialogType[] | undefined = data?.map(item => ({
        picture: item.other_user.picture,
        fullName: `${item.other_user.first_name} ${item.other_user.last_name}`,
        messageText: item.last_message?.text || "",
        time: item.last_message?.created ? moment.unix(item.last_message?.created).fromNow() : "",
        unread: item.unread_count > 0,
        sender: item.other_user
    }))
    // sort as unread first 
    dialogs.sort((a, b) => a.unread ? -1 : 1)

    return { dialogs, isLoading, loadMore, loading_more, refetch }
}