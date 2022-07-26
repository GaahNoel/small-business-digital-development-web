import { Flex, Stack, Text } from '@chakra-ui/react';
import { MissionBar } from '../mission-bar';

type TypeMissionProps = {
  type: 'Consumidor' | 'Empreendedor';
  dailyQuests: Challenge;
  weeklyQuests: Challenge;
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

export const TypeMission = ({
  type,
  dailyQuests,
  weeklyQuests,
}: TypeMissionProps) => {
  return (
    <>
      <Flex
        width="50%"
        height="100%"
        justify={{ base: 'center', md: 'start' }}
        direction="column"
        color="primary"
      >
        <Text fontWeight="bold" fontSize="22px">
          {type}
        </Text>
        <Flex id="diary" direction="column" height="100%" marginBottom="20px">
          <Text fontWeight="medium" fontSize="18px">
            Diária
          </Text>
          {dailyQuests.length ? (
            dailyQuests.map((quest, key) => (
              <MissionBar
                text={quest.challenge.description}
                progress={quest.progress}
                goal={quest.challenge.goal}
                coins={quest.challenge.reward}
                key={key}
              />
            ))
          ) : (
            <Text>Não há missões diárias disponíveis</Text>
          )}
        </Flex>
        <Flex id="weekly" direction="column" height="100%">
          <Text fontWeight="medium" fontSize="18px">
            Semanal
          </Text>
          {weeklyQuests.length ? (
            weeklyQuests.map((quest, key) => (
              <MissionBar
                coins={quest.challenge.reward}
                text={quest.challenge.description}
                progress={quest.progress}
                goal={quest.challenge.goal}
                key={key}
              />
            ))
          ) : (
            <Text>Não há missões semanais disponíveis</Text>
          )}
        </Flex>
      </Flex>
    </>
  );
};
