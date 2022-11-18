import { Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { BsCoin } from 'react-icons/bs';
import { MdDone } from 'react-icons/md';
import { MissionProgressBar } from './mission-progress-bar';

type MissionBarProps = {
  text: string;
  progress: number;
  goal: number;
  coins: number;
};

export const MissionBar = ({
  text,
  progress,
  goal,
  coins,
}: MissionBarProps) => {
  return (
    <>
      <Flex
        width={{ base: '100%', sm: '60%' }}
        height="100%"
        justify="center"
        align="center"
        color="primary"
        direction="column"
        marginBottom="20px"
      >
        <Flex
          w="100%"
          align="center"
          gap={{ base: 1, md: 3 }}
          textAlign="center"
        >
          <Text fontWeight="medium">{text}</Text>
          <Stack
            color="default_yellow"
            direction="row"
            align="center"
            fontWeight="bold"
            spacing={1}
          >
            <Icon as={BsCoin} fontSize="20px" />
            <Text>{`+${coins}`}</Text>
          </Stack>
        </Flex>
        <Flex w="100%" align="center" gap={3}>
          {progress < goal ? (
            <Text>{`${progress}/${goal}`}</Text>
          ) : (
            <Icon as={MdDone} color="green" />
          )}

          <MissionProgressBar
            progress={(progress <= goal ? progress : goal) / goal}
          />
        </Flex>
      </Flex>
    </>
  );
};
