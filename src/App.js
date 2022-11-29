import React from 'react'
import './App.css';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, useMediaQuery } from '@mui/material';
import logo from './assets/img/logo branca playtest.png'
import topBackground from './assets/img/Quina esquerda superior playtest.png'
import { useTheme } from '@mui/material/styles';


const columns = [
  {
    name: 'Position',
    selector: row => row.Position,
    width: '70px'
  },
  {
    name: 'Username',
    selector: row => row.Username,
  },
  {
    name: 'DamageReceived',
    selector: row => row.DamageReceived,
    sortable: true,
    maxWidth: '100px'
  },
  {
    name: 'Duration',
    selector: row => row.Duration,
    sortable: true,
    maxWidth: '100px'
  },
];

function App() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const matchesLg = useMediaQuery(theme.breakpoints.up('lg'));

  const [rank, setRank] = useState()
  const [difficulty, setDifficulty] = useState('Easy');
  const [playerType, setPlayerType] = useState('Normal');

  const handleChangeDifficulty = (event) => {
    setDifficulty(event.target.value);
  };

  const handleChangePlayerType = (event) => {
    setPlayerType(event.target.value);
  };

  useEffect(() => {
    //axios.get(`http://localhost:5000/?difficulty=${difficulty}&playerType=${playerType}`)
    axios.get(`https://goldilockone-ranking-api.herokuapp.com/?difficulty=${difficulty}&playerType=${playerType}`)
      .then(function (response) {
        setRank(response.data)
      })
      .catch(function (error) {
        // handle error
        //console.log(error);
      })
  }, [difficulty, playerType])

  return (
    <Container maxWidth="md" style={{ paddingTop: 20 }}>
      <img src={topBackground} alt='top background' style={{ position: 'absolute', top: '0', left: '0', width: matchesLg ? '250px' : '80px' }} />
      <Grid container spacing={2} style={{ justifyContent: 'flex-end', marginBottom: '15px' }} >
        <Grid style={{ display: 'flex', flex: 2, padding: '0px 30px', justifyContent: !matches ? 'center' : 'flex-start' }}>
          <img alt='logo' src={logo} style={{ height: !matches ? '100px' : '180px' }} />
        </Grid>
        <Grid style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Grid item>
            <Box sx={{ width: 120 }}>
              <FormControl style={{ backgroundColor: '#fff' }} fullWidth>
                <InputLabel id="demo-simple-select-label">Player Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={playerType}
                  label="playerType"
                  onChange={handleChangePlayerType}
                >
                  <MenuItem value='Normal'>Normal</MenuItem>
                  <MenuItem value='Streamer'>Streamer</MenuItem>
                  <MenuItem value='Dev'>Dev</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ width: 120 }}>
              <FormControl style={{ backgroundColor: '#fff' }} fullWidth>
                <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={difficulty}
                  label="Difficulty"
                  onChange={handleChangeDifficulty}
                >
                  <MenuItem value='Easy'>Easy</MenuItem>
                  <MenuItem value='Normal'>Normal</MenuItem>
                  <MenuItem value='Hard'>Hard</MenuItem>
                  <MenuItem value='Very Hard'>Very Hard</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      
      
      <DataTable
        columns={columns}
        data={rank}
      />
    </Container>
  );
}

export default App;
