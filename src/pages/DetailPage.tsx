import { useParams } from 'react-router-dom'
import { useCharacterById } from '../api/api'
import { Typography, Box, Avatar, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

const DetailContainer = styled(Grid)({
  padding: '16px'
})

const CharacterName = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold'
})

const CharacterStatus = styled(Typography)({
  fontSize: '18px',
  fontStyle: 'italic'
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
  const { data: character, isLoading } = useCharacterById(characterId)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!character) {
    return <div>Character not found</div>
  }

  return (
    <DetailContainer container={true} spacing={2}>
      <Grid item={true} xs={12}>
        <CharacterName>{character.name}</CharacterName>
      </Grid>
      <Grid item={true} xs={12} sm={4}>
        <FullWidthAvatar src={character.image} alt={character.name} />
      </Grid>
      <Grid item={true} xs={12} sm={8}>
        <CharacterInfo>
          <Typography>
            Status: <CharacterStatus>{character.status}</CharacterStatus>
          </Typography>
          <Typography>Species: {character.species}</Typography>
          <Typography>Gender: {character.gender}</Typography>
        </CharacterInfo>
      </Grid>
    </DetailContainer>
  )
}
