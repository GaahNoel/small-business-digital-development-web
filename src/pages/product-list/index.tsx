import { Flex, Spinner, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '../../service/api';

type ProductListProps = {
    session: string;
};

type Location = {
    lat: number;
    lng: number;
}

const ProductList = ({session}: ProductListProps) => {
  const router = useRouter();
  const [location, setLocation] = useState<Location>();
  const [searchMode, setSearchMode] = useState('Loading');

  useEffect(()=>{ 
    navigator.geolocation.getCurrentPosition((position)=>{
        setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }, ()=>{
        setSearchMode('City')
    });
   },[])

   useEffect(()=>{
    getProducts();
   }, [location]);

   const getProducts = async () =>{
        if(location){
            await productsNearby(location);
            setSearchMode('LatLng')
        }
   }

   const productsNearby = async(locationInfo: Location) =>{
    try{
        const response = await api.post(
            'product/list/nearby',
            {
                type: 'product',
                location: {
                    latitude: locationInfo.lat,
                    longitude: locationInfo.lng,
                    radius: 500000000
                }
            },
            {
                headers: {
                  'content-type': 'application/json',
                  session,
                },
            },
        );
    } catch(e){
        console.log(e);
    }
   }
  
  return (
    <>
        <Flex minHeight="100vh">
            <Flex display={searchMode==="Loading"?"flex":"none"} align="center" justify="center" width="100%">
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='default_white'
                    size='xl' 
                />  
            </Flex>
            <Flex display={searchMode==="LatLng"?"flex":"none"} align="center" justify="center" width="100%">
                <Text>
                    LatLng
                </Text>
            </Flex>
            <Flex display={searchMode==="City"?"flex":"none"} align="center" justify="center" width="100%">
                <Text>
                    City
                </Text>
            </Flex>
        </Flex>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getToken({
    req,
    raw: true,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default ProductList;
