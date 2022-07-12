import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { useRouter } from 'next/router';
import { api } from '../../service/api';
import { FooterMenu } from '../../components/shared/footer-menu';
import { Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

type BusinessesNearbyProps = {
  lat: string;
  lng: string;
  businesses: Businesses;
}

type Businesses = {
  id: string,
  name: string,
  imageUrl: string,
  description: string,
  latitude: string,
  longitude: string,
  street: string,
  city: string,
  state: string,
  zip: string,
  country: string,
  accountId: string
}[]

const BusinessesNearby = ({lat, lng, businesses}: BusinessesNearbyProps) => {

  useEffect(()=>{
    if(businesses.length>0){
      mapboxgl.accessToken = process.env.MAPBOX_TOKEN as string;
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [Number(lng), Number(lat)], // starting position [lng, lat]
        zoom: 10, // starting zoom
        minZoom: 15
      });

      businesses.map((business)=>{
        const element = document.createElement('div');

        element.style.cssText = `
          height: 100px;
          width: 100px;
          background-image: url(${business.imageUrl});
          background-size: 100%;
          background-position: center;
          border-radius: 300px;
          padding: 10px;
          position: relative;
        `

        element.className = 'marker';

        element.addEventListener('click', () => {
          window.alert("Test");
        });

        new mapboxgl.Marker(element).setLngLat({
          lng: Number(business.longitude),
          lat: Number(business.latitude),
        }).addTo(map);
      })

      document.querySelectorAll(".marker").forEach((element) => {
        element.classList.add("marker")
      })
    }
  }, [])

  return (
    <>
        {
          businesses.length > 0 ? (
            <Flex
            id="map"
            border="2px"
            borderColor="primary"
            minHeight="100vh"
            overflow="hidden"
            sx={{
              '.mapboxgl-ctrl': { margin: '0px' },
              '.mapboxgl-ctrl-top-right': { width: '100%' },
              '.mapboxgl-ctrl-geocoder': { width: '100%', maxW: '100%' },
              '.mapboxgl-compact': { display: 'none' },
              '.marker:after &': { content: '"2"', width: '50px', height: '50px', position: 'absolute', bottom: '-50%', left: '0px', transform: 'rotate(45deg)', backgroundColor: '#000'}
            }}
            />
          ):(
            <Text textAlign="center" margin="0px auto" width={{base: "80%", sm: "100%"}} fontSize={{base: "16px", md: "20px"}} fontWeight="medium">
                Sem estabelecimentos por perto
            </Text>
          )
        }
        
        <FooterMenu />
    </>
  );
};

const getBusinessesNearby = async(lat: number, lng: number) => {
  try{
      const response = await api.get(`business/list/`, 
      {
        params: {
          "latitude": lat,
          "longitude": lng,
          "radius": 0.1
        }
      }
    );
    console.log(response.data);
    return response.data;
  } catch(error){
    console.log(error);
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
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

  const {lat, lng} = query;
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
