import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { useCharacters } from '../api/api'
import { CharacterCard } from '../components/CharacterCard'
import { CharacterGender, CharacterStatus } from '../api/types'

export const ListPage = () => {
  const history = useHistory()
  const [status, setStatus] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const { data: characters, isLoading } = useCharacters(status, gender)

  const handleCharacterClick = (id: number) => {
    history.push(`/detail/${id}`, { prevPath: history.location.pathname })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <FormControl sx={{ minWidth: 120, mr: 2 }}>
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
            {Object.values(CharacterGender).map(gender => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={() => {
            // Trigger refetch of characters with updated filters
          }}
        >
          Apply Filters
        </Button>
      </Box>
      {characters && characters.length > 0 ? (
        characters.map(character => (
          <CharacterCard key={character.id} character={character} onClick={handleCharacterClick} />
        ))
      ) : (
        <Typography>No characters found.</Typography>
      )}
    </div>
  )
}
