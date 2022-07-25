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
        templateColumns={{
          base: 'repeat(2, 1fr)',

          md: 'repeat(4, 1fr)',
        }}
        marginBottom="100px"
        gap={2}
      >
        <GridItem>
          <ItemCard
            iconColor={default_yellow}
            price="10"
            text="10%"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"
          />
        </GridItem>
        <GridItem>
          <ItemCard
            iconColor={default_orange}
            price="25"
            text="25%"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"
          />
        </GridItem>
        <GridItem>
          <ItemCard
            iconColor={service_blue}
            price="50"
            text="50%"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"
          />
        </GridItem>
        <GridItem>
          <ItemCard
            iconColor={service_blue}
            price="50"
            text="50%"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"
          />
        </GridItem>
        <GridItem>
          <ItemCard
            iconColor={service_blue}
            price="50"
            text="50%"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"
          />
        </GridItem>
        <GridItem>
          <ItemCard
            iconColor={service_blue}
            price="50"
            text="50%"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"
          />
        </GridItem>
        <GridItem>
          <ItemCard
            iconColor={service_blue}
            price="50"
            text="50%"
            description="Lorem Lorem Ipsum has been the industry"
          />
        </GridItem>
      </Grid>
    </>
  );
};
