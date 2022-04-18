import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { FormInput } from '../../shared/form-input';
import { BsBoxSeam } from 'react-icons/bs';
import { MdAttachMoney } from 'react-icons/md';
import { DefaultButton } from '../../shared/default-button';
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import { DefaultTextArea } from '../../shared/default-text-area';
import { DefaultMapInput } from '../../shared/default-map-input';

export const EstablishmentForm = () => {
  return (
    <>
      <FormControl
        width="100%"
        height="100vh"
        margin="0px auto"
        bg="secondary"
        padding="30px 0px"
        borderTopRightRadius="65px"
      >
        <Stack direction="column" spacing={3} maxWidth="70vw" margin="0px auto">
          <FormInput
            id="nome"
            field="Nome"
            type="text"
            placeholder="Digite o nome do produto"
            icon={BsBoxSeam}
          />
          <DefaultTextArea
            text="Descrição"
            placeholder="Digite a descrição do estabelecimento"
          />
          <Flex direction="column">
            <FormLabel
              htmlFor={`descricao_label`}
              color="primary"
              fontWeight="bold"
              fontSize="1rem"
            >
              Localização
            </FormLabel>
            <Flex border="2px" borderColor="primary">
              <DefaultMapInput />
            </Flex>
          </Flex>
        </Stack>
        <Box width="70vw" margin="30px auto">
          <FilePond
            server="/api"
            name="files"
            credits={false}
            allowFileTypeValidation={true}
            acceptedFileTypes={['image/*']}
            labelFileTypeNotAllowed="Tipo de arquivo não suportado"
            labelIdle='Arraste uma imagem ou <span class="filepond--label-action">selecione um arquivo</span>'
          />
        </Box>

        <Stack direction="row" justify="center" spacing={25} marginTop="30px">
          <DefaultButton
            bg="default_black"
            color="default_white"
            text="Cancelar"
          />
          <DefaultButton bg="primary" color="default_white" text="Enviar" />
        </Stack>
      </FormControl>
    </>
  );
};
