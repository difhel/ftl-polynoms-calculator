import React, { useState } from "react";
import { Dialog, Error } from "../Dialog";
import { Button } from "@nacteam/sdfui";
import { useDialog, usePolynoms } from "../ConfigProvider";
import { useAPI } from "../../api/api";

export const AddPolynom: React.FC = () => {
    const { setDialog } = useDialog()!;
    const api = useAPI();
    const { polynoms, setPolynoms } = usePolynoms()!;
    const [inputValue, setInputValue] = useState("");
    return <Dialog
        headline="Add polynom"
        onClose={() => { }}
        supportingText='Enter polynom'
        buttons={
            <Button onClick={() => {
                api.insert(inputValue).then((data) => {
                    if (!data.ok) return setDialog(<Error supportingText={data.error} />);
                    setPolynoms([...polynoms, {
                            index: Math.round(Math.random() * 10000),
                            polynom: data.response
                    }]);
                })
                setDialog(null);
            }} variant='filled'>OK</Button>
        }>
        <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />
    </Dialog>
}