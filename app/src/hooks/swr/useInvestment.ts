import useSWR from 'swr';

const fetcher = (initialDeposit: string, year: string) =>
    fetch(`/api/investment/?initialDeposit=${initialDeposit}&period=12&subsequentDeposit=1000&targetYear=${year}`).then(
        (r) => r.json()
    );

export function useInvestment(initialDeposit: string | undefined, year: string | undefined) {
    const { data, error, isLoading } = useSWR(
        initialDeposit ? `/api/investment/` : null,
        () => fetcher(initialDeposit!, year!)
    );

    return { data, isLoading, isError: error };
}
