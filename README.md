# Clash of Clans Backend Server

Backend server para a aplicação de equipamentos dos heróis do Clash of Clans.

## Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione seu token da API do Clash of Clans:

```env
CLASH_API_TOKEN=seu_token_aqui
PORT=5000
```

### 3. Obter token da API
1. Acesse https://developer.clashofclans.com/
2. Faça login com sua conta Supercell
3. Crie uma nova chave de API
4. Copie o token e cole no arquivo `.env`

### 4. Executar o servidor

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

O servidor estará disponível em `http://localhost:5000`

## Endpoints

- `GET /api/test` - Teste de funcionamento
- `GET /api/player/:playerId` - Buscar dados do jogador

## Estrutura

- `server.js` - Arquivo principal do servidor
- `.env` - Variáveis de ambiente (não commitado)
- `.env.example` - Exemplo de configuração
- `package.json` - Dependências e scripts