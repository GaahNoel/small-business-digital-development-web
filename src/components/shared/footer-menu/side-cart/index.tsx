import { Box, Button, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';
import useCart from '../../../../hooks/cart';
import { SideCartCard } from './side-cart-card';

type SideCartProps = {
  isOpen: boolean;
  setIsOpen: (params: boolean) => void;
};

export const SideCart = ({ isOpen, setIsOpen }: SideCartProps) => {
  const format = {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  };
  const cart = useCart();

  const finalizeOrder = () => {
    cart.finalize();
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
          bg="default_white"
          align="center"
          justify="space-between"
          direction="column"
          opacity="1"
          transition="0.2s ease-in-out"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Flex direction="row" margin="20px 0px">
            <Text color="primary" fontSize="40px" fontWeight="bold">
              Carrinho
            </Text>
            <Flex align="center" right="30px">
              <IconButton
                aria-label="Close side cart"
                onClick={() => setIsOpen(false)}
              >
                <Icon as={MdClose}></Icon>
              </IconButton>
            </Flex>
          </Flex>
          <Flex direction="column" gap={5} padding="40px" overflowY="scroll">
            {cart.items.map((item, key) => (
              <SideCartCard
                id={item.id}
                name={item.name}
                img={item.imageUrl}
                price={item.price}
                quantity={item.quantity}
                businessName={cart.businessName as string}
                key={key}
              />
            ))}
          </Flex>
          <Flex direction="column" marginTop="30px" marginBottom="100px">
            <Flex fontSize="30px" fontWeight="medium">
              <Text color="primary">Total a pagar:&nbsp;</Text>
              <Text color="success_green">
                {cart.total.toLocaleString('pt-BR', format)}
              </Text>
            </Flex>

            <Button bg="primary" color="default_white" onClick={finalizeOrder}>
              Finalizar pedido
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
