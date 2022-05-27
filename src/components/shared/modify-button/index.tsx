import { Button, Icon, Stack, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

type ModifyButtonProps = {
  icon: IconType;
  text: string;
  color: string;
  onClick: () => void;
};

export const ModifyButton = ({
  icon,
  text,
  color,
  onClick,
}: ModifyButtonProps) => {
  return (
    <>
      <Button bg="card_white" _hover={{ bg: 'card_white_hover' }} w="80px">
        <Stack
          direction="row"
          align="center"
          justify="center"
          fontWeight="semibold"
          color={color}
          spacing={1}
          onClick={() => onClick()}
        >
          <Icon as={icon} fontSize="18px" />
          <Text fontSize="14px">{text}</Text>
        </Stack>
      </Button>
    </>
  );
};
