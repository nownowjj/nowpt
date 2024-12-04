import {useQueryClient} from "react-query";

export const useCustomQueryClient = () => {
    const queryClient = useQueryClient();


    const invalidateQueries = (...queryKeys: (string | (string | number)[])[]) => {
        queryKeys.forEach(key => {
            queryClient.invalidateQueries(key).then(r => console.log(`remove : "${queryKeys}"`));
        });
    };

    const clearCache =()=>{
        queryClient.clear();
    }

    return { invalidateQueries , clearCache };
};