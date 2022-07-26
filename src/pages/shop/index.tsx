import { Button, ButtonGroup, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FooterMenu } from '../../components/shared/footer-menu';
import { ConsumerItems } from '../../components/shop/consumer-items';
import { EntrepreneurItems } from '../../components/shop/entrepreneur-items';
import { ShopHeader } from '../../components/shop/shop-header';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { DefaultHeader } from '../../components/shared/default-header';
import { BsCoin } from 'react-icons/bs';
import { ShopTypeButton } from '../../components/shop/shop-type-button';
import { Missions } from '../../components/shop/missions';
import { api } from '../../service/api';
import jwt_decode from 'jwt-decode';
import { getToken } from 'next-auth/jwt';

type ShopProps = {
  type: FormOption;
  consumerDailyQuests: Challenge;
  consumerWeeklyQuests: Challenge;
  entrepreneurDailyQuests: Challenge;
  entrepreneurWeeklyQuests: Challenge;
};

type FormOption = 'Consumidor' | 'Empreendedor' | 'Missões';

type Periodicity = 'daily' | 'weekly';

type ChallengeType =
  | 'buyAny'
  | 'sellAny'
  | 'buyProximity'
  | 'buyback'
  | 'buyProduct'
  | 'buyService'
  | 'sellProduct'
  | 'sellService';

type Challenge = {
  id: string;
  challenge: {
    id: string;
    description: string;
    type: ChallengeType;
    goal: number;
    periodicity: Periodicity;
    reward: number;
    createdAt?: Date;
    updatedAt?: Date;
  };
  accountId: string;
  progress: number;
  status: 'PENDING' | 'COMPLETED';
  createdAt?: Date;
  updatedAt?: Date;
}[];

const Shop = ({
  type,
  consumerDailyQuests,
  consumerWeeklyQuests,
  entrepreneurDailyQuests,
  entrepreneurWeeklyQuests,
}: ShopProps) => {
  const [formOption, setFormOption] = useState(type);

  const changeOption = (option: FormOption) => {
    console.log(option);
    if (formOption != option) {
      setFormOption(option);
    }
  };

  return (
    <>
      <>
        <Flex minHeight="100vh" direction="column" bg="primary">
          <Flex id="headers">
            <Flex
              width="100%"
              alignSelf="center"
              direction="column"
              maxW={{ base: '90%', md: '700px', lg: '900px' }}
              margin="0px auto"
            >
              <DefaultHeader />
              <Flex
                direction={{ base: 'column', md: 'row' }}
                gap={{ base: 6, md: 0 }}
                justify="space-between"
                align="center"
                margin="50px 0px"
              >
                <ButtonGroup
                  id="options"
                  bg="secondary"
                  borderRadius="14px"
                  width={{ base: '100%', md: '50%' }}
                  spacing={0}
                >
                  <ShopTypeButton
                    text="Consumidor"
                    type="Consumidor"
                    typeSelected={formOption}
                    onClick={() => {
                      changeOption('Consumidor');
                    }}
                  />
                  <ShopTypeButton
                    text="Empreendedor"
                    type="Empreendedor"
                    typeSelected={formOption}
                    onClick={() => {
                      changeOption('Empreendedor');
                    }}
                  />
                  <ShopTypeButton
                    text="Missões"
                    type="Missões"
                    typeSelected={formOption}
                    onClick={() => {
                      changeOption('Missões');
                    }}
                  />
                </ButtonGroup>
                <Stack
                  id="coins"
                  bg="default_white"
                  borderRadius="14px"
                  color="default_yellow"
                  direction="row"
                  align="center"
                  justify="center"
                  padding="8px"
                  fontWeight="bold"
                  spacing={2}
                >
                  <Icon as={BsCoin} fontSize="28px" />
                  <Text>650 Moedas</Text>
                </Stack>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            id="content"
            bg="secondary"
            direction="column"
            width="100%"
            height="100%"
            flex="1"
            borderTopRadius={{ base: '0px', md: '105px' }}
            paddingBottom={{ base: '80px', md: '0px' }}
          >
            <Flex
              width="100%"
              maxW={{ base: '90%', md: '700px', lg: '900px' }}
              margin="40px auto"
            >
              {formOption === 'Consumidor' ? (
                <ConsumerItems />
              ) : formOption === 'Empreendedor' ? (
                <>
                  <EntrepreneurItems />
                </>
              ) : (
                <>
                  <Missions
                    consumerDailyQuests={consumerDailyQuests}
                    consumerWeeklyQuests={consumerWeeklyQuests}
                    entrepreneurDailyQuests={entrepreneurDailyQuests}
                    entrepreneurWeeklyQuests={entrepreneurWeeklyQuests}
                  />
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
        <FooterMenu />
      </>
    </>
  );
};

const getUserInfo = async (token: string, accountId: string) => {
  const response = await api.get(`account/${accountId}`, {
    headers: {
      token,
    },
  });
  console.log(response.data);
};

const getAllMissions = async (token: string, accountId: string) => {
  const response = await api.get(`challenge/${accountId}`, {
    headers: {
      token,
    },
  });
  return response.data.challenges;
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
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  let type;
  if (query.type && query.type === 'mission') {
    type = 'Missões';
  } else {
    type = 'Consumidor';
  }

  const { id } = jwt_decode(session) as {
    id: string;
  };
  getUserInfo(session, id);
  const missions: Challenge = await getAllMissions(session, id);
  const consumerDailyQuests = missions.filter((mission) => {
    if (
      mission.challenge.periodicity === 'daily' &&
      mission.challenge.type.includes('buy')
    )
      return true;
  });
  const consumerWeeklyQuests = missions.filter((mission) => {
    if (
      mission.challenge.periodicity === 'weekly' &&
      mission.challenge.type.includes('buy')
    )
      return true;
  });

  const entrepreneurDailyQuests = missions.filter((mission) => {
    if (
      mission.challenge.periodicity === 'daily' &&
      mission.challenge.type.includes('sell')
    )
      return true;
  });
  const entrepreneurWeeklyQuests = missions.filter((mission) => {
    if (
      mission.challenge.periodicity === 'weekly' &&
      mission.challenge.type.includes('sell')
    )
      return true;
  });

  return {
    props: {
      type,
      consumerDailyQuests,
      consumerWeeklyQuests,
      entrepreneurDailyQuests,
      entrepreneurWeeklyQuests,
    },
  };
};

export default Shop;
