import { Typography, Button, Chip, Box } from '@mui/material'
import { useState } from 'react'

type EpisodeListProps = {
  episodes: string[]
}

const EpisodeBadge: React.FC<{ episode: string }> = ({ episode }) => {
  return <Chip label={episode.replace('https://rickandmortyapi.com/api/episode/', 'Episode ')} />
}

export const EpisodeList: React.FC<EpisodeListProps> = ({ episodes }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <Typography>
        Episodes:
        <Button onClick={handleToggleExpand}>{isExpanded ? 'Collapse' : 'Expand'}</Button>
      </Typography>
      {isExpanded && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {episodes.map(episode => (
            <EpisodeBadge key={episode} episode={episode} />
          ))}
        </Box>
      )}
    </>
  )
}
