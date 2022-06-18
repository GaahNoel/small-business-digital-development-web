import { Button, Flex, Heading, Icon, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { DefaultHeader } from '../../components/shared/default-header';
import { FooterMenu } from '../../components/shared/footer-menu';
import { FaPlus } from 'react-icons/fa';
import { DefaultCard } from '../../components/shared/default-card';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { api } from '../../service/api';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import { useEstablishmentForm } from '../../hooks/establishment-form';
import { NoItemsText } from '../../components/shared/no-items-text';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import { EstablishmentEditModal } from '../../components/entrepreneur/establishment-edit-modal';

type EstablishmentProps = {
  id: string;
  name: string;
  description: string;
  createdAt?: string;
  imageUrl: string;
  latitude: string;
  longitude: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

type EstablishmentsProps = EstablishmentProps[];

type EnterpreneurProps = {
  token: string;
  businesses: EstablishmentProps[];
};

type EstablishmentModalProps = {
  session: string;
  id: string;
  name: string;
  description: string;
  lat: string;
  lng: string;
  imageUrl: string;
}

const Enterpreneur = ({ businesses, token }: EnterpreneurProps) => {
  const router = useRouter();
  const { setId, setName, setImageUrl, setState, setCity, setReference } = useEstablishmentForm();
  const { isOpen: editEstablishmentIsOpen, onOpen: editEstablishmentOnOpen, onClose: editEstablishmentOnClose } = useDisclosure();
  const [establishmentModal, setEstablishmentModal] = useState<EstablishmentModalProps>();
  const [establishmentsState, setEstablishmentsState] = useState<EstablishmentsProps>([
    {
      id: '',
      name: '',
      description: '',
      createdAt: '',
      imageUrl: '',
      latitude: '',
      longitude: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    },
  ]);

  useEffect(() => {
    setEstablishmentsState(businesses);
  }, []);

  const clickCard = (id: string, name: string, imageUrl: string, state: string, city: string, reference: string) => {
    setId(id);
    setName(name);
    setImageUrl(imageUrl);
    setState(state);
    setCity(city);
    setReference(reference);
    router.push(`/establishment/${id}`);
  };

  const editEstablishment = ({
    session,
    id,
    name,
    description,
    lat,
    lng,
    imageUrl
  }: EstablishmentModalProps) =>{
    setEstablishmentModal({
      session,
      id,
      name,
      description,
      lat,
      lng,
      imageUrl,
    });
    editEstablishmentOnOpen();
  }

  const removeEstablishmentApi = async (businessId: string, token: string) => {
    try {
      const response = await api.delete(`business/delete/${businessId}`, {
        headers: {
          'content-type': 'application/json',
          token,
        },
      });
      setEstablishmentsState(
        establishmentsState.filter((business) => {
          return business.id !== businessId;
        }),
      );
      toast.success('Estabelecimento apagado com sucesso!');
    } catch (e: any) {
      console.log(e);
    }
  };

  const removeEstablishment = (businessId: string, token: string) => {
    Swal.fire({
      title: 'Tem certeza que deseja excluir o estabelecimento?',
      showDenyButton: true,
      confirmButtonText: 'Não',
      denyButtonText: `Sim`,
    }).then((result) => {
      if (!result.isConfirmed) {
        removeEstablishmentApi(businessId, token);
      }
    });
  };

  const updateEstablishmentState = (id: string, establishmentFound: EstablishmentProps) => {
    const index = establishmentsState.findIndex((establishment)=>{
      if(establishment.id === id) 
        return true;
    })
    console.log(establishmentFound)
    establishmentsState[index] = {
      ...establishmentsState[index], ...establishmentFound
    }
    const newEstablishmentState: EstablishmentsProps = establishmentsState;
    setEstablishmentsState(newEstablishmentState);
  }

  return (
    <>
      <EstablishmentEditModal session={establishmentModal?.session as string} id={establishmentModal?.id as string} name={establishmentModal?.name as string}  description={establishmentModal?.description as string} lat={establishmentModal?.lat as string} lng={establishmentModal?.lng as string} imageUrl={establishmentModal?.imageUrl as string} isOpen={editEstablishmentIsOpen}
            onClose={editEstablishmentOnClose} updateState={updateEstablishmentState}/>
      <Flex width="100%" bg="primary" direction="column" minH="100vh">
        <DefaultHeader />
        <Stack
          margin="30px auto 90px auto"
          maxW="400px"
          align="center"
          justify="center"
          color="default_white"
          spacing={2}
        >
          <Heading as="h3">Área do empreendedor</Heading>
          <Text>Gerencie seus estabelecimentos e produtos</Text>
        </Stack>
        <Flex bg="secondary" direction="column" borderTopRadius="56px" flex="1">
          <Flex maxW="250px" margin="0px auto">
            <Button
              bg="default_orange"
              _hover={{ bg: 'default_orange_hover' }}
              color="default_white"
              width="100%"
              height="50px"
              boxShadow="xl"
              borderRadius="2xl"
              position="relative"
              top="-23px"
              onClick={() => {
                router.push('/establishment-register');
              }}
            >
              <Stack
                direction="row"
                align="center"
                justify="center"
                spacing={4}
              >
                <Icon as={FaPlus} />
                <Text>Cadastrar novos itens</Text>
              </Stack>
            </Button>
          </Flex>
          <Flex
            direction="column"
            margin="0px auto"
            align="center"
            marginBottom="100px"
          >
            <Text fontSize="18px" fontWeight="bold" marginBottom="20px">
              Seus estabelecimentos cadastrados
            </Text>
            <Stack spacing={4}>
              {establishmentsState.length > 0 ? (
                establishmentsState.map((establishment, key) => (
                  <DefaultCard
                    key={key}
                    name={establishment.name}
                    img={establishment.imageUrl}
                    detailClick={() => {
                      clickCard(
                        establishment.id,
                        establishment.name,
                        establishment.imageUrl,
                        establishment?.state as string,
                        establishment?.city as string,
                        establishment?.street as string
                      );
                    }}
                    editItem={()=> editEstablishment({
                      session: token,
                      id: establishment.id,
                      name: establishment.name,
                      description: establishment.description,
                      lat: establishment.latitude,
                      lng: establishment.longitude,
                      imageUrl: establishment.imageUrl,
                    })}
                    removeItem={() =>
                      removeEstablishment(establishment.id, token)
                    }
                  />
                ))
              ) : (
                <NoItemsText
                  color="primary"
                  text="Nenhum estabelecimento cadastrado para o usuário."
                />
              )}
            </Stack>
          </Flex>
          <FooterMenu />
        </Flex>
      </Flex>
    </>
  );
};

const getBusinessList = async (token: string) => {
  const { sub: id } = jwt_decode(token) as {
    sub: string;
  };
  const response = await api.get(`business/list/${id}`, {});
  return response.data;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({
    req,
    raw: true,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const businesses = await getBusinessList(token);

  return {
    props: { businesses, token },
  };
};

export default Enterpreneur;
