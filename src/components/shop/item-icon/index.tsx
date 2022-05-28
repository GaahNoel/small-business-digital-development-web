import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { SvgIcon } from '../svg-icon';

type ItemIconProps = {
  color: string;
  text?: string;
  icon?: IconType;
};

export const ItemIcon = ({ color, text, icon }: ItemIconProps) => {
  return (
    <>
      <Flex boxSize="100px" align="center" justify="center">
        <SvgIcon color={color} />
        <Flex fontSize="36px" color="default_white" zIndex="0">
          {icon ? <Icon as={icon} /> : <Text>{text}</Text>}
        </Flex>
      </Flex>
    </>
  );
};
