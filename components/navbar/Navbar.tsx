import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components'
import useMediaQuery from '../../hooks/useMediaQuery'
import HamburgerIcon from '../../public/icons/HarmburgerIcon'
import { TitleText } from '../../styles/wrappers/fonts'

const NavbarWrapper = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.primary};
  padding: 0 ${(props) => props.theme.spacing.lg};
  box-shadow: ${(props) => props.theme.shadows.md};

  height: 80px;

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

const NavbarLink = styled.a<{ isMobile: boolean }>`
  font-size: ${(props) => props.theme.typography.size.sm};
  color: ${(props) => props.theme.colors.text.primary};
  font-family: ${(props) => props.theme.typography.font.body};
  padding: ${(props) =>
    props.isMobile ? props.theme.spacing.sm : props.theme.spacing.md};
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.colors.secondary};
  }
`

const MenuIconWrapper = styled.div`
  padding: ${(props) => props.theme.spacing.sm};
  &:hover {
    background: ${(props) => props.theme.colors.secondary};
  }
  transition: background 0.3s;
`

const Navbar = () => {
  const theme = useTheme()
  let isMobile = useMediaQuery(theme.sizes.breakpoints.sm)
  const [showDropdown, setShowDropdown] = useState(false)
  const { t } = useTranslation()

  const NavItems = useMemo(() => {
    return [
      {
        id: 1,
        name: t('nav.home'),
        href: '/',
      },
      {
        id: 2,
        name: t('nav.about'),
        href: '/about',
      },
    ]
  }, [t])

  return (
    <NavbarWrapper isMobile={isMobile}>
      <TitleText>{t('app_name')}</TitleText>
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
          <Link key={navItem.id} href={navItem.href}>
            <NavbarLink isMobile={isMobile} key={navItem.id}>
              {navItem.name}
            </NavbarLink>
          </Link>
        ))}
      </LinkWrapper>
    </NavbarWrapper>
  )
}

export default Navbar
