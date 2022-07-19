import { Flex, IconButton, Input, Stack } from '@chakra-ui/react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';

export const InputMap = () => {
  const router = useRouter();
  const geocoder = useMemo(
    () =>
      new MapboxGeocoder({
        accessToken: process.env.MAPBOX_TOKEN as string,
      }),
    [],
  );

  useEffect(() => {
    geocoder.addTo('#geocoder_input');

    // Add geocoder result to container.
    geocoder.on('result', (e) => {
      const [lng, lat] = e.result.center;
      router.push({
        pathname: '/businesses-nearby',
        query: {
          lat,
          lng,
        },
      });
    });

    // Clear results container when search is cleared.
    geocoder.on('clear', () => {
      console.log('clear');
    });
  }, [geocoder]);

  return (
    <>
      <Flex
        id="geocoder_input"
        minW="200px"
        width={{ base: '90%', md: '72%' }}
        margin={{ base: '30px auto 100px auto', md: '30px auto 50px auto' }}
        align="center"
        justify="center"
        sx={{
          '.mapboxgl-ctrl': {
            width: '100%',
            maxWidth: 'unset',
            fontSize: '20px',
            bg: 'primary',
          },
          '.mapboxgl-ctrl-geocoder--input': {
            color: 'primary',
            padding: '25px 50px',
            borderRadius: '20px',
            bg: 'default_white',
          },
          '.mapboxgl-ctrl-geocoder--icon-search': {
            width: '40px',
            height: '40px',
            fill: 'primary',
            top: '5px',
          },
          '.mapboxgl-ctrl-geocoder--button': {
            height: '16px',
            right: '15px',
            top: '17px',
          },
          '.mapboxgl-ctrl-geocoder--icon-close': {
            height: '16px',
            marginTop: '0px',
            top: '0px',
            display: 'block',
          },
          '.mapboxgl-ctrl-geocoder--icon-loading': {
            top: '12px',
            right: '15px',
            marginTop: '0px',
          },
        }}
        _hover={{ transform: 'scale(1.02)' }}
        transition={'all 0.2s ease-in-out'}
      ></Flex>
    </>
  );
};
