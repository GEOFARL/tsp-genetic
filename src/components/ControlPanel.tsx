import { Button } from '@mui/material';
import { Stack } from '@mui/system';

import DeleteIcon from '@mui/icons-material/Delete';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import useGeneratePoints from '../hooks/useGeneratePoints';

const ControlPanel = () => {
  const generatePoints = useGeneratePoints();

  return (
    <Stack
      direction={'row'}
      sx={{
        maxWidth: '900px',
        margin: '1rem auto 0 auto',
      }}
      spacing={2}
    >
      <Button variant="contained">
        Start <PlayArrowIcon />
      </Button>
      <Button variant="outlined">
        Stop <StopIcon />
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => generatePoints(50)}
      >
        Generate vertices <AddIcon />
      </Button>
      <Button variant="contained" color={'error'}>
        Clear All <DeleteIcon sx={{ pb: '.15rem' }} />
      </Button>
    </Stack>
  );
};

export default ControlPanel;
