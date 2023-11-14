import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import {
  selectGenerationCount,
  selectTotalPointsGenerated,
} from '../app/slices/GASlice';

const Stats = () => {
  const totalVertices = useSelector(selectTotalPointsGenerated);
  const generationCount = useSelector(selectGenerationCount);

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
    </Box>
  );
};

export default Stats;
