export function gerarCodigoPedido(prefixo) {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alfanumericos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
    // Função auxiliar para sortear os caracteres
    const gerarStringAleatoria = (caracteres, tamanho) => {
      let resultado = '';
      for (let i = 0; i < tamanho; i++) {
        const indiceSorteado = Math.floor(Math.random() * caracteres.length);
        resultado += caracteres.charAt(indiceSorteado);
      }
      return resultado;
    };
  
    // Se nenhum prefixo for passado, gera 3 letras aleatórias
    const parte1 = prefixo ? prefixo : gerarStringAleatoria(letras, 3);
    
    // Gera 6 caracteres alfanuméricos para a segunda parte
    const parte2 = gerarStringAleatoria(alfanumericos, 6);
  
    // Retorna o código formatado
    return `${parte1}-${parte2}`;
}

