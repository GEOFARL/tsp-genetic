import { Button, Snackbar, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import MuiAlert from '@mui/material/Alert';

import DeleteIcon from '@mui/icons-material/Delete';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import useClearAll from '../hooks/useClearAll';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  removeRoute,
  selectIntervalId,
  selectIsPaused,
  selectPoints,
  setIsPaused,
} from '../app/slices/GASlice';
import useStartAlgorithm from '../hooks/useStartAlgorithm';
import VertexGenerator from './VertexGenerator';
import { useState } from 'react';
import useReset from '../hooks/useReset';

const ControlPanel = () => {
  const [messageOpen, setMessageOpen] = useState(false);
  const clearAllPoints = useClearAll();
  const reset = useReset();
  const startAlgo = useStartAlgorithm();

  const dispatch = useDispatch<AppDispatch>();
  const points = useSelector(selectPoints);
  const intervalId = useSelector(selectIntervalId);
  const isPaused = useSelector(selectIsPaused);

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
        {!intervalId ? (
          <Button
            variant="contained"
            onClick={() => {
              if (points.length > 0 && !intervalId) {
                startAlgo();
              } else if (points.length === 0) {
                setMessageOpen(true);
              }
            }}
          >
            Start <PlayArrowIcon />
          </Button>
        ) : !isPaused ? (
          <Button
            variant="contained"
            onClick={() => dispatch(setIsPaused(true))}
          >
            Pause <PlayArrowIcon />
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => dispatch(setIsPaused(false))}
          >
            Resume <PauseIcon />
          </Button>
        )}
        <Snackbar
          open={messageOpen}
          autoHideDuration={6000}
          onClose={() => setMessageOpen(false)}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MuiAlert
            onClose={() => setMessageOpen(false)}
            severity="error"
            sx={{ width: '100%' }}
          >
            Generate vertices firstly
          </MuiAlert>
        </Snackbar>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            reset();
            dispatch(removeRoute());
          }}
        >
          Reset <StopIcon />
        </Button>
        <VertexGenerator />
        <Button
          variant="contained"
          color={'error'}
          onClick={() => {
            reset();
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
