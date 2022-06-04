import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
  } from '@chakra-ui/react';
  import { EstablishmentForm } from '../../establishment-register/establishment-form';

  type EstablishmentCardProps = {
    id: string;
    name: string;
    imageUrl: string;
  }
  
  type EstablishmentEditModalProps = {
    session: string;
    id: string;
    name: string;
    description: string;
    lat: string;
    lng: string;
    imageUrl: string;
    isOpen: boolean;
    onClose: () => void;
    updateState: (id: string, establishmentFound: EstablishmentCardProps) => void;
  };
  
  export const EstablishmentEditModal = ({
    session,
    id,
    name,
    description,
    lat,
    lng,
    imageUrl,
    isOpen,
    onClose,
    updateState,
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
                <EstablishmentForm session={session} id={id} nome={name} descricao={description} lat={lat} lng={lng} imageUrl={imageUrl} registerForm={false} clickBackButton={onClose} updateState={updateState} />
              </ModalBody>
            <ModalFooter>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  