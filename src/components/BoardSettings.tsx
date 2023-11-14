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

import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Stack } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  selectBoard,
  setCircleRadius,
  setNumbersSize,
  toggleShowNumbers,
} from '../app/slices/boardSlice';

const BoardSettings = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { showNumbers, numbersSize, circleRadius } = useSelector(selectBoard);

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
        </Stack>
      </Popover>
    </div>
  );
};

export default BoardSettings;
