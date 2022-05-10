import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { BsBoxSeam } from 'react-icons/bs';
import { MdAttachMoney } from 'react-icons/md';
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { FormInput } from '../../shared/form-input';
import { DefaultTextArea } from '../../shared/default-text-area';
import { DefaultButton } from '../../shared/default-button';

type ProductSecondFormData = {
  nome: string;
  preco: string;
  descricao: string;
};

export const SecondProductForm = () => {
  const methods = useForm<ProductSecondFormData>();
  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;
  return (
    <>
      <FormProvider {...methods}>
        <FormControl
          width="100%"
          height="100vh"
          margin="0px auto"
          bg="secondary"
          padding="30px 0px"
          borderTopLeftRadius="65px"
        >
          <Stack
            direction="column"
            spacing={3}
            maxWidth="70vw"
            margin="0px auto"
          >
            <FormInput
              id="nome"
              field="Nome"
              type="text"
              placeholder="Digite o nome do produto"
              icon={BsBoxSeam}
            />
            <FormInput
              id="preco"
              field="Preço"
              type="text"
              placeholder="Digite o preço do produto"
              icon={MdAttachMoney}
            />
            <DefaultTextArea
              text="Descrição"
              placeholder="Digite a descrição do produto"
            />
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
      </FormProvider>
    </>
  );
};
