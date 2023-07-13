import { Avatar, Box, Card, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { Character } from '../api/types'

type Props = {
  character: Character
  onClick: (id: number) => void
}

const CharacterCardContainer = styled(Card)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  cursor: 'pointer'
}))

const CharacterAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(2)
}))

const CharacterInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column'
})

export const CharacterCard = ({ character, onClick }: Props) => (
  <CharacterCardContainer onClick={() => onClick(character.id)}>
    <CharacterAvatar src={character.image} />
    <CharacterInfo>
      <Typography>{character.name}</Typography>
      <Typography variant="caption" color="text.secondary">
        {character.species} - {character.status} - {character.gender}
      </Typography>
    </CharacterInfo>
  </CharacterCardContainer>
)
