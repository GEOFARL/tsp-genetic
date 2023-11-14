import { Typography } from '@mui/material';
import { grey, teal } from '@mui/material/colors';
import { Box } from '@mui/system';
import MapIcon from '@mui/icons-material/Map';

const Header = () => {
  return (
    <Box
      sx={{
        backgroundColor: teal['600'],
        color: grey['200'],
        py: {
          xs: '1rem',
        },
        boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
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
        Traveling Salesman Problem{' '}
        <MapIcon
          sx={{
            width: '2.1rem',
            height: '2.1rem',
          }}
        />
      </Typography>
    </Box>
  );
};

export default Header;
