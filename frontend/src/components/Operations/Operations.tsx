import { Button, Container, Stack } from "@nacteam/sdfui";
import React from "react";
import { ArithmeticsOperations } from "./ArithmeticsOperations";
import { OtherOperations } from "./OtherOperations";
import { useDialog } from "../ConfigProvider";
import { Dialog } from "../Dialog";


export const Operations: React.FC = () => {
  const { setDialog } = useDialog()!;
  const ks = (
    <Dialog
      headline="props?"
      open={true}
      onClose={() => { }}
      supportingText='Boobs boobs lorem ipsum dolor sit amet'
      buttons={
        <>
          <Button onClick={() => setDialog(null)} variant='outlined'>Cancel</Button>
          <Button onClick={() => { }} variant='filled'>Click me</Button>
        </>
      }
    >
    </Dialog>
  );
  return (
    <Container
      variant='surface-container-high'
      style={{
        width: "calc(100% - 16px)"
      }}
    >
      <Stack
        direction={'column'}
        spacing={2}
      >
        <div onClick={() => setDialog(ks)}>Operations</div>
        <ArithmeticsOperations />
        <OtherOperations />
      </Stack>
    </Container>
  );
}
