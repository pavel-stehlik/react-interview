import { Typography, Button, Box } from '@mui/material'
import { useState } from 'react'
import { EpisodeBadge } from './EpisodeBadge'

type EpisodeListProps = {
  episodes: string[]
}

export const EpisodeList: React.FC<EpisodeListProps> = ({ episodes }) => {
  // State to control whether episode list is expanded
  const [isExpanded, setIsExpanded] = useState(false)

  // Function to toggle episode list expansion
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
