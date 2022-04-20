import {
  Box,
  Button,
  color,
  Flex,
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { BsCoin } from 'react-icons/bs';
import { ItemIcon } from '../item-icon';

type ItemCardProps = {
  iconColor: string;
  price: string;
  text?: string;
  icon?: IconType;
};

export const ItemCard = ({ iconColor, price, text, icon }: ItemCardProps) => {
  return (
    <>
      <Stack
        bg="default_white"
        color={iconColor}
        direction="column"
        align="center"
        justify="center"
        spacing={4}
        padding="10px"
        marginBottom="30px"
        width="170px"
        position="relative"
        _after={{
          content: '""',
          width: 0,
          height: 0,
          borderLeft: '85px solid transparent',
          borderRight: '85px solid transparent',
          borderTop: '30px solid',
          borderTopColor: 'default_white',
          position: 'absolute',
          top: '180px',
        }}
      >
        <ItemIcon color={iconColor} text={text} icon={icon} />
        <Stack direction="row" align="center" spacing={1}>
          <Stack
            bg="default_white"
            borderRadius="14px"
            direction="row"
            align="center"
            justify="center"
            padding="8px"
            fontWeight="bold"
            spacing={1}
          >
            <Icon as={BsCoin} fontSize="1.4rem" />
            <Text fontSize="1.2rem">{price}</Text>
          </Stack>
          <Button
            bg="default_white"
            _hover={{ bg: 'default_white_hover' }}
            color="primary"
            border="2px"
            fontSize="0.9rem"
            width="65px"
          >
            Resgatar
          </Button>
        </Stack>
      </Stack>
    </>
  );
};
