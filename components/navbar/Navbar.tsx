import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { Resolution, useResponsive } from '../../hooks/useResponsive'
import HamburgerIcon from '../../public/icons/HarmburgerIcon'
import { BodyText, TitleText } from '../../styles/wrappers/fonts'
import { mobile } from '../../utils/breakpoints'

const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${(props) => props.theme.colors.secondary};
  padding: 0 ${(props) => props.theme.spacing.lg};
  box-shadow: ${(props) => props.theme.shadows.md};
  height: 5rem;

  ${mobile(css`
    position: relative;
  `)}
`

const LinkWrapper = styled.div<{ showMobileLinks: boolean }>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.colors.secondary};
  width: auto;

  ${mobile(css<{ showMobileLinks: boolean }>`
    flex-direction: column;
    gap: 0;
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    background: ${(props) => props.theme.colors.secondary};

    opacity: ${(props) => (props.showMobileLinks ? '1' : '0')};
    transition: opacity 0.3s;
  `)}
`

const NavbarLink = styled(Link)`
  font-size: ${(props) => props.theme.typography.size.sm};
  color: ${(props) => props.theme.colors.text.primary};
  padding: ${(props) => props.theme.spacing.md};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: ${(props) => props.theme.colors.tertiary};
  }

  ${mobile(css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  `)}
`

const MenuIconWrapper = styled.div`
  padding: ${(props) => props.theme.spacing.sm};
  cursor: pointer;
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
    <NavbarWrapper>
      <TitleText>{t('app_name')}</TitleText>
      {session.status === 'authenticated' && session.data.user && (
        <BodyText>
          {t('nav.user_greeting', { name: session.data.user.name })}
        </BodyText>
      )}
      {isMobile && (
        <MenuIconWrapper
          test-id="menu-icon"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <HamburgerIcon />
        </MenuIconWrapper>
      )}

      <LinkWrapper showMobileLinks={showDropdown} role="navigation">
        {NavItems.map((navItem) => (
          <NavbarLink key={navItem.id} href={navItem.href}>
            <div>{navItem.name}</div>
          </NavbarLink>
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
