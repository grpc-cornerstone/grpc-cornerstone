import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

interface LeaderboardRecord {
  currencyName: string;
  coinsAmount: number;
}

const Home = () => {
  const [currencyName, setCurrencyName] = useState<string>();
  const [coinsAmount, setCoinsAmount] = useState<number>();


  // replace with a real call
  const doMint = () => {
    console.log((coinsAmount || 50) + 100);
    setCoinsAmount((coinsAmount || 50) + 100);
  }
  // replace with a real call
  if (!currencyName) {
    setCurrencyName("Dogecoin");
  }
  // replace with a real call
  if (!coinsAmount) {
    setCoinsAmount(200);
  }

  return (
    <div className="App">
      <header className="App-header">
        {currencyName ? currencyName : 'Loading...'}
        <p>{coinsAmount ? coinsAmount : ''}</p>
        <Button variant="contained" onClick={doMint}>Mint</Button>
      </header>
    </div>
  );
}

function Top5() {

  // replace with a real call
  const [leaderboard, setLeaderboard] = useState<LeaderboardRecord[]>([{ currencyName: 'Dogecoin', coinsAmount: 100500 }, { currencyName: "BitCoin", coinsAmount: 1000 }]);

  const largeFont = {
    fontSize: '15pt',
  } as const;

  return (
    <div className="App">
      <header className="App-header">
        <TableContainer sx={{ width: 500 }} component={Paper}>
          <Table aria-label="table" sx={{ fontSize: 'x-large' }}>
            <TableHead>
              <TableRow>
                <TableCell aria-label='th' sx={largeFont}><b>Currency name</b></TableCell>
                <TableCell aria-label='th' sx={largeFont} align="right"><b>Coins minted</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(leaderboard || []).map((row) => (
                <TableRow
                  key={row.currencyName}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell scope="row" sx={largeFont}>
                    {row.currencyName}
                  </TableCell>
                  <TableCell align="right" scope="row" sx={largeFont}>
                    {row.coinsAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </header>
    </div>
  );
}


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="top5" element={<Top5 />} />
      </Routes>
    </BrowserRouter>);
};

export default App;
