import { Button, Stack } from "@nacteam/sdfui";
import { IconContentAdd24round, IconContentFilterListOff24round, IconContentRemove24round, IconMapsEmergency24round } from "@nacteam/sdfui-icons";
import classes from "./operations.module.css";

export const ArithmeticsOperations: React.FC = () => {
    return (
        <Stack
            direction={'row'}
            spacing={1}
            className={classes.buttonsRow}
        >
            <Button variant='outlined'>
                <IconContentAdd24round /> Plus
            </Button>
            <Button variant='outlined'>
                <IconContentRemove24round /> Minus
            </Button>
            <Button variant='outlined'>
                <IconMapsEmergency24round /> Multiply
            </Button>
            <Button variant='outlined'>
                <IconContentFilterListOff24round />/ Divide
            </Button>
        </Stack>
    );
}
