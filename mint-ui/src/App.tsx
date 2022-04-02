import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GatewayServiceClient } from './generated/GatewayServiceClientPb'
import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import { CreateCurrencyGatewayRequest, GetTopMintedCurrenciesGatewayRequest, MintGatewayRequest, MintGatewayResponse } from './generated/gateway_pb';

interface LeaderboardRecord {
  currencyName: string;
  coinsAmount: number;
}

const gwClient = new GatewayServiceClient('http://34.148.210.16:80');

const Home = () => {
  const [currencyInitialized, setCurrencyInitialized] = useState<boolean>(false);
  const [currencyName, setCurrencyName] = useState<string>();
  const [coinsAmount, setCoinsAmount] = useState<number>();
  const [mintingInProgress, setMintingInProgress] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRecord[]>([]);


  useEffect(() => {
    if (!currencyInitialized) {
      gwClient.createCurrency(
        new CreateCurrencyGatewayRequest(),
        null,
        (err, response) => {
          setCurrencyName(response.getCurrencyname());
          console.log("Set currencyName=" + response.getCurrencyname());
          setCurrencyInitialized(true);


          gwClient.mint(
            new MintGatewayRequest().setCurrencyname(response.getCurrencyname()),
            null,
            (err, response) => {
              setCoinsAmount(response.getNewamount());
              console.log("Set CoinsAmount=" + response.getNewamount());
              setMintingInProgress(false);

              gwClient.getTopMintedCurrencies(
                new GetTopMintedCurrenciesGatewayRequest().setMaxnumberofcurrencies(5),
                null,
                (err, response) => {
                  const records = response.getRecordsList();
                  setLeaderboard(records.map(r => { return { currencyName: r.getCurrencyname(), coinsAmount: r.getAmount() }; }));
                  console.log("Set leaderboard " + JSON.stringify(records));
                }
              );
    
            }
          );
        }
      );
    }
  }, [currencyInitialized]);

  const doMint = () => {
    setMintingInProgress(true);
    if (currencyInitialized && currencyName) {
      gwClient.mint(
        new MintGatewayRequest().setCurrencyname(currencyName),
        null,
        (err, response) => {
          setCoinsAmount(response.getNewamount());
          console.log("Set CoinsAmount=" + response.getNewamount());
          setMintingInProgress(false);

          gwClient.getTopMintedCurrencies(
            new GetTopMintedCurrenciesGatewayRequest().setMaxnumberofcurrencies(5),
            null,
            (err, response) => {
              const records = response.getRecordsList();
              setLeaderboard(records.map(r => { return { currencyName: r.getCurrencyname(), coinsAmount: r.getAmount() }; }));
              console.log("Set leaderboard " + JSON.stringify(records));
            }
          );
    
        }
      );
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div><Top5Table records={leaderboard || []}/><br/><br/><br/></div>
        <div>
          {currencyInitialized ? currencyName : 'Loading currency name...'}
          <p>{coinsAmount && !mintingInProgress ? coinsAmount : 'Loading minted amount...'}</p>
          <Button variant="contained" onClick={doMint} disabled={!currencyInitialized || mintingInProgress}>Mint</Button>
        </div>
      </header>
    </div>
  );
}

function Top5() {

  const [leaderboardInitialized, setLeaderboardInitialized] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRecord[]>([]);

  useEffect(() => {
    if (!leaderboardInitialized) {
      gwClient.getTopMintedCurrencies(
        new GetTopMintedCurrenciesGatewayRequest().setMaxnumberofcurrencies(5),
        null,
        (err, response) => {
          const records = response.getRecordsList();
          setLeaderboard(records.map(r => { return { currencyName: r.getCurrencyname(), coinsAmount: r.getAmount() }; }));
          console.log("Set leaderboard " + JSON.stringify(records));
          setLeaderboardInitialized(true);
        }
      );
    }
  }, [leaderboardInitialized]);


  const largeFont = {
    fontSize: '15pt',
  } as const;

  return (
    <div className="App">
      <header className="App-header">
        <Top5Table records={leaderboard || []} />
      </header>
    </div>
  );
}

interface Top5TableProps {
  records: LeaderboardRecord[]
}

function Top5Table(props: Top5TableProps) {

  const [leaderboardInitialized, setLeaderboardInitialized] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRecord[]>([]);

  const largeFont = {
    fontSize: '15pt',
  } as const;

  return (
    <TableContainer sx={{ width: 500 }} component={Paper}>
      <Table aria-label="table" sx={{ fontSize: 'x-large' }}>
        <TableHead>
          <TableRow>
            <TableCell aria-label='th' sx={largeFont}><b>Currency name</b></TableCell>
            <TableCell aria-label='th' sx={largeFont} align="right"><b>Coins minted</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(props.records).map((row) => (
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
