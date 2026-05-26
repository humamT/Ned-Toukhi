import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";

const shine = keyframes`
  from {
    opacity: 0;
    left: 0%;
  }

  50% {
    opacity: 1;
  }

  to {
    opacity: 0;
    left: 100%;
  }
`;

const Wrapper = styled.div`
  display: inline-block;
  width: auto;
  pointer-events: auto;
`;

const ButtonBase = styled.button`
  position: relative;
  display: block;
  width: 100%;
  padding: 10px 20px;
  border-radius: 7px;
  border: 1px solid rgb(61, 106, 255);
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 2px;
  background: transparent;
  color: #fff;
  overflow: hidden;
  box-shadow: 0 0 0 0 transparent;
  transition: all 0.2s ease-in;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  font-family: "Diodrum Arabic";
  line-height: 1.1;

  &:hover {
    background: rgb(61, 106, 255);
    box-shadow: 0 0 30px 5px rgba(0, 142, 236, 0.815);
    transition: all 0.2s ease-out;
  }

  &:hover::before {
    animation: ${shine} 0.5s 0s linear;
  }

  &::before {
    content: "";
    display: block;
    width: 0;
    height: 86%;
    position: absolute;
    top: 7%;
    left: 0;
    opacity: 0;
    background: #fff;
    box-shadow: 0 0 50px 30px #fff;
    transform: skewX(-20deg);
  }

  &:active {
    box-shadow: 0 0 0 0 transparent;
    transition: box-shadow 0.2s ease-in;
  }
`;

export default function HomeActionButton({
  children,
  className,
  to,
  onClick,
  type = "button",
}) {
  const elementProps = to ? { as: NavLink, to } : { type };

  return (
    <Wrapper className={className}>
      <ButtonBase {...elementProps} onClick={onClick}>
        {children}
      </ButtonBase>
    </Wrapper>
  );
}
