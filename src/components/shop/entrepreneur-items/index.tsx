import { Flex, Grid, GridItem, Spinner } from '@chakra-ui/react';
import { ItemCard } from '../item-card';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { BsStar } from 'react-icons/bs';
import {
  default_orange,
  default_yellow,
  service_blue,
} from '../../../styles/theme';
import { useEffect, useState } from 'react';
import { apiCache } from '../../../service/api-cache';
import jwt_decode from 'jwt-decode';

type EntrepreneurItemsProps = {
  token: string;
  balance: number;
  setBalance: (balance: number) => void;
};

type Bonus = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  type: string;
  percent: number;
}[];

type Businesses = {
  city: string;
  country: string;
  createdAt: string;
  description: string;
  id: string;
  imageUrl: string;
  latitude: string;
  longitude: string;
  maxPermittedCouponPercentage: number;
  name: string;
  state: string;
  street: string;
  zip: string;
}[];

export const EntrepreneurItems = ({
  token,
  balance,
  setBalance,
}: EntrepreneurItemsProps) => {
  const [businessBonus, setBusinessBonus] = useState<Bonus>([]);
  const [businessesInfo, setBusinessesInfo] = useState<Businesses>([]);
  const [loadingBonus, setLoadingBonus] = useState(true);

  const highlightArray = [
    { color: service_blue, price: 300 },
    { color: default_orange, price: 100 },
    { color: default_yellow, price: 50 },
  ];

  useEffect(() => {
    getBonus();
    getBusinessesInfo();
  }, []);

  const getHighlightColor = (highlightPrice: number) => {
    const couponIndex = highlightArray.findIndex((highlight) => {
      return highlight.price <= highlightPrice;
    });
    return highlightArray[couponIndex].color;
  };

  const getBonus = async () => {
    try {
      const clientBonusRes = await apiCache.get(`bonus/list?type=business`, {
        headers: {
          token,
        },
      });
      setBusinessBonus(clientBonusRes.data as Bonus);
      setLoadingBonus(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getBusinessesInfo = async () => {
    try {
      const { id: accountId } = jwt_decode(token) as {
        id: string;
      };
      const businessesInfoRes = await apiCache.get(
        `business/list/${accountId}`,
        {
          headers: {
            token,
          },
        },
      );
      setBusinessesInfo(businessesInfoRes.data as Businesses);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!loadingBonus ? (
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
          {businessBonus.map((bonus, key) => (
            <GridItem key={key}>
              <ItemCard
                token={token}
                bonusId={bonus.id}
                bonusType={bonus.type}
                businessesInfo={businessesInfo}
                iconColor={getHighlightColor(bonus.price)}
                price={bonus.price.toString()}
                icon={BsStar}
                description={bonus.description}
                balance={balance}
                setBalance={setBalance}
              />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Flex align="center" justify="center" width="100%">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="default_white"
            size="xl"
          />
        </Flex>
      )}
    </>
  );
};
