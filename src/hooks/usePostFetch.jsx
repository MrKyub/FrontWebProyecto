import { useState } from "react";

export function usePostFetch(url, type){
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const executePost = (payload) => {
        setIsLoading(true)
        setError(null)
        setData(null)

        let options = {
            method: type,
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(payload)

        }

        fetch(url, options)
        .then((response) => response.json())
        .then((resData) => setData(resData.model))
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false))

    }

    return { data, isLoading, error, executePost }

}