import { Alert } from '@mui/material'
import Filter from 'components/Filter'
import GetMoreBtn from 'components/GetMoreBtn'
import SkeletonUI from 'components/SkeletonUI'
import { useAppSelector } from 'hooks/useAppSelector'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchCharacters } from 'store/reducers/character'
import { Character } from '../api/types'
import { CharacterCard } from '../components/CharacterCard'

export const ListPage = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const dispatch = useDispatch()
  const history = useHistory()

  const charactersData = useAppSelector(state => state.character.characters)
  const filterStatus = useAppSelector(state => state.character.filterStatus)
  const filterGender = useAppSelector(state => state.character.filterGender)
  const status = useAppSelector(state => state.character.status)
  const page = useAppSelector(state => state.character.page).toString()

  const handleCharacterClick = (id: number) => {
    history.push(`/detail/${id}`)
  }

  useEffect(() => {
    dispatch(fetchCharacters({ page, filterStatus, filterGender }))
  }, [page, filterGender, filterStatus])

  useEffect(() => {
    setCharacters(charactersData?.results)
  }, [charactersData])

  const drawCharacters = () => {
    return characters?.map((character, key) => {
      return <CharacterCard key={key} character={character} onClick={() => handleCharacterClick(character.id)} />
    })
  }

  return (
    <>
      {status === 'loading' ? (
        <SkeletonUI />
      ) : (
        <>
          {status === 'failed' ? (
            <Alert severity="error">This is an error alert — check it out!</Alert>
          ) : (
            <>
              <Filter />
              {drawCharacters()}
              <GetMoreBtn />
            </>
          )}
        </>
      )}
    </>
  )
}
