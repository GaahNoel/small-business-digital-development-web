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

import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { FormInput } from '../../shared/form-input';
import { DefaultTextArea } from '../../shared/default-text-area';
import { DefaultButton } from '../../shared/default-button';
import { useProductForm } from '../../../hooks/product-form';
import { useEffect, useState } from 'react';
import { imgbbApi } from '../../../service/imgbb-api';
import { api } from '../../../service/api';
import { useRouter } from 'next/router';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// Import the plugin code
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// Import the plugin code
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { runIfFn } from '@chakra-ui/utils';
import { toast } from 'react-toastify';
import { stringify } from 'querystring';

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageValidateSize,
  FilePondPluginFileValidateType,
);

type ProductSecondFormProps = {
  id?: string;
  name: string;
  price: string;
  description: string;
  imageUrl?: string;
  registerForm: boolean;
  clickBackButton: () => void;
  updateState?: (id: string, productFound: ProductProps) => void;
  establishmentBase: EstablishmentBaseProps;
};

type ProductSecondFormData = {
  name: string;
  price: string;
  description: string;
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

type ValueProps = 'name' | 'price' | 'description';

export const SecondProductForm = (props: ProductSecondFormProps) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const { setStage, form } = useProductForm();
  const { token, type, category } = form;
  const methods = useForm<ProductSecondFormData>();
  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    register,
  } = methods;

  useEffect(() => {
    Object.keys(props).forEach((value) => {
      setValue(value as ValueProps, props[value as ValueProps]);
    });
  }, []);

  const [files, setFiles] = useState<any>([]);
  const router = useRouter();

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
      console.error(error);
    }
  };

  const registerProduct = async ({
    name,
    price,
    description,
  }: ProductSecondFormData) => {
    try {
      let imageUrlReturned;
      if (files[0]) {
        imageUrlReturned = await postImageBB();
      } else {
        imageUrlReturned = 'https://i.ibb.co/4VTQKDh/Product.png';
      }
      const response = await api.post(
        'product/create',
        {
          name,
          type,
          description,
          listPrice: parseFloat(price.replaceAll('.', '').replaceAll(',', '.')),
          salePrice: parseFloat(price.replaceAll('.', '').replaceAll(',', '.')),
          imageUrl: imageUrlReturned,
          businessId: props.establishmentBase.id,
          categoryId: category,
        },
        {
          headers: {
            'content-type': 'application/json',
            token,
          },
        },
      );

      await router.push(`/establishment/${props.establishmentBase.id}`);
      toast.success('Produto cadastrado com sucesso!');
    } catch (e) {
      console.error(e);
    }
  };

  const editProduct = async ({
    name,
    price,
    description,
  }: ProductSecondFormData) => {
    try {
      let imageUrlReturned;
      if (files[0]) {
        console.log('Encontrou arquivo');
        imageUrlReturned = await postImageBB();
      } else {
        console.log('Não encontrou arquivo');
        imageUrlReturned = props.imageUrl;
      }
      const response = await api.put(
        `product/edit/${props.id}`,
        {
          name,
          description,
          listPrice: parseFloat(price.replaceAll('.', '').replaceAll(',', '.')),
          salePrice: parseFloat(price.replaceAll('.', '').replaceAll(',', '.')),
          imageUrl: imageUrlReturned,
          productId: props.id,
        },
        {
          headers: {
            'content-type': 'application/json',
            token,
          },
        },
      );
      if (props.updateState)
        props.updateState(props?.id as string, {
          id: props?.id as string,
          name: name,
          description: description,
          listPrice: parseFloat(price.replaceAll('.', '').replaceAll(',', '.')),
          salePrice: parseFloat(price.replaceAll('.', '').replaceAll(',', '.')),
          imageUrl: imageUrlReturned,
        });

      props.clickBackButton();
      toast.success('Produto alterado com sucesso!');
      //router.push('/entrepreneur');
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit: SubmitHandler<ProductSecondFormData> = async ({
    name,
    price,
    description,
  }) => {
    setSubmitLoading(true);
    try {
      if (props.registerForm) {
        await registerProduct({ name, price, description });
      } else {
        await editProduct({ name, price, description });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction="column"
            spacing={3}
            width="100%"
            maxWidth={{ base: '90vw', md: '50vw', lg: '40vw', xl: '35vw' }}
            margin="0px auto"
            border="2px #000"
            borderRadius="3xl"
            bg="default_white"
            boxShadow={
              props.registerForm ? '-14px 15px 15px -8px rgba(0,0,0,0.35);' : ''
            }
            padding={
              props.registerForm ? { base: '25px', md: '25px 50px' } : '0px'
            }
          >
            <FormInput
              id="name"
              field="Nome"
              type="text"
              placeholder="Digite o nome do produto"
              icon={BsBoxSeam}
            />
            <FormInput
              id="price"
              field="Preço"
              type="text"
              placeholder="Digite o preço do produto"
              icon={MdAttachMoney}
            />
            <DefaultTextArea
              id="description"
              text="Descrição"
              placeholder="Digite a descrição do produto"
              register={register}
            />
            <Box
              width="100%"
              margin="10px auto"
              sx={{ '.filepond--credits': { display: 'none' } }}
            >
              <FormLabel
                htmlFor={`image_label`}
                color="primary"
                fontWeight="bold"
                fontSize={{ base: '1rem', md: '1.4rem' }}
              >
                Imagem
              </FormLabel>
              <FilePond
                files={files}
                onupdatefiles={setFiles}
                instantUpload={false}
                allowMultiple={false}
                name="files"
                allowImageValidateSize={true}
                imageValidateSizeMinWidth={400}
                imageValidateSizeMinHeight={400}
                imageValidateSizeMaxWidth={1800}
                imageValidateSizeMaxHeight={1800}
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/png', 'image/jpg', 'image/jpeg']}
                labelIdle='Drag &amp; Drop your files or <span class="filepond--label-action">Browse</span> '
              />
            </Box>

            <Stack
              direction="row"
              justify="center"
              spacing={25}
              marginTop="30px"
            >
              <DefaultButton
                bg="default_black"
                color="default_white"
                text="Cancelar"
                disabled={submitLoading}
                onClick={() => props.clickBackButton()}
              />
              <DefaultButton
                bg="primary"
                color="default_white"
                text="Enviar"
                isLoading={submitLoading}
                disabled={submitLoading}
                type="submit"
              />
            </Stack>
          </Stack>
        </FormControl>
      </FormProvider>
    </>
  );
};
