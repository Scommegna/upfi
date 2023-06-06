import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    //AXIOS REQUEST WITH PARAM
    async ({ pageParam = null }) => {
      const { data } = await api.get(
        `/api/images/${pageParam ? pageParam : ''}`
      );

      return data;
    },
    //GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: data => {
        const { after } = data;

        return after;
      },
    }
  );

  const formattedData = useMemo(() => {
    //FORMAT AND FLAT DATA ARRAY
    return data?.pages[0].data;
  }, [data]);

  console.log(formattedData);

  return (
    <>
      <Header />

      {isLoading && <Loading />}

      {isError && <Error />}

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}

// Falta algo com certeza
// Add dados no fauna para testar
// mexer primeiro no form de add imagens
