import players from '../data/players';
import '../data/calendario'; 
import { fetchProximosJogos } from '../services/apiMock'; 

export const getBotResponse = async (input) => {
  const message = input.toLowerCase();

  // Resposta para estatísticas de jogador
  const foundPlayer = players.find(player =>
    message.includes(player.nome.toLowerCase())
  );

  if (foundPlayer) {
    return `
      <div class="player-card">
          <img src="/src/assets/images/${foundPlayer.image}" alt="${foundPlayer.nome}" class="player-image" />
          <div class="player-name">${foundPlayer.nome}</div>
          <div>🌎 <strong>Nacionalidade:</strong> ${foundPlayer.nationality}</div>
          <div>🎯 <strong>Função:</strong> ${foundPlayer.funcao}</div>
          <div>📈 <strong>Estatísticas:</strong>
              <ul>
                  <li>Rating: ${foundPlayer.estatisticas.rating}</li><br>
                  <li>Kills: ${foundPlayer.estatisticas.kills}</li><br>
                  <li>Headshots: ${foundPlayer.estatisticas.headshots}</li>
              </ul>
          </div>
      </div>
  `;
}

  // Resposta para calendário
  if (message.includes("calendario")) {
    try {
      const jogos = await fetchProximosJogos();
      const hoje = jogos.find(jogo => jogo.status === "em_breve");
      const outrosJogos = jogos.filter(jogo => jogo.status !== "em_breve");

      const formatarJogo = (jogo) => {
        if (jogo.data) {
          return `🎮 ${jogo.titulo}<br>⏰ ${jogo.data} | ${jogo.horario}<br> vs ${jogo.adversario}<br>📍 ${jogo.local}`;
        } else {
          return `🏆 ${jogo.titulo}<br>📅 ${jogo.periodo}<br>📍 ${jogo.local}`;
        }
      };

      return `
      📅 AGENDA DA FURIA 📅 <br><br>
      ${hoje ? `🔥 PROXIMOS JOGOS! 🔥<br><br> ${formatarJogo(hoje)}<br><br>` : ''}
      ${outrosJogos.map(formatarJogo).join("<br><br>")}
      `;
    } catch {
      return "Opa, tive um problema pra buscar os jogos. Tenta de novo aí, furioso!";
    }
  }

  const redesKeywords = [
    "redes", "instagram", "insta",
    "twitter", "x", "tweet",
    "youtube", "yt", "canal",
    "tiktok", "tt",
    "whatsapp", "zap", "contato", "suporte"
  ];

  const redesResposta = `
  <div class="redes-sociais-container">
    <h4 style="margin: 0 0 5px 0; font-size: 15px;">📱 Siga a FURIA nas redes:</h4>
    <ul class="redes-lista" style="margin-top: 0; padding-left: 0;">
      <li>
        <i class="fab fa-instagram" style="color: #E1306C; width: 20px;"></i>
        <a href="https://instagram.com/furiagg" target="_blank">Instagram</a>
      </li>
      <li>
        <i class="fab fa-twitter" style="color:rgb(0, 0, 0); width: 20px;"></i>
        <a href="https://x.com/FURIA?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank">Twitter/X</a>
      </li>
      <li>
        <i class="fab fa-youtube" style="color: #FF0000; width: 20px;"></i>
        <a href="https://www.youtube.com/channel/UCE4elIT7DqDv545IA71feHg" target="_blank">YouTube</a>
      </li>
      <li>
        <i class="fab fa-tiktok" style="color:rgb(161, 15, 161); width: 20px;"></i>
        <a href="https://www.tiktok.com/@furiagg" target="_blank">TikTok</a>
      </li>
      <li>
        <i class="fas fa-globe" style="color: #00AFF0; width: 20px;"></i>
        <a href="https://www.furia.gg/" target="_blank">Site oficial</a>
      </li>
      <li>
        <i class="fab fa-whatsapp" style="color: #25D366; width: 20px;"></i>
        <a href="https://wa.me/5511993404466" target="_blank">WhatsApp</a>
      </li>
    </ul>
  </div>`;

if (redesKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
  return redesResposta;
}

  // Resposta padrão
  return "Fala torcedor(a)! Diga 'stats NOME' ou 'calendario'! 🔥";

};
