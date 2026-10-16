import { marketSnapshot } from 'data/market-snapshot';

// READS THE SAVED SNAPSHOT IN PLACE OF THE SCRAPER ROUTE, SO THE NEWS PANEL NEEDS NO SERVER (FEATURE 32)
export function useNews() {
    return {
        data: marketSnapshot.news,
        isLoading: false,
        isError: false
    };
}
