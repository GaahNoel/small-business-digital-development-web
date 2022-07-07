import { Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

type HeaderTitleProps = {
  text: string;
  icon: IconType;
};

export const HeaderTitle = ({
  text,
  icon,
}: HeaderTitleProps) => {
  return (
    <>
      <Flex padding="40px 0px" width="90%" justify="center">
        <Heading as="h1" fontSize={{base: "1.2rem", md: "2rem", lg: "2.2rem"}} color="default_white">
          <Stack direction="row" spacing={1} align="center">
            <Text>{text}</Text>
            <Icon as={icon}></Icon>
          </Stack>
        </Heading>
      </Flex>
    </>
  );
};
