import { useParams, useHistory } from 'react-router-dom'
import { Typography, Box, Avatar, Grid, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect } from 'react'
import { EpisodeList } from '../components/EpisodeList'
import { format } from 'date-fns'
import { cs } from 'date-fns/locale'
import { useSelector, useDispatch } from 'react-redux'
import { selectCharacter, selectEpisodes } from '../store/reducers/characterSelectors'
import { setCharacter, setEpisodes, setIsLoading } from '../store/reducers/characterSlice'
import { useCharacters } from '../hooks/useCharacters'
import { AppDispatch } from '../store/index'

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
  const { fetchCharacterById } = useCharacters()
  const character = useSelector(selectCharacter)
  const episodes = useSelector(selectEpisodes)
  const history = useHistory()
  const dispatch = useDispatch<AppDispatch>()

  const handleGoBack = () => {
    history.goBack()
  }

  useEffect(() => {
    // Reset character state when leaving DetailPage
    return () => {
      dispatch(setCharacter(null))
      dispatch(setEpisodes([]))
      dispatch(setIsLoading(false))
    }
  }, [dispatch])

  useEffect(() => {
    fetchCharacterById(characterId)
  }, [fetchCharacterById, characterId])

  if (!character) {
    return <div>Character not found</div>
  }

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
