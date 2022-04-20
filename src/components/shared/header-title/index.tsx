import { Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

type HeaderTitleProps = {
  text: string;
  icon: IconType;
};

export const HeaderTitle = ({ text, icon }: HeaderTitleProps) => {
  return (
    <>
      <Flex padding="40px 0px" width="90%">
        <Heading as="h1" fontSize="1.2rem" color="default_white">
          <Stack direction="row" spacing={2} align="center" justify="center">
            <Text>{text}</Text>
            <Icon as={icon}></Icon>
          </Stack>
        </Heading>
      </Flex>
    </>
  );
};
