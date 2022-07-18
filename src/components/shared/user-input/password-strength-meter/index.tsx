import { Box } from '@chakra-ui/react';

export const PasswordStrengthMeter = ({ strength }: { strength: number }) => {
  return (
    <>
      <Box
        className={'strength-meter'}
        sx={{
          '&': {
            position: 'relative',
            height: '3px',
            background: '#ddd',
            margin: '7px 0',
            borderRadius: ' 2px',
          },
          '&:after,&:before': {
            content: '""',
            height: 'inherit',
            background: 'transparent',
            display: 'block',
            borderColor: '#fff',
            borderStyle: 'solid',
            borderWidth: '0 6px 0',
            position: 'absolute',
            width: 'calc(20% + 6px)',
            zIndex: '10',
          },
          '&:before': {
            left: 'calc(20% - 3px)',
          },
          '&:after': {
            right: 'calc(20% - 3px)',
          },
          '.strength-meter-fill[data-strength="1"]': {
            width: '20%',
            background: 'orangered',
          },
          '.strength-meter-fill[data-strength="2"]': {
            width: '40%',
            background: 'orange',
          },
          '.strength-meter-fill[data-strength="3"]': {
            width: '80%',
            background: 'yellowgreen',
          },
          '.strength-meter-fill[data-strength="4"]': {
            width: '100%',
            background: 'green',
          },
        }}
      >
        <Box
          className="strength-meter-fill"
          data-strength={strength}
          sx={{
            background: 'transparent',
            height: 'inherit',
            position: 'absolute',
            width: '0',
            borderRadius: 'inherit',
            transition: 'width 0.5s ease-in-out, background 0.25s',
          }}
        ></Box>
      </Box>
    </>
  );
};
