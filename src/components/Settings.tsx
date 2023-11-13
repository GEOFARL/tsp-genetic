import { Box, Stack } from '@mui/system';
import BoardSettings from './BoardSettings';
import AlgorithmSettings from './AlgorithmSettings';
import { Typography } from '@mui/material';

const Settings = () => {
  return (
    <Box
      sx={{
        maxWidth: '900px',
        margin: '1rem auto 0 auto',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '500',
          mb: '5px',
        }}
      >
        Settings
      </Typography>
      <Stack direction={'row'} spacing={2}>
        <BoardSettings />
        <AlgorithmSettings />
      </Stack>
    </Box>
  );
};

export default Settings;
