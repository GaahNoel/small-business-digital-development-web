import { Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MdEmail } from 'react-icons/md';
import { DefaultButton } from '../../components/shared/default-button';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { api } from '../../service/api';

const EmailValidation = () => {
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        accountVerify();
    }, [id]);

    const accountVerify = async () => {
        console.log(id);
        try {
            const response = await api.put('account/verify', {
                id,
            });
            console.log(response);
        } catch (e: any) {
            console.log(e);
        }
    };

    return (
        <>
            <Flex bg="primary" height="100vh" direction="column">
                <Flex
                    align="center"
                    direction="column"
                    padding="70px 0px"
                    color="default_white"
                >
                    <Stack
                        direction="row"
                        spacing={2}
                        align="center"
                        justify="center"
                        fontSize="1.6rem"
                        fontWeight="bold"
                        color="default_white"
                    >
                        <Text>Confirmação do e-mail!</Text>
                        <Icon as={MdEmail}></Icon>
                    </Stack>
                </Flex>
                <Stack
                    bg="secondary"
                    direction="column"
                    height="100%"
                    justify="center"
                    align="center"
                    borderTopRadius="56px"
                    spacing={16}
                >
                    <Stack align="center" color="primary" spacing={4}>
                        <Icon as={AiOutlineCheckCircle} fontSize="120px" />
                        <Text fontSize="1.45rem" fontWeight="bold">
                            E-mail confirmado com sucesso
                        </Text>
                    </Stack>
                    <Stack w="90%" align="center" textAlign="center" spacing={8}>
                        <Stack spacing={1}>
                            <Text fontSize="1.2rem">Obrigado por se cadastrar!</Text>
                            <Text fontSize="1rem" color="default_gray">
                                Clique no botão abaixo para ser redirecionado.
                            </Text>
                        </Stack>
                        <DefaultButton
                            bg="primary"
                            color="default_white"
                            text="Confirmar"
                            onClick={() => router.push('/user-register')}
                        />
                    </Stack>
                </Stack>
            </Flex>
        </>
    );
};

export default EmailValidation;
