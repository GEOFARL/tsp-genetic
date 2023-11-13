import { useDispatch, useSelector } from 'react-redux';
import {
  selectConfig,
  setCrossoverProbability,
  setMutationProbability,
  setPopulationSize,
} from '../app/slices/GASlice';
import { AppDispatch } from '../app/store';
import { Box, Stack } from '@mui/system';
import { Slider, TextField, Typography } from '@mui/material';

const MetricsConfig = () => {
  const { crossoverProbability, mutationProbability, populationSize } =
    useSelector(selectConfig);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box>
      <Stack direction={'column'} spacing={1}>
        <TextField
          id="populationSize"
          label="Population Size"
          variant="standard"
          fullWidth
          value={populationSize}
          onChange={(e) => {
            if (+e.target.value < 0 && e.target.value.length !== 1) return;
            dispatch(setPopulationSize(+e.target.value));
          }}
          type="number"
        />
        <Box sx={{ pt: '15px' }}>
          <Typography>Crossover Probability</Typography>
          <Slider
            size="small"
            value={crossoverProbability}
            onChange={(_, newValue) =>
              dispatch(setCrossoverProbability(newValue as number))
            }
            min={0}
            max={1}
            step={0.01}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
        </Box>
        <Box sx={{ pt: '5px' }}>
          <Typography>Mutation Probability</Typography>
          <Slider
            size="small"
            value={mutationProbability}
            onChange={(_, newValue) =>
              dispatch(setMutationProbability(newValue as number))
            }
            min={0}
            max={1}
            step={0.01}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default MetricsConfig;
