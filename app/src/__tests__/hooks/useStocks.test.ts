import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { useStocks } from 'hooks/swr/useStocks';

const mockStocksData = [{ symbol: 'AAPL', price: 150 }];

const freshCache = ({ children }: { children: React.ReactNode }) =>
    React.createElement(SWRConfig, { value: { provider: () => new Map() } }, children);

beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
        Promise.resolve({ json: () => Promise.resolve(mockStocksData) } as Response)
    );
});

describe('useStocks', () => {
    it('returns loading state initially', () => {
        const { result } = renderHook(() => useStocks(), { wrapper: freshCache });
        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBeUndefined();
    });

    it('returns data after fetch resolves', async () => {
        const { result } = renderHook(() => useStocks(), { wrapper: freshCache });
        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.data).toEqual(mockStocksData);
        expect(result.current.isError).toBeUndefined();
    });

    it('exposes isError when fetch rejects', async () => {
        (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));
        const { result } = renderHook(() => useStocks(), { wrapper: freshCache });
        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.isError).toBeDefined();
    });
});
