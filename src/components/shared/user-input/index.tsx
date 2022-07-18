import {
  Box,
  Flex,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { useFormContext } from 'react-hook-form';
import FormErrorMessage from '../form-error-message';
import { useState } from 'react';
import zxcvbn from 'zxcvbn';
import { PasswordStrengthMeter } from './password-strength-meter';

type UserInputProps = {
  id: string;
  field: string;
  type: string;
  placeholder: string;
  icon: IconType;
  required?: boolean;
  maxLength?: number;
  additionalRegisterOptions?: object;
  reference?: React.RefObject<HTMLInputElement>;
  shouldCalcPasswordStrength?: boolean;
};

export const UserInput = ({
  id,
  field,
  type,
  placeholder,
  icon,
  required = true,
  maxLength = 50,
  additionalRegisterOptions,
  shouldCalcPasswordStrength = false,
}: UserInputProps) => {
  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext();
  const [strength, setStrength] = useState(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors('password');

    const newStrength = zxcvbn(e.target.value).score;
    setStrength(newStrength);

    if (newStrength <= 2) {
      setError('password', {
        message: 'A senha é muito fraca',
      });
    }
  };

  return (
    <>
      <Flex direction="column">
        <FormLabel
          htmlFor={`${id}_label`}
          color="primary"
          fontWeight="bold"
          fontSize={{ base: '1rem', md: '1.4rem' }}
        >
          {field}
        </FormLabel>
        {shouldCalcPasswordStrength && (
          <PasswordStrengthMeter strength={strength} />
        )}
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            marginTop={{ base: '0px', md: '5px' }}
          >
            <Icon
              as={icon}
              color="gray.500"
              fontSize={{ base: '1rem', md: '1.15rem' }}
            />
          </InputLeftElement>

          <Input
            {...register(id, {
              required,
              maxLength,
              ...additionalRegisterOptions,
            })}
            id={id}
            type={type}
            placeholder={placeholder}
            border="2px"
            borderColor={errors[id] ? 'error_red' : 'primary'}
            bg="default_white"
            fontSize={{ base: '1rem', md: '1.15rem' }}
            height={{ base: '40px', md: '50px' }}
            onChange={shouldCalcPasswordStrength ? onChange : undefined}
          />
        </InputGroup>
        {errors[id] && errors[id].type === 'required' && (
          <FormErrorMessage message="Campo necessário" />
        )}
        {errors[id] && errors[id].type === 'maxLength' && (
          <FormErrorMessage message="Máximo de caracteres ultrapassado" />
        )}
        {errors[id] && <FormErrorMessage message={errors[id].message} />}
      </Flex>
    </>
  );
};
