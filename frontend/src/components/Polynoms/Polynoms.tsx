import { Button, Container, Stack } from "@nacteam/sdfui"
import { PolynomItem } from "./PolynomItem"

export const Polynoms: React.FC = () => {
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
            <PolynomItem id={179}>a^2 + b^3</PolynomItem>
            <PolynomItem id={247}>a^2 + b^3</PolynomItem>
            <PolynomItem id={339}>a^2 + b^3</PolynomItem>
          </Container>
          <Button>
            Add polynom
          </Button>
        </Stack>
    )
}
