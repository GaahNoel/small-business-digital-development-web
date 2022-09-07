import { extendTheme } from '@chakra-ui/react';
import { darken, lighten } from 'polished';

export const primary = '#5647B2';
export const secondary = 'rgba(245, 242, 255, 0.9)';
export const secondary_full = 'rgba(245, 242, 255, 1)';
export const default_orange = '#FE7040';
export const service_blue = '#4FAAFF';
export const default_yellow = '#F2B705';

export const Theme = extendTheme({
  semanticTokens: {
    colors: {
      error: 'red.500',
      success: 'green.500',
      primary: primary,
      primary_hover: darken(0.2, primary),
      primary_light: lighten(0.15, primary),
      secondary,
      secondary_hover: darken(0.2, secondary),
      secondary_full,
      secondary_full_hover: darken(0.2, secondary_full),
      default_orange,
      default_orange_hover: darken(0.2, default_orange),
      default_orange_light: lighten(0.15, default_orange),
      service_blue,
      service_blue_hover: darken(0.2, service_blue),
      service_blue_light: lighten(0.1, service_blue),
      default_yellow,
      default_yellow_hover: darken(0.2, default_yellow),
    },
  },
  styles: {
    global: {
      body: {
        fontFamily: 'Nunito, sans-serif',
      },
      '&::-webkit-scrollbar': {
        width: '10px',
      },
      '&::-webkit-scrollbar-track': {
        width: '6px',
        background: 'product_form_purple',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#423788',
      },
      '.icon::before': {
        display: 'inline-block',
        fontStyle: 'normal',
        fontVariant: 'normal',
        textRendering: 'auto',
        '-webkit-font-smoothing': 'antialiased',
      },
    },
  },
});
