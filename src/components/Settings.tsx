import { Stack } from '@mui/system';
import BoardSettings from './BoardSettings';

const Settings = () => {
  return (
    <Stack
      direction={'row'}
      sx={{
        maxWidth: '900px',
        margin: '1rem auto 0 auto',
      }}
      spacing={2}
    >
      <BoardSettings />
    </Stack>
  );
};

export default Settings;
