import React from 'react'
import './App.css';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';


const columns = [
  {
    name: 'Position',
    selector: row => row.Position,
  },
  {
      name: 'Username',
      selector: row => row.Username,
  },
  {
    name: 'DamageReceived',
    selector: row => row.DamageReceived,
    sortable: true,
  },
  {
    name: 'Duration',
    selector: row => row.Duration,
    sortable: true,
  },
];

function App() {
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
      <Typography variant="h3" gutterBottom>
        Goldilock One Ranking
      </Typography>
      <Grid container spacing={2}>
      <Grid item>
        <Box sx={{ width: 120 }}>
          <FormControl fullWidth>
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
          <FormControl fullWidth>
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
      
      
      <DataTable
        columns={columns}
        data={rank}
      />
    </Container>
  );
}

export default App;
