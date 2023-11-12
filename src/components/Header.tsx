import { Typography } from '@mui/material';
import { grey, teal } from '@mui/material/colors';
import { Box } from '@mui/system';

const Header = () => {
  return (
    <Box
      sx={{
        backgroundColor: teal['600'],
        color: grey['200'],
        py: {
          xs: '.4rem',
        },
      }}
    >
      <Typography
        variant="h3"
        component={'h1'}
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        Traveling Salesman Problem
      </Typography>
    </Box>
  );
};

export default Header;
