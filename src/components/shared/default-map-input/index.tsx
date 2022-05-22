import { Button, Flex, Icon } from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useEffect, useState } from 'react';

type DefaultMapInputProps = {
  setPosition: any;
};

export const DefaultMapInput = ({ setPosition }: DefaultMapInputProps) => {
  const [markerState, setMarkerState] = useState();
  useEffect(() => {
    const location = navigator.geolocation.getCurrentPosition(
      (geolocaltion) => {
        mapboxgl.accessToken =
          'pk.eyJ1Ijoibmd1c3Rhdm8wMTEiLCJhIjoiY2wyMThtajRkMDIxZTNicDdiYnFjZzcxdCJ9.O4Gdd60lrmuXPt1PG894Dw';
        const map = new mapboxgl.Map({
          container: 'map', // container ID
          style: 'mapbox://styles/mapbox/streets-v11', // style URL
          center: [geolocaltion.coords.longitude, geolocaltion.coords.latitude], // starting position [lng, lat]
          zoom: 15, // starting zoom
        });
        const marker = new mapboxgl.Marker({
          draggable: true,
        });
        setMarkerState(marker as any);
        setPosition(marker as any);
        marker
          .setLngLat({
            lng: geolocaltion.coords.longitude,
            lat: geolocaltion.coords.latitude,
          })
          .addTo(map);
        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          marker: false,
          mapboxgl: mapboxgl,
        });
        map.addControl(geocoder);
        marker.on('dragend', function (e) {
          const lngLat = e.target.getLngLat();
          // console.log(lngLat['lat']);
          // console.log(lngLat['lng']);
        });
        geocoder.on('result', (e) => {
          marker.setLngLat(e.result.center);
        });
      },
    );
  }, []);

  return (
    <>
      <Flex
        id="map"
        border="2px"
        borderColor="primary"
        height="305px"
        overflow="hidden"
        sx={{
          '.mapboxgl-ctrl': { margin: '0px' },
          '.mapboxgl-ctrl-top-right': { width: '100%' },
          '.mapboxgl-ctrl-geocoder': { width: '100%', maxW: '100%' },
          '.mapboxgl-compact': { display: 'none' },
        }}
      ></Flex>
    </>
  );
};
