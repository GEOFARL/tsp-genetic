import { Box } from '@mui/system';
import useBoard from '../hooks/useBoard';

const Board = () => {
  const { ref: boardRef } = useBoard();
  return (
    <Box sx={{ margin: '1.5rem auto 0 auto', width: 'max-content' }}>
      <canvas
        width={'900'}
        height={'700'}
        style={{
          border: '2px solid black',
          borderRadius: '8px',
        }}
        ref={boardRef}
      >
        hi there
      </canvas>
    </Box>
  );
};

export default Board;
