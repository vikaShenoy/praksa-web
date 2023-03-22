import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import {
  Resolution,
  TABLET_BREAKPOINT,
  useResponsive,
} from '../../hooks/useResponsive'
import HamburgerIcon from '../../public/icons/HarmburgerIcon'
import { NAVBAR_HEIGHT } from '../../styles/size'
import { BodyText, TitleText } from '../../styles/wrappers/fonts'

const NavbarWrapper = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.primary};
  padding: 0 ${(props) => props.theme.spacing.lg};
  box-shadow: ${(props) => props.theme.shadows.md};

  height: ${NAVBAR_HEIGHT};

  position: ${(props) => (props.isMobile ? 'relative' : '')};
`

const LinkWrapper = styled.div<{ isMobile: boolean; isVisible: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  justify-content: space-evenly;
  align-items: center;
  background: ${(props) => props.theme.colors.primary};
  gap: ${(props) => (props.isMobile ? 0 : props.theme.spacing.md)};

  width: ${(props) => (props.isMobile ? '100%' : 'auto')};
  position: ${(props) => (props.isMobile ? 'absolute' : '')};
  top: ${(props) => (props.isMobile ? '100%' : '')};
  left: ${(props) => (props.isMobile ? '0' : '')};

  opacity: ${(props) => (props.isMobile && !props.isVisible ? '0' : '1')};
  transition: opacity 0.3s;
`

const NavbarLink = styled(Link)`
  font-size: ${(props) => props.theme.typography.size.sm};
  color: ${(props) => props.theme.colors.text.primary};
  font-family: ${(props) => props.theme.typography.font.body};
  padding: ${(props) => props.theme.spacing.md};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: ${(props) => props.theme.colors.secondary};
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding: ${(props) => props.theme.spacing.sm};
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
  const resolution = useResponsive()
  const isMobile = resolution === Resolution.Mobile
  const [showDropdown, setShowDropdown] = useState(false)
  const { t } = useTranslation()
  const session = useSession()

  const NavItems = [
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
      {session.status === 'authenticated' && session.data.user && (
        <BodyText>
          {t('nav.user_greeting', { name: session.data.user.name })}
        </BodyText>
      )}
      <LinkWrapper
        isMobile={isMobile}
        isVisible={showDropdown}
        role="navigation"
      >
        {NavItems.map((navItem) => (
          <div key={navItem.id}>
            <NavbarLink href={navItem.href}>{navItem.name}</NavbarLink>
          </div>
        ))}
        {session.status === 'authenticated' && (
          <NavbarLink href={'/'} onClick={() => signOut()}>
            {t('common.logout')}
          </NavbarLink>
        )}
      </LinkWrapper>
    </NavbarWrapper>
  )
}

export default Navbar
