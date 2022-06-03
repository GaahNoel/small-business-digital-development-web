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
import { useEffect, useState } from 'react';
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
import { toast } from 'react-toastify';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

type EstablishmentFormProps = {
  session: string;
  id?: string;
  nome: string;
  descricao: string;
  lat: string;
  lng: string;
  imageUrl: string;
  registerForm: boolean;
  clickBackButton: () => void;
};

type EstablishmentFormData = {
  nome: string;
  descricao: string;
};

type PositionProps = {
  getLngLat: () => { lng: number; lat: number };
};

export const EstablishmentForm = (props: EstablishmentFormProps) => {
  const [position, setPosition] = useState<PositionProps>();
  const router = useRouter();
  const methods = useForm<EstablishmentFormData>();
  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
    setValue,
  } = methods;
  const [files, setFiles] = useState<any>([]);

  useEffect(()=>{
    Object.keys(props).forEach((value) => {
      setValue(value, props[value]);
    })
  },[]);

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

  const registerEstablishment = async({nome, descricao}: EstablishmentFormData) =>{
    const { sub: userId } = jwt_decode(props.session) as {
      sub: string;
    };
    let imageUrlReturned;
    if(files[0]){
      imageUrlReturned = await postImageBB();
    }
    else{
      imageUrlReturned = 'https://i.ibb.co/RQ6vLP1/Group-1.png';
    }
    const { lat, lng } = position!.getLngLat();

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
            token: props.session,
          },
        },
      );
      toast.success('Estabelecimento cadastrado com sucesso!');
      router.push('/entrepreneur');
    } catch (e: any) {
      console.log(e);
    }
  }

  const editEstablishment = async({nome, descricao}: EstablishmentFormData) =>{
    const { sub: userId } = jwt_decode(props.session) as {
      sub: string;
    };
    let imageUrlReturned;
    if(files[0]){
      imageUrlReturned = await postImageBB();
    }
    else{
      imageUrlReturned = props.imageUrl;
    }
    const { lat, lng } = position!.getLngLat();

    try {
      const response = await api.put(
        `business/edit/${props.id}`,
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
            token: props.session,
          },
        },
      );
      toast.success('Estabelecimento alterado com sucesso!');
      props.clickBackButton();
    } catch (e: any) {
      console.log(e);
    }
  }

  const onSubmit: SubmitHandler<EstablishmentFormData> = async ({
    nome,
    descricao,
  }) => {
    if(props.registerForm){
      registerEstablishment({nome, descricao});
    }else{
      editEstablishment({nome, descricao});
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <FormControl
          as="form"
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
          <Box
            width="100%"
            maxWidth="70vw"
            margin="30px auto"
            sx={{ '.filepond--credits': { display: 'none' } }}
          >
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              instantUpload={false}
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
                props.clickBackButton();
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
