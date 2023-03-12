import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Box } from '@mui/system'
import { useAppSelector } from 'hooks/useAppSelector'
import { useDispatch } from 'react-redux'
import { setFilterStatus, setFilterGender } from '../store/reducers/character'

const Filter = () => {
  const dispath = useDispatch()
  const filterStatus = useAppSelector(state => state.character.filterStatus)
  const filterGender = useAppSelector(state => state.character.filterGender)

  const handleChangeStatus = (event: SelectChangeEvent) => {
    dispath(setFilterStatus(event.target.value as string))
  }

  const handleChangeGender = (event: SelectChangeEvent) => {
    dispath(setFilterGender(event.target.value as string))
  }

  return (
    <div className="filter">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth={true}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterStatus}
            label="Filter"
            onChange={handleChangeStatus}
          >
            <MenuItem value={'alive'}>Alive</MenuItem>
            <MenuItem value={'dead'}>Dead</MenuItem>
            <MenuItem value={'unknown'}>Unknown</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth={true}>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterGender}
            label="Filter"
            onChange={handleChangeGender}
          >
            <MenuItem value={'male'}>Male</MenuItem>
            <MenuItem value={'female'}>Female</MenuItem>
            <MenuItem value={'unknown'}>Unknown</MenuItem>
            <MenuItem value={'genderless'}>Genderless</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button variant="outlined">Filter</Button>
    </div>
  )
}

export default Filter
