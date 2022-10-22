import {
  Button,
  Flex,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { VideoModal } from './video-modal';
import { RiClapperboardLine } from 'react-icons/ri';

type VideoDivisionProps = {
  token: string;
  accountId: string;
  numberOfVideosWatched: number;
  setNumberOfVideosWatched: (balance: number) => void;
  balance: number;
  setBalance: (balance: number) => void;
};

export const VideoDivision = ({
  token,
  accountId,
  numberOfVideosWatched,
  setNumberOfVideosWatched,
  balance,
  setBalance,
}: VideoDivisionProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const maximumNumberOfVideosPerDay = 5;
  return (
    <>
      <Flex direction="column">
        <Button
          bg="primary"
          _hover={{ bg: 'primary_hover' }}
          color="default_white"
          width="100%"
          height="60px"
          fontSize="22px"
          isDisabled={maximumNumberOfVideosPerDay <= numberOfVideosWatched}
          onClick={onOpen}
        >
          <Flex
            color="default_white"
            width="100%"
            align="center"
            justify="space-between"
          >
            <Text>+Moedas</Text>
            <Stack direction="row" align="center" spacing={2}>
              <Icon as={RiClapperboardLine} />
              <Text>{`${
                maximumNumberOfVideosPerDay - numberOfVideosWatched
              }`}</Text>
            </Stack>
          </Flex>
        </Button>
        <VideoModal
          isOpen={isOpen}
          onClose={onClose}
          token={token}
          accountId={accountId}
          numberOfVideosWatched={numberOfVideosWatched}
          setNumberOfVideosWatched={setNumberOfVideosWatched}
          balance={balance}
          setBalance={setBalance}
        />
        <Flex
          direction="column"
          color="primary"
          fontWeight="medium"
          textAlign={{ base: 'center', md: 'end' }}
        >
          <Text maxW="300px">
            Assista o vídeo até o final para receber moedas dentro da plataforma
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
