import { create } from 'zustand'

interface LoaderState {
    isLoading: boolean
    showLoader: () => void
    hideLoader: () => void
}

const useLoaderStore = create<LoaderState>((set) => ({
    isLoading: false,
    showLoader: () => set({ isLoading: true }),
    hideLoader: () => set({ isLoading: false }),
}))

export default useLoaderStore
