import { Flex } from '@chakra-ui/react';

type HeaderHalfCircleTopProps = {
  children: JSX.Element;
};

export const HeaderHalfCircleTop = ({ children }: HeaderHalfCircleTopProps) => {
  return (
    <>
      <Flex
        direction="column"
        bg="primary"
        padding="20px 60px"
        borderBottomRadius="full"
        height={{base: "35vh", lg: "100vh"}}
        align="center"
        justify="center"
        width="100%"
      >
        {children}
      </Flex>
    </>
  );
};
