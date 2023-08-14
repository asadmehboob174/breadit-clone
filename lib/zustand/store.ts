import { create } from 'zustand'

const useStore = create((set) => ({
  isLoading: false,
  setIsLoading: () => set((state: any) => {
    return { isLoading: !state.isLoading }
  }),
}))

export default useStore;