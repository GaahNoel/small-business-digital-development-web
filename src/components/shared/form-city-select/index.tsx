import { Button, Flex, FormControl, Select } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormCitySelectProps = {
    cityOptions: {
        city: string;
        state: string
    }[];
    search: (city: string, state: string)=>void;
}

type CityFormData = {
    city: string;
}

export const FormCitySelect = ({cityOptions, search}: FormCitySelectProps) => {
  const methods = useForm<CityFormData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<CityFormData> = async ({
    city
    }) => {
        search(city.split("-")[0], city.split("-")[1])
    };

  return (
    <>
        <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
            <Flex> 
                <Select
                    {...register('city')}
                >
                    {
                        cityOptions && (
                            cityOptions.map((location, key) => {
                                return <option key={key} value={location.city+"-"+location.state}>{location.city+" - "+location.state}</option>
                            })
                        )
                    }
                </Select>
                <Button type="submit">
                    Buscar
                </Button>
            </Flex>
        </FormControl>
    </>
  );
};
