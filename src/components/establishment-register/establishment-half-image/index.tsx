import { Button, Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';
import Lottie from 'react-lottie';
import * as animationData from '../../../../public/business-analytics.json'

export const EstablishmentHalfImage = () => {

  return (
    <>
      <Flex
        direction="column"
        bg="primary_opacity"
        padding="20px 60px"
        borderBottomRightRadius="500px"
        align="end"
        justify="center"
        height="100%"
        minHeight={{base: "35vh", lg: "100vh"}}
        width="100%"
      >
         <Lottie 
            options={{
              loop: true,
              autoplay: true, 
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }}}
            height={400}
            width={400}
            isStopped={false}
            isPaused={false}
          />
      </Flex>
    </>
  );
};
