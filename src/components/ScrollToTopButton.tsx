import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/system'

export const ScrollButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  right: theme.spacing(2),
  bottom: theme.spacing(2),
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block'
  }
}))

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    setIsVisible(scrollTop > 0)
    console.log(isVisible)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <ScrollButton variant="contained" onClick={scrollToTop} style={{ display: isVisible ? 'block' : 'none' }}>
      Scroll to Top
    </ScrollButton>
  )
}
