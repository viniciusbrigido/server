const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Token da API do Clash of Clans (via variável de ambiente)
const API_TOKEN = process.env.CLASH_API_TOKEN;

if (!API_TOKEN) {
  console.error('ERRO: CLASH_API_TOKEN não encontrado nas variáveis de ambiente');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Rota para buscar dados do jogador
app.get('/api/player/:playerId', async (req, res) => {
  try {
    let playerId = req.params.playerId;
    
    // Garantir que o playerId tenha o formato correto com #
    if (!playerId.startsWith('#')) {
      playerId = '#' + playerId;
    }

    console.log(`Buscando jogador: ${playerId}`);

    const encodedPlayerId = encodeURIComponent(playerId);
    const response = await fetch(`https://api.clashofclans.com/v1/players/${encodedPlayerId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });

    if (!response.ok) {
      console.error(`Erro na API: ${response.status} - ${response.statusText}`);
      
      if (response.status === 403) {
        return res.status(403).json({ error: 'Token inválido ou expirado' });
      }
      if (response.status === 404) {
        return res.status(404).json({ error: 'Jogador não encontrado' });
      }
      if (response.status === 429) {
        return res.status(429).json({ error: 'Muitas requisições. Tente novamente em alguns minutos.' });
      }
      
      return res.status(response.status).json({ 
        error: `Erro na API: ${response.status} - ${response.statusText}` 
      });
    }

    const data = await response.json();
    console.log(`Jogador encontrado: ${data.name}`);
    
    res.json(data);
  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend funcionando!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});