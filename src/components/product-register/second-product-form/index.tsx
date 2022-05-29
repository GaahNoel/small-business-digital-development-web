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
import { runIfFn } from '@chakra-ui/utils';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Register the plugin
registerPlugin(FilePondPluginImageValidateSize);

type ProductSecondFormProps = {
  id?: string;
  name: string;
  price: string;
  description: string;
  imageUrl?: string;
  registerForm: boolean;
  clickBackButton: () => void;
};

type ProductSecondFormData = {
  name: string;
  price: string;
  description: string;
}

export const SecondProductForm = (props: ProductSecondFormProps) => {
  const { setStage, form } = useProductForm();
  const {
    establishmentId,
    token,
    type,
    category,
    setName,
    setPrice,
    setDescription,
    setImageUrl,
  } = form;
  const methods = useForm<ProductSecondFormData>();
  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
    setValue,
  } = methods;

  useEffect(()=>{
    Object.keys(props).forEach((value) => {
      setValue(value, props[value]);
    })
  },[])

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
      console.log(error);
    }
  };

  const registerProduct = async({
    name,
    price,
    description,
  }: ProductSecondFormData) =>{
    const imageUrlReturned = await postImageBB();
    setName(name);
    setPrice(price);
    setDescription(description);
    setImageUrl(imageUrlReturned);
    try {
      const response = await api.post(
        'product/create',
        {
          name,
          type,
          description,
          listPrice: parseFloat(price),
          salePrice: parseFloat(price),
          imageUrl: imageUrlReturned,
          businessId: establishmentId,
          categoryId: category,
        },
        {
          headers: {
            'content-type': 'application/json',
            token,
          },
        },
      );

      router.push('/entrepreneur');
    } catch (e: any) {
      console.log(e);
    }
  }
  
  const editProduct = async({
    name,
    price,
    description,
  }: ProductSecondFormData) =>{
    let imageUrlReturned;
    if(files[0]){
      console.log("Encontrou arquivo")
      imageUrlReturned = await postImageBB();
      setImageUrl(imageUrlReturned);
    } else{
      console.log("Não encontrou arquivo")
      imageUrlReturned = props.imageUrl;
    }

    setName(name);
    setPrice(price);
    setDescription(description);
    
    try {
      const response = await api.put(
        `product/edit/${props.id}`,
        {
          name,
          description,
          listPrice: parseFloat(price),
          salePrice: parseFloat(price),
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

      router.push('/entrepreneur');
    } catch (e: any) {
      console.log(e);
    }
  }

  const onSubmit: SubmitHandler<ProductSecondFormData> = async ({
    name,
    price,
    description,
  }) => {
    if(props.registerForm){
      registerProduct({name, price, description});
    }else{
      editProduct({name, price, description});
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
              allowImageValidateSize={true}
              imageValidateSizeMinWidth={600}
              imageValidateSizeMinHeight={400}
              imageValidateSizeMaxWidth={1024}
              imageValidateSizeMaxHeight={800}
              labelIdle='Drag &amp; Drop your files or <span class="filepond--label-action">Browse</span> '
            />
          </Box>

          <Stack direction="row" justify="center" spacing={25} marginTop="30px">
            <DefaultButton
              bg="default_black"
              color="default_white"
              text="Cancelar"
              onClick={() => props.clickBackButton()}
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
