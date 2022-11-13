import { Button, ButtonGroup, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
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
import { VideoDivision } from '../../components/shop/video-division';

type ShopProps = {
  token: string;
  accountId: string;
  userFormated: UserFormated;
  type: FormOption;
  consumerDailyQuests: Challenge;
  consumerWeeklyQuests: Challenge;
  entrepreneurDailyQuests: Challenge;
  entrepreneurWeeklyQuests: Challenge;
  videosWatched: VideosWatched;
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

type User = {
  name: string;
  email: string;
  verified: boolean;
  provider: string;
  balance: number;
};

type UserFormated = {
  balance: number;
};

type VideosWatched = { videos: [] };

const Shop = ({
  token: tokenServerSide,
  accountId: accountIdServerSide,
  userFormated,
  type,
  consumerDailyQuests,
  consumerWeeklyQuests,
  entrepreneurDailyQuests,
  entrepreneurWeeklyQuests,
  videosWatched,
}: ShopProps) => {
  const [formOption, setFormOption] = useState(type);
  const [balance, setBalance] = useState(0);
  const [numberOfVideosWatched, setNumberOfVideosWatched] = useState(0);
  const [token, setToken] = useState(tokenServerSide);
  const [accountId, setAccountId] = useState(accountIdServerSide);

  useEffect(() => {
    getSession().then((sessionInfos) => {
      const sessionFounded = sessionInfos as unknown as {
        token: string;
        id: string;
      };
      setToken(sessionFounded.token);
      setAccountId(sessionFounded.id);
      getUserInfo(sessionFounded.token, sessionFounded.id).then(
        (userSearched: User) => {
          setBalance(userSearched.balance);
        },
      );
      getAllVideosWatchedInTheDay(sessionFounded.token, sessionFounded.id).then(
        (videosWatchedSearched) => {
          setNumberOfVideosWatched(videosWatchedSearched.videos.length);
        },
      );
    });
  }, []);

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
              direction="column"
            >
              <Stack
                align="center"
                justify="space-between"
                bg="secondary"
                borderRadius="2xl"
                boxShadow="2xl"
                w="100%"
                overflow="hidden"
                transition="0.2s border ease-in-out"
                direction={{ base: 'column', md: 'row' }}
                spacing={1}
                padding="15px"
                marginBottom="35px"
              >
                <Flex
                  color="default_yellow"
                  fontSize="35px"
                  padding="8px"
                  direction="column"
                  justify="start"
                >
                  <Text color="primary" fontWeight="semibold">
                    Marketcoins:
                  </Text>
                  <Stack
                    id="coins"
                    borderRadius="14px"
                    direction="row"
                    align="center"
                    justify={{ base: 'center', md: 'start' }}
                    fontWeight="bold"
                    width="100%"
                    spacing={2}
                  >
                    <Icon as={BsCoin} fontSize="35px" />
                    <Text>{`${balance}`} </Text>
                  </Stack>
                </Flex>
                <VideoDivision
                  token={token}
                  accountId={accountId}
                  numberOfVideosWatched={numberOfVideosWatched}
                  setNumberOfVideosWatched={setNumberOfVideosWatched}
                  balance={balance}
                  setBalance={setBalance}
                />
              </Stack>
              {formOption === 'Consumidor' ? (
                <ConsumerItems
                  token={token}
                  balance={balance}
                  setBalance={setBalance}
                />
              ) : formOption === 'Empreendedor' ? (
                <>
                  <EntrepreneurItems
                    token={token}
                    balance={balance}
                    setBalance={setBalance}
                  />
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
  try {
    const response = await api.get(`account/${accountId}`, {
      headers: {
        token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getAllMissions = async (token: string, accountId: string) => {
  try {
    const response = await api.get(`challenge/${accountId}`, {
      headers: {
        token,
      },
    });
    return response.data.challenges;
  } catch (error) {
    console.log(error);
  }
};

const getAllVideosWatchedInTheDay = async (
  token: string,
  accountId: string,
) => {
  try {
    const response = await api.get(
      `watched-video/get-account-videos/${accountId}`,
      {
        headers: {
          token,
        },
      },
    );
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
  const user: User = await getUserInfo(session, id);
  const userFormated: UserFormated = { balance: user.balance };
  const missions: Challenge = await getAllMissions(session, id);
  const videosWatched: VideosWatched = await getAllVideosWatchedInTheDay(
    session,
    id,
  );
  let consumerDailyQuests: Challenge = [];
  let consumerWeeklyQuests: Challenge = [];
  let entrepreneurDailyQuests: Challenge = [];
  let entrepreneurWeeklyQuests: Challenge = [];
  if (missions) {
    consumerDailyQuests = missions.filter((mission) => {
      if (
        mission.challenge.periodicity === 'daily' &&
        mission.challenge.type.includes('buy')
      )
        return true;
    });
    consumerWeeklyQuests = missions.filter((mission) => {
      if (
        mission.challenge.periodicity === 'weekly' &&
        mission.challenge.type.includes('buy')
      )
        return true;
    });

    entrepreneurDailyQuests = missions.filter((mission) => {
      if (
        mission.challenge.periodicity === 'daily' &&
        mission.challenge.type.includes('sell')
      )
        return true;
    });
    entrepreneurWeeklyQuests = missions.filter((mission) => {
      if (
        mission.challenge.periodicity === 'weekly' &&
        mission.challenge.type.includes('sell')
      )
        return true;
    });
  }

  return {
    props: {
      token: session,
      accountId: id,
      userFormated,
      type,
      consumerDailyQuests,
      consumerWeeklyQuests,
      entrepreneurDailyQuests,
      entrepreneurWeeklyQuests,
      videosWatched,
    },
  };
};

export default Shop;
