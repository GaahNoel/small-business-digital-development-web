import { Button, Icon, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { IconType } from 'react-icons';

type PrincipalButtonProps = {
  colorButton: string;
  colorText: string;
  icon: IconType;
  text: string;
  page: string;
};

export const PrincipalButton = ({
  colorButton,
  colorText,
  icon,
  text,
  page,
}: PrincipalButtonProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(page);
  };
  return (
    <Button
      bg={colorButton}
      color={colorText}
      _hover={{ bgColor: `${colorButton}_hover` }}
      variant="solid"
      borderRadius="lg"
      w={{base: "100px", sm:"140px", md: "160px", lg: "200px", xl: "240px", '2xl': "270px"}}
      h={{base: "100px", md: "160px", lg: "200px", xl: "240px", '2xl': "270px"}}
      padding="50px"
      boxShadow="dark-lg"
      position={{base: "relative", md: "initial"}}
      top="-50"
      marginTop={{base: "0px", md: "25px"}}
      onClick={() => handleClick()}
    >
      <Stack direction="column" align="center" spacing={2}>
        <Icon as={icon} fontSize={{base: "3rem", md: "3.5rem", lg: "5rem", xl: "6rem"}} color={colorText} />
        <Text fontSize={["1rem","1rem","1.2rem","1.4rem"]}>{text}</Text>
      </Stack>
    </Button>
  );
};
