Ela deve realizar requisições para sua própria API Next.js que vai retornar os dados do FaunaDB (banco de dados) e do ImgBB (serviço de hospedagem de imagens).

### ReactQuery

## Infinite Queries:

Listagem que adiciona mais dados ao clicar em um botão de carregamento ou "infinite scroll".
Ela será utilizada nessa aplicação para realizar o carregamento das imagens cadastradas no nosso banco.

## Mutations:

Diferente das queries do React Query que são utilizadas normalmente para a busca de dados, as mutations são responsáveis pela criação/edição/remoção de dados.
Ela será utilizada nessa aplicação para o cadastro de uma nova imagem no banco.

## Invalidações:

Utilizada para marcar manualmente uma query como stale e forçar a atualização dos dados.
Ela será utilizada nessa aplicação para marcar a query de listagem de imagens como stale quando a mutation de cadastrar uma nova imagem ocorrer com sucesso.

### ReactHookForm

Na aplicação do desafio, você vai precisar implementar o registro dos inputs do formulário de cadastro da imagem, as validações e enviar os erros desses inputs.

Diferentemente do que foi visto na jornada, dessa vez você deve trabalhar com as validações diretamente no React Hook Form em vez de utilizar um `resolver` do Yup.

### API do Next.js

Ja feita, tem uma rota de GET para receber a listagem de imagens já uploadadas e uma rota POST para cadastro de nova imagem.

### Figma

Como a maior parte do layout do figma já foi implementada, o seu foco nesse desafio deve ser implementar o grid da listagem de imagens e o Modal ao clicar na imagem desejada.
