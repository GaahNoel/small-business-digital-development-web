import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { DefaultButton } from '../../shared/default-button';
import { SecondProductForm } from '../../product-register/second-product-form';

type ProductEditModalProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isOpen: boolean;
  establishmentBase: EstablishmentBaseProps;
  onClose: () => void;
  updateState: (id: string, productFound: ProductProps) => void;
};

type ProductProps = {
  id: string;
  name: string;
  listPrice: number;
  salePrice: number;
  description: string;
  createdAt?: string;
  businessId?: string;
  imageUrl: string;
  type?: string;
  category?: {
    id: string;
    name: string;
  };
};

type EstablishmentBaseProps = {
  id: string;
  name: string;
};

export const ProductEditModal = ({
  id,
  name,
  description,
  price,
  imageUrl,
  isOpen,
  establishmentBase,
  onClose,
  updateState,
}: ProductEditModalProps) => {
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
            maxWidth="500px"
          >
            <SecondProductForm
              establishmentBase={establishmentBase}
              id={id}
              name={name}
              description={description}
              price={String(price)}
              imageUrl={imageUrl}
              registerForm={false}
              clickBackButton={onClose}
              updateState={updateState}
            />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
