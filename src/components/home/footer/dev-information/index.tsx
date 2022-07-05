import { Flex, Grid, GridItem, Icon, Img, Link, Stack, Text } from '@chakra-ui/react';
import { BsGithub } from 'react-icons/bs'; 

type DevInformationProps = {
    name: string;
    img: string;
    role: string;
    gitHubLink: string;
}

export const DevInformation = ({name, img, role, gitHubLink}: DevInformationProps) => {
  return (
    <>
        <Grid alignItems="center" justifyItems="center" templateColumns='repeat(5, 1fr)' templateRows='repeat(1, 1fr)' gap={2}>
            <GridItem colSpan={1} rowSpan={1}>
                <Img src={img} width="100px" borderRadius="90px" />
            </GridItem>
            <GridItem colSpan={3} rowSpan={1}>
                <Flex direction="column" textAlign="center" align="center" color="primary" fontSize={{base: "16px", md: "20px"}}>
                    <Text >{name}</Text>
                    <Text >{role}</Text>
                </Flex>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1}>
                <Link href={gitHubLink} isExternal>
                    <Icon as={BsGithub} color="primary" _hover={{color: "primary_hover"}} fontSize="50px" />
                </Link>
            </GridItem>
        </Grid>
    </>
  );
};
