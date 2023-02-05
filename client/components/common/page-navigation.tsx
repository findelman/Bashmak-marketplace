import Link from "next/link";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

// Страницы в проде не будет
const animateGr = keyframes`
  from {
    background-position-x: 100%;
  }
  to {
    background-position-x: -100%;
  }
`;

const Links = styled.div`
  position: fixed;
  display: flex;
  cursor: pointer;
  bottom: 35px;
  right: 20px;
  justify-content: center;
  align-items: center;
  z-index: 100;
  strong {
    color: white;
    position: relative;
    z-index: 2;
    padding: 0px 40px;
  }
  :before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    padding: 10px 0px;
    background: linear-gradient(
      261.47deg,
      #2d1092 0%,
      #ca5d1f 36.46%,
      #8223a0 67.19%,
      #14098d 100%
    );
    background-size: 200% 100%;
    border-radius: 20px;
    animation: 2s ${animateGr} infinite linear;
  }
`;

const HiddenBox = styled.div<{ isActive?: boolean }>`
  position: absolute;
  width: 100%;
  background: white;
  top: -20px;
  border-radius: 20px;
  transition: var(--default-transition) linear;
  z-index: 100;
  text-align: center;
  box-shadow: 0px 0px 4px 4px #0000001c;
  padding: 0px 5px;
  ${({ isActive }) =>
    isActive
      ? "visibility: visible; opacity: 1;  transform: translateY(-100%);"
      : "visibility: hidden; opacity: 0;  transform: translateY(-120%);"}
  a {
    color: black;
    padding: 10px;
    display: inline-block;
    margin-left: unset !important;
    width: 100%;
    /* border-bottom: 0.5px solid #00000069; */
  }
`;

export const PageNavigation = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Links
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        <strong>Страницы</strong>
        <HiddenBox isActive={showModal}>
          <Link href="/">Главная</Link>
          <Link href="/store-selection">Выбор магазина</Link>
          <Link href="/crm/orders">Заказы</Link>
          <Link href="/crm/products">Мои товары</Link>
          <Link href="/crm/employees">Сотрудники</Link>
          <Link href="/crm/analytics">Аналитика</Link>
        </HiddenBox>
      </Links>
    </>
  );
};
