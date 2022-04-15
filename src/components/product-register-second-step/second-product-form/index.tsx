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

export const SecondProductForm = () => {
    return (
        <>
            <FormControl
                width="100%"
                maxWidth="90vw"
                margin="0px auto"
                bg="product_form_purple"
                padding="30px 0px"
                borderRadius="15px"
            >
                <Stack direction="column" spacing={3} maxWidth="70vw" margin="0px auto">
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
                    <Flex direction="column" marginBottom="10px">
                        <FormLabel
                            htmlFor={`descricao_label`}
                            color="primary"
                            fontWeight="bold"
                            fontSize="1.1rem"
                        >
                            Descrição
                        </FormLabel>
                        <Textarea
                            placeholder="Digite a descrição do produto"
                            resize="none"
                            bg="default_white"
                            borderColor="primary"
                            border="2px"
                            fontSize="1.1rem"
                        />
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
