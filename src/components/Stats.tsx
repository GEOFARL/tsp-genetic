import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import {
  selectGenerationCount,
  selectTotalDistance,
  selectTotalPointsGenerated,
} from '../app/slices/GASlice';

const Stats = () => {
  const totalVertices = useSelector(selectTotalPointsGenerated);
  const generationCount = useSelector(selectGenerationCount);
  const totalDistance = useSelector(selectTotalDistance);

  return (
    <Box
      sx={{
        mt: '1rem',
      }}
    >
      <Typography variant="body1">
        Generated number of vertices: {totalVertices}
      </Typography>
      <Typography variant="body1">
        Generation count: {generationCount}
      </Typography>
      <Typography variant="body1">Total distance: {totalDistance}px</Typography>
    </Box>
  );
};

export default Stats;
