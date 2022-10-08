import Link from 'next/link'
import { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import useMediaQuery from '../../hooks/useMediaQuery'
import HamburgerIcon from '../../public/icons/HarmburgerIcon'
import { BodyText, TitleText } from '../../styles/wrappers'
import { Strings } from '../../utils/Strings'

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
]

const NavbarWrapper = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.primary};
  padding: 0 ${(props) => props.theme.spacing.lg};
  box-shadow: ${(props) => props.theme.shadows.md};
  width: 100%;

  position: ${(props) => (props.isMobile ? 'relative' : '')};
`

const LinkWrapper = styled.div<{ isMobile: boolean; isVisible: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  justify-content: space-evenly;
  background: ${(props) => props.theme.colors.primary};
  gap: ${(props) => (props.isMobile ? 0 : props.theme.spacing.md)};

  width: ${(props) => (props.isMobile ? '100%' : 'auto')};
  position: ${(props) => (props.isMobile ? 'absolute' : '')};
  top: ${(props) => (props.isMobile ? '100%' : '')};
  left: ${(props) => (props.isMobile ? '0' : '')};

  opacity: ${(props) => (props.isMobile && !props.isVisible ? '0' : '1')};
  transition: opacity 0.3s;
`

const MenuIconWrapper = styled.div`
  padding: ${(props) => props.theme.spacing.sm};
  &:hover {
    background: ${(props) => props.theme.colors.secondary};
  }
  transition: background 0.3s;
`

const NavbarLinkText = styled(BodyText)<{ isMobile: boolean }>`
  font-size: ${(props) => props.theme.typography.size.sm};
  color: ${(props) => props.theme.colors.text.primary};
  font-family: ${(props) => props.theme.typography.font.body};
  padding: ${(props) =>
    props.isMobile ? props.theme.spacing.sm : props.theme.spacing.md};
  margin: 0;

  &:hover {
    background: ${(props) => props.theme.colors.secondary};
  }
`

const Navbar = () => {
  const theme = useTheme()
  let isMobile = useMediaQuery(theme.sizes.breakpoints.sm)
  const [showDropdown, setShowDropdown] = useState(false)

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
      <LinkWrapper
        isMobile={isMobile}
        isVisible={showDropdown}
        role="navigation"
      >
        {NavItems.map((navItem) => (
          <NavbarLinkText isMobile={isMobile} key={navItem.id}>
            <Link href={navItem.href}>{navItem.name}</Link>
          </NavbarLinkText>
        ))}
      </LinkWrapper>
    </NavbarWrapper>
  )
}

export default Navbar
