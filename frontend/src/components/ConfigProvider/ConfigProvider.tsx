import { useState } from "react";
import { AppContext, ContextType } from "./context"

interface ConfigProviderProps {
    children: React.ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({
    children
}) => {
    const [selectedPolynoms, setSelectedPolynoms] = useState<number[]>([]);
    const [polynoms, setPolynoms] = useState<number[]>([]);

    const [dialog, setDialog] = useState<any>(null);
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
        }
    }
    return (
        <AppContext.Provider value={ContextValue}>
            {children}
        </AppContext.Provider>
    )
}
