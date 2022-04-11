import { Button, Icon, Stack, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

type ModifyButtonProps = {
  icon: IconType;
  text: string;
  color: string;
};

export const ModifyButton = ({ icon, text, color }: ModifyButtonProps) => {
  return (
    <>
      <Button bg="card_white" _hover={{ bg: 'card_white_hover' }} w="85px">
        <Stack
          direction="row"
          align="center"
          justify="center"
          fontWeight="semibold"
          color={color}
          spacing={1}
        >
          <Icon as={icon} fontSize="18px" />
          <Text fontSize="14px">{text}</Text>
        </Stack>
      </Button>
    </>
  );
};
