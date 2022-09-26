import Link from 'next/link';
import styled from 'styled-components';
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
  padding: 0 ${(props) => props.theme.spacing.md2};
  box-shadow: ${(props) => props.theme.dropShadow};
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: ${(props) => props.theme.spacing.md2};
`;

// TODO: Move text to a seperate component
const Title = styled.p`
  font-size: ${(props) => props.theme.fontSize.md};
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.primaryText};
  font-family: ${(props) => props.theme.font.title};
`;

// TODO: Move text to a separate component
const NavbarLink = styled.p`
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.primaryText};
  font-family: ${(props) => props.theme.font.body};
  padding: ${(props) => props.theme.spacing.sm2};
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
