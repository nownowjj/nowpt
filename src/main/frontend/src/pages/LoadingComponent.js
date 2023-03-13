import styled, {keyframes} from "styled-components";

const Container = styled.div({
    position: 'absolute',
    width: '100%',
    height: '100%',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#e8e8e8',
});

const rotation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.div`
  height: 5rem;
  width: 5rem;
  border: 1px solid #3563e9;
  border-radius: 50%;
  border-top: none;
  border-right: none;
  margin: 10rem auto;
  animation: ${rotation} 1s linear infinite;
`;





 function Loading() {
    return (
        <>
            <Container>
                <Spinner/>
            </Container>
        </>
    );
}
export default Loading;