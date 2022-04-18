import { Icon } from '@chakra-ui/react';
import * as React from 'react';
import Map, { Marker } from 'react-map-gl';
import { FaMapMarkerAlt } from 'react-icons/fa';

export const DefaultMapInput = () => {
  return (
    <>
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v8"
        mapboxAccessToken={
          'pk.eyJ1Ijoibmd1c3Rhdm8wMTEiLCJhIjoiY2wyMThtajRkMDIxZTNicDdiYnFjZzcxdCJ9.O4Gdd60lrmuXPt1PG894Dw'
        }
      >
        <Marker latitude={37.8} longitude={-122.4}>
          <Icon as={FaMapMarkerAlt} fontSize="40px" color="primary" />
        </Marker>
      </Map>
    </>
  );
};
