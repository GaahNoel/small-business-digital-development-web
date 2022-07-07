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
      <Flex padding="40px 0px" margin="0px auto" width="100%" justify="center" align="center">
        <Heading as="h1" fontSize={{base: "1.2rem", md: "2rem", lg: "2.2rem"}} color="default_white">
          <Stack direction="row" spacing={1} align="center" justify="center">
            <Text>{text}</Text>
            <Icon as={icon}></Icon>
          </Stack>
        </Heading>
      </Flex>
    </>
  );
};
