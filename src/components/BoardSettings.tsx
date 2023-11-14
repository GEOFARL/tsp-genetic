import {
  Button,
  Divider,
  FormControlLabel,
  Popover,
  Slider,
  Switch,
  Typography,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import { MuiColorInput } from 'mui-color-input';

import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Stack } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  resetToDefault,
  selectBoard,
  setCircleRadius,
  setEdgeColor,
  setEdgeThickness,
  setNumbersSize,
  setUpdateRate,
  toggleShowNumbers,
} from '../app/slices/boardSlice';
import { setIntervalId } from '../app/slices/GASlice';

const BoardSettings = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const {
    showNumbers,
    numbersSize,
    circleRadius,
    edgeColor,
    edgeThickness,
    updateRate,
  } = useSelector(selectBoard);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'board-settings-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Board Settings{' '}
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
          py={1}
        >
          <Box sx={{ padding: '5px 20px' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={showNumbers}
                  onChange={() => dispatch(toggleShowNumbers())}
                />
              }
              label="Show numbers"
              labelPlacement="start"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                ml: 0,
              }}
            />
          </Box>

          <Divider sx={{ borderBottomWidth: 2 }} />

          <Stack
            direction={'column'}
            spacing={2}
            sx={{
              padding: '5px 20px',
            }}
          >
            <Typography>Numbers fontsize: {numbersSize}px</Typography>
            <Slider
              size="small"
              aria-label="Small"
              valueLabelDisplay="auto"
              value={numbersSize}
              onChange={(_, newValue) =>
                dispatch(setNumbersSize(newValue as number))
              }
              min={4}
              max={30}
            />
          </Stack>

          <Divider sx={{ borderBottomWidth: 2 }} />

          <Stack
            direction={'column'}
            spacing={2}
            sx={{
              padding: '5px 20px',
            }}
          >
            <Typography>Circles radius: {circleRadius}px</Typography>
            <Slider
              size="small"
              aria-label="Small"
              valueLabelDisplay="auto"
              value={circleRadius}
              onChange={(_, newValue) =>
                dispatch(setCircleRadius(newValue as number))
              }
              min={1}
              max={15}
            />
          </Stack>

          <Divider sx={{ borderBottomWidth: 2 }} />

          <Box sx={{ padding: '5px 20px' }}>
            <Typography>Edge Color</Typography>
            <MuiColorInput
              value={edgeColor}
              onChange={(newValue: string) => dispatch(setEdgeColor(newValue))}
            ></MuiColorInput>
          </Box>

          <Divider sx={{ borderBottomWidth: 2 }} />

          <Stack
            direction={'column'}
            spacing={2}
            sx={{
              padding: '5px 20px',
            }}
          >
            <Typography>Edge thickness: {edgeThickness}px</Typography>
            <Slider
              size="small"
              aria-label="Small"
              valueLabelDisplay="auto"
              value={edgeThickness}
              onChange={(_, newValue) =>
                dispatch(setEdgeThickness(newValue as number))
              }
              min={0.1}
              max={5}
              step={0.1}
            />
          </Stack>

          <Divider sx={{ borderBottomWidth: 2 }} />

          <Stack
            direction={'column'}
            spacing={2}
            sx={{
              padding: '5px 20px',
            }}
          >
            <Typography>Generation update rate: {updateRate}ms</Typography>
            <Slider
              size="small"
              aria-label="Small"
              valueLabelDisplay="auto"
              value={updateRate}
              onChange={(_, newValue) => {
                dispatch(setIntervalId(null));
                dispatch(setUpdateRate(newValue as number));
              }}
              min={5}
              max={1000}
            />
          </Stack>

          <Divider sx={{ borderBottomWidth: 2 }} />

          <Box
            sx={{
              padding: '5px 20px 0 20px',
            }}
          >
            <Button fullWidth onClick={() => dispatch(resetToDefault())}>
              Reset to Defaults
            </Button>
          </Box>
        </Stack>
      </Popover>
    </div>
  );
};

export default BoardSettings;
