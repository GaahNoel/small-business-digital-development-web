import { Flex, Stack, Text } from '@chakra-ui/react';
import { MissionBar } from '../mission-bar';

type MissionDivisionProps = {
  periodicity: 'Diária' | 'Semanal';
  consumerQuests: Challenge;
  entrepeneurQuests: Challenge;
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

export const MissionDivision = ({
  periodicity,
  consumerQuests,
  entrepeneurQuests,
}: MissionDivisionProps) => {
  return (
    <>
      <Flex
        width="100%"
        height="100%"
        justify={{ base: 'center', md: 'start' }}
        direction="column"
        align="center"
        color="primary"
      >
        <Text
          fontSize={{ base: '20px', md: '26px' }}
          marginTop={{ base: '20px', md: '40px' }}
          marginBottom="20px"
        >
          {periodicity}
        </Text>
        <Flex
          width="100%"
          marginBottom={{ base: '0px', md: '20px' }}
          justify="center"
        >
          <Flex
            id="consumer"
            direction="column"
            width="50%"
            align="center"
            justify="center"
          >
            {consumerQuests.length ? (
              consumerQuests.map((quest, key) => (
                <MissionBar
                  coins={quest.challenge.reward}
                  text={quest.challenge.description}
                  progress={quest.progress}
                  goal={quest.challenge.goal}
                  key={key}
                />
              ))
            ) : (
              <Flex w="80%" justify="center" textAlign="center">
                <Text>Não há missões disponíveis</Text>
              </Flex>
            )}
          </Flex>
          <Flex
            id="entrepeneur"
            direction="column"
            width="50%"
            align="center"
            justify="center"
          >
            {entrepeneurQuests.length ? (
              entrepeneurQuests.map((quest, key) => (
                <MissionBar
                  coins={quest.challenge.reward}
                  text={quest.challenge.description}
                  progress={quest.progress}
                  goal={quest.challenge.goal}
                  key={key}
                />
              ))
            ) : (
              <Flex w="80%" justify="center" textAlign="center">
                <Text>Não há missões disponíveis</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
