import { Button } from '@mui/material';
import { Stack } from '@mui/system';

import DeleteIcon from '@mui/icons-material/Delete';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import useGeneratePoints from '../hooks/useGeneratePoints';
import useClearAll from '../hooks/useClearAll';

const ControlPanel = () => {
  const generatePoints = useGeneratePoints();
  const clearAllPoints = useClearAll();

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
      <Button variant="outlined" color="error">
        Stop <StopIcon />
      </Button>
      <Button variant="contained" onClick={() => generatePoints(50)}>
        Generate vertices <AddIcon />
      </Button>
      <Button variant="contained" color={'error'} onClick={clearAllPoints}>
        Clear All <DeleteIcon sx={{ pb: '.15rem' }} />
      </Button>
    </Stack>
  );
};

export default ControlPanel;
