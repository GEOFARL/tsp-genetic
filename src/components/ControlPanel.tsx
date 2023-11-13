import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';

import DeleteIcon from '@mui/icons-material/Delete';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import useGeneratePoints from '../hooks/useGeneratePoints';
import useClearAll from '../hooks/useClearAll';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  removeRoute,
  selectPoints,
  setIntervalId,
} from '../app/slices/GASlice';
import useStartAlgorithm from '../hooks/useStartAlgorithm';

const ControlPanel = () => {
  const generatePoints = useGeneratePoints();
  const clearAllPoints = useClearAll();
  const startAlgo = useStartAlgorithm();

  const dispatch = useDispatch<AppDispatch>();
  const points = useSelector(selectPoints);

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
        <Button
          variant="contained"
          onClick={() => {
            if (points.length > 0) {
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
        <Button
          variant="contained"
          onClick={() => {
            dispatch(setIntervalId(null));
            dispatch(removeRoute());
            generatePoints(50);
          }}
        >
          Generate vertices <AddIcon />
        </Button>
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
