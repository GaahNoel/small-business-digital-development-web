import { Flex, Image } from '@chakra-ui/react';
import Lottie from 'react-lottie';
import * as animationData from '../../../../public/business-idea-animation.json';

export const RightImage = () => {
  return (
    <>
      <Flex
        direction="column"
        bg="primary_opacity"
        padding="20px 60px"
        borderTopLeftRadius="500px"
        align="start"
        justify="center"
        minHeight={{ base: '35vh', lg: '100vh' }}
        height="100%"
        width="100%"
      >
        <Flex
          align="start"
          justify="center"
          width="95%"
          marginLeft={{ lg: '80px', xl: '60px', '2xl': '0px' }}
        >
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            height={600}
            width={600}
            isStopped={false}
            isPaused={false}
          />
        </Flex>
      </Flex>
    </>
  );
};
