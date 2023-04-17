import useSWR from 'swr';

const fetcher = () => fetch(`/api/news/`).then((r) => r.json());

export function useNews() {
    const { data, error, isLoading } = useSWR(`/api/news/`, fetcher);

    return {
        data,
        isLoading,
        isError: error
    };
}
