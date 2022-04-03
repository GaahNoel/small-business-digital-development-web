import { extendTheme } from '@chakra-ui/react';

export const Theme = extendTheme({
  semanticTokens: {
    colors: {
      error: 'red.500',
      success: 'green.500',
      primary: '#5647B2',
      secondary: 'rgba(245, 242, 255, 0.9)',
      default_white: '#FFFFFF',
      default_black: '#000000',
      facebook_blue: '#4065B4',
      purple_email_button: '#A2A4FF',
    },
  },
});
