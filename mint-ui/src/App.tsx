import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { GatewayServiceClient } from './generated/GatewayServiceClientPb'
import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import './App.css';
import { CreateCurrencyGatewayRequest, GetTopMintedCurrenciesGatewayRequest, MintGatewayRequest } from './generated/gateway_pb';

interface LeaderboardRecord {
  currencyName: string;
  coinsAmount: number;
}

const largeWhiteFont = {
  fontSize: '15pt',
  color: 'white',
  border: 'none',
  padding: '8px 16px'
} as const;


const extraLargeFont = {
  fontSize: '25pt',
} as const;


const gwClient = new GatewayServiceClient('http://35.240.40.13:80');

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
          <Button variant="contained" size="large" sx={extraLargeFont} onClick={doMint} disabled={!currencyInitialized || mintingInProgress}>Mint</Button>
        </div>
      </header>
    </div>
  );
}

function Top5() {

  const [leaderboardInitialized, setLeaderboardInitialized] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRecord[]>([]);
  const { prefix } = useParams();

  console.log("prefix: " + prefix);

  useEffect(() => {
    if (!leaderboardInitialized) {
      gwClient.getTopMintedCurrencies(
        new GetTopMintedCurrenciesGatewayRequest().setMaxnumberofcurrencies(5).setPrefix(prefix ? prefix : ''),
        null,
        (err, response) => {
          const records = response.getRecordsList();
          setLeaderboard(records.map(r => { return { currencyName: r.getCurrencyname(), coinsAmount: r.getAmount() }; }));
          console.log("Set leaderboard " + JSON.stringify(records));
          setLeaderboardInitialized(true);
        }
      );
    }
  }, [leaderboardInitialized, prefix]);


  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Top5Table records={leaderboard || []} />
        </div>
      </header>
    </div>
  );
}

interface Top5TableProps {
  records: LeaderboardRecord[]
}

function Top5Table(props: Top5TableProps) {

  return (
    <TableContainer>
      <Table aria-label="table" sx={{ fontSize: 'x-large' }}>
        <TableHead>
          <TableRow>
            <TableCell aria-label='th' sx={largeWhiteFont}><b>Currency name</b></TableCell>
            <TableCell aria-label='th' sx={largeWhiteFont} align="right"><b># minted</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(props.records).map((row) => (
            <TableRow
              key={row.currencyName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell scope="row" sx={largeWhiteFont}>
                {row.currencyName}
              </TableCell>
              <TableCell align="right" scope="row" sx={largeWhiteFont}>
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
        <Route path="top5" element = {<Top5 />} />
        <Route path="top5/:prefix" element = {<Top5 />} />
      </Routes>
    </BrowserRouter>);
};

export default App;
