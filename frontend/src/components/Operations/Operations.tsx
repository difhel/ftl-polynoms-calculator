import { Container, Stack } from "@nacteam/sdfui";
import React from "react";
import { ArithmeticsOperations } from "./ArithmeticsOperations";
import { OtherOperations } from "./OtherOperations";


export const Operations: React.FC = () => {
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
        <div>Operations +-*/ dx x_0 point ==</div>
        <ArithmeticsOperations />
        <OtherOperations />
      </Stack>
    </Container>
  );
}
