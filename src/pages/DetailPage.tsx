import { useParams, useHistory } from 'react-router-dom'
import { Typography, Box, Avatar, Grid, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useCharacterContext } from '../contexts/CharacterContext'
import { useEffect, useState } from 'react'
import { Character } from 'api/types'
import { EpisodeList } from '../components/EpisodeList'
import { format } from 'date-fns'
import { cs } from 'date-fns/locale'

const DetailContainer = styled(Grid)({
  padding: '16px'
})

const CharacterName = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold'
})

const CharacterInfo = styled(Box)({
  marginTop: '16px'
})

const FullWidthAvatar = styled(Avatar)({
  width: '100%',
  height: 'auto',
  maxWidth: '250px'
})

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const characterId = parseInt(id, 10)
  const { fetchCharacterById, isLoading } = useCharacterContext()
  const [character, setCharacter] = useState<Character | undefined>(undefined)
  const [episodes, setEpisodes] = useState<string[]>([])

  const history = useHistory()

  const handleGoBack = () => {
    history.goBack()
  }

  useEffect(() => {
    const fetchCharacter = async () => {
      const character = await fetchCharacterById(characterId)
      if (character) {
        setCharacter(character)
        setEpisodes(character.episode)
      }
    }
    fetchCharacter()
  }, [fetchCharacterById, characterId])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!character) {
    return <div>Character not found</div>
  }

  // Formátování data pomocí date-fns
  const createdDate = new Date(character.created)
  const formattedCreatedDate = format(createdDate, 'd. MMMM yyyy HH:mm:ss', {
    locale: cs
  })

  return (
    <DetailContainer container={true} spacing={2}>
      <Grid item={true} xs={12}>
        <Button variant="contained" onClick={handleGoBack}>
          Go Back
        </Button>
      </Grid>
      <Grid item={true} xs={12}>
        <CharacterName>{character.name}</CharacterName>
      </Grid>
      <Grid item={true} xs={12} sm={4}>
        <FullWidthAvatar src={character.image} alt={character.name} />
      </Grid>
      <Grid item={true} xs={12} sm={8}>
        <CharacterInfo>
          <Typography>Status: {character.status}</Typography>
          <Typography>Species: {character.species}</Typography>
          <Typography>Gender: {character.gender}</Typography>
          <Typography>Origin: {character.origin.name}</Typography>
          <Typography>Location: {character.location.name}</Typography>
          <Typography>Created: {formattedCreatedDate}</Typography>
          <EpisodeList episodes={episodes} />
        </CharacterInfo>
      </Grid>
    </DetailContainer>
  )
}
