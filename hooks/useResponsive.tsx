import { useEffect, useState } from 'react'

export enum Resolution {
  Desktop,
  Tablet,
  Mobile,
}

export const TABLET_BREAKPOINT = 1024
export const MOBILE_BREAKPOINT = 767

export const useResponsive = (): Resolution => {
  const [resolution, setResolution] = useState<Resolution>(Resolution.Desktop)

  const onWindowSizeChange = () => {
    const windowWidth = window.innerWidth

    if (windowWidth >= TABLET_BREAKPOINT) {
      setResolution(Resolution.Desktop)
    } else if (windowWidth >= MOBILE_BREAKPOINT) {
      setResolution(Resolution.Tablet)
    } else {
      setResolution(Resolution.Mobile)
    }
  }

  useEffect(() => {
    onWindowSizeChange()

    document.addEventListener('DOMContentLoaded', onWindowSizeChange)
    window.addEventListener('scroll', onWindowSizeChange)
    window.addEventListener('resize', onWindowSizeChange)

    return () => {
      document.removeEventListener('DOMContentLoaded', onWindowSizeChange)
      window.removeEventListener('scroll', onWindowSizeChange)
      window.removeEventListener('resize', onWindowSizeChange)
    }
  }, [])

  return resolution
}
