import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import Router, { useRouter } from 'next/router';
import { api } from '../../service/api';
import { FooterMenu } from '../../components/shared/footer-menu';
import { Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type BusinessesNearbyProps = {
  lat: string;
  lng: string;
  businesses: Businesses;
};

type Businesses = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  latitude: string;
  longitude: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  accountId: string;
}[];

const BusinessesNearby = ({ lat, lng, businesses }: BusinessesNearbyProps) => {
  const router = useRouter();
  useEffect(() => {
    mapboxgl.accessToken = process.env.MAPBOX_TOKEN as string;
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [Number(lng), Number(lat)], // starting position [lng, lat]
      zoom: 10, // starting zoom
      minZoom: 15,
    });

    businesses.map((business) => {
      const element = document.createElement('div');

      element.style.cssText = `
          height: 100px;
          width: 100px;
          background-image: url(${business.imageUrl});
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          border-radius: 300px;
          padding: 10px;
          display: inline-block;
          transform-style: preserve-3d;
          cursor: pointer;
        `;

      element.className = 'selected-marker';

      element.addEventListener('click', () => {
        router.push(`/business-items/${business.id}`);
      });

      new mapboxgl.Marker(element)
        .setLngLat({
          lng: Number(business.longitude),
          lat: Number(business.latitude),
        })
        .addTo(map);
    });

    document.querySelectorAll('.marker').forEach((element) => {
      element.classList.add('marker');
    });

    if (businesses.length > 0) {
      toast.success(
        `${businesses.length} estabelecimento(s) encontrado(s) pr??ximo(s) a localiza????o!`,
      );
    } else {
      toast.error('Nenhum estabelecimento encontrado pr??ximo a localiza????o!');
    }
  }, []);

  return (
    <>
      <Flex
        id="map"
        minHeight="100vh"
        overflow="hidden"
        sx={{
          '.mapboxgl-ctrl': { margin: '0px' },
          '.mapboxgl-ctrl-top-right': { width: '100%' },
          '.mapboxgl-ctrl-geocoder': { width: '100%', maxW: '100%' },
          '.mapboxgl-compact': { display: 'none' },
          '.selected-marker': {
            border: '4px solid',
            borderColor: 'primary',
          },
          '.selected-marker:hover': {
            borderColor: 'primary_hover',
            transition: '0.2s ease-in-out',
          },
          '.selected-marker:before': {
            content: '""',
            width: ' 58px',
            height: '60px',
            position: 'absolute',
            bottom: '-13%',
            left: '19%',
            transform: 'rotate(45deg) translateZ(-1px)',
            backgroundColor: 'primary',
          },
          '.selected-marker:hover:before': {
            backgroundColor: 'primary_hover',
          },
        }}
      />
      <FooterMenu />
    </>
  );
};

const getBusinessesNearby = async (lat: number, lng: number) => {
  try {
    const response = await api.get(`business/list/`, {
      params: {
        latitude: lat,
        longitude: lng,
        radius: 25,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getToken({
    req,
    raw: true,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // if(!query.lat || !query.lng){
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };
  // }

  const { lat, lng } = query;
  console.log(query);

  const businesses = await getBusinessesNearby(Number(lat), Number(lng));

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session, lat, lng, businesses },
  };
};

export default BusinessesNearby;
