import { Button, Icon, Stack, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type LoginButtonProps = {
  text: string;
  colorButton: string;
  colorText: string;
  icon: IconType;
};

const LoginButton = ({
  text,
  colorButton,
  colorText,
  icon,
}: LoginButtonProps) => {
  return (
    <>
      <Button
        bg={colorButton}
        color={colorText}
        _hover={{ bgColor: `${colorButton}_hover` }}
        variant="solid"
        width="100%"
        height="50px"
        boxShadow="xl"
      >
        <Stack direction="row" align="center" spacing={3}>
          <Icon as={icon} fontSize="25px" color={colorText} />
          <Text>{text}</Text>
        </Stack>
      </Button>
    </>
  );
};

export default LoginButton;
