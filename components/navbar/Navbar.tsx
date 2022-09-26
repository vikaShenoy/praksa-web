import Link from 'next/link';
import styled from 'styled-components';
import { styles } from '../../styles/styles';
import { Strings } from '../../utils/Strings';

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

const NavbarWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.primary};
  padding: 0 ${styles.spacing.md2};
  box-shadow: ${styles.shadows.dropShadow};
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: ${(props) => styles.spacing.md2};
`;

const Title = styled.p`
  font-size: ${styles.fontSize.md};
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.primaryText};
  font-family: ${styles.font.title};
`;

const NavbarLink = styled.p`
  font-size: ${styles.fontSize.sm};
  color: ${(props) => props.theme.colors.primaryText};
  font-family: ${styles.font.body};
  padding: ${styles.spacing.sm2};
  &:hover {
    background: ${(props) => props.theme.colors.secondary};
  }
  transition: background 0.2s;
`;

const Navbar = () => {
  return (
    <NavbarWrapper>
      <Title>{Strings.title}</Title>
      <LinkWrapper>
        {NavItems.map((navItem) => (
          <NavbarLink key={navItem.id}>
            <Link href={navItem.href}>{navItem.name}</Link>
          </NavbarLink>
        ))}
      </LinkWrapper>
    </NavbarWrapper>
  );
};

export default Navbar;
