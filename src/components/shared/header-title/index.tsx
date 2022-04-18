import { Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

type HeaderTitleProps = {
  text: string;
  icon: IconType;
};

export const HeaderTitle = ({ text, icon }: HeaderTitleProps) => {
  return (
    <>
      <Flex max-height="140px" height="100%">
        <Heading as="h1" fontSize="1.4rem" color="default_white">
          <Stack direction="row" spacing={2} align="center">
            <Text>{text}</Text>
            <Icon as={icon}></Icon>
          </Stack>
        </Heading>
      </Flex>
    </>
  );
};
