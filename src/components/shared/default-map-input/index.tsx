import { Button, Flex, Icon } from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useEffect, useState } from 'react';

type DefaultMapInputProps = {
  setPosition: any;
  editLng?: number | null;
  editLat?: number | null;
};

export const DefaultMapInput = ({ setPosition, editLng=null, editLat=null }: DefaultMapInputProps) => {
  const [markerState, setMarkerState] = useState();
  useEffect(() => {
    if(editLat || editLng){
        mapboxgl.accessToken = process.env.MAPBOX_TOKEN as string;
        const map = new mapboxgl.Map({
          container: 'map', // container ID
          style: 'mapbox://styles/mapbox/streets-v11', // style URL
          center: [editLng as number, editLat as number], // starting position [lng, lat]
          zoom: 15, // starting zoom
        });
        const marker = new mapboxgl.Marker({
          draggable: true,
        });
        setMarkerState(marker as any);
        setPosition(marker as any);
        marker
          .setLngLat({
            lng: editLng as number,
            lat: editLat as number,
          })
          .addTo(map);
        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          marker: false,
          mapboxgl: mapboxgl as any,
        });
        map.addControl(geocoder);
        // marker.on('dragend', function (e: any) {
        //   const lngLat = e.target.getLngLat();
        // });
        geocoder.on('result', (e) => {
          marker.setLngLat(e.result.center);
        });
    }else{
      const location = navigator.geolocation.getCurrentPosition(
        (geolocaltion) => {
          mapboxgl.accessToken = process.env.MAPBOX_TOKEN as string;
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
            mapboxgl: mapboxgl as any,
          });
          map.addControl(geocoder);
          // marker.on('dragend', function (e: any) {
          //   const lngLat = e.target.getLngLat();
          // });
          geocoder.on('result', (e) => {
            marker.setLngLat(e.result.center);
          });
        },
      );
    }
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
