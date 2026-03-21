import useSWR from 'swr';

const fetcher = () => fetch(process.env.NEXT_PUBLIC_ENDPOINT + `/news`).then((r) => r.json());

export function useNews() {
    const { data, error, isLoading } = useSWR(`/api/news/`, fetcher);

    return {
        data,
        isLoading,
        isError: error
    };
}
