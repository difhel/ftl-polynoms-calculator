import { Button, Container, Stack } from "@nacteam/sdfui"

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
            <div>Polynom 1</div>
            <div>Polynom 2</div>
            <div>Polynom 3</div>
          </Container>
          <Button>
            Add polynom
          </Button>
        </Stack>
    )
}