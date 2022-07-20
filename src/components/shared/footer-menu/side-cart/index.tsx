import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useCart from '../../../../hooks/cart';
import { SideCartCard } from './side-cart-card';

type SideCartProps = {
  isOpen: boolean;
  setIsOpen: (params: boolean) => void;
};

export const SideCart = ({ isOpen, setIsOpen }: SideCartProps) => {
  const [finalizeOrderLoading, setFinalizeOrderLoading] = useState(false);
  const format = {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  };
  const cart = useCart();

  const finalizeOrder = () => {
    Swal.fire({
      title: 'Tem certeza que deseja finalizar o pedido?',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        confirmFinalizeOrder();
      }
    });
  };

  const confirmFinalizeOrder = async () => {
    setFinalizeOrderLoading(true);
    await cart.finalize();
    setFinalizeOrderLoading(false);
  };

  const cleanOrder = () => {
    Swal.fire({
      title: 'Tem certeza que deseja limpar todos os itens do carrinho?',
      showDenyButton: true,
      confirmButtonText: 'Não',
      denyButtonText: `Sim`,
    }).then((result) => {
      if (!result.isConfirmed) {
        cart.clean();
        toast.success('Carrinho limpo com sucesso!');
      }
    });
  };

  return (
    <>
      <Flex
        className="sidecart"
        width="100%"
        minHeight="100vh"
        height="100%"
        position="fixed"
        top="0px"
        zIndex={isOpen ? '2' : '-1'}
        bg="rgba(0,0,0,0.4)"
        opacity={isOpen ? '1' : '0'}
        transition="0.2s ease-in-out"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <Flex
          position="absolute"
          height="100%"
          width={{ base: '100%', md: '500px' }}
          right={isOpen ? '0px' : '-500px'}
          bg="secondary_full"
          align="center"
          justify="space-between"
          direction="column"
          opacity="1"
          transition="0.2s ease-in-out"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Flex
            height="100%"
            width={{
              base: '330px',
              sm: '380px',
              md: '420px',
            }}
            direction="column"
          >
            <Flex direction="row" margin="20px 0px" justify="space-between">
              <Text color="primary" fontSize="40px" fontWeight="semibold">
                Carrinho
              </Text>
              <Flex align="center" right="30px">
                <IconButton
                  aria-label="Close side cart"
                  color="primary"
                  bg="secondary_full"
                  border="1px solid #5647B2"
                  borderRadius="full"
                  transition="0.2s ease-in-out"
                  _hover={{ bg: 'primary', color: 'white' }}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon as={MdClose}></Icon>
                </IconButton>
              </Flex>
            </Flex>
            <Flex
              direction="column"
              gap={5}
              overflowY="auto"
              scrollPadding="none"
              sx={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'primary',
                  borderRadius: '24px',
                },
              }}
            >
              {cart.items.map((item, key) => (
                <SideCartCard
                  id={item.id}
                  name={item.name}
                  img={item.imageUrl}
                  price={item.price}
                  quantity={item.quantity}
                  type={item.type}
                  businessName={cart.businessName as string}
                  key={key}
                />
              ))}
            </Flex>
            <Flex direction="column" margin="30px 0px">
              <Flex
                fontSize="22px"
                fontWeight="semibold"
                justify="space-between"
              >
                <Text color="primary">Total a pagar:</Text>
                <Text color="success_green">
                  {cart.total.toLocaleString('pt-BR', format)}
                </Text>
              </Flex>
              <Flex justify="space-between" marginTop="20px">
                <Button
                  bg="error_red"
                  _hover={{ bg: 'error_red_hover' }}
                  color="default_white"
                  width={{ base: '150px', sm: '185px', md: '205px' }}
                  height="60px"
                  fontSize={{ base: '18px', sm: '22px' }}
                  disabled={cart.itemsLength === 0}
                  onClick={cleanOrder}
                >
                  Limpar pedido
                </Button>
                <Button
                  bg="primary"
                  _hover={{ bg: 'primary_hover' }}
                  color="default_white"
                  width={{ base: '150px', sm: '185px', md: '205px' }}
                  height="60px"
                  fontSize={{ base: '18px', sm: '22px' }}
                  disabled={cart.itemsLength === 0}
                  onClick={finalizeOrder}
                >
                  {!finalizeOrderLoading ? (
                    'Finalizar pedido'
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
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
