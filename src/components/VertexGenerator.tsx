import { Button, Popover, Slider, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import useGeneratePoints from '../hooks/useGeneratePoints';
import {
  removeRoute,
  selectNumberOfPointsToGenerate,
  setIntervalId,
  setIsPaused,
  setNumberOfPointsToGenerate,
} from '../app/slices/GASlice';
import { MouseEvent, useState } from 'react';

const VertexGenerator = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'number-to-be-generated-popover' : undefined;

  const dispatch = useDispatch<AppDispatch>();
  const pointsToGenerate = useSelector(selectNumberOfPointsToGenerate);
  const generatePoints = useGeneratePoints();

  return (
    <Stack direction={'row'} spacing={2}>
      <Button
        variant="contained"
        onClick={() => {
          dispatch(setIntervalId(null));
          dispatch(removeRoute());
          dispatch(setIsPaused(false));
          generatePoints(pointsToGenerate);
        }}
        sx={{
          borderRadius: '4px 0 0 4px',
        }}
      >
        Generate vertices <AddIcon />
      </Button>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{
          minWidth: '0',
          padding: '0',
          ml: '0 !important',
          borderRadius: '0 4px 4px 0',
        }}
      >
        <ArrowDropDownIcon />
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
        sx={{
          transform: 'translateX(-198px);',
        }}
      >
        <Stack
          direction={'column'}
          spacing={2}
          sx={{
            width: '224px',
            p: 1,
            pl: 2,
            pr: 3,
            mt: 1,
          }}
        >
          <Typography>Number: {pointsToGenerate}</Typography>
          <Slider
            size="small"
            aria-label="Small"
            valueLabelDisplay="auto"
            max={1000}
            value={pointsToGenerate}
            onChange={(_, newValue) =>
              dispatch(setNumberOfPointsToGenerate(newValue as number))
            }
          />
        </Stack>
      </Popover>
    </Stack>
  );
};

export default VertexGenerator;
