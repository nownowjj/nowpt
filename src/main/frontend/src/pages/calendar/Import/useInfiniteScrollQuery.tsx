import {useInfiniteQuery} from "react-query";
import {selectImportRecordPaging} from "../../../api/CalendarApi";

export const useInfiniteScrollQuery = () => {
    const fetchRecord = async ({pageParam = 0}) =>{
        const result = await selectImportRecordPaging(pageParam)
        const data = result.data;
        return {resultList : data.content , number:data.number , isLast : data.last}
    }

    const {
        data: queryResult,
        fetchNextPage: getNextPage,
        isSuccess: getIsSuccess,
        hasNextPage: getNextPageIsPossible,
        isFetching,
        isLoading
    } = useInfiniteQuery(
        ["importRecord"], // data 이름(queryKey)
        // ({pageParam=0}) =>
        fetchRecord ,{
            getNextPageParam: (lastPage) => {
                return !lastPage.isLast ? lastPage.number + 1 : undefined
            },
        }
    );

    return { queryResult, getNextPage, getIsSuccess, getNextPageIsPossible , isFetching , isLoading };
};