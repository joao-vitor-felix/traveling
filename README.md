<div align="center">
<img src="./src/app/icon.svg" align="center" width="200"/>
</div>

# Traveling

Aplicação web que permite que o usuário realize reservas para viagens.

## 🎥 Demonstração

<img src="https://imgur.com/UnCtUDT.gif"/>

## 💡 Funcionalidades

- Reserva de viagem;
- Cancelamento de reserva agendada;
- Pagamentos;
- Autenticação com o Google.

## 🛠️ Stack utilizada

Next.js, React, TypeScript, Prisma, PostgreSQL, Next Auth, Tailwind, React Hook Form, Stripe API, Google Maps API, Jest, React Testing Library, Sentry.

## ⚙️ Variáveis de Ambiente

Para rodar esse projeto localmente, é necessário adicionar as seguintes variáveis de ambiente no seu .env

```
DATABASE_URL = URL do seu banco de dados
```

É possível povoar o banco utilizando o `updateTripSeed` script em `src/app/lib`

```
HOST_URL = URL do ambiente (development ou production)
```

```
GOOGLE_CLIENT_ID = ID do cliente OAuth do Google
```

```
GOOGLE_CLIENT_SECRET = Secret do cliente OAuth do Google
```

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = Key da API do Google Maps
```

```
STRIPE_SECRET_KEY = Key secreta da API do Stripe
```

```
NEXT_PUBLIC_STRIPE_KEY = Key pública da API do Stripe
```

```
STRIPE_WEBHOOK_SECRET_KEY = Key secreta do webhook do Stripe
```

É necessário instalar o [Stripe CLI](https://stripe.com/docs/stripe-cli?locale=pt-BR), logar no Stripe, rodar o script `stripe:listen` para obter a key e ouvir por eventos do Stripe, e então está tudo pronto para realizar pagamentos.

Para realizar um pagamento de teste no Stripe é necessário utilizar um cartão de crédito de teste. Você pode encontrar os cartões de teste [aqui](https://stripe.com/docs/testing#cards).

```
NEXTAUTH_SECRET = Secret do Next Auth
```

Pode ser qualquer string aleatória, é necessário apenas em produção, para ambiente de desenvolvimento é opcional.

## 💻 Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/joao-vitor-felix/traveling.git
```

Entre no diretório do projeto

```bash
  cd traveling
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

## 🔍 Rodando os testes

Para rodar os testes, rode o seguinte comando:

```bash
  npm test
```

## ⌛ Deployment

Este repostório utiliza continuous deployment com a Vercel. Ou seja, toda vez que um commit é feito, o build para produção é feito automaticamente.

## 🚀 Feedback

Se você tiver algum feedback, por favor me deixe saber por meio de joaovitorfelixcontato@gmail.com

## 👀 Relacionados

Alguns dos meus outros projetos

- [Club Clothing](https://github.com/joao-vitor-felix/club-clothing)
- [Meu time](https://github.com/joao-vitor-felix/meu-time)
- [Marvel Comics](https://github.com/joao-vitor-felix/marvel-comics)
