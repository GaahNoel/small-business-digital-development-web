import { Button, Flex, Grid, GridItem, Heading, Icon, Stack, Text, useDisclosure } from '@chakra-ui/react';
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
        <Flex direction="column" width={{base: "90%", md:"80%", lg:"60%"}} margin="0px auto">
          <DefaultHeader />
          <Stack
            margin="30px auto 90px auto"
            align="center"
            justify="center"
            color="default_white"
            spacing={2}
          >
            <Heading as="h3" fontSize={{base: "30px", md: "40px", lg: "50px", "2xl": "60px"}}>Área do empreendedor</Heading>
            <Text fontSize={{base: "15px", md: "20px", lg: "25px", "2xl": "30px"}}>Gerencie seus estabelecimentos e produtos</Text>
          </Stack>
        </Flex>
        <Flex bg="secondary" borderTopRadius="56px" height="100%" flex="1">
          <Flex direction="column" width={{base: "100%", lg: "100%"}} margin="0px auto">
            <Flex maxW={{base: "300px", sm: "320px", md: "400px"}} width="100%" margin="0px auto">
              <Button
                bg="default_orange"
                _hover={{ bg: 'default_orange_hover' }}
                color="default_white"
                width="100%"
                height={{base: "50px", sm: "70px", md: "90px"}}
                boxShadow="xl"
                borderRadius="2xl"
                position="relative"
                top={{base: "-23px", sm: "-35", md: "-45"}}
                onClick={() => {
                  router.push('/establishment-register');
                }}
              >
                <Stack
                  direction="row"
                  align="center"
                  justify="center"
                  fontSize={{base: "16px", md:"20px"}}
                  spacing={4}
                >
                  <Icon as={FaPlus} />
                  <Text>Cadastrar novos estabelecimentos</Text>
                </Stack>
              </Button>
            </Flex>
            <Flex
              direction="column"
              align="center"
              marginBottom="100px"
            >
              <Text fontSize={{base: "18px", sm: "22px", md: "24px", lg: "28px"}} fontWeight="bold" marginBottom="20px">
                Seus estabelecimentos cadastrados
              </Text>
              <Stack spacing={4} width="100%" align="center" display={{base: "flex", md: "none"}}>
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
                        }
                      }
                      editItem={(event)=> {
                        event.stopPropagation();  
                        editEstablishment({
                            session: token,
                            id: establishment.id,
                            name: establishment.name,
                            description: establishment.description,
                            lat: establishment.latitude,
                            lng: establishment.longitude,
                            imageUrl: establishment.imageUrl,
                          })
                        }
                      }
                      removeItem={(event) =>{
                          event.stopPropagation(); 
                          removeEstablishment(establishment.id, token)
                        } 
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
              <Flex align="center">
                <Grid width="100%" templateColumns={{md: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)'}} display={{base: "none", md: "grid"}} gap={6}>
                {establishmentsState.length > 0 ? (
                    establishmentsState.map((establishment, key) => (
                      <GridItem colSpan={1} key={key}>
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
                          editItem={(event)=> {
                            event.stopPropagation();  
                            editEstablishment({
                            session: token,
                            id: establishment.id,
                            name: establishment.name,
                            description: establishment.description,
                            lat: establishment.latitude,
                            lng: establishment.longitude,
                            imageUrl: establishment.imageUrl,
                          })}}
                          removeItem={(event) =>{
                              event.stopPropagation();  
                              removeEstablishment(establishment.id, token);
                            }
                          }
                        />
                      </GridItem>
                      
                    ))
                  ) : (
                    <GridItem colSpan={{base: 1, lg: 2}} key="0 establishments">
                        <NoItemsText
                        color="primary"
                        text="Nenhum estabelecimento cadastrado para o usuário."
                      />
                    </GridItem>
                  )}
                </Grid>
              </Flex>
              
            </Flex>
            
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
  console.log(id)
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
