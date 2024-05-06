import { useEffect, useState } from "react";

export function useFetch(url){
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [insertData, setInsertData] = useState('');

    useEffect(() => {

        setIsLoading(true);

        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        //.then(json => console.log(json))
        .then((resData) => setData(resData.model))
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false))
    }, [])

    return { data, isLoading, error }

}