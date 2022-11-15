import React from 'react'
import './App.css';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';


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
      name: 'Difficulty',
      selector: row => row.Difficulty,
  },
  {
    name: 'PlayerType',
    selector: row => row.PlayerType,
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

  const handleChange = (event) => {
    setDifficulty(event.target.value);
  };

  useEffect(() => {
    axios.get(`https://goldilockone-ranking-api.herokuapp.com/?difficulty=${difficulty}`)
      .then(function (response) {
        setRank(response.data)
      })
      .catch(function (error) {
        // handle error
        //console.log(error);
      })
  }, [difficulty])

  return (
    <Container maxWidth="md" style={{ paddingTop: 20 }}>
      <Typography variant="h3" gutterBottom>
        Goldilock One Ranking
      </Typography>
      <Box sx={{ width: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={difficulty}
            label="Difficulty"
            onChange={handleChange}
          >
            <MenuItem value='Easy'>Easy</MenuItem>
            <MenuItem value='Normal'>Normal</MenuItem>
            <MenuItem value='Hard'>Hard</MenuItem>
            <MenuItem value='Very Hard'>Very Hard</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <DataTable
        columns={columns}
        data={rank}
      />
    </Container>
  );
}

export default App;
