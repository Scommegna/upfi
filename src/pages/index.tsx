import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

// Images interface
interface Image {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

// Image collection inteface
interface GetImagesCollection {
  after: string;
  data: Image[];
}

export default function Home(): JSX.Element {
  // Fetch images collection for infinite queries
  async function fetchImages({
    pageParam = null,
  }): Promise<GetImagesCollection> {
    const { data } = await api.get('/api/images', {
      params: {
        after: pageParam,
      },
    });

    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',

    //AXIOS REQUEST
    fetchImages,

    //GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: lastPage => {
        if (lastPage?.after) {
          return lastPage.after;
        }

        return null;
      },
    }
  );

  //FORMAT AND FLAT DATA ARRAY
  const formattedData = useMemo(() => {
    const formatted = data?.pages.flatMap(imgData => {
      return imgData.data.flat();
    });

    return formatted;
  }, [data]);

  // Renders if data is loading
  if (isLoading && !isError) {
    return <Loading />;
  }

  // Renders if there is an error
  if (!isLoading && isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            mt="6"
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
