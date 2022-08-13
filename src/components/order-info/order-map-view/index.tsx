import { Button, Flex, Icon } from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import mapboxgl, { Map, Marker } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useEffect, useState } from 'react';

type OrderMapViewProps = {
  user: {
    location: Location;
  };
  business: {
    location: Location;
    imageUrl: string;
  };
};

type Location = {
  lng: number;
  lat: number;
};

export const OrderMapView = ({ user, business }: OrderMapViewProps) => {
  useEffect(() => {
    mapboxgl.accessToken = process.env.MAPBOX_TOKEN as string;
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11?optimize=true', // style URL
      center: [user.location.lng, user.location.lat], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });
    const marker = new mapboxgl.Marker();
    marker
      .setLngLat({
        lng: user.location.lng,
        lat: user.location.lat,
      })
      .addTo(map);

    const element = document.createElement('div');

    element.style.cssText = `
          height: 50px;
          width: 50px;
          background-image: url(${business.imageUrl});
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          border-radius: 300px;
          padding: 5px;
          display: inline-block;
          transform-style: preserve-3d;
        `;

    element.className = 'selected-marker';

    new mapboxgl.Marker(element)
      .setLngLat({
        lng: business.location.lng,
        lat: business.location.lat,
      })
      .addTo(map);

    map.on('load', () => {
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [user.location.lng, user.location.lat],
              [business.location.lng, business.location.lat],
            ],
          },
        },
      });

      map.addLayer({
        id: 'route',
        source: 'route',
        type: 'line',
        paint: {
          'line-width': 2,
          'line-color': '#5647B2',
        },
      });
    });
  }, []);

  return (
    <>
      <Flex
        id="map"
        border="2px solid"
        borderColor="primary"
        height="305px"
        overflow="hidden"
        sx={{
          '.mapboxgl-ctrl': { margin: '0px' },
          '.mapboxgl-ctrl-top-right': { width: '100%' },
          '.mapboxgl-ctrl-geocoder': { width: '100%', maxW: '100%' },
          '.mapboxgl-compact': { display: 'none' },
          '.mapboxgl-ctrl-attrib': { display: 'none' },
        }}
      ></Flex>
    </>
  );
};
