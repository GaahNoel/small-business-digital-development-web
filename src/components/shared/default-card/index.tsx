import { Flex, IconButton, Img, Stack, Text } from '@chakra-ui/react';
import { FiTool, FiChevronRight } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { ModifyButton } from '../../entrepreneur/modify-button';

type DefaultCardProps = {
  name: string;
  img: string;
};

export const DefaultCard = ({ img, name }: DefaultCardProps) => {
  return (
    <>
      <Stack
        direction="row"
        align="center"
        bg="card_white"
        borderRadius="2xl"
        boxShadow="dark-lg"
        padding="10px"
        spacing={4}
      >
        <Img src={img} width="80px" height="80px" borderRadius="full" />
        <Stack spacing={1} textAlign="center">
          <Text fontSize="14px" fontWeight="bold">
            {name}
          </Text>
          <Flex>
            <ModifyButton icon={FiTool} text="Editar" color="primary" />
            <ModifyButton
              icon={RiDeleteBinLine}
              text="Remover"
              color="default_orange"
            />
          </Flex>
        </Stack>
        <IconButton
          as={FiChevronRight}
          bg="card_white"
          _hover={{ bg: 'card_white_hover' }}
          cursor="pointer"
        />
      </Stack>
    </>
  );
};