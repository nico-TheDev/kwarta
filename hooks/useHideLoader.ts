import useLoaderStore from '@/stores/useLoaderStore'
import { useEffect } from 'react'

export function useHideLoader() {
    const { hideLoader } = useLoaderStore()

    // Upon mount of screen, hide any loader
    useEffect(() => {
        hideLoader()
    }, [])
}
