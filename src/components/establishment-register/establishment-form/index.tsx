import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Spinner,
  Stack,
  Text,
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
import {
  empty_gray,
  default_orange,
  default_yellow,
  service_blue,
} from '../../../styles/theme';

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
import { positionstackApi } from '../../../service/positionstack-api';
import { CouponInfo } from '../../shared/coupon-info';

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
  maxPermittedCouponPercentage: number;
  registerForm: boolean;
  clickBackButton: () => void;
  updateState?: (id: string, establishmentFound: EstablishmentProps) => void;
};

type EstablishmentFormData = {
  nome: string;
  descricao: string;
};

type LocationProps = {
  lat: string;
  lng: string;
};

type PositionProps = {
  getLngLat: () => { lng: number; lat: number };
};

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

type ValueProps = 'nome' | 'descricao';

export const EstablishmentForm = (props: EstablishmentFormProps) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [position, setPosition] = useState<PositionProps>();
  const [couponValue, setCouponValue] = useState<number>(-1);
  const couponArray = [
    { color: empty_gray, value: 0 },
    { color: default_yellow, value: 5 },
    { color: default_orange, value: 7 },
    { color: service_blue, value: 10 },
  ];
  const router = useRouter();
  const methods = useForm<EstablishmentFormData>();
  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    register,
  } = methods;
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    Object.keys(props).forEach((value) => {
      setValue(value as ValueProps, props[value as ValueProps]);
    });
  }, []);

  useEffect(() => {
    getCouponValue();
  }, [props.maxPermittedCouponPercentage]);

  const getCouponValue = async () => {
    const couponIndex = couponArray.findIndex((coupon) => {
      return coupon.value === props.maxPermittedCouponPercentage;
    });
    setCouponValue(couponIndex);
  };

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

  const getAddressInfo = async ({ lat, lng }: LocationProps) => {
    try {
      const response = await positionstackApi.get(
        `reverse?access_key=${process.env.POSITION_STACK_KEY}&query=${lat},${lng}`,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
      );
      const { country, region, county, street, name } = response.data.data[0];
      return { country, region, county, street, name };
    } catch (error) {
      console.log(error);
    }
  };

  const registerEstablishment = async ({
    nome,
    descricao,
  }: EstablishmentFormData) => {
    try {
      const { sub: userId } = jwt_decode(props.session) as {
        sub: string;
      };
      let imageUrlReturned;
      if (files[0]) {
        imageUrlReturned = await postImageBB();
      } else {
        imageUrlReturned = 'https://i.ibb.co/RQ6vLP1/Group-1.png';
      }

      const { lat, lng } = position!.getLngLat();

      const location = {
        lat: lat.toString(),
        lng: lng.toString(),
      } as LocationProps;

      const addressInfo = await getAddressInfo(location);

      const response = await api.post(
        'business/create',
        {
          name: nome,
          description: descricao,
          imageUrl: imageUrlReturned,
          accountId: userId,
          city: addressInfo?.county as string,
          country: addressInfo?.country as string,
          latitude: lat.toString(),
          longitude: lng.toString(),
          state: addressInfo?.region,
          street: addressInfo?.street
            ? `Próximo à/ao ${addressInfo.street}`
            : `Próximo à/ao ${addressInfo?.name}`,
          zip: '',
          maxPermittedCouponPercentage: couponArray[couponValue].value,
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
      console.error(e);
    }
  };

  const editEstablishment = async ({
    nome,
    descricao,
  }: EstablishmentFormData) => {
    try {
      const { sub: userId } = jwt_decode(props.session) as {
        sub: string;
      };
      let imageUrlReturned;
      if (files[0]) {
        imageUrlReturned = await postImageBB();
      } else {
        imageUrlReturned = props.imageUrl;
      }
      const { lat, lng } = position!.getLngLat();

      const location = {
        lat: lat.toString(),
        lng: lng.toString(),
      } as LocationProps;

      const addressInfo = await getAddressInfo(location);
      const response = await api.put(
        `business/edit/${props.id}`,
        {
          name: nome,
          description: descricao,
          imageUrl: imageUrlReturned,
          accountId: userId,
          city: addressInfo?.county as string,
          country: addressInfo?.county as string,
          latitude: lat.toString(),
          longitude: lng.toString(),
          state: addressInfo?.region,
          street: addressInfo?.street
            ? `Próximo à/ao ${addressInfo.street}`
            : `Próximo à/ao ${addressInfo?.name}`,
          zip: '',
          maxPermittedCouponPercentage: couponArray[couponValue].value,
        },
        {
          headers: {
            'content-type': 'application/json',
            token: props.session,
          },
        },
      );
      if (props.updateState)
        props.updateState(props?.id as string, {
          id: props?.id as string,
          name: nome,
          latitude: lat.toString(),
          longitude: lng.toString(),
          imageUrl: imageUrlReturned,
          city: addressInfo?.county as string,
          country: addressInfo?.county as string,
          state: addressInfo?.region,
          street: addressInfo?.street
            ? `Próximo à/ao ${addressInfo.street}`
            : `Próximo à/ao ${addressInfo?.name}`,
          description: descricao,
          maxPermittedCouponPercentage: couponArray[couponValue].value,
        });
      toast.success('Estabelecimento alterado com sucesso!');
      props.clickBackButton();
    } catch (e: any) {
      console.error(e);
    }
  };

  const onSubmit: SubmitHandler<EstablishmentFormData> = async ({
    nome,
    descricao,
  }) => {
    try {
      setSubmitLoading(true);
      if (props.registerForm) {
        await registerEstablishment({ nome, descricao });
      } else {
        await editEstablishment({ nome, descricao });
      }
    } catch (e) {
      console.error(e);
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
            maxWidth={{ base: '90vw', md: '50vw', lg: '40vw', xl: '40vw' }}
            margin="15px auto"
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
                fontSize={{ base: '1rem', md: '1.4rem' }}
              >
                Localização
              </FormLabel>

              <DefaultMapInput
                setPosition={setPosition}
                editLng={Number(props.lng)}
                editLat={Number(props.lat)}
              />
            </Flex>
            <Box
              width="100%"
              height="120px"
              margin="10px auto 0px auto"
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
                imageValidateSizeMinWidth={400}
                imageValidateSizeMinHeight={400}
                imageValidateSizeMaxWidth={1080}
                imageValidateSizeMaxHeight={1080}
                name="files"
                labelIdle='Drag &amp; Drop your files or <span class="filepond--label-action">Browse</span> '
              />
            </Box>
            <Flex direction="column">
              <FormLabel
                htmlFor={`range_label`}
                color="primary"
                fontWeight="bold"
                fontSize={{ base: '1rem', md: '1.4rem' }}
              >
                Cupons liberados pelo estabelecimento
              </FormLabel>
              <Text color="primary">
                *O estabelecimento receberá moedas da aplicação relativo ao
                nível de cupom permitido pelo mesmo*
              </Text>
              {couponValue >= 0 ? (
                <>
                  <Slider
                    id="coupon"
                    defaultValue={couponValue}
                    min={0}
                    max={3}
                    step={1}
                    marginTop="10px"
                    onChange={(value) => setCouponValue(value)}
                  >
                    <SliderTrack bg="empty_gray">
                      <Box position="relative" right={10} />
                      <SliderFilledTrack bg="primary" />
                    </SliderTrack>
                    <SliderThumb boxSize={6} />
                  </Slider>
                  <CouponInfo
                    iconColor={couponArray[couponValue].color}
                    text={`${couponArray[couponValue].value}%`}
                  />
                </>
              ) : (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="primary"
                  size="md"
                />
              )}
            </Flex>
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
                disabled={submitLoading || couponValue < 0}
                onClick={() => {
                  props.clickBackButton();
                }}
              />
              <DefaultButton
                bg="primary"
                color="default_white"
                text="Enviar"
                isLoading={submitLoading || couponValue < 0}
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
