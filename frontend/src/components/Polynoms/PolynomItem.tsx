import Latex from 'react-latex-next';
import classes from "./Polynoms.module.css";
import { IconNavigationCancel24round } from '@nacteam/sdfui-icons';
import { Ripple } from '@nacteam/sdfui';
import { PolynomStoredObject, useBanana, useDialog, usePolynoms } from '../ConfigProvider';
import { useAPI } from '../../api/api';
import { Error } from '../Dialog';

interface PolynomItemProps {
    children: PolynomStoredObject;
}

export const PolynomItem: React.FC<PolynomItemProps> = ({ children }) => {
    const {isPolynomSelected, selectPolynom, unselectPolynom} = useBanana(children)!;
    const api = useAPI();
    const {setDialog} =  useDialog()!;
    const {polynoms, setPolynoms} = usePolynoms()!;
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
            <Latex>{"$" + children.polynom + "$"}</Latex>
            <button className={classes.iconClose} style={{zIndex: 100}} onClick={() => {
                api.delete(children.polynom).then((data) => {
                    if (!data.ok) return setDialog(<Error supportingText={data.error}/>)
                    let newPolynoms = [...polynoms];
                    newPolynoms.splice(polynoms.indexOf(children), 1);
                    setPolynoms(newPolynoms);
                    unselectPolynom();
                })
            }}>
                <IconNavigationCancel24round />
            </button>
            <Ripple />
        </div>
    );
};
