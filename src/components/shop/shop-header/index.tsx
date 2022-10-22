import { Icon, Image, Img, Stack, Text } from '@chakra-ui/react';
import { BsCoin } from 'react-icons/bs';

export const ShopHeader = () => {
  return (
    <>
      <Stack
        direction="row"
        justify="space-around"
        align="center"
        margin="15px 0px 10px 0px"
        spacing={24}
      >
        <Image src="Logo.svg" />
        <Stack
          bg="default_white"
          borderRadius="14px"
          color="default_yellow"
          direction="row"
          align="center"
          justify="center"
          padding="8px"
          fontWeight="bold"
          spacing={2}
        >
          <Icon as={BsCoin} fontSize="28px" />
          <Text>650 Moedas</Text>
        </Stack>
      </Stack>
    </>
  );
};
