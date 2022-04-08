import { Button, Icon, Stack, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type PrincipalButtonProps = {
  colorButton: string;
  colorText: string;
  icon: IconType;
  text: string;
};

export const PrincipalButton = ({
  colorButton,
  colorText,
  icon,
  text,
}: PrincipalButtonProps) => {
  return (
    <Button
      bg={colorButton}
      color={colorText}
      _hover={{ bgColor: `${colorButton}_hover` }}
      variant="solid"
      borderRadius="lg"
      w="100px"
      h="100px"
      padding="50px"
      boxShadow="dark-lg"
      position="relative"
      top="-50"
    >
      <Stack direction="column" align="center" spacing={2}>
        <Icon as={icon} fontSize="3rem" color={colorText} />
        <Text fontSize="1rem">{text}</Text>
      </Stack>
    </Button>
  );
};
