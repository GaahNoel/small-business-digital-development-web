import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { FiX } from 'react-icons/fi';
import { AdVideo } from './ad-video';

type VideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  accountId: string;
  numberOfVideosWatched: number;
  setNumberOfVideosWatched: (balance: number) => void;
  balance: number;
  setBalance: (balance: number) => void;
};

export const VideoModal = ({
  isOpen,
  onClose,
  token,
  accountId,
  numberOfVideosWatched,
  setNumberOfVideosWatched,
  balance,
  setBalance,
}: VideoModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          bg="primary"
          maxW="1000px"
          width="100%"
          margin="0px 10px"
          padding="10px"
          borderRadius="10px"
        >
          <Flex marginBottom="10px" justify="end">
            <Icon
              as={FiX}
              color="default_white"
              strokeWidth="3"
              fontSize="20px"
              cursor="pointer"
              transition="0.2s all ease-in-out"
              _hover={{
                color: 'default_white_hover',
              }}
              onClick={onClose}
            />
          </Flex>
          <ModalBody padding="0px">
            <AdVideo
              token={token}
              accountId={accountId}
              onClose={onClose}
              numberOfVideosWatched={numberOfVideosWatched}
              setNumberOfVideosWatched={setNumberOfVideosWatched}
              balance={balance}
              setBalance={setBalance}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
