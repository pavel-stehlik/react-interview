import { Button } from '@mui/material'
import { useAppSelector } from 'hooks/useAppSelector'
import React from 'react'
import { useDispatch } from 'react-redux'
import { increasePage } from 'store/reducers/character'

const GetMoreBtn = () => {
  const dispatch = useDispatch()

  const getMore = () => {
    dispatch(increasePage())
  }

  return (
    <Button onClick={getMore} variant="contained">
      Get More
    </Button>
  )
}

export default GetMoreBtn
