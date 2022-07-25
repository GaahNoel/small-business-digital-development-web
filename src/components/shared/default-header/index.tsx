import { Button, Flex, Icon, IconButton, Img, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FiMap, FiTarget } from 'react-icons/fi';
import { DefaultHeaderIcon } from './default-header-icon';

type Location = {
  lat: number;
  lng: number;
};

export const DefaultHeader = () => {
  const router = useRouter();
  const { status } = useSession();
  const [buttonText, setButtonText] = useState('');
  const [mapIconExist, setMapIconExist] = useState(false);
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setMapIconExist(true);
      },
      () => {
        setMapIconExist(false);
      },
    );
  }, []);
  useEffect(() => {
    if (status !== 'loading') {
      setButtonText(status === 'authenticated' ? 'Logout' : 'Login');
      return;
    }
  }, [status]);

  const login = () => {
    router.push('/login');
  };

  const logout = () => {
    signOut();
  };

  const mapNavigate = () => {
    router.push({
      pathname: '/businesses-nearby',
      query: {
        lat: location!.lat,
        lng: location!.lng,
      },
    });
  };

  return (
    <>
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        margin="15px 0px"
      >
        <Img
          src="/Logo.svg"
          cursor="pointer"
          transition={'all 0.1s ease-in-out'}
          _hover={{
            cursor: 'pointer',
            filter: 'contrast(150%)',
            transform: 'scale(1.1)',
          }}
          onClick={() => {
            router.push('/');
          }}
        ></Img>
        <Flex align="center" gap={4}>
          {mapIconExist && (
            <DefaultHeaderIcon icon={FiMap} onClick={mapNavigate} />
          )}

          <DefaultHeaderIcon
            icon={FiTarget}
            onClick={() => router.push('/shop?type=mission')}
          />
          <Button
            onClick={status !== 'authenticated' ? login : logout}
            bg="default_white"
            minW="100px"
            position={'relative'}
            _hover={{
              color: 'secondary',
              border: '1px solid white',

              _before: {
                width: '100%',
              },
            }}
            _before={{
              position: 'absolute',
              content: '""',
              width: 0,
              background: 'primary',
              bottom: 0,
              left: 0,
              height: '100%',
              transition: 'all 0.4s',
              zIndex: -1,
            }}
            _after={{
              position: 'absolute',
              content: '""',
              width: '100%',
              background: 'secondary',
              bottom: 0,
              left: 0,
              height: '100%',
              zIndex: -2,
            }}
            color="primary"
            borderRadius="10px"
            width="100%"
            overflow={'hidden'}
            zIndex={1}
            transition={'all 0.2s ease-in-out'}
          >
            {buttonText ? (
              buttonText
            ) : (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="primary"
                size="md"
              />
            )}
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
