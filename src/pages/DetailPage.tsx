import { Alert, Avatar, Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Character } from 'api/types'
import SkeletonUI from 'components/SkeletonUI'
import dayjs from 'dayjs'
import { useLocation, useHistory } from 'react-router-dom'

interface Response {
  data: Character | undefined
  isLoading: boolean
  error: any
}

export const DetailPage = () => {
  const location = useLocation()
  const history = useHistory()

  const { isLoading, error, data }: Response = useQuery({
    queryKey: ['character'],
    queryFn: () =>
      fetch(`https://rickandmortyapi.com/api/character/${location.pathname.replace('detail/', '')}`).then(res =>
        res.json()
      )
  })

  const timeConvert = (time: string) => {
    return dayjs(time).format('DD/MM/YYYY')
  }

  return (
    <>
      <Button
        onClick={() => {
          history.push('/')
        }}
        variant="outlined"
      >
        Back
      </Button>
      <br />
      <br />
      {isLoading && <SkeletonUI />}
      {error && <Alert>Oops... Something goes wrong...</Alert>}
      {data && (
        <div>
          <Avatar sx={{ width: 100, height: 100 }} src={data.image} />
          <h1>Name: {data.name}</h1>
          <p>Status: {data.status}</p>
          <p>Species: {data.species}</p>
          <p>Type: {data.type}</p>
          <p>Gender: {data.gender}</p>
          <p>Origin place: {data.origin.name}</p>
          <p>Location name: {data.location.name}</p>
          <p>Episodes: </p>
          <div className="episodes">
            {data.episode.map((ep, key) => {
              return (
                <a href={ep} key={key}>
                  {ep}
                </a>
              )
            })}
          </div>
          <p>Created: {timeConvert(data.created)}</p>
        </div>
      )}
    </>
  )
}
