import { Chip } from '@mui/material'

export const EpisodeBadge: React.FC<{ episode: string }> = ({ episode }) => {
  return <Chip label={episode.replace('https://rickandmortyapi.com/api/episode/', 'Episode ')} />
}
