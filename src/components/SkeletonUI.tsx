import { Skeleton } from '@mui/material'
import React from 'react'

const SkeletonUI = () => {
  return (
    <>
      <Skeleton height={60} animation="wave" />
      <Skeleton height={60} animation="wave" />
      <Skeleton height={60} animation="wave" />
      <Skeleton height={60} animation="wave" />
      <Skeleton height={60} animation="wave" />
      <Skeleton height={60} animation="wave" />
    </>
  )
}

export default SkeletonUI
