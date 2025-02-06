import { ImageProps } from "@/app/auctions/ImageUploader"
import { create } from "zustand"

type Images = {
    auctionImages : ImageProps[]
}

type Actions = {
    setParams: (params: Partial<Images>) => void
    reset: () => void
    setSearchValue: (value: ImageProps[]) => void
}

const initialState: Images = {
    auctionImages: [],
}

export const useImageStore = create<Images & Actions>()((set) => ({
    ...initialState,

    setParams: (newParams: Partial<Images>) => {
        set((state) => ({...state, ...newParams}))
    },

    reset: () => set(initialState),
    setSearchValue: (value: ImageProps[]) => {
        set({auctionImages: value})
    }
}))