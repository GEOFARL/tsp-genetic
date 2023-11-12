import { Box } from '@mui/system';

const Board = () => {
  return (
    <Box sx={{ margin: '1.5rem auto 0 auto', width: 'max-content' }}>
      <canvas
        width={'900'}
        height={'700'}
        style={{
          border: '2px solid black',
          borderRadius: '8px',
        }}
      >
        hi there
      </canvas>
    </Box>
  );
};

export default Board;
