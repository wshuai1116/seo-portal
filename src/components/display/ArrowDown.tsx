import styled from "styled-components";

const ArrowDown = styled.div`
  display: inline-block;
  height: 0;
  width: 0;
  border: 4px solid transparent;
  border-top-width: 4px;
  border-bottom-width: 0;
  border-top-color: #091429;
  vertical-align: middle;
  position: relative;

  transition: transform 0.2s linear;
`;

export default ArrowDown;
