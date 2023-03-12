import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ChangeEvent } from "react";

interface State {
    country: string;
    continent: string;
}

interface StateHandlers {
    setCountryName: (e: ChangeEvent<HTMLInputElement>) => void;
    setContinentName: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const useStore = create<State & StateHandlers>()(
    devtools((set) => ({
        country: "",
        continent: "All",
        setCountryName: (e) => set({ country: e.target.value.toLowerCase() }),
        setContinentName: (e) => set({ continent: e.target.value }),
    }))
);

export default useStore;
