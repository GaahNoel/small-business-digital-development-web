import { Box } from '@chakra-ui/react';
import { Console } from 'console';
import { useEffect } from 'react';

export const MissionProgressBar = ({ progress }: { progress: number }) => {
  return (
    <>
      <Box
        className={'strength-meter'}
        width="100%"
        sx={{
          '&': {
            position: 'relative',
            height: '4px',
            background: 'empty_gray',
            margin: '7px 0',
            borderRadius: ' 2px',
          },
        }}
      >
        <Box
          className="strength-meter-fill"
          data-strength={progress}
          width={`${progress * 100}%`}
          bg={
            progress < 0.33
              ? 'orangered'
              : progress < 0.66
              ? 'orange'
              : progress < 1
              ? 'yellowgreen'
              : progress === 1
              ? 'green'
              : 'default_white'
          }
          sx={{
            height: 'inherit',
            position: 'absolute',
            borderRadius: 'inherit',
            transition: 'width 0.5s ease-in-out, background 0.25s',
          }}
        ></Box>
      </Box>
    </>
  );
};
