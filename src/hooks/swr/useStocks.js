import useSWR from 'swr';

const fetcher = () => fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/stocks').then((r) => r.json());

export function useStocks() {
    const { data, error, isLoading } = useSWR(`/api/stocks/`, fetcher);

    return {
        data,
        isLoading,
        isError: error
    };
}
