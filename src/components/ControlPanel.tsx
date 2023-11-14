import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';

import DeleteIcon from '@mui/icons-material/Delete';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import useClearAll from '../hooks/useClearAll';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  selectIntervalId,
  selectPoints,
  setIntervalId,
} from '../app/slices/GASlice';
import useStartAlgorithm from '../hooks/useStartAlgorithm';
import VertexGenerator from './VertexGenerator';

const ControlPanel = () => {
  const clearAllPoints = useClearAll();
  const startAlgo = useStartAlgorithm();

  const dispatch = useDispatch<AppDispatch>();
  const points = useSelector(selectPoints);
  const intervalId = useSelector(selectIntervalId);

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
      <Stack direction={'row'} spacing={2} alignItems={'end'}>
        <Button
          variant="contained"
          onClick={() => {
            if (points.length > 0 && !intervalId) {
              startAlgo();
            }
          }}
        >
          Start <PlayArrowIcon />
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            dispatch(setIntervalId(null));
          }}
        >
          Stop <StopIcon />
        </Button>
        <VertexGenerator />
        <Button
          variant="contained"
          color={'error'}
          onClick={() => {
            dispatch(setIntervalId(null));
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
