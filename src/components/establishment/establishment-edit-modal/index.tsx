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
  
  type EstablishmentEditModalProps = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    isOpen: boolean;
    onClose: () => void;
  };
  
  export const EstablishmentEditModal = ({
    id,
    name,
    description,
    price,
    imageUrl,
    isOpen,
    onClose,
  }: EstablishmentEditModalProps) => {

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
              <SecondProductForm id={id} name={name} description={description} price={String(price)} imageUrl={imageUrl} registerForm={false} clickBackButton={onClose}/>
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  