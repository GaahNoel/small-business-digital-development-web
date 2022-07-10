import { Button, Flex, FormControl, Select, Spinner, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormCitySelect } from '../../components/shared/form-city-select';
import { api } from '../../service/api';

type ProductListProps = {
    session: string;
};

type Location = {
    lat: number;
    lng: number;
}

type Products = {
    business: {
        distance: number,
        id: string,
        latitude: string,
        longitude: string,
        name: string
    };
    category: {
        id: string,
        name: string,
    };
    createdAt: string;
    description: string;
    id: string;
    imageUrl: string;
    listPrice: number;
    name: string;
    salePrice: number;
    type: string;
}[]

type CityOptions = {
    city: string;
    state: string;
}[]

const ProductList = ({session}: ProductListProps) => {
  const router = useRouter();
  const [location, setLocation] = useState<Location>();
  const [searchMode, setSearchMode] = useState('Loading');
  const [isLoadingCitySearch, setIsLoadingCitySearch] = useState(false);
  const [products, setProducts] = useState<Products>()
  const [cityOptions, setCityOptions] = useState<CityOptions>()

  useEffect(()=>{ 
    navigator.geolocation.getCurrentPosition((position)=>{
        setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }, ()=>{
        getProductsByCity();
    });
   },[])

   useEffect(()=>{
    getProductsByLatLng();
   }, [location]);

   const getProductsByLatLng = async () =>{
    if(location){
        await productsNearbyLatLng(location);
        setSearchMode('LatLng')
    }
   }

   const getProductsByCity = async () =>{
    await productsNearbyCity();
    setSearchMode('City')
   }

   const productsNearbyLatLng = async(locationInfo: Location) =>{
    try{
        const response = await api.post(
            'product/list/nearby',
            {
                type: 'product',
                location: {
                    latitude: locationInfo.lat,
                    longitude: locationInfo.lng,
                    radius: 500
                }
            },
            {
                headers: {
                  'content-type': 'application/json',
                  session,
                },
            },
        );
        console.log(response.data);
        setProducts(response.data);
    } catch(e){
        console.log(e);
    }
   }

   const productsNearbyCity = async() =>{
    const options = [
        {
            city: "Tatui",
            state: "Sao Paulo"
        },
        {
            city: "Capela do Alto",
            state: "Sao Paulo"
        },
        {
            city: "Sioux County",
            state: "Nebraska"
        }
    ]
    options.sort((a, b)=>a.city.localeCompare(b.city))
    setCityOptions(options)
   }
   
   const searchProductsByCity = async(city: string, state: string) => {
    setIsLoadingCitySearch(true);
    if(!city && !state){
        city = cityOptions![0].city;
        state = cityOptions![0].state;
    }
    try{
        const response = await api.post(
            'product/list/nearby',
            {
                type: 'product',
                city: {
                    name: city,
                    state,
                }
            },
            {
                headers: {
                  'content-type': 'application/json',
                  session,
                },
            },
        );
        setProducts(response.data);
        
    } catch(e){
        console.log(e);
    } finally {
        setIsLoadingCitySearch(false);
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
            <Flex display={searchMode==="LatLng"?"flex":"none"} align="center" justify="center" direction="column" width="100%">
                {
                    products ? (
                        products.map((product, key) => (
                            <Text key={key}>{product.name}</Text>
                        ))
                    ):(
                        <Text>Sem produtos por perto</Text>
                    )
                }
            </Flex>
            <Flex display={searchMode==="City"?"flex":"none"} align="center" justify="center" direction="column" width="100%">
                <FormCitySelect cityOptions={cityOptions!} search={searchProductsByCity} />
                <Flex direction="column">
                    {
                        !isLoadingCitySearch ? (
                            <Flex direction="column">
                                {
                                    products ? (
                                        products.map((product, key) => (
                                            <Text key={key}>{product.name}</Text>
                                        ))
                                    ):(
                                        <Text>Pesquise os produtos próximos, selecionando sua cidade</Text>
                                    )
                                }
                            </Flex>
                        ) : (
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='default_white'
                                size='xl' 
                            />  
                        )
                    }
                </Flex>  
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
