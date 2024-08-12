import styled from "styled-components";


export const InnerWrap = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 10px;

  @media (min-width: 768px) {
    width: 720px;
  };
`

interface FlexBoxProps {
    gap?: number; // gap is optional and is of type number
}
export const FlexBox = styled.div<FlexBoxProps>`
  display: flex;
  align-items: center;
  gap: ${({ gap }) => (gap !== undefined ? `${gap}px` : '0')};
`