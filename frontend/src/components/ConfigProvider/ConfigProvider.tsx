import { useState } from "react";
import { AppContext, ContextType, PolynomStoredObject } from "./context"

interface ConfigProviderProps {
    children: React.ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({
    children
}) => {
    const [selectedPolynoms, setSelectedPolynoms] = useState<number[]>([]);
    const [polynoms, setPolynoms] = useState<PolynomStoredObject[]>([]);

    const [dialog, setDialog] = useState<any>(null);
    const [result, setResult] = useState<any>(null);
    const ContextValue: ContextType = {
        polynoms: {
            polynoms,
            setPolynoms,
            selectedPolynoms,
            setSelectedPolynoms
        },
        dialog: {
            dialog,
            setDialog
        },
        result: {
            result,
            setResult
        }
    }
    return (
        <AppContext.Provider value={ContextValue}>
            {children}
        </AppContext.Provider>
    )
}
