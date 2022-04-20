import { Flex, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type ItemIconProps = {
  color: string;
  text?: string;
  icon?: IconType;
};

export const ItemIcon = ({ color, text, icon }: ItemIconProps) => {
  return (
    <>
      <Flex
        backgroundImage="Shop-Bg.svg"
        bgRepeat="no-repeat"
        bgPosition="center"
        bgSize="100px"
        boxSize="100px"
        fill="primary"
        fontSize="2.2rem"
        align="center"
        justify="center"
        color="default_white"
      >
        {icon ? <Icon as={icon} /> : <Text>{text}</Text>}
      </Flex>
    </>
  );
};
