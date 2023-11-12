import { Box, Container } from '@mui/system';
import Header from './components/Header';
import { grey } from '@mui/material/colors';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: grey['50'],
      }}
    >
      <Header />
      <Container maxWidth={'lg'}></Container>
    </Box>
  );
}

export default App;
