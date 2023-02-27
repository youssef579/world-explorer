import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface GlobalState {
    country: string;
    continent: string;
    setCountryName: (e: any) => any;
    setContinentName: (e: any) => any;
}

const store = (set: any): GlobalState => ({
    country: "",
    continent: "All",
    setCountryName: (e) =>
        set({ country: (e.target as HTMLInputElement).value.toLowerCase() }),
    setContinentName: (e) =>
        set({ continent: (e.target as HTMLSelectElement).value }),
});

const useStore = create(devtools(store));

export default useStore;
