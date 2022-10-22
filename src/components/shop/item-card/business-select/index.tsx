import {
  Flex,
  FormControl,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import {
  MdOutlineAttachMoney,
  MdOutlineMoneyOffCsred,
  MdOutlineDescription,
  MdOutlineCategory,
} from 'react-icons/md';
import { RiCheckboxMultipleBlankLine } from 'react-icons/ri';
import { DefaultButton } from '../../../shared/default-button';

type BusinessSelectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  businessesInfo: Businesses;
  highlightBusinessId: string;
  setHighlightBusinessId: (businessId: string) => void;
};

type Businesses = {
  city: string;
  country: string;
  createdAt: string;
  description: string;
  id: string;
  imageUrl: string;
  latitude: string;
  longitude: string;
  maxPermittedCouponPercentage: number;
  name: string;
  state: string;
  street: string;
  zip: string;
}[];

export const BusinessSelectModal = ({
  isOpen,
  onClose,
  onConfirm,
  businessesInfo,
  highlightBusinessId,
  setHighlightBusinessId,
}: BusinessSelectModalProps) => {
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
          >
            Selecione o estabelecimento no qual deseja aplicar o item
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
            <Select
              onChange={(e) => setHighlightBusinessId(e.currentTarget.value)}
            >
              {businessesInfo.map((business, key) => (
                <option value={business.id} key={key}>
                  {business.name}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter gap={4}>
            <DefaultButton
              bg="error_red"
              color="default_white"
              text="Cancelar"
              onClick={onClose}
            />
            <DefaultButton
              bg="primary"
              color="default_white"
              text="Confirmar"
              onClick={() => {
                onClose();
                onConfirm();
              }}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
