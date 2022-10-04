import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import useMediaQuery from '../hooks/useMediaQuery';
import HamburgerIcon from '../public/icons/HarmburgerIcon';
import { styles } from '../styles/styles';
import { Strings } from '../utils/Strings';
import { BodyText, TitleText } from './wrappers/Text';

const NavItems = [
  {
    id: 1,
    name: Strings.pages.home,
    href: '/',
  },
  {
    id: 2,
    name: Strings.pages.about,
    href: '/about',
  },
];

const NavbarWrapper = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.primary};
  padding: 0 ${styles.spacing.md2};
  box-shadow: ${(props) => props.theme.shadows.drop};
  width: 100%;

  position: ${(props) => (props.isMobile ? 'relative' : '')};
`;

const LinkWrapper = styled.div<{ isMobile: boolean; isVisible: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  justify-content: space-evenly;
  background: ${(props) => props.theme.colors.primary};
  gap: ${(props) => (props.isMobile ? 0 : styles.spacing.md2)};

  width: ${(props) => (props.isMobile ? '100%' : 'auto')};
  position: ${(props) => (props.isMobile ? 'absolute' : '')};
  top: ${(props) => (props.isMobile ? '100%' : '')};
  left: ${(props) => (props.isMobile ? '0' : '')};

  opacity: ${(props) => (props.isMobile && !props.isVisible ? '0' : '1')};
  transition: opacity 0.3s;
`;

const MenuIconWrapper = styled.div`
  padding: ${styles.spacing.sm2};
  &:hover {
    background: ${(props) => props.theme.colors.secondary};
  }
  transition: background 0.3s;
`;

const NavbarLinkText = styled(BodyText)<{ isMobile: boolean }>`
  font-size: ${styles.fontSize.sm};
  color: ${(props) => props.theme.colors.primaryText};
  font-family: ${styles.font.body};
  padding: ${(props) =>
    props.isMobile ? styles.spacing.md : styles.spacing.sm2};
  margin: 0;
  &:hover {
    background: ${(props) => props.theme.colors.secondary};
  }
  transition: background 0.3s;
`;

const Navbar = () => {
  let isMobile = useMediaQuery(styles.breakpoints.small);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <NavbarWrapper isMobile={isMobile}>
      <TitleText>{Strings.title}</TitleText>
      {isMobile && (
        <MenuIconWrapper
          test-id="menu-icon"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <HamburgerIcon />
        </MenuIconWrapper>
      )}
      <LinkWrapper isMobile={isMobile} isVisible={showDropdown} role="navigation">
        {NavItems.map((navItem) => (
          <NavbarLinkText isMobile={isMobile} key={navItem.id}>
            <Link href={navItem.href}>{navItem.name}</Link>
          </NavbarLinkText>
        ))}
      </LinkWrapper>
    </NavbarWrapper>
  );
};

export default Navbar;
