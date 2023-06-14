import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';
import { useState } from 'react';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // MODAL USEDISCLOSURE
  const { onOpen, isOpen, onClose } = useDisclosure();

  // SELECTED IMAGE URL STATE
  const [currentImgUrl, setCurrentImgUrl] = useState('');

  // FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(url: string): void {
    onOpen();
    setCurrentImgUrl(url);
  }

  return (
    <>
      <SimpleGrid columns={[1, 2, 3]} spacing="40px">
        {cards.map(card => (
          <Card key={card.id} data={card} viewImage={handleViewImage} />
        ))}
      </SimpleGrid>

      <ModalViewImage
        isOpen={isOpen}
        imgUrl={currentImgUrl}
        onClose={onClose}
      />
    </>
  );
}
