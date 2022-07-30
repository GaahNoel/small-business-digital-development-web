import {
  Box,
  Button,
  Collapse,
  color,
  Flex,
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { BsCoin } from 'react-icons/bs';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import { ItemIcon } from '../item-icon';

type ItemCardProps = {
  iconColor: string;
  price: string;
  text?: string;
  icon?: IconType;
  description: string;
};

export const ItemCard = ({
  iconColor,
  price,
  text,
  icon,
  description,
}: ItemCardProps) => {
  const [cardIsOpen, setCardIsOpen] = useState(false);
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
        borderRadius="12px"
        transition="8s ease-in-out"
      >
        <ItemIcon color={iconColor} text={text} icon={icon} />
        <Stack
          direction="row"
          align="center"
          justifyContent="space-around"
          spacing={1}
        >
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
            color={iconColor}
            border="2px"
            fontSize="0.9rem"
            width="65px"
            height="35px"
            transition="0.2s ease-in-out"
            _hover={{ bg: 'default_white_min_hover' }}
          >
            Resgatar
          </Button>
        </Stack>
        <Collapse in={cardIsOpen}>
          <Flex
            height="150px"
            maxW="100%"
            overflowY="scroll"
            textOverflow="ellipsis"
            paddingRight="10px"
          >
            <Text color={iconColor}>{description}</Text>
          </Flex>
        </Collapse>

        <Flex
          className="icon"
          cursor="pointer"
          transition={'all 0.1s ease-in-out'}
          _hover={{
            filter: 'contrast(150%)',
            transform: 'scale(1.1)',
          }}
        >
          <Icon
            as={!cardIsOpen ? FiPlusCircle : FiMinusCircle}
            fontSize="1.8rem"
            onClick={() => setCardIsOpen(!cardIsOpen)}
          />
        </Flex>
      </Stack>
    </>
  );
};
