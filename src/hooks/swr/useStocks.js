import { marketSnapshot } from 'data/market-snapshot';

// READS THE SAVED SNAPSHOT IN PLACE OF THE SCRAPER ROUTE, SO THE STOCKS PAGE NEEDS NO SERVER (FEATURE 32)
export function useStocks() {
    return {
        data: marketSnapshot.stocks,
        isLoading: false,
        isError: false
    };
}
