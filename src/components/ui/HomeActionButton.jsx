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
    padding: 12px 40px;
    border-radius: 40px;
    border: 2px solid rgb(255 255 255);
    font-size: 25px;
    font-weight: 600;
    letter-spacing: 2px;
    background: transparent;
    color: rgb(255 255 255);
    overflow: hidden;
    box-shadow: #ffffff00 0px 0px 0px 0px;
    transition: 0.2s ease-in;
    text-decoration: none;
    cursor: pointer;
    text-align: center;
    font-family: "Diodrum Arabic";
    line-height: 1;

  &:hover {
    background: #344e5d;
    box-shadow: #efca4d 0px 0px 50px 0px;
    transition: 0.2s ease-out;
  }

  &:hover::before {
    animation: ${shine} 0.5s 0s linear;
  }

  &::before {
    content: "";
    display: block;
    width: 0px;
    height: 86%;
    position: absolute;
    top: 7%;
    left: 0px;
    opacity: 0;
    background: rgb(255 255 255);
    box-shadow: #45b29d 0px 0px 50px 30px;
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
