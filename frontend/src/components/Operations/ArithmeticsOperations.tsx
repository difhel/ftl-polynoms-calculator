import { Button, Stack } from "@nacteam/sdfui";
import { IconActionVisibility24round, IconContentAdd24round, IconContentFilterListOff24round, IconMapsEmergency24round } from "@nacteam/sdfui-icons";
import classes from "./operations.module.css";
import { PolynomStoredObject, useDialog, usePolynoms, useResult } from "../ConfigProvider";
import { Error } from "../Dialog";
import { API, useAPI } from "../../api/api";
import Latex from "react-latex-next";

type OpDataType = {
    selectedPolynoms: PolynomStoredObject[],
    setDialog: React.Dispatch<any>,
    api: API,
    setResult: React.Dispatch<any>
}
const OpPlus = (
    opdata: OpDataType
) => {
    const { selectedPolynoms, setDialog, api, setResult } = opdata;
    if (selectedPolynoms.length != 2) {
        return setDialog(<Error supportingText={"You should select 2 polynoms for +"}/>);
    }
    api.add(
        selectedPolynoms[0].polynom, selectedPolynoms[1].polynom
    ).then((data) => {
        if (!data.ok) return setDialog(<Error supportingText={data.error}/>);
        setResult(<Latex>{"$" + data.response + "$"}</Latex>);
    });
}

const OpMultiply = (
    opdata: OpDataType
) => {
    const { selectedPolynoms, setDialog, api, setResult } = opdata;
    if (selectedPolynoms.length != 2) {
        return setDialog(<Error supportingText={"You should select 2 polynoms for *"}/>);
    }
    api.multiply(
        selectedPolynoms[0].polynom, selectedPolynoms[1].polynom
    ).then((data) => {
        if (!data.ok) return setDialog(<Error supportingText={data.error}/>);
        setResult(<Latex>{"$" + data.response + "$"}</Latex>);
    });
}

export const ArithmeticsOperations: React.FC = () => {
    const { polynoms, selectedPolynoms } = usePolynoms()!;
    const { setDialog } = useDialog()!;
    const api = useAPI();
    const { setResult } = useResult()!;
    const selectedPolynomsObj = selectedPolynoms.map((index) => {
        return polynoms.find((polynom) => polynom.index === index);
    }) as PolynomStoredObject[];
    const opData = {
        selectedPolynoms: selectedPolynomsObj,
        setDialog,
        api,
        setResult
    }
    return (
        <Stack
            direction={'row'}
            spacing={1}
            className={classes.buttonsRow}
        >
            <Button variant='outlined' onClick={() => OpPlus(opData)}>
                <IconContentAdd24round /> Plus
            </Button>
            {/* <Button variant='outlined'>
                <IconContentRemove24round /> Minus
            </Button> */}
            <Button variant='outlined' onClick={() => OpMultiply(opData)}>
                <IconMapsEmergency24round /> Multiply
            </Button>
            <Button variant='outlined'>
                <IconContentFilterListOff24round />/ Divide
            </Button>
            <Button variant='outlined'>
                <IconActionVisibility24round /> Equality
            </Button>
        </Stack>
    );
}
