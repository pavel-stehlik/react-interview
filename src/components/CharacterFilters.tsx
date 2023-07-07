import { useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { styled } from '@mui/system'
import { CharacterStatus } from '../api/types'

type Props = {
  onApplyFilters: (status: string, gender: string) => void
}

const FiltersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(2)
}))

export const CharacterFilters = ({ onApplyFilters }: Props) => {
  const [status, setStatus] = useState<string>('')
  const [gender, setGender] = useState<string>('')

  const handleApplyFilters = () => {
    onApplyFilters(status, gender)
  }

  return (
    <FiltersContainer>
      <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={e => setStatus(e.target.value as string)} label="Status">
          <MenuItem value="">All</MenuItem>
          {Object.values(CharacterStatus).map(status => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Gender</InputLabel>
        <Select value={gender} onChange={e => setGender(e.target.value as string)} label="Gender">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="genderless">Genderless</MenuItem>
          <MenuItem value="unknown">Unknown</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleApplyFilters}>
        Apply Filters
      </Button>
    </FiltersContainer>
  )
}
