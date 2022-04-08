import { extendTheme } from '@chakra-ui/react';
import { darken, lighten } from 'polished';

const primary = '#5647B2';
const secondary = 'rgba(245, 242, 255, 0.9)';
const default_white = '#FFFFFF';
const default_black = '#000000';
const facebook_blue = '#4065B4';
const light_purple = '#A2A4FF';
const default_orange = '#FE7040';
const service_blue = '#4FAAFF';
const shop_yellow = '#F2B705';

export const Theme = extendTheme({
  semanticTokens: {
    colors: {
      error: 'red.500',
      success: 'green.500',
      primary: primary,
      primary_hover: darken(0.2, primary),
      secondary,
      secondary_hover: darken(0.2, secondary),
      default_white,
      default_white_hover: darken(0.2, default_white),
      default_black,
      default_black_hover: lighten(0.2, default_black),
      facebook_blue,
      facebook_blue_hover: darken(0.2, facebook_blue),
      light_purple,
      light_purple_hover: darken(0.2, light_purple),
      default_orange,
      default_orange_hover: darken(0.2, default_orange),
      service_blue,
      service_blue_hover: darken(0.2, service_blue),
      shop_yellow,
      shop_yellow_hover: darken(0.2, shop_yellow),
    },
  },
});
