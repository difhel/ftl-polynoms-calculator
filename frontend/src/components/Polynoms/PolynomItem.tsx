import Latex from 'react-latex-next';
import classes from "./Polynoms.module.css";
import { IconNavigationCancel24round } from '@nacteam/sdfui-icons';
import { Ripple } from '@nacteam/sdfui';
import { useState } from 'react';

interface PolynomItemProps {
    id: number;
    children: string;
}

export const PolynomItem: React.FC<PolynomItemProps> = ({ id, children }) => {
    const [isSelected, setIsSelected] = useState(false);
    return (
        <div
            className={classes.polynom}
            style={{position: "relative", overflow: "hidden"}}
            onClick={() => setIsSelected(!isSelected)}
        >
            <div className={
                isSelected
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
