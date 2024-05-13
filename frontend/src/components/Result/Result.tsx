import { Container } from "@nacteam/sdfui";
import { useResult } from "../ConfigProvider";

export const Result: React.FC = () => {
    const { result } = useResult()!;
    return (
        <Container
            variant='secondary'
            style={{
                width: "calc(100% - 16px)",
            }}
        >
            Result <br />
            {result}
        </Container>
    );
}