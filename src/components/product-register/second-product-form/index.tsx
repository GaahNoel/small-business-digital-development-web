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
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { FormInput } from '../../shared/form-input';
import { DefaultTextArea } from '../../shared/default-text-area';
import { DefaultButton } from '../../shared/default-button';
import { useProductForm } from '../../../hooks/product-form';
import { useEffect, useState } from 'react';
import { imgbbApi } from '../../../service/imgbb-api';
import { api } from '../../../service/api';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

type ProductSecondFormData = {
  name: string;
  price: string;
  description: string;
};

export const SecondProductForm = () => {
  const { setStage, form } = useProductForm();
  const {
    token,
    type,
    category,
    name,
    setName,
    price,
    setPrice,
    description,
    setDescription,
    imageUrl,
    setImageUrl,
  } = form;
  const methods = useForm<ProductSecondFormData>();
  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
  } = methods;
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    console.log(token);
    console.log(type);
    console.log(category);
  }, []);

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

  const onSubmit: SubmitHandler<ProductSecondFormData> = async ({
    name,
    price,
    description,
  }) => {
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
          listPrice: price,
          salePrice: price as number,
          imageUrl: imageUrlReturned,
          businessId: 'cd7ab1c6-1d39-4fb0-8e87-5c8ece62b966',
          categoryId: 'e2b8e7a3-3b15-41ae-93d9-8141fe3ffec1',
        },
        {
          headers: {
            'content-type': 'application/json',
            token,
          },
        },
      );
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
          height="100%"
          flex="1"
          margin="0px auto"
          bg="secondary"
          padding="30px 0px"
          borderTopLeftRadius="65px"
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
          <Box width="70vw" margin="30px auto">
            {/* <FilePond
              files={files}
              onupdatefiles={setFiles}
              server="https://api.imgbb.com/1/upload"
              name="files"
              credits={false}
              allowFileTypeValidation={true}
              acceptedFileTypes={['image/*']}
              labelFileTypeNotAllowed="Tipo de arquivo não suportado"
              labelIdle='Arraste uma imagem ou <span class="filepond--label-action">selecione um arquivo</span>'
            /> */}
            {/* <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={true}
              server="https://api.imgbb.com/1/api/"
              name="files"
              labelIdle='Drag &amp; Drop your files or <span class="filepond--label-action">Browse</span> '
            /> */}
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
              onClick={() => setStage('first')}
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
