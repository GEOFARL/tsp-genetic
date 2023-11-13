import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';

import DeleteIcon from '@mui/icons-material/Delete';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import useGeneratePoints from '../hooks/useGeneratePoints';
import useClearAll from '../hooks/useClearAll';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { setRunning } from '../app/slices/GASlice';

const ControlPanel = () => {
  const generatePoints = useGeneratePoints();
  const clearAllPoints = useClearAll();

  const dispatch = useDispatch<AppDispatch>();

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
        Control Panel
      </Typography>
      <Stack direction={'row'} spacing={2}>
        <Button variant="contained" onClick={() => dispatch(setRunning(true))}>
          Start <PlayArrowIcon />
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => dispatch(setRunning(false))}
        >
          Stop <StopIcon />
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(setRunning(false));
            generatePoints(50);
          }}
        >
          Generate vertices <AddIcon />
        </Button>
        <Button
          variant="contained"
          color={'error'}
          onClick={() => {
            dispatch(setRunning(false));
            clearAllPoints();
          }}
        >
          Clear All <DeleteIcon sx={{ pb: '.15rem' }} />
        </Button>
      </Stack>
    </Box>
  );
};

export default ControlPanel;
