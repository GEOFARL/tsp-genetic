import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Popover,
  Select,
} from '@mui/material';
import { MouseEvent, useState } from 'react';

import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Stack } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  selectParameters,
  setCrossover,
  setLocalImprovement,
  setMutation,
} from '../app/slices/algorithmParametersSlice';
import { Crossover, LocalImprovement, Mutation } from '../types';
import MetricsConfig from './MetricsConfig';
import useReset from '../hooks/useReset';

const AlgorithmSettings = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { crossover, localImprovement, mutation } =
    useSelector(selectParameters);

  const reset = useReset();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Algorithm Settings{' '}
        <SettingsIcon
          sx={{
            p: '0 0 2px 4px',
          }}
        />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack
          direction="column"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={0}
          width={250}
        >
          <Box sx={{ padding: '15px 20px' }}>
            <FormControl fullWidth size="small">
              <InputLabel id="crossover-select-label">
                Crossover Type
              </InputLabel>
              <Select
                labelId="crossover-select-label"
                id="crossover-select"
                value={crossover.toUpperCase()}
                label="Crossover Type"
                onChange={(e) => {
                  dispatch(
                    setCrossover(e.target.value.toLowerCase() as Crossover)
                  );
                  reset();
                }}
              >
                {Object.entries(Crossover).map((value) => (
                  <MenuItem key={value[0]} value={value[0]}>
                    {value[1].toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ borderBottomWidth: 2 }} />

          <Box sx={{ padding: '15px 20px' }}>
            <FormControl fullWidth size="small">
              <InputLabel id="mutation-select-label">Mutation Type</InputLabel>
              <Select
                labelId="mutation-select-label"
                id="mutation-select"
                value={mutation.toUpperCase()}
                label="Mutation Type"
                onChange={(e) => {
                  dispatch(
                    setMutation(e.target.value.toLowerCase() as Mutation)
                  );
                  reset();
                }}
              >
                {Object.entries(Mutation).map((value) => (
                  <MenuItem key={value[0]} value={value[0]}>
                    {value[1].toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ borderBottomWidth: 2 }} />

          <Box sx={{ padding: '15px 20px' }}>
            <FormControl fullWidth size="small">
              <InputLabel id="local-improvement-select-label">
                Local Improvement Type
              </InputLabel>
              <Select
                labelId="local-improvement-select-label"
                id="local-improvement-select"
                value={localImprovement.toUpperCase()}
                label="Local Improvement Type"
                onChange={(e) => {
                  dispatch(
                    setLocalImprovement(
                      e.target.value.toLowerCase() as LocalImprovement
                    )
                  );
                  reset();
                }}
              >
                {Object.entries(LocalImprovement).map((value) => (
                  <MenuItem key={value[0]} value={value[0]}>
                    {value[1].toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ borderBottomWidth: 2 }} />

          <Box sx={{ padding: '15px 20px' }}>
            <MetricsConfig />
          </Box>
        </Stack>
      </Popover>
    </div>
  );
};

export default AlgorithmSettings;
