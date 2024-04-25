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
    },
    dialog: {
        dialog: any,
        setDialog: React.Dispatch<React.SetStateAction<any>>
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

export const useDialog = () => {
    const ctx = useContext(AppContext);
    if (ctx === null) return;
    const { dialog, setDialog } = ctx.dialog;
    return {
        dialog,
        setDialog
    }
}
