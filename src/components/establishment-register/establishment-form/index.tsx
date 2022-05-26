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

import { DefaultTextArea } from '../../shared/default-text-area';
import { DefaultMapInput } from '../../shared/default-map-input';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { imgbbApi } from '../../../service/imgbb-api';
import { api } from '../../../service/api';
import { useRouter } from 'next/router';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

type EstablishmentFormProps = {
  session: string;
};

type EstablishmentFormData = {
  nome: string;
  descricao: string;
  rua: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
};

export const EstablishmentForm = ({ session }: EstablishmentFormProps) => {
  const [position, setPosition] = useState({});
  const router = useRouter();
  const methods = useForm<EstablishmentFormData>();
  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
  } = methods;
  const [files, setFiles] = useState<any>([]);

  const postImageBB = async () => {
    const formData = new FormData();
    formData.append('image', files[0].file);
    formData.append('key', process.env.IMG_BB_KEY as string);
    try {
      const response = await imgbbApi.post(`upload`, formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });

      const {
        data: { url },
      } = response.data as any;
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<EstablishmentFormData> = async ({
    nome,
    descricao,
  }) => {
    const { sub: userId } = jwt_decode(session) as {
      sub: string;
    };
    const imageUrlReturned = await postImageBB();
    const { lat, lng } = position.getLngLat();

    console.log(
      nome,
      descricao,
      imageUrlReturned,
      userId,
      'string',
      'string',
      lat,
      lng,
      'string',
      'string',
      'string',
      session,
    );
    try {
      const response = await api.post(
        'business/create',
        {
          name: nome,
          description: descricao,
          imageUrl: imageUrlReturned,
          accountId: userId,
          city: 'string',
          country: 'string',
          latitude: lat.toString(),
          longitude: lng.toString(),
          state: 'string',
          street: 'string',
          zip: 'string',
        },
        {
          headers: {
            'content-type': 'application/json',
            token: session,
          },
        },
      );
      router.push('/entrepreneur');
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <FormControl
          as="form"
          width="100%"
          flex="1"
          margin="0px auto"
          bg="secondary"
          padding="30px 0px"
          borderTopRightRadius="65px"
          onSubmit={handleSubmit(onSubmit)}
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
              placeholder="Digite o nome do estabelecimento"
              icon={BsBoxSeam}
            />
            <DefaultTextArea
              id="descricao"
              register={register}
              text="Descrição"
              placeholder="Digite a descrição do estabelecimento"
            />
            <Flex direction="column">
              <FormLabel
                htmlFor={`map_label`}
                color="primary"
                fontWeight="bold"
                fontSize="1rem"
              >
                Localização
              </FormLabel>

              <DefaultMapInput setPosition={setPosition} />
            </Flex>
          </Stack>
          <Box width="70vw" margin="30px auto">
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              instantUpload={false}
              credits={false}
              allowMultiple={false}
              name="files"
              labelIdle='Drag &amp; Drop your files or <span class="filepond--label-action">Browse</span> '
            />
          </Box>

          <Stack direction="row" justify="center" spacing={25} marginTop="30px">
            <DefaultButton
              bg="default_black"
              color="default_white"
              text="Cancelar"
              onClick={() => {
                router.push('/entrepreneur');
              }}
            />
            <DefaultButton
              bg="primary"
              color="default_white"
              text="Enviar"
              type="submit"
            />
          </Stack>
        </FormControl>
      </FormProvider>
    </>
  );
};
