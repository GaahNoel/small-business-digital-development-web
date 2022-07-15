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
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  MdOutlineAttachMoney,
  MdOutlineCategory,
  MdOutlineDescription,
  MdOutlineMoneyOffCsred,
} from 'react-icons/md';
import { RiCheckboxMultipleBlankLine } from 'react-icons/ri';
import { ModalInfo } from '../../establishment/modal-info';
import { DefaultButton } from '../../shared/default-button';

type ProductModalProps = {
  name: string;
  type: string;
  description: string;
  grossPrice: number;
  netPrice: number;
  imageUrl: string;
  categoryName: string;
  inBusinessPage?: boolean;
  isOpen: boolean;
  onClose: () => void;
};

export const ProductServiceListModal = ({
  name,
  type,
  description,
  grossPrice,
  netPrice,
  imageUrl,
  inBusinessPage = false,
  isOpen,
  categoryName,
  onClose,
}: ProductModalProps) => {
  const format = {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
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
            maxWidth="500px"
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
            maxWidth="400px"
          >
            <Image src={imageUrl} boxSize="250px" borderRadius="2xl" />
            <Stack
              spacing={1}
              marginTop="30px"
              paddingTop="30px"
              borderTop="1px"
              alignItems="center"
              width="100%"
            >
              <Flex justifyContent="space-between" w="90%" direction="column">
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
                data={type}
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
                  onClick={onClose}
                >
                  Visitar página da loja
                </Button>
              )}
              <Button
                bg="primary"
                _hover={{ bg: 'primary_hover' }}
                onClick={onClose}
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
