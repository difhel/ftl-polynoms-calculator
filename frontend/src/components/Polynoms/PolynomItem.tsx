import Latex from 'react-latex-next';
import classes from "./Polynoms.module.css";
import { IconNavigationCancel24round } from '@nacteam/sdfui-icons';
import { Ripple } from '@nacteam/sdfui';
import { useBanana } from '../ConfigProvider';

interface PolynomItemProps {
    id: number;
    children: string;
}

export const PolynomItem: React.FC<PolynomItemProps> = ({ id, children }) => {
    const {isPolynomSelected, selectPolynom, unselectPolynom} = useBanana(id)!;
    return (
        <div
            className={classes.polynom}
            style={{position: "relative", overflow: "hidden"}}
            onClick={() => {
                isPolynomSelected ? unselectPolynom() : selectPolynom();
            }}
        >
            <div className={
                isPolynomSelected
                    ? classes.selectorOn
                    : classes.selectorOff
            } />
            <Latex>{"$" + children + "$"}</Latex>
            <div className={classes.iconClose}>
                <IconNavigationCancel24round />
            </div>
            <Ripple />
        </div>
    );
};
