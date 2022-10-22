import { Flex, Stack, Text } from '@chakra-ui/react';
import { MissionDivision } from './mission-division';
import { MissionBar } from './mission-bar';
import { TypeMission } from './type-mission';
import { AdVideo } from '../video-division/video-modal/ad-video';
import { VideoDivision } from '../video-division';

type MissionsProps = {
  consumerDailyQuests: Challenge;
  consumerWeeklyQuests: Challenge;
  entrepreneurDailyQuests: Challenge;
  entrepreneurWeeklyQuests: Challenge;
};

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

export const Missions = ({
  consumerDailyQuests,
  consumerWeeklyQuests,
  entrepreneurDailyQuests,
  entrepreneurWeeklyQuests,
}: MissionsProps) => {
  return (
    <>
      <Stack
        direction="row"
        align="center"
        justify={{ base: 'center', md: 'start' }}
        bg="secondary"
        borderRadius="2xl"
        boxShadow="2xl"
        w="100%"
        overflow="hidden"
        transition="0.2s border ease-in-out"
        spacing={1}
        padding={{ base: '20px 0px', md: '25px' }}
      >
        <Flex
          width="100%"
          height="100%"
          align="center"
          justify={{ base: 'center', md: 'start' }}
          direction="column"
        >
          <Text
            fontSize={{ base: '30px', md: '40px' }}
            fontWeight="bold"
            color="primary"
            marginBottom="20px"
          >
            Missões
          </Text>
          <Flex width="100%" direction="column">
            <Flex
              fontSize={{ base: '20px', sm: '22px', md: '30px' }}
              fontWeight="medium"
              color="primary"
              display={{ base: 'none', sm: 'flex' }}
            >
              <Flex width="50%" justify="center">
                <Text>Consumidor</Text>
              </Flex>
              <Flex width="50%" justify="center">
                <Text>Empreendedor</Text>
              </Flex>
            </Flex>
            <MissionDivision
              periodicity="Diária"
              consumerQuests={consumerDailyQuests}
              entrepeneurQuests={entrepreneurDailyQuests}
            />
            <MissionDivision
              periodicity="Semanal"
              consumerQuests={consumerWeeklyQuests}
              entrepeneurQuests={entrepreneurWeeklyQuests}
            />
          </Flex>
        </Flex>
      </Stack>
    </>
  );
};
