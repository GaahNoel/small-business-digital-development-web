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
        borderBottomRadius="200px"
        align="center"
        justify="center"
        height="35vh"
      >
        {children}
      </Flex>
    </>
  );
};
