import proximosJogos from './matches';
import players from './players';
import './links';

const getBotResponse = (input) => {
  const texto = input.toLowerCase().trim();

  // Jogadores
  if (/jogador(es)?/.test(texto)) {
    return `Jogadores da FURIA: ${players.map(p => p.nome).join(", ")}`;
  }

  // Estatísticas 
  if (texto.includes("stats")) {
    const nomeJogador = input.split(" ")[1]?.toLowerCase();

    if (!nomeJogador) {
      return "Digite 'stats' seguido do nome do jogador. Exemplo: stats KSCERATO";
    }

    const jogador = players.find(p => p.nome.toLowerCase() === nomeJogador); 
    if (!jogador) {
      return "❌ Esse jogador tá no banco ou não existe! Tenta outro nome aí, furioso!";
    }

    return `🔥 *${jogador.nome} - BRAVATA ESTATÍSTICA* 🔥
    💥 Rating: ${jogador.estatisticas.rating} | Kills: ${jogador.estatisticas.kills}
    🎯 Headshots: ${jogador.estatisticas.headshots} | Função: ${jogador.funcao}`;
  }

  // Calendário de jogos
  if (texto.includes("calendario") || texto.includes("jogos") || texto.includes("campeonato")) {
    if (!proximosJogos.length) return "⚠️ Nenhum jogo agendado no momento!";
    return `📅 *AGENDA DA FURIA* 📅\n${
      proximosJogos.map(jogo =>
        `⚡ *${jogo.evento}*\n🆚 ${jogo.adversario} | 🕒 ${jogo.horario || "Horário em breve"}\n📍 ${jogo.local || "Online"}\n-----------------`
      ).join("\n")
    }`;
  }

  // Nome do time
  if (texto.includes("time") || texto.includes("sobre")) {
    return `💀 *A FURIA É A FAMÍLIA MAIS BRAVA DO CS!* 💀
    👉 Jogadores: ${players.map(p => p.nome).join(", ")}
    👉 Próximo jogo: ${proximosJogos[0]?.adversario} (${proximosJogos[0]?.evento})`;
  }
  

  // Default
  return `🔫 Fala, furioso! Bora de FURIA? Quer saber sobre:
  👉 *Jogadores* (ex: 'KSCERATO')
  👉 *Estatísticas* (ex: 'stats FalleN')
  👉 *Próximos jogos* (digite 'calendario')
  👉 *Links* (digite 'redes')`;
};

export default getBotResponse; 
