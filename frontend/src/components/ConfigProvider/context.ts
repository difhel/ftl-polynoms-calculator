import { createContext, useContext } from "react";

// type ContextType = ReturnType<typeof useInterfaceInternal>;

type ReactState<K> = {
    getter: K,
    setter: React.Dispatch<React.SetStateAction<K>>
};

export type ContextType = {
    polynoms: {
        polynoms: ReactState<number[]>["getter"],
        setPolynoms: ReactState<number[]>["setter"],
        selectedPolynoms: ReactState<number[]>["getter"],
        setSelectedPolynoms: ReactState<number[]>["setter"]
    }
}

export const AppContext = createContext(null as ContextType | null);

export const useBanana = (id: number) => {
    const ctx = useContext(AppContext);
    if (ctx === null) return;
    const {
        selectedPolynoms, setSelectedPolynoms
    } = ctx.polynoms;
    const selectPolynom = () => {
        console.warn("selectedPolynoms", selectedPolynoms);
        if (selectedPolynoms.length == 2) {
            setSelectedPolynoms([
                selectedPolynoms[0], id
            ])
        } else {
            setSelectedPolynoms([...selectedPolynoms, id]);
        }
    }
    const unselectPolynom = () => {
        let newSelectedPolynoms = [...selectedPolynoms];
        newSelectedPolynoms.splice(newSelectedPolynoms.indexOf(id), 1);
        setSelectedPolynoms(newSelectedPolynoms);
    }
    const isPolynomSelected = selectedPolynoms.includes(id);
    return {
        selectPolynom,
        unselectPolynom,
        isPolynomSelected
    }
}
