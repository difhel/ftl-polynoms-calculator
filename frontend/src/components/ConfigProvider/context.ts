import { createContext, useContext } from "react";

// type ContextType = ReturnType<typeof useInterfaceInternal>;

type ReactState<K> = {
    getter: K,
    setter: React.Dispatch<React.SetStateAction<K>>
};

export type PolynomStoredObject = {
    polynom: string,
    index: number
}

export type ContextType = {
    polynoms: {
        polynoms: ReactState<PolynomStoredObject[]>["getter"],
        setPolynoms: ReactState<PolynomStoredObject[]>["setter"],
        selectedPolynoms: ReactState<number[]>["getter"],
        setSelectedPolynoms: ReactState<number[]>["setter"]
    },
    dialog: {
        dialog: any,
        setDialog: React.Dispatch<React.SetStateAction<any>>
    },
    result: {
        result: any,
        setResult: React.Dispatch<React.SetStateAction<any>>
    
    }
}

export const AppContext = createContext(null as ContextType | null);

export const useBanana = (value: PolynomStoredObject) => {
    const ctx = useContext(AppContext);
    if (ctx === null) return;
    const {
        selectedPolynoms, setSelectedPolynoms
    } = ctx.polynoms;
    const selectPolynom = () => {
        if (selectedPolynoms.length == 2) {
            setSelectedPolynoms([
                selectedPolynoms[0], value.index
            ])
        } else {
            setSelectedPolynoms([...selectedPolynoms, value.index]);
        }
    }
    const unselectPolynom = () => {
        if (!selectedPolynoms.includes(value.index)) return;
        let newSelectedPolynoms = [...selectedPolynoms];
        newSelectedPolynoms.splice(newSelectedPolynoms.indexOf(value.index), 1);
        setSelectedPolynoms(newSelectedPolynoms);
    }
    const isPolynomSelected = selectedPolynoms.includes(value.index);
    return {
        selectPolynom,
        unselectPolynom,
        isPolynomSelected
    }
}

export const useDialog = () => {
    const ctx = useContext(AppContext);
    if (ctx === null) return;
    const { dialog, setDialog } = ctx.dialog;
    return {
        dialog,
        setDialog
    }
}

export const usePolynoms = () => {
    const ctx = useContext(AppContext);
    if (ctx === null) return;
    const { polynoms, setPolynoms } = ctx.polynoms;
    return {
        polynoms,
        setPolynoms
    }
}

export const useResult = () => {
    const ctx = useContext(AppContext);
    if (ctx === null) return;
    const { result, setResult } = ctx.result;
    return {
        result,
        setResult
    }
}
