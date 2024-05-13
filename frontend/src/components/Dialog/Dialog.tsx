import { Button, Container, Stack } from '@nacteam/sdfui';
import classes from './Dialog.module.css';
import { IconNavigationClose24round } from '@nacteam/sdfui-icons';
import React from 'react';
import { useDialog } from '../ConfigProvider';

interface DialogProps {
    children?: React.ReactNode;
    headline: string;
    supportingText: string;
    open?: boolean;
    buttons: React.ReactNode;
    onClose?: () => void;
}

const DialogWrapper: React.FC<{
    open: boolean,
    children: React.ReactNode
}> = ({ children, open }) => {
    return (
        <div className={`${classes.dialogWrapper} ${open && classes.open}`}>
            {children}
        </div>
    )
}

const DialogContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Container
            variant='surface-container-high'
            className={classes.container}
            shapeStyle='extra-large'
            padding={6}
        >
            <Stack direction={'column'} spacing={6}>
                {children}
            </Stack>
        </Container>
    )
}

const DialogHeader: React.FC<{
    title: string,
    onClose: () => void
}> = ({ title }) => {
    return (
        <Stack direction={'column'} className={classes.header}>
            <div
                className={classes.icon}
            >
                <IconNavigationClose24round />
            </div>
            <div className={classes.title}>{title}</div>
        </Stack>
    )
}

const DialogButtons: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Stack direction={'row'} spacing={2} style={{ alignSelf: "flex-end" }}>
            {children}
        </Stack>
    )
}

export const Dialog: React.FC<DialogProps> = ({
    children,
    headline,
    supportingText,
    buttons,
    open = true,
    onClose
}) => {
    return (
        <DialogWrapper open={open}>
            <DialogContainer>
                <Stack direction={'column'} spacing={4}>
                    <DialogHeader title={headline} onClose={onClose!} />
                    <div className={classes.supportingText}>{supportingText}</div>
                </Stack>
                {children}
                <DialogButtons>
                    {buttons}
                </DialogButtons>
            </DialogContainer>
        </DialogWrapper>
    )
}


export const Error: React.FC<{supportingText: string}> = ({
    supportingText
}) => {
    const {setDialog} = useDialog()!;
    return <Dialog
        headline="Error"
        onClose={() => { }}
        supportingText={supportingText}
        buttons={<Button onClick={() => setDialog(null)} variant='filled'>OK</Button>}>
    </Dialog>
}