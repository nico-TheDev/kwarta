import useSWR from 'swr';

const fetcher = (amount, year) =>
    fetch(`/api/investment/?initialDeposit=${amount}&period=${12}&subsequentDeposit=${1000}&targetYear=${year}`).then(
        (r) => r.json()
    );

export function useInvestment(initialDeposit, year) {
    const { data, error, isLoading } = useSWR(initialDeposit ? `/api/investment/` : null, () =>
        fetcher(initialDeposit, year)
    );

    return {
        data,
        isLoading,
        isError: error
    };
}
