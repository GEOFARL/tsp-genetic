import { Box } from '@mui/system';
import useBoard from '../hooks/useBoard';
import useDrawPoints from '../hooks/useDrawPoints';

const Board = () => {
  const { ref: boardRef } = useBoard();

  useDrawPoints(boardRef);
  return (
    <Box sx={{ margin: '1.5rem auto 0 auto', width: 'max-content' }}>
      <canvas
        width={'900'}
        height={'700'}
        style={{
          border: '2px solid black',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 2px 6px 1px rgba(0, 0, 0, .2)',
        }}
        ref={boardRef}
      >
        hi there
      </canvas>
    </Box>
  );
};

export default Board;
