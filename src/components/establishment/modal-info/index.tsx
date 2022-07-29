import { Flex, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type ModalInfoProps = {
  info: string;
  data: string;
  icon: IconType;
};

export const ModalInfo = ({ info, data, icon }: ModalInfoProps) => {
  return (
    <>
      <Flex justifyContent="space-between" w="100%">
        <Flex alignItems="center" gap={2}>
          <Icon as={icon} />
          <Text fontWeight="semibold">{info}</Text>
        </Flex>
        <Text textAlign="end">{data}</Text>
      </Flex>
    </>
  );
};
