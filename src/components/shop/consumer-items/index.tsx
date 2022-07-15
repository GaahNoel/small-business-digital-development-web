import { Grid, GridItem } from '@chakra-ui/react';
import { ItemCard } from '../item-card';
import { AiFillHome } from 'react-icons/ai';
import {
  default_orange,
  default_yellow,
  service_blue,
} from '../../../styles/theme';

export const ConsumerItems = () => {
  return (
    <>
      <Grid
        width="100%"
        justifyItems="center"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        marginBottom="100px"
        gap={2}
      >
        <GridItem>
          <ItemCard iconColor={default_yellow} price="10" text="10%" />
        </GridItem>
        <GridItem>
          <ItemCard iconColor={default_orange} price="25" text="25%" />
        </GridItem>
        <GridItem>
          <ItemCard iconColor={service_blue} price="50" text="50%" />
        </GridItem>
      </Grid>
    </>
  );
};
