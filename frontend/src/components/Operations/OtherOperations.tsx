import { Button, Stack } from "@nacteam/sdfui";
import { IconActionVisibility24round, IconContentCalculate24round, IconContentInsights24round, IconEditorLineAxis24round } from "@nacteam/sdfui-icons";
import classes from "./operations.module.css";

export const OtherOperations: React.FC = () => {
    return (
        <Stack
            direction={'row'}
            spacing={1}
            className={classes.buttonsRow}
        >
            <Button variant='outlined'>
                <IconContentInsights24round /> Derivative
            </Button>
            <Button variant='outlined'>
                <IconContentCalculate24round /> Roots
            </Button>
            <Button variant='outlined'>
                <IconEditorLineAxis24round /> Value at point
            </Button>
        </Stack>
    );
}
