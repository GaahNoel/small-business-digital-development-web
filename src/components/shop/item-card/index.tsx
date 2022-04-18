import { Button, Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';
import { BsCoin } from 'react-icons/bs';

type ItemCardProps = {
  img: string;
  iconColor: string;
  price: string;
};

export const ItemCard = ({ img, iconColor, price }: ItemCardProps) => {
  return (
    <>
      <Stack
        bg="default_white"
        color={iconColor}
        direction="column"
        align="center"
        justify="center"
        spacing={4}
        padding="10px"
        width="170px"
        _after={{
          content: '""',
          width: 0,
          height: 0,
          borderLeft: '85px solid transparent',
          borderRight: '85px solid transparent',
          borderTop: '30px solid',
          borderTopColor: 'primary',
        }}
      >
        <Image src={img} boxSize="100px" />
        <Stack direction="row" align="center" spacing={1}>
          <Stack
            bg="default_white"
            borderRadius="14px"
            direction="row"
            align="center"
            justify="center"
            padding="8px"
            fontWeight="bold"
            spacing={2}
          >
            <Icon as={BsCoin} fontSize="1.4rem" />
            <Text fontSize="1.2rem">{price}</Text>
          </Stack>
          <Button
            bg="default_white"
            _hover={{ bg: 'default_white_hover' }}
            color="primary"
            border="2px"
            fontSize="1rem"
            width="80px"
          >
            Resgatar
          </Button>
        </Stack>
      </Stack>
      <Flex
        width="0"
        height="0"
        borderLeft="85px solid transparent"
        borderRight="85px solid transparent"
        borderTop="30px solid"
        borderTopColor="default_white"
      ></Flex>
    </>
  );
};
