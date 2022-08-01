import {
  Box,
  Button,
  Collapse,
  color,
  Flex,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { BsCoin } from 'react-icons/bs';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { api } from '../../../service/api';
import { ItemIcon } from '../item-icon';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

type ItemCardProps = {
  bonusId: string;
  token: string;
  iconColor: string;
  price: string;
  text?: string;
  icon?: IconType;
  description: string;
  balance: number;
  setBalance: (balance: number) => void;
};

export const ItemCard = ({
  bonusId,
  token,
  iconColor,
  price,
  text,
  icon,
  description,
  balance,
  setBalance,
}: ItemCardProps) => {
  const [cardIsOpen, setCardIsOpen] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);

  const buyItemAlert = () => {
    Swal.fire({
      title: 'Tem certeza que deseja comprar o item?',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        buyItem();
      }
    });
  };

  const buyItem = async () => {
    try {
      setBuyLoading(true);
      const { id: accountId } = jwt_decode(token) as {
        id: string;
      };
      await api.post(
        'bonus/buy',
        {
          accountId,
          bonusId,
          quantity: 1,
        },
        {
          headers: {
            token,
          },
        },
      );
      setBalance(balance - Number(price));
      toast.success('Item comprado com sucesso!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.error('Saldo insuficiente para comprar o item!');
        } else {
          toast.error('Houve algum erro ao comprar o item!');
        }
      }
      console.log(error);
    } finally {
      setBuyLoading(false);
    }
  };

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
            transition="0.4s ease-in-out"
            disabled={buyLoading}
            _hover={{
              bg: iconColor,
              color: 'default_white',
              border: '2px solid',
              borderColor: iconColor,
            }}
            onClick={buyItemAlert}
          >
            {!buyLoading ? (
              <Text>Resgatar</Text>
            ) : (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="default_white"
                size="md"
              />
            )}
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
