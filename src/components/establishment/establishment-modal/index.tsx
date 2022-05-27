import {
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
  useDisclosure,
} from '@chakra-ui/react';
import { DefaultButton } from '../../shared/default-button';
import {
  MdOutlineAttachMoney,
  MdOutlineMoneyOffCsred,
  MdOutlineDescription,
  MdOutlineCategory,
} from 'react-icons/md';
import { RiCheckboxMultipleBlankLine } from 'react-icons/ri';
import { ModalInfo } from '../modal-info';

type EstablishmentModalProps = {
  name: string;
  type: string;
  description: string;
  grossPrice: number;
  netPrice: number;
  imageUrl: string;
  categoryName: string;
  isOpen: boolean;
  onClose: () => void;
};

export const EstablishmentModal = ({
  name,
  type,
  description,
  grossPrice,
  netPrice,
  imageUrl,
  isOpen,
  categoryName,
  onClose,
}: EstablishmentModalProps) => {
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
          maxW="90vw"
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
            maxWidth="300px"
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
            <DefaultButton
              bg="primary"
              color="default_white"
              text="Fechar"
              onClick={onClose}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
