import {
  Button,
  Flex,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  MdOutlineAttachMoney,
  MdOutlineCategory,
  MdOutlineDescription,
  MdOutlineMoneyOffCsred,
} from 'react-icons/md';
import { RiCheckboxMultipleBlankLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import useCart from '../../../hooks/cart';
import { ModalInfo } from '../../establishment/modal-info';
import { DefaultButton } from '../../shared/default-button';

type ProductModalProps = {
  id: string;
  name: string;
  type: 'product' | 'service';
  typeName: string;
  description: string;
  grossPrice: number;
  netPrice: number;
  imageUrl: string;
  categoryName: string;
  inBusinessPage?: boolean;
  businessId: string;
  isOpen: boolean;
  onClose: () => void;
};

type ProductInfo = {
  id: string;
  businessId: string;
  name: string;
  type: 'product' | 'service';
  imageUrl: string;
  price: number;
  quantity: number;
};

export const ProductServiceListModal = ({
  id,
  name,
  type,
  typeName,
  description,
  grossPrice,
  netPrice,
  imageUrl,
  inBusinessPage = false,
  businessId,
  isOpen,
  categoryName,
  onClose,
}: ProductModalProps) => {
  const router = useRouter();
  const format = {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  };
  const cart = useCart();
  const [routerLoading, setRouterLoading] = useState(false);

  const addCart = (item: ProductInfo) => {
    cart.addItem(item);
  };

  const navigateToBusinessPage = async (businessId: string) => {
    setRouterLoading(true);
    await router.push(`/business-items/${businessId}`);
    setRouterLoading(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          width="90vw"
          maxWidth="700px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ModalHeader
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="primary"
            fontSize="30px"
            fontWeight="bold"
            maxWidth="600px"
            wordBreak="break-all"
          >
            {name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            color="primary"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="90vw"
            maxWidth="600px"
          >
            <Image
              src={imageUrl}
              fallbackSrc="/imgLoader.gif"
              boxSize="300px"
              borderRadius="2xl"
              objectFit="cover"
            />
            <Stack
              spacing={1}
              marginTop="30px"
              paddingTop="30px"
              borderTop="1px"
              alignItems="center"
              width="100%"
            >
              <Flex justifyContent="space-between" w="100%" direction="column">
                <Flex alignItems="center" gap={2}>
                  <Icon as={MdOutlineDescription} />
                  <Text fontWeight="semibold">Descrição:</Text>
                </Flex>
                <Text>{description}</Text>
              </Flex>
              <ModalInfo
                info="Categoria:"
                data={categoryName}
                icon={MdOutlineCategory}
              />
              <ModalInfo
                info="Tipo:"
                data={typeName}
                icon={RiCheckboxMultipleBlankLine}
              />
              <ModalInfo
                info="Preço Bruto:"
                data={grossPrice?.toLocaleString('pt-BR', format)}
                icon={MdOutlineAttachMoney}
              />
              <ModalInfo
                info="Preço Líquido:"
                data={netPrice?.toLocaleString('pt-BR', format)}
                icon={MdOutlineMoneyOffCsred}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Stack
              direction="column"
              spacing={2}
              marginTop="30px"
              color="white"
            >
              <Button
                bg="primary"
                _hover={{ bg: 'primary_hover' }}
                onClick={onClose}
              >
                Fechar
              </Button>
              {!inBusinessPage && (
                <Button
                  bg="primary"
                  _hover={{ bg: 'primary_hover' }}
                  disabled={routerLoading}
                  onClick={() => navigateToBusinessPage(businessId)}
                >
                  {!routerLoading ? (
                    <Text>Visitar página da loja</Text>
                  ) : (
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="primary"
                      size="md"
                    />
                  )}
                </Button>
              )}
              <Button
                bg="primary"
                _hover={{ bg: 'primary_hover' }}
                onClick={() =>
                  addCart({
                    id,
                    businessId,
                    name,
                    type,
                    imageUrl,
                    price: netPrice,
                    quantity: 1,
                  })
                }
              >
                Colocar no carrinho
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
