import { Button, Icon, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { IconType } from 'react-icons';
import { routerNavigateUrl } from '../../../utils/router-navigate';

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
  const handleClick = async () => {
    const homeLoader = document.getElementById('global-loader');
    homeLoader?.classList.add('active');
    await router.push(page);
  };
  return (
    <Button
      bg={colorButton}
      color={colorText}
      _hover={{
        bgColor: `${colorButton}_hover`,
        svg: {
          animation: 'drawIcons 3s ease 1',
          animationFillMode: 'backwards',
        },
        '@keyframes drawIcons': {
          '0%': { strokeWidth: 0, strokeDasharray: '1 100' },
          '100%': { strokeWidth: 1.5, strokeDasharray: '100 0' },
        },
      }}
      variant="solid"
      borderRadius="lg"
      w={{
        base: '100px',
        sm: '140px',
        md: '160px',
        lg: '200px',
        xl: '240px',
        '2xl': '270px',
      }}
      h={{
        base: '100px',
        md: '160px',
        lg: '200px',
        xl: '240px',
        '2xl': '270px',
      }}
      padding="50px"
      boxShadow="dark-lg"
      position={{ base: 'relative', md: 'initial' }}
      top="-50"
      marginTop={{ base: '0px', md: '25px' }}
      //sx={{ 'svg': {animation: "drawIcons 5s ease 1", animationFillMode: "backwards"}, '@keyframes drawIcons': { "0%": {strokeWidth: 0, strokeDasharray: "1 100"}, "100%": {strokeWidth: 2, strokeDasharray: "100 0"} } }}
      onClick={() => handleClick()}
    >
      <Stack direction="column" align="center" spacing={2} id={text}>
        <Icon
          as={icon}
          fontSize={{ base: '3rem', md: '3.5rem', lg: '5rem', xl: '6rem' }}
          color={colorText}
          strokeWidth="1.5"
        />
        <Text fontSize={['1rem', '1rem', '1.2rem', '1.4rem']}>{text}</Text>
      </Stack>
    </Button>
  );
};
