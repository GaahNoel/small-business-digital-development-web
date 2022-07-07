import { Flex, IconButton, Img, Stack, Text } from '@chakra-ui/react';
import { FiTool, FiChevronRight } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { ModifyButton } from '../modify-button';

type DefaultCardProps = {
  name: string;
  img: string;
  detailClick: () => void;
  editItem: () => void;
  removeItem: () => void;
};

export const DefaultCard = ({
  img,
  name,
  detailClick,
  editItem,
  removeItem,
}: DefaultCardProps) => {
  return (
    <>
      <Stack
        direction="row"
        align="center"
        justify={{base: "center", md: "start"}}
        bg="card_white"
        borderRadius="2xl"
        boxShadow="dark-lg"
        width={{base: "330px", sm: "355px", md: "405px", lg: "430px", xl: "530px"}}
        height={{base: "120px", sm: "140px", md: "160px", lg: "180px", xl: "200px"}} 
        spacing={1}
      >
        <Flex width="100%" height="100%" align="center" justify={{base: "center", md: "start"}}>
          <Img src={img} width={{base: "80px", sm: "100px", md: "160px", lg: "180px", xl: "200px"}} height={{base: "80px", sm: "100px", md: "100%"}} borderBottomRightRadius={{base: "full", md: "100px"}} borderTopRightRadius={{base: "full", md: "0px"}} borderLeftRadius={{base: "full", md: "0px"}} />
        </Flex>
        <Flex align="center" justify="center" width="100%">
          <Stack spacing={1} textAlign="center">
            <Text fontSize={{base: "14px", sm: "18px", md: "22px", lg: "24px", xl: "26px"}} fontWeight="bold">
              {name}
            </Text>
            <Flex justify="center">
              <ModifyButton
                icon={FiTool}
                text="Editar"
                color="primary"
                onClick={() => editItem()}
              />
              <ModifyButton
                icon={RiDeleteBinLine}
                text="Remover"
                color="default_orange"
                onClick={() => removeItem()}
              />
            </Flex>
          </Stack>
        </Flex>       
        <Flex width="auto" justify="end">
            <IconButton
              as={FiChevronRight}
              bg="card_white"
              aria-label="16px"
              _hover={{ bg: 'card_white_hover' }}
              cursor="pointer"
              onClick={() => {
                detailClick();
              }}
            />  
          </Flex>
      </Stack>
    </>
  );
};
