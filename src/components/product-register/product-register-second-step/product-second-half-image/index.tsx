import { Flex, Image } from '@chakra-ui/react';
import Lottie from 'react-lottie';
import * as animationData from '../../../../../public/business-analytics.json'

export const ProductSecondHalfImage = () => {

  return (
    <>
      <Flex
        direction="column"
        bg="primary_opacity"
        padding="20px 60px"
        borderTopLeftRadius="500px"
        justify="center"
        minHeight={{base: "35vh", lg: "100vh"}}
        width="100%"
      >
        <Flex align="start" justify="center" width="90%" marginLeft={{lg: "80px", xl: "60px", "2xl": "0px"}}>
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
      </Flex> 
    </>
  );
};
