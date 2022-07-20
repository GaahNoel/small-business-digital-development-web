import { Button, Icon, Stack, Text } from '@chakra-ui/react';
import { useSession, signIn } from 'next-auth/react';
import { IconType } from 'react-icons';
import Router, { useRouter } from 'next/router';

type LoginButtonProps = {
  text: string;
  colorButton: string;
  colorText: string;
  icon: IconType;
  provider: 'custom' | 'facebook' | 'google';
};

export const LoginButton = ({
  text,
  colorButton,
  colorText,
  icon,
  provider = 'custom',
}: LoginButtonProps) => {
  const router = useRouter();

  const handleClick = (provider: 'custom' | 'facebook' | 'google') => {
    if (provider === 'custom') {
      router.push('/user-register');
    } else {
      signIn(provider);
    }
  };

  return (
    <>
      <Button
        bg={colorButton}
        color={colorText}
        _hover={{
          bgColor: `${colorButton}_hover`,
          transform: 'scale(1.05)',
        }}
        variant="solid"
        width="100%"
        height="50px"
        boxShadow="0px 15px 15px -8px rgba(0,0,0,0.35);"
        onClick={() => handleClick(provider)}
      >
        <Stack direction="row" align="center" spacing={3}>
          <Icon as={icon} fontSize="25px" color={colorText} />
          <Text>{text}</Text>
        </Stack>
      </Button>
    </>
  );
};
