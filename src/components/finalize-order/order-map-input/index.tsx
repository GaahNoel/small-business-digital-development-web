import { Button, Flex, Icon } from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import mapboxgl, { Map, Marker } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useEffect, useState } from 'react';

type OrderMapInputProps = {
  setPosition: any;
  business: {
    location: BusinessLocation;
    imageUrl: string;
  };
};

type BusinessLocation = {
  lng: number;
  lat: number;
};

type Source = {
  setData: (data: {
    type: string;
    properties: object | null;
    geometry: {
      type: string;
      coordinates: [number[], number[]];
    };
  }) => void;
};

export const OrderMapInput = ({
  setPosition,
  business,
}: OrderMapInputProps) => {
  const [markerState, setMarkerState] = useState<Marker>();
  const defaultPoint = [-46.637934, -23.56813];
  const [firstPoint, setFirstPoint] = useState<number[]>([0, 0]);
  const lastPoint = [business.location.lng, business.location.lat];
  const [mapState, setMapState] = useState<Map>();
  useEffect(() => {
    const location = navigator.geolocation.getCurrentPosition(
      (geolocaltion) => {
        mapboxgl.accessToken = process.env.MAPBOX_TOKEN as string;
        const map = new mapboxgl.Map({
          container: 'map', // container ID
          style: 'mapbox://styles/mapbox/streets-v11?optimize=true', // style URL
          center: [geolocaltion.coords.longitude, geolocaltion.coords.latitude], // starting position [lng, lat]
          zoom: 15, // starting zoom
        });
        setMapState(map);
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
        marker.on('dragend', function (e: any) {
          setFirstPoint([e.target.getLngLat().lng, e.target.getLngLat().lat]);
        });

        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          marker: false,
          mapboxgl: mapboxgl as any,
        });
        map.addControl(geocoder);
        geocoder.on('result', (e) => {
          marker.setLngLat(e.result.center);
          setFirstPoint(e.result.center);
        });

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
                  [geolocaltion.coords.longitude, geolocaltion.coords.latitude],
                  lastPoint,
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

          setFirstPoint([
            geolocaltion.coords.longitude,
            geolocaltion.coords.latitude,
          ]);
        });
      },
      () => {
        mapboxgl.accessToken = process.env.MAPBOX_TOKEN as string;
        const map: Map = new mapboxgl.Map({
          container: 'map', // container ID
          style: 'mapbox://styles/mapbox/streets-v11?optimize=true', // style URL
          center: [defaultPoint[0], defaultPoint[1]], // starting position [lng, lat]
          zoom: 15, // starting zoom
        });
        setMapState(map);
        const marker = new mapboxgl.Marker({
          draggable: true,
        });
        setMarkerState(marker as any);
        setPosition(marker as any);
        marker
          .setLngLat({
            lng: defaultPoint[0],
            lat: defaultPoint[1],
          })
          .addTo(map);
        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          marker: false,
          mapboxgl: mapboxgl as any,
        });
        map.addControl(geocoder);
        marker.on('dragend', function (e: any) {
          setFirstPoint([e.target.getLngLat().lng, e.target.getLngLat().lat]);
        });

        geocoder.on('result', (e) => {
          marker.setLngLat(e.result.center);
          setFirstPoint(e.result.center);
        });

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
            lng: Number(business.location.lng),
            lat: Number(business.location.lat),
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
                coordinates: [[-46.637934, -23.56813], lastPoint],
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

          setFirstPoint([defaultPoint[0], defaultPoint[1]]);
        });
      },
    );
  }, []);

  useEffect(() => {
    if (mapState) {
      const route = mapState.getSource('route') as Source;
      route.setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [firstPoint, lastPoint],
        },
      });
    }
  }, [firstPoint]);

  useEffect(() => {
    console.log(markerState);
    if (markerState) {
      console.log(markerState.getLngLat());
    }
  }, [markerState]);

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
