import { Button, Stack } from "@nacteam/sdfui";
import { IconContentCalculate24round, IconContentInsights24round, IconEditorLineAxis24round } from "@nacteam/sdfui-icons";
import classes from "./operations.module.css";
import { PolynomStoredObject, useDialog, usePolynoms, useResult } from "../ConfigProvider";
import { API, useAPI } from "../../api/api";
import { Dialog, Error } from "../Dialog";
import Latex from "react-latex-next";
import { useEffect, useState } from "react";

type OpDataType = {
    selectedPolynoms: PolynomStoredObject[],
    setDialog: React.Dispatch<any>,
    api: API,
    setResult: React.Dispatch<any>
}
const OpDerivative = (
    opdata: OpDataType
) => {
    const { selectedPolynoms, setDialog, api, setResult } = opdata;
    if (selectedPolynoms.length != 1) {
        return setDialog(<Error supportingText={"You should select only one polynom"} />);
    }
    const nth = prompt("Enter the nth derivative", "1");
    if (nth === null) return;
    const target = prompt("Enter the target variable", "x");
    if (target === null) return;

    api.getTheNthDerivative(
        selectedPolynoms[0].polynom, target, parseInt(nth)
    ).then((data) => {
        if (!data.ok) return setDialog(<Error supportingText={data.error} />);
        setResult(<>
            Getting the {nth}th derivative of the polynom by target variable {target}: <br/>
            <Latex>{"$" + (data.response || 0) + "$"}</Latex>
        </>);
    });
}

const OpRoots = (
    opdata: OpDataType
) => {
    const { selectedPolynoms, setDialog, api, setResult } = opdata;
    if (selectedPolynoms.length != 1) {
        return setDialog(<Error supportingText={"You should select only one polynom"} />);
    }

    api.getRoots(
        selectedPolynoms[0].polynom
    ).then((data) => {
        if (!data.ok) return setDialog(<Error supportingText={data.error} />);
        setResult(<>
            Roots: <br/>
            {data.response.map((root, index) => {
                return <li key={index}>{root}</li>
            })}
        </>);
    });
}

export const OtherOperations: React.FC = () => {
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
            <Button variant='outlined' onClick={() => {
                OpDerivative(opData);
            }}>
                <IconContentInsights24round /> Derivative
            </Button>
            <Button variant='outlined' onClick={() => OpRoots(opData)}>
                <IconContentCalculate24round /> Roots
            </Button>
            <Button variant='outlined'>
                <IconEditorLineAxis24round /> Value at point
            </Button>
        </Stack>
    );
}
