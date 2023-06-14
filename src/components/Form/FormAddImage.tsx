import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

interface NewImgData {
  url: string;
  title: string;
  description: string;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  // Tests type of data inserted on image field
  const acceptedFormatsRegex =
    /(?:([^:/?#]+):)?(?:([^/?#]*))?([^?#](?:jpeg|gif|png))(?:\?([^#]*))?(?:#(.*))?/g;

  //Checks if fields are valid
  const formValidations = {
    image: {
      required: 'Arquivo obrigatório.',
      validate: {
        lessThan10MB: filelist =>
          filelist[0].size < 10000000 || 'A imagem deve ter menos de 10MB.',
        acceptedFormats: filelist =>
          acceptedFormatsRegex.test(filelist[0].type) ||
          'Os formatos aceitos são somente PNG, JPEG e GIF.',
      },
    },
    title: {
      required: 'Título obrigatório.',
      minLength: {
        value: 2,
        message: 'Mínimo de 2 caracteres.',
      },
      maxLength: {
        value: 20,
        message: 'Máximo de 20 caracteres.',
      },
    },
    description: {
      required: 'Descrição obrigatória.',
      maxLength: {
        value: 65,
        message: 'Máximo de 65 caracteres.',
      },
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    // MUTATION API POST REQUEST
    async (img: NewImgData) => {
      await api.post('/api/images', {
        ...img,
        url: imageUrl,
      });
    },
    {
      // ONSUCCESS MUTATION
      onSuccess: () => {
        queryClient.invalidateQueries('images');
      },
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: NewImgData): Promise<void> => {
    try {
      // SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      if (!imageUrl) {
        toast({
          status: 'error',
          title: 'Imagem não adicionada.',
          description:
            'É preciso adicionar e aguardar o upload da imagem para cadastra-la.',
        });

        return;
      }

      // EXECUTE ASYNC MUTATION
      await mutation.mutateAsync(data);

      // SHOW SUCCESS TOAST
      toast({
        status: 'success',
        title: 'Imagem adicionada.',
        description: 'Imagem cadastrada com sucesso.',
      });
    } catch {
      // SHOW ERROR TOAST IF SUBMIT FAILED
      toast({
        status: 'error',
        title: 'Falha no cadastro de imagem.',
        description: 'Ocorreu um erro ao cadastrar a imagem.',
      });
    } finally {
      // CLEAN FORM, STATES AND CLOSE MODAL
      reset();
      setImageUrl('');
      setLocalImageUrl('');
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          {...register('image', formValidations.image)}
          error={errors.image}
        />

        <TextInput
          placeholder="Título da imagem..."
          {...register('title', formValidations.title)}
          error={errors.title}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          {...register('description', formValidations.description)}
          error={errors.description}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
