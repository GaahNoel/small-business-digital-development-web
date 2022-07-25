import { Grid, GridItem } from '@chakra-ui/react';
import { ItemCard } from '../item-card';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { BsStar } from 'react-icons/bs';
import { default_orange, default_yellow } from '../../../styles/theme';

export const EntrepreneurItems = () => {
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
          <ItemCard
            iconColor={default_yellow}
            price="50"
            icon={MdOutlineLocalOffer}
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"
          />
        </GridItem>
        <GridItem>
          <ItemCard
            iconColor={default_orange}
            price="75"
            icon={BsStar}
            description="Lorem Ipsum has been the industry"
          />
        </GridItem>
      </Grid>
    </>
  );
};
