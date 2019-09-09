import React from 'react';
import { Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const ExchangeRates = () => {
  const { loading, error, data } = useQuery(gql`
    {
      rates(currency: "USD") {
        currency
        rate
      }
    }
  `);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return data.rates.map(({ currency, rate }) => (
    <React.Fragment key={currency}>
      <Text>
        {currency}: {rate}
      </Text>
    </React.Fragment >
  ));
}

export default ExchangeRates;