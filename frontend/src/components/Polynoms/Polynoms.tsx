import { Button, Container, Stack } from "@nacteam/sdfui"
import { PolynomItem } from "./PolynomItem"
import { useAPI } from "../../api/api";
import { useDialog, usePolynoms } from "../ConfigProvider";
import { Dialog, Error } from "../Dialog";
import { useMemo, useState } from "react";
import { AddPolynom } from "./AddPolynom";

export const Polynoms: React.FC = () => {
  const api = useAPI();
  const { setDialog } = useDialog()!;
  const { polynoms, setPolynoms } = usePolynoms()!;
  useMemo(() => api.list().then((data) => {
    if (!data.ok) return setDialog(<Error supportingText={data.error}/>);

    setPolynoms(data.response.map((value) => {
      return {
        index: Math.round(Math.random() * 10000),
        polynom: value
      }
    }) || []);
  }), []);
  return (
    <Stack
      direction={'column'}
      spacing={6}
      style={{
        width: "100%",
        height: "100%"
      }}
    >
      <Container
        variant='surface-container'
        outline
      >
        <div>Polynoms</div>
        {
          polynoms.map((polynom) => (
            <PolynomItem key={polynom.index}>{polynom}</PolynomItem>
          ))
        }
      </Container>
      <Button onClick={
        () => setDialog(<AddPolynom />)
      }>
        Add polynom
      </Button>
    </Stack>
  )
}
