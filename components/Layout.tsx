import Head from "next/head";
import Link from "next/link";
import { HTMLAttributes } from "react";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;
export const Main = styled.main`
  display: block;
  padding: 60px 12px;
`;

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  max-width: 900px;
  height: 50px;
  margin: 0 auto;
  padding: 0 12px;
  display: flex;
  align-items: center;
  background-color: white;
`;

export const NavLink = styled.a`
  color: black;
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  &:first-child {
    margin-left: 0;
  }
`;

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}
const Layout = ({ title, children, ...props }: LayoutProps) => {
  return (
    <Container {...props}>
      <Head>
        <title>{`클래스101${title ? ` | ${title}` : ""}`}</title>
      </Head>
      <Nav>
        <Link href="/" passHref>
          <NavLink>홈</NavLink>
        </Link>
        <Link href="/products" passHref>
          <NavLink>클래스</NavLink>
        </Link>
        <Link href="/cart" passHref>
          <NavLink>장바구니</NavLink>
        </Link>
      </Nav>
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;
