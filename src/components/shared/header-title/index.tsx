import { Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

type HeaderTitleProps = {
  text: string;
  icon: IconType;
  fontSize?: string;
};

export const HeaderTitle = ({
  text,
  icon,
  fontSize = '1.2rem',
}: HeaderTitleProps) => {
  return (
    <>
      <Flex padding="40px 0px" width="90%" justify="center">
        <Heading as="h1" fontSize={fontSize} color="default_white">
          <Stack direction="row" spacing={2} align="center">
            <Text>{text}</Text>
            <Icon as={icon}></Icon>
          </Stack>
        </Heading>
      </Flex>
    </>
  );
};
