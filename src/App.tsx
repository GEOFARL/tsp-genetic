import { Box, Container } from '@mui/system';
import Header from './components/Header';
import { grey } from '@mui/material/colors';
import Board from './components/Board';
import ControlPanel from './components/ControlPanel';
import Stats from './components/Stats';
import Settings from './components/Settings';
import Plot from './components/Plot';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: grey['50'],
      }}
    >
      <Header />
      <Container
        sx={{
          maxWidth: '950px !important',
          mb: 5,
        }}
      >
        <ControlPanel />
        <Settings />
        <Stats />
        <Plot />
        <Board />
      </Container>
    </Box>
  );
}

export default App;
