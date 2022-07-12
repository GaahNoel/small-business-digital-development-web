import { Button, Flex, FormControl, Select, Stack } from "@chakra-ui/react";
import { MutableRefObject, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputType } from "zlib";

type FormCitySelectProps = {
    cityOptions: {
        cities: string[];
        state: string;
    }[]
    search: (city: string, state: string)=>void;
    searchBar: MutableRefObject<HTMLInputElement>;
}

type CityFormData = {
    city: string;
}

export const FormCitySelect = ({cityOptions, search, searchBar}: FormCitySelectProps) => {
  const [citySelected, setCitySelected] = useState(false);
  const methods = useForm<CityFormData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onChange: SubmitHandler<CityFormData> = async ({
    city,
    }) => {
        setCitySelected(true);
        search(city.split("-")[0], city.split("-")[1]);
        searchBar.current.value = "";
    };

  return (
    <>
        <FormControl as="form" onChange={handleSubmit(onChange)}>
            <Stack width={{base: "330px", sm: "355px", md: "405px", lg: "430px", xl: "530px"}} margin="0px auto 40px auto" direction="row"> 
                <Select
                    bg="default_white"
                    {...register('city')}
                >
                    <option value="Selecione uma cidade" disabled={citySelected}>Selecione uma cidade</option>
                    {
                        cityOptions && (
                            cityOptions.map((location, keyState) => (
                                <optgroup key={keyState} label={location.state}>
                                    {
                                        location.cities.map((city, key) =>(
                                            <option key={key} value={`${city}-${location.state}`}>{city}</option>
                                        ))
                                    }
                                </optgroup>
                            ))
                        )
                    }
                </Select>
            </Stack>
        </FormControl>
    </>
  );
};
