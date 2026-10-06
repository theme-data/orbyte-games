# Orbyte Games — revisão do tema

Versão de 05/10/2026, baseada nos arquivos publicados e na loja demo-gametheme2.lojaintegrada.com.br.

## Instalação mais simples

1. Guarde uma cópia dos arquivos atuais (também incluídos em `backup-original`).
2. Substitua `core.js` e `styles.css` no repositório/hospedagem pelos arquivos desta pasta. São arquivos completos: não acrescente o novo core depois do antigo.
3. Mantenha o `window.THEME_CONFIG` e as cores que já estão no painel. Os nomes das configurações existentes foram preservados.
4. Depois da publicação, atualize as referências no painel para evitar o cache:

```html
<link rel="stylesheet" href="https://theme-data.github.io/orbyte-games/styles.css?v=20261005-r1">
<script src="https://theme-data.github.io/orbyte-games/core.js?v=20261005-r1"></script>
```

O bloco de configuração deve vir antes do script. jQuery e Slick são fornecidos pela Loja Integrada; não insira uma segunda cópia. O core funciona sem Slick, com apresentação estática/rolável dos blocos personalizados.

Não publiquei alterações na loja nem no GitHub: esta entrega contém os arquivos para substituição.

## Configuração em arquivos separados (opcional)

`config.js` contém a configuração extraída do painel; `personalizacao.css` contém suas cores e ajustes que estavam fora do CSS público. Você não precisa inseri-los se mantiver os blocos correspondentes no painel.

Se preferir externalizar tudo, remova somente os blocos antigos de configuração e personalização e use a seguinte ordem, com os quatro arquivos hospedados na mesma pasta:

```html
<link rel="stylesheet" href="https://theme-data.github.io/orbyte-games/personalizacao.css?v=20261005-r1">
<link rel="stylesheet" href="https://theme-data.github.io/orbyte-games/styles.css?v=20261005-r1">
<script src="https://theme-data.github.io/orbyte-games/config.js?v=20261005-r1"></script>
<script src="https://theme-data.github.io/orbyte-games/core.js?v=20261005-r1"></script>
```

O `config.js` incluído corrige os dois links `/promocoes` para `/promocao`, que é o endereço usado no menu real da loja. Se mantiver a configuração no painel, faça a mesma troca em `ofertasDestacadas.ofertas` e `bannersCategoriasHome.linkBotao`.

## O que foi alterado

- Preservação da identidade: azul-escuro, azul de destaque, base branca, DM Sans e artes atuais.
- Inicialização única após o DOM estar pronto, inclusive nos blocos que antes executavam fora do ready.
- Menu e busca preparados tanto no carregamento mobile quanto na mudança de largura; posição da busca calculada pela altura real do cabeçalho.
- Menu com botão de fechar, fundo clicável, tecla Escape, foco e estado acessível dos submenus. A categoria-pai continua clicável.
- Atalhos de jogos com link vazio ou `#` passam a usar `/buscar?q=nome-do-jogo`. Um link configurado continua tendo prioridade. A busca pode não retornar produtos quando o catálogo ainda não possui aquele título.
- Carrosséis com proteção para ausência de Slick, controles sem duplicação visual e breakpoints de produto para 5, 4, 3 e 2 itens.
- Retirada do gap no track de categorias, pois ele distorcia o cálculo de largura do Slick.
- Cards com ações sempre visíveis, espaçamento consistente e texto “Ver opções” para produtos que precisam abrir os detalhes.
- Grade de categoria/busca em quatro colunas no desktop e duas no celular.
- Filtros e ordenação em painel próprio, preservando os links e controles originais da plataforma.
- Descrição e relacionados mantidos fora da galeria de produto; zoom nativo preservado.
- Modal de pagamento com rolagem interna, fechamento pelo fundo e Escape.
- FAQ com botões de verdade, navegação por teclado e tamanho de texto estável ao abrir.
- Correção de `line-height: 0` na descrição do vídeo mobile.
- Modais de pagamento, filtros, ofertas e vídeo com gestão de foco; painéis fechados fora da navegação por teclado.
- Cupom não exibe “copiado” se o navegador recusar a operação; nesse caso mostra o código para cópia manual.
- Abertura automática de ofertas, se habilitada, acontece uma vez por sessão.
- Observação de alterações do WhatsApp restrita à primeira listagem, com agrupamento das atualizações.
- Avaliações antes da FAQ/newsletter na home; rodapé legível no mobile sem depender de acordeão.
- Remoção da posição fixa forçada do botão de finalizar no celular, que podia cobrir o conteúdo do carrinho.
- Respeito a preferência de movimento reduzido nas transições e na tarja.

## Dados comerciais preservados que precisam de revisão

A loja é demonstrativa. Não inventei números, provas sociais ou condições comerciais:

- Telefones e e-mail ainda são os exemplos da configuração original.
- A tarja anuncia 12x, enquanto os produtos observados mostram 6x. Ajuste a tarja às condições reais.
- As avaliações, fotos e o texto “Cliente verificado” já existiam na configuração. Confirme sua origem antes de usar em uma loja comercial.
- A oferta de frete grátis aponta para `/frete-gratis` e precisa de destino e condição comercial reais, ou `ativo: false`.
- Os textos de envio, prazo, licença e FAQ devem corresponder ao produto realmente vendido.
- O contador continua usando a data configurada, 31/12/2026. Ao expirar, informa o encerramento sem inutilizar o link da categoria.

## Validação realizada e limites

- Inspeção visual da versão pública da home, categoria PlayStation 4 e produto Sniper Elite 5.
- Leitura dos arquivos CSS/JS e da configuração inserida no HTML público.
- Verificação de sintaxe do JavaScript e parsing dos dois arquivos CSS.
- 13 cenários de DOM simulado: home, categoria e produto em larguras desktop/mobile, com e sem Slick, mais home sem configuração. Foram checados inicialização duplicada, menu/busca, fechamento por Escape, filtros/ordenação, modal de pagamento, FAQ, ofertas, falha de cópia de cupom e posição do conteúdo do produto.

Esses testes não substituem renderização real. O navegador disponível bloqueou a prévia local; portanto, o layout revisado ainda não foi conferido visualmente em um navegador real. Não foram realizados login, envio de formulários, compra nem pagamento. Também não foi feita uma auditoria de todas as páginas de conteúdo e estados privados da conta/checkout.

Antes de considerar a publicação final, confira na loja de demonstração:

- 360, 390, 768, 1024 e 1440 px: cabeçalho, cards e ausência de rolagem horizontal.
- Abrir/fechar menu e busca; abrir subcategoria; girar a tela.
- Avançar as vitrines, abrir filtro e seguir uma ordenação.
- Selecionar licença/variante e confirmar a atualização nativa do preço e parcelamento.
- Abrir pagamento, ofertas e vídeo, fechar com Escape e verificar a volta do foco.
- Carrinho com produto, cupom, newsletter, login e checkout, mantendo os fluxos nativos.

Para reverter, restaure os dois arquivos de `backup-original` e atualize a versão nas URLs.
