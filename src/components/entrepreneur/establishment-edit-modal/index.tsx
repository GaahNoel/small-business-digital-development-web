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

type EstablishmentProps = {
  id: string;
  name: string;
  description: string;
  createdAt?: string;
  imageUrl: string;
  latitude: string;
  longitude: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  maxPermittedCouponPercentage?: number;
};

type EstablishmentEditModalProps = {
  session: string;
  id: string;
  name: string;
  description: string;
  lat: string;
  lng: string;
  imageUrl: string;
  maxPermittedCouponPercentage: number;
  isOpen: boolean;
  onClose: () => void;
  updateState: (id: string, establishmentFound: EstablishmentProps) => void;
};

export const EstablishmentEditModal = ({
  session,
  id,
  name,
  description,
  lat,
  lng,
  imageUrl,
  maxPermittedCouponPercentage,
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
            width="100%"
            maxWidth="500px"
          >
            <EstablishmentForm
              session={session}
              id={id}
              nome={name}
              descricao={description}
              lat={lat}
              lng={lng}
              imageUrl={imageUrl}
              maxPermittedCouponPercentage={maxPermittedCouponPercentage}
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
