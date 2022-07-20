import { extendTheme } from '@chakra-ui/react';
import { darken, lighten, opacify } from 'polished';

export const primary = '#5647B2';
export const secondary = 'rgba(245, 242, 255, 0.9)';
export const secondary_full = 'rgba(245, 242, 255, 1)';
export const default_white = '#FFFFFF';
export const default_black = '#000000';
export const card_white = '#F7F5FF';
export const facebook_blue = '#4065B4';
export const light_purple = '#A2A4FF';
export const product_bg_purple = '#AD96F8';
export const product_form_purple = '#CFC5FF';
export const drop_file_bg_purple = 'rgba(86, 72, 177, 0.21)';
export const default_orange = '#FE7040';
export const service_blue = '#4FAAFF';
export const default_yellow = '#F2B705';
export const default_gray = '#808080';
export const success_green = '#16DC36';
export const error_red = '#FA0D0D';
export const primary_opacity = 'rgba(86, 71, 178, 0.7)';
export const accordion_order_gray = '#E1E1E1';
export const accordion_list = '#5647b2c7';

export const Theme = extendTheme({
  semanticTokens: {
    colors: {
      error: 'red.500',
      success: 'green.500',
      primary: primary,
      primary_hover: darken(0.2, primary),
      primary_opacity: primary_opacity,
      primary_opacity_hover: darken(0.2, primary_opacity),
      secondary,
      secondary_hover: darken(0.2, secondary),
      secondary_full,
      secondary_full_hover: darken(0.2, secondary_full),
      default_white,
      default_white_hover: darken(0.2, default_white),
      default_black,
      default_black_hover: lighten(0.2, default_black),
      card_white,
      card_white_hover: darken(0.05, card_white),
      facebook_blue,
      facebook_blue_hover: darken(0.2, facebook_blue),
      light_purple,
      light_purple_hover: darken(0.2, light_purple),
      product_bg_purple,
      product_bg_purple_hover: darken(0.2, product_bg_purple),
      product_form_purple,
      product_form_purple_hover: darken(0.2, product_form_purple),
      drop_file_bg_purple,
      drop_file_bg_purple_hover: darken(0.2, drop_file_bg_purple),
      default_orange,
      default_orange_hover: darken(0.2, default_orange),
      default_orange_light: lighten(0.15, default_orange),
      service_blue,
      service_blue_hover: darken(0.2, service_blue),
      service_blue_light: lighten(0.1, service_blue),
      default_yellow,
      default_yellow_hover: darken(0.2, default_yellow),
      default_gray,
      default_gray_hover: darken(0.2, default_gray),
      success_green,
      success_green_hover: darken(0.2, success_green),
      error_red,
      error_red_hover: darken(0.2, error_red),
      accordion_order_gray,
      accordion_order_gray_light: lighten(0.1, accordion_order_gray),
      accordion_list,
    },
  },
  styles: {
    global: {
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
    },
  },
});
