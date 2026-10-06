/* Orbyte Games — revisão 2026-10-05. Mantém window.THEME_CONFIG. */
(function ($) {
'use strict';
if (!$) { console.error('Orbyte: carregue jQuery antes de core.js.'); return; }
$(function () {
if (window.__orbyteInitialized) return;
window.__orbyteInitialized = true;


  const CONFIG = window.THEME_CONFIG || {};

  // Ajustes gerais  
  $('#cabecalho .span8.busca-mobile').after(`
      <div class="h-actions hidden-phone">
          <a href="/conta/login" class="h-user">
              <span>Entrar</span>
          </a>
      </div>
  `);
  
  $('#cabecalho .conteudo-topo .inferior').after(`
      <div class="h-actions visible-phone">
          <a href="/conta/login" class="h-user">
              <img src="https://cdn.awsli.com.br/2942/2942234/arquivos/user.svg" alt="Minha conta">
              <span>Entrar</span>
          </a>
  
          <button type="button" class="h-search visible-phone" aria-label="Buscar produtos" aria-expanded="false">
              <img src="https://cdn.awsli.com.br/2942/2942234/arquivos/search.svg" alt="">
          </button>
  
          <button type="button" class="h-menu visible-phone" aria-label="Abrir menu" aria-expanded="false">
              <img src="https://cdn.awsli.com.br/2942/2942234/arquivos/menu.svg" alt="">
          </button>
      </div>
  `);
  
  $('.banner.cheio .flex-direction-nav').prepend($('.banner.cheio .flex-control-nav'));
  
  // $('.selos li:first-child img').attr('src','https://cdn.awsli.com.br/2830/2830294/arquivos/site-protegido.svg');
  $('#rodape>div:last-child .conteiner .row-fluid div:not(.span12)').before(`<div class="feito-pixelset"><a href="https://www.pixelset.com.br/" class="pixel-logo" target="_blank"><img src="https://cdn.awsli.com.br/2942/2942234/arquivos/pixel-set.svg" alt="Pixelset"></a></div>`)
  $('#rodape>div:last-child .row-fluid > div:last-child').attr('style','')
  

  var whatsappNumbers = CONFIG.whatsappNumbers || [];
  
  var whatsappDropdownHtml = `
  <div class="whatsapp-dropdown">
      <button class="whatsapp-btn" type="button">
          <i class="fa fa-whatsapp"></i> Fale conosco pelo WhatsApp
      </button>
      <ul class="whatsapp-dropdown-menu" style="display: none;">
          ${whatsappNumbers.map(function(num) {
              return `<li>
                          <strong>${num.title}:</strong> <a href="https://wa.me/${num.phone}" target="_blank">${num.display}</a>
                      </li>`;
          }).join('')}
      </ul>
  </div>
  `;

  if (whatsappNumbers.length) $('#rodape .institucional .lista-redes').after(whatsappDropdownHtml);

  $(function () {

    function updateHeaderOnScroll() {
        const $inferior = $('.conteudo-topo .inferior');

        if ($(window).width() <= 767) {

            if ($(window).scrollTop() > 10) {
                $inferior.addClass('scrolled');
            } else {
                $inferior.removeClass('scrolled');
            }

        } else {
            $inferior.removeClass('scrolled');
        }
    }

    $(window).on('scroll resize', updateHeaderOnScroll);

    updateHeaderOnScroll();

});

$(function () {

  function prepararSubmenus() {

      $('.nivel-um > li.com-filho').each(function () {

          const $item = $(this);

          // Evita duplicar o botão
          if (!$item.children('.toggle-submenu').length) {

              $item.append(`
                  <button 
                      type="button" 
                      class="toggle-submenu"
                      aria-label="Abrir submenu"
                  >
                      <span></span>
                  </button>
              `);

          }

          // Mobile começa fechado
          if ($(window).width() <= 767) {
              $item.children('ul').hide();
              $item.removeClass('menu-aberto');
          }

      });

  }


  // Clique SOMENTE na seta
  $(document).on('click', '.nivel-um > li.com-filho > .toggle-submenu', function (e) {

      e.preventDefault();
      e.stopPropagation();

      if ($(window).width() > 767) {
          return;
      }

      const $item = $(this).closest('li.com-filho');
      const $submenu = $item.children('ul').first();

      if ($item.hasClass('menu-aberto')) {

          $item.removeClass('menu-aberto');
          $(this).attr('aria-expanded', 'false');

          $submenu
              .stop(true, true)
              .slideUp(250);

      } else {

          // Fecha os outros
          $('.nivel-um > li.com-filho.menu-aberto')
              .not($item)
              .removeClass('menu-aberto')
              .children('ul')
              .stop(true, true)
              .slideUp(250);

          // Abre atual
          $item.addClass('menu-aberto');
          $('.toggle-submenu').attr('aria-expanded', 'false');
          $(this).attr('aria-expanded', 'true');

          $submenu
              .stop(true, true)
              .slideDown(250);

      }

  });


  prepararSubmenus();


  $(window).on('resize', function () {

      if ($(window).width() > 767) {

          $('.nivel-um > li.com-filho')
              .removeClass('menu-aberto')
              .children('ul')
              .removeAttr('style');

      }

  });

});
  
  // Quando clicar no botão troca a classe do dropdown para abrir/fechar
  $(document).on('click', '.whatsapp-btn', function() {
      var $dropdown = $(this).closest('.whatsapp-dropdown');
      $dropdown.toggleClass('open');
      var $menu = $dropdown.find('.whatsapp-dropdown-menu');
      if ($dropdown.hasClass('open')) {
          $menu.slideDown(150);
      } else {
          $menu.slideUp(150);
      }
  });
  

  if (CONFIG.miniBannerPosicao) {
    $('.pagina-inicial .vitrine-' + CONFIG.miniBannerPosicao + ' + ul')
      .after($('.mini-banner'));
  }

  
  // Variáveis editáveis para as informações do atendimento
  const atendimento = CONFIG.atendimento || {};
  
  var atendimentoHtml = `
      <div class="span4 atendimento-rodape">
          <span class="titulo">${atendimento.titulo}</span>
          <ul>
              <li>${atendimento.horarios?.[0] || ''}</li>
              <li>${atendimento.horarios?.[1] || ''}</li>
              <li>${atendimento.horarios?.[2] || ''}</li>
              <li style="margin-top:10px;">
                  <img src="${atendimento.whatsapp?.icon || ''}" alt="${atendimento.whatsapp?.alt || ''}" style="vertical-align:middle; width:20px; margin-right:8px;">
                  ${atendimento.whatsapp?.number || ''}
              </li>
              <li style="margin-top:5px;">
                  <img src="${atendimento.email?.icon || ''}" alt="${atendimento.email?.alt || ''}" style="vertical-align:middle; width:20px; margin-right:8px;">
                  <a href="mailto:${atendimento.email?.address || ''}" style="color:inherit; text-decoration:none;">${atendimento.email?.address || ''}</a>
              </li>
          </ul>
      </div>
  `;
  
  if (atendimento.titulo) $('#rodape .sobre-loja-rodape').replaceWith(atendimentoHtml);
  
  // Defina as variáveis das categorias (imagem, link, alt e titulo)
  var categorias = CONFIG.categorias || [];
  
  // Montar os <li> dinamicamente usando as variáveis (inclui <span> com o título abaixo da imagem)
  var categoriaLis = categorias.map(function(c){
      return `<li class="c-item">
          <a href="${c.link && c.link !== '#' ? c.link : '/buscar?q=' + encodeURIComponent(c.titulo || '')}">
              <img src="${c.img}" alt="${c.alt}">
              <span class="c-titulo-categoria">${c.titulo}</span>
          </a>
      </li>`;
  }).join('');
  
  // Adiciona o bloco antes de #listagemProdutos
  if (categorias.length) $('.pagina-inicial .secao-banners').first().before(`
  <div class="c-slide-section">
      <ul class="c-slide">
          ${categoriaLis}
      </ul>
  </div>    
  `);

  /* =========================
    TEMA DO CABEÇALHO
  ========================== */
  (function () {
    var temaCabecalho = (
      window.THEME_CONFIG &&
      window.THEME_CONFIG.temaCabecalho
    ) || 'light';

    temaCabecalho = String(temaCabecalho).toLowerCase();

    if (temaCabecalho !== 'dark' && temaCabecalho !== 'light') {
      temaCabecalho = 'light';
    }

    $('body')
      .removeClass('tema-cabecalho-dark tema-cabecalho-light')
      .addClass('tema-cabecalho-' + temaCabecalho);
  })();
  
  // Ativa o Slick Slider na lista de categorias
  if ($.fn.slick) $('.c-slide').slick({
      slidesToShow: 9,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      infinite: false,
      responsive: [
          {
              breakpoint: 768,
              settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
              }
          }
      ]
  });
  
/* Banner opcional acima de uma vitrine/categoria da home */
(function () {
  var bannersCategoriasHome = CONFIG.bannersCategoriasHome || [];

  function escaparHtml(valor) {
    return String(valor || '').replace(/[&<>'"]/g, function (caractere) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#039;',
        '"': '&quot;'
      }[caractere];
    });
  }

  function formatarTempo(totalSegundos) {
    var dias = Math.floor(totalSegundos / 86400);
    var horas = Math.floor((totalSegundos % 86400) / 3600);
    var minutos = Math.floor((totalSegundos % 3600) / 60);
    var segundos = totalSegundos % 60;

    return [dias, horas, minutos, segundos]
      .map(function (valor) {
        return String(valor).padStart(2, '0');
      })
      .join(' : ');
  }

  bannersCategoriasHome.forEach(function (banner) {
    if (!banner || !banner.ativo || !banner.idCategoria) return;

    var $vitrine = $('.pagina-inicial .vitrine-' + banner.idCategoria).first();

    if (!$vitrine.length || $('#banner-categoria-' + banner.idCategoria).length) {
      return;
    }

    var contadorHtml = banner.usarContador
      ? '<div class="banner-categoria-contador" data-data-fim="' +
        escaparHtml(banner.dataFim) +
        '">00 : 00 : 00 : 00</div>'
      : '';

    $vitrine.before([
      '<section class="banner-categoria-home" id="banner-categoria-' +
        escaparHtml(banner.idCategoria) + '">',
        '<div class="banner-categoria-conteudo">',
          '<strong class="banner-categoria-etiqueta">' +
            escaparHtml(banner.etiqueta) +
          '</strong>',
          contadorHtml,
          '<p class="banner-categoria-texto">' +
            escaparHtml(banner.titulo || banner.texto) +
          '</p>',
          '<a class="banner-categoria-botao" href="' +
            escaparHtml(banner.linkBotao || '#') +
          '">' +
            escaparHtml(banner.textoBotao || 'VER OFERTAS') +
          '</a>',
        '</div>',
      '</section>'
    ].join(''));
    
    /* Quando o contador estiver ativo:
        - remove o título da categoria;
        - adiciona classes na UL da vitrine. */
    if (banner.usarContador) {
      $vitrine
        .next('ul')
        .addClass('vitrine-com-banner-contador')
        .addClass('vitrine-categoria-' + banner.idCategoria);
    
      $vitrine.remove();
    }
  });

  function atualizarContadoresCategoria() {
    $('.banner-categoria-contador').each(function () {
      var $contador = $(this);
      var dataFim = new Date($contador.attr('data-data-fim')).getTime();
      var diferenca = Math.max(
        0,
        Math.floor((dataFim - Date.now()) / 1000)
      );

      if (!dataFim || diferenca <= 0) {
        $contador
          .closest('.banner-categoria-home')
          .addClass('banner-categoria-encerrado');

        $contador.text('OFERTA ENCERRADA').attr('role', 'status');
        return;
      }

      $contador.text(formatarTempo(diferenca));
    });
  }

  if ($('.banner-categoria-contador').length) {
    atualizarContadoresCategoria();
    setInterval(atualizarContadoresCategoria, 1000);
  }
})();

// Carrossel de produtos
if ($.fn.slick) $('#listagemProdutos .listagem-linha .flex-viewport').css({
  overflow: 'visible'
});

if ($.fn.slick) $('#listagemProdutos .listagem-linha.flexslider').removeClass('flexslider');

if (typeof $.fn.slick === 'function') {
  $('#listagemProdutos ul .flex-viewport > ul').each(function () {
    const $slider = $(this);

    // Evita inicializar a mesma vitrine duas vezes
    if ($slider.hasClass('slick-initialized')) return;

    $slider.removeAttr('style');
    $slider.children('li').removeAttr('style');

    $slider.slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [{ breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 1 } },
        { breakpoint: 980, settings: { slidesToShow: 3, slidesToScroll: 1 } }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true
        }
      }]
    });
  });
}
  
  
  if ($('.pagina-produto .parcelas-produto').length) {
    $('.info-principal-produto').first().after('<button type="button" class="btn-forma-pagamento" aria-haspopup="dialog">Formas de pagamento</button>');
    $('body').append('<div id="modal-pagamento" aria-hidden="true"><div class="modal-conteudo" role="dialog" aria-modal="true" aria-labelledby="orbyte-pagamento-titulo" tabindex="-1"><div class="modal-header"><h3 id="orbyte-pagamento-titulo">Formas de pagamento</h3><button type="button" class="fechar-modal" aria-label="Fechar formas de pagamento">×</button></div></div></div>');
    $('.parcelas-produto').appendTo('#modal-pagamento .modal-conteudo');
    $(document).on('click', '.btn-forma-pagamento', function () {
      $('#modal-pagamento').addClass('ativo').attr('aria-hidden', 'false');
      $('body').addClass('orbyte-dialog-open');
    }).on('click', '#modal-pagamento, .fechar-modal', function (event) {
      if (event.target === this) closePayment();
    });
  }
  function closePayment() {
    $('#modal-pagamento').removeClass('ativo').attr('aria-hidden', 'true');
    $('body').removeClass('orbyte-dialog-open');
  }

  // Preserva o zoom nativo da imagem.
  
  $('.pagina-categoria .conteudo > .titulo').prepend($('.pagina-categoria .breadcrumbs'));
    $('.ordenar-listagem.topo > .row-fluid').prepend($('.pagina-categoria .conteudo > .titulo'));
    $('.ordenar-listagem .row-fluid > .span6').removeClass('span6');
    
    
  if ($('.ordenar-listagem.topo').length) {
    $('.ordenar-listagem.topo .row-fluid').first().append('<button type="button" class="btn btn-filtrar" aria-haspopup="dialog">Filtrar e ordenar</button>');
    $('body').append('<div id="modalFiltros" class="orbyte-filter-modal" aria-hidden="true"><div class="orbyte-filter-panel" role="dialog" aria-modal="true" aria-labelledby="orbyte-filter-title" tabindex="-1"><div class="modal-header"><h2 id="orbyte-filter-title">Filtrar e ordenar</h2><button type="button" class="orbyte-filter-close" aria-label="Fechar filtros">×</button></div><div class="modal-body"><div class="modal-ordenar"><h3>Ordenar por</h3></div><div class="modal-filtros"></div></div><button type="button" class="botao orbyte-filter-close">Ver produtos</button></div></div>');
    $('.ordenar-listagem.topo .dropdown-menu').first().appendTo('#modalFiltros .modal-ordenar');
    $('.ordenar-listagem.topo .dropdown').hide();
    $('.filtro-coluna').appendTo('#modalFiltros .modal-filtros');
    $(document).on('click', '.btn-filtrar', function () {
      $('#modalFiltros').addClass('ativo').attr('aria-hidden', 'false');
      $('body').addClass('orbyte-dialog-open');
    }).on('click', '#modalFiltros, .orbyte-filter-close', function (event) {
      if (event.target === this) closeFilters();
    });
  }
  function closeFilters() {
    $('#modalFiltros').removeClass('ativo').attr('aria-hidden', 'true');
    $('body').removeClass('orbyte-dialog-open');
  }

  /* =========================
   📢 MOVER BANNER PARA VITRINE (CONFIGURÁVEL)
==========================*/

if (CONFIG.bannerVitrine) {

  const vitrineSelector = `.pagina-inicial .vitrine-${CONFIG.bannerVitrine}`;

  $(vitrineSelector)
    .before($('.secao-banners .conteiner .banner.hidden-phone'));

}

  $('#barraNewsletter .componente .texto-newsletter').prepend($('#barraNewsletter .componente .titulo'));

  
  // FAQ
  
  $(function () {
  
      /* =========================
         📋 PERGUNTAS EDITÁVEIS
      ==========================*/
      const faqItems = CONFIG.faqItems || [];
      if (!faqItems.length) return;
    
    
      /* =========================
         🧱 MONTA HTML
      ==========================*/
      let faqHTML = `
        <section class="faq-section">
          <div class="faq-container">
            <h2>FAQ</h2>
            <p class="faq-subtitle">Dúvidas frequentes</p>
            <div class="faq-list">
      `;
    
      faqItems.forEach((item, index) => {
    
        faqHTML += `
          <div class="faq-item ${item.ativo ? 'active' : ''}">
            <button type="button" class="faq-pergunta" aria-expanded="${!!item.ativo}" aria-controls="orbyte-faq-${index}">
              <span>${item.pergunta}</span>
              <span class="faq-icon" aria-hidden="true">${item.ativo ? '−' : '+'}</span>
            </button>
    
            <div id="orbyte-faq-${index}" class="faq-resposta" style="${item.ativo ? 'display:block' : 'display:none'}">
              ${item.resposta}
            </div>
          </div>
        `;
      });
    
      faqHTML += `
            </div>
          </div>
        </section>
      `;
    
    
      /* =========================
         📍 INSERE NA HOME
      ==========================*/
      $('body.pagina-inicial #corpo, body.pagina-produto #corpo').after(faqHTML);
    
    
      /* =========================
         🎯 COMPORTAMENTO ACCORDION
      ==========================*/
      $(document).on('click', '.faq-pergunta', function () {
    
        const item = $(this).closest('.faq-item');
    
        // fecha outros
        $('.faq-item').not(item).removeClass('active')
          .find('.faq-resposta').stop(true, true).slideUp(200);
    
        $('.faq-item').not(item)
          .find('.faq-icon').text('+');
    
        // toggle atual
        item.toggleClass('active');
        $('.faq-pergunta').attr('aria-expanded', 'false');
        item.find('.faq-pergunta').attr('aria-expanded', String(item.hasClass('active')));
    
        item.find('.faq-resposta').stop(true, true).slideToggle(200);
    
        item.find('.faq-icon').text(
          item.hasClass('active') ? '−' : '+'
        );
    
      });
    
    });
    
  
    // Remove texto da bandeira
  
    $(function () {
  
      $('.bandeiras-produto .bandeira-promocao').each(function () {
    
        let texto = $(this).text();
    
        // remove a palavra "Desconto"
        texto = texto.replace(/desconto/i, '').trim();
    
        // pega apenas o número
        let numero = (texto.match(/\d+(?:[.,]\d+)?/) || [''])[0];
        if (!numero) return;
    
        // monta novo formato
        $(this).text(`-${numero}%`);
    
      });
    
    });

    $('.pagina-busca .ordenar-listagem.topo').prepend($('.pagina-busca .listagem > .titulo'));
  
  if ($(window).width() >= 768) {
  //Desktop
      //$('.conteudo-topo .inferior').prepend($('.menu.superior'));
  
      // Descrição e relacionados preservados fora da galeria nativa.
  
      // Muda resolução das imagens
  
      $('.listagem .imagem-produto img').each(function () {
          var $img = $(this);
          var src = $img.attr('src');
  
          if (!src) return;
  
          // Troca 300x300 por 512x512
          var newSrc = src.replace('/300x300/', '/512x512/');
  
          // Só atualiza se realmente mudou
          if (newSrc !== src) {
          $img.attr('src', newSrc);
  
          // Se existir lazyload com data-src, atualiza também
          if ($img.attr('data-src')) {
              $img.attr('data-src', newSrc);
          }
          }
      });
      
      
      $('.mini-banner img').each(function () {
          var $img = $(this);
          var src = $img.attr('src');
  
          if (!src) return;
  
          // Troca 400x400 por 800x800
          var newSrc = src.replace('/400x400/', '/800x800/');
  
          if (newSrc !== src) {
          $img.attr('src', newSrc);
  
          // Se houver lazyload com data-src
          if ($img.attr('data-src')) {
              $img.attr('data-src', newSrc);
          }
          }
      });
  
      $('.pagina-produto .miniaturas img').each(function () {
  
          var $img = $(this);
          var src = $img.attr('src');
      
          if (!src) return;
      
          // troca SOMENTE 64x50 por 100x100
          var newSrc = src.replace('/64x50/', '/100x100/');
      
          if (newSrc !== src) {
      
              // src principal
              $img.attr('src', newSrc);
      
              // lazy load (se existir)
              if ($img.attr('data-src')) {
                  $img.attr('data-src', newSrc);
              }
      
              // atributos usados pela Loja Integrada
              if ($img.attr('data-mediumimg')) {
                  $img.attr(
                      'data-mediumimg',
                      $img.attr('data-mediumimg').replace('/64x50/', '/100x100/')
                  );
              }
      
              if ($img.attr('data-largeimg')) {
                  $img.attr(
                      'data-largeimg',
                      $img.attr('data-largeimg').replace('/64x50/', '/100x100/')
                  );
              }
          }
      
      });
  
      $(window).on('load', function () {
  
          $('.compre-junto__imagem img').each(function () {
      
              var $img = $(this);
              var src = $img.attr('src');
              if (!src) return;
      
              var newSrc = src.replace('/150x150/', '/300x300/');
      
              if (newSrc !== src) {
                  $img.attr('src', newSrc);
      
                  if ($img.attr('data-src')) {
                      $img.attr('data-src', newSrc);
                  }
              }
          });
      
      });
      
  
  //Fim desktop
  } else {
  // Menu, busca e rodapé inicializados para qualquer largura abaixo.
  //Fim mobile
  }

  var tarja = CONFIG.tarja || [];

  var tarjaItems = tarja.map(function(t){
    return `
      <div class="t-item">
        <div class="tarja-img">
          <img src="${t.icon}" alt="${t.titulo}">
        </div>
        <div class="t-text">
          <strong>${t.titulo}</strong>
          <span>${t.texto}</span>
        </div>
      </div>
    `;
  }).join('');

  if (tarja.length) $('.pagina-inicial .secao-banners').first().after(`
    <div class="t-bar">
      <div class="t-slide">
        ${tarjaItems}
      </div>
    </div>
  `);

  if ($.fn.slick) $('.t-slide').slick({
    slidesToShow: 4,
    arrows: false,
    infinite: true,
    autoplay: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    autoplaySpeed: 4500,
    speed: 450,
    cssEase: 'linear',
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  // MOVE TARJA


  var vitrineTarja = CONFIG.vitrineTarja || {};

  if (vitrineTarja.idVitrine) {
    $(`.pagina-inicial .vitrine-${vitrineTarja.idVitrine}`)
      .before($('.banner.tarja'));
  }

  //ALERTA DIGITAL 

  if (typeof CONFIG === "undefined") return;

  var conf = CONFIG.alertaProduto || {};
  var icon = conf.icon || "";
  var texto = conf.texto || "";

  var $target = $('.pagina-produto .produto .cep');

  if ($target.length && !$('.alert-envio-digital').length) {
    $target.before(`
      <div class="alert-envio-digital">
        ${icon ? `<i><img src="${icon}" alt=""></i>` : ``}
        ${texto}
      </div>
    `);
  }

  var textoAlertBar = CONFIG.alertBar || {};

  if (textoAlertBar.mensagem) {
    $('.barra-inicial')
      .replaceWith(`
        <div class="alert-bar">
          <span>${textoAlertBar.mensagem}</span>
        </div>
      `);
  }

  /* ======================================================
      VITRINE DESTAQUE
    ====================================================== */
    var vitrineDestaque = CONFIG.vitrineDestaque || {};
    var id = vitrineDestaque.idVitrine;

    if (id) {
      var $tituloVitrine = $('.pagina-inicial .vitrine-' + id).first();
      var $listaVitrine = $tituloVitrine.next('ul');

      function converterPreco(texto) {
        if (!texto) return 0;

        var valor = String(texto)
          .replace(/[^\d,]/g, '')
          .replace(',', '.');

        return parseFloat(valor) || 0;
      }

      function obterDesconto($produto) {
        var precoAntigo = converterPreco(
          $produto.find(
            '.preco-produto .preco-antigo, .preco-produto del, .preco-produto .preco-base'
          ).first().text()
        );

        var precoAtual = converterPreco(
          $produto.find(
            '.preco-produto strong.titulo, .preco-produto .preco-promocional'
          ).last().text()
        );

        if (precoAntigo > precoAtual && precoAtual > 0) {
          return Math.round((1 - precoAtual / precoAntigo) * 100);
        }

        return 0;
      }

      if ($listaVitrine.length) {
        $listaVitrine.addClass('vitrine-destaque-produtos');

        $listaVitrine.find('.listagem-item').each(function () {
          var $produto = $(this);

          if ($produto.hasClass('vitrine-destaque-pronto')) return;

          $produto.addClass('vitrine-destaque-pronto');

          var $imagem = $produto.find('.imagem-produto').first();
          var $nome = $produto.find('a.nome-produto, .nome-produto a').first();
          var linkProduto =
            $nome.attr('href') ||
            $produto.find('a').first().attr('href') ||
            '#';

          var percentualDesconto = vitrineDestaque.mostrarDesconto !== false
            ? obterDesconto($produto)
            : 0;

          var textoSelo = percentualDesconto > 0
            ? '-' + percentualDesconto + '% OFF'
            : (vitrineDestaque.seloPadrao || 'OFERTA EM DESTAQUE');

          if ($imagem.length && !$imagem.find('.vitrine-destaque-selo').length) {
            $imagem.append(
              '<span class="vitrine-destaque-selo">' + textoSelo + '</span>'
            );
          }

          if (!$produto.find('.vitrine-destaque-cta').length) {
            $produto.find('.info-produto').append(
              '<a class="vitrine-destaque-cta" href="' + linkProduto + '">' +
                (vitrineDestaque.textoBotao || 'VER OFERTA') +
                '<span>→</span>' +
              '</a>'
            );
          }
        });
      }
    }

  

/* =========================
  OFERTAS DESTACADAS
========================== */
(function () {
  var configOfertas = (window.THEME_CONFIG && window.THEME_CONFIG.ofertasDestacadas) || {};

  if (!configOfertas.ativo) return;

  var ofertas = (configOfertas.ofertas || []).filter(function (oferta) {
    return oferta && oferta.ativo;
  });

  if (!ofertas.length || $('#ofertas-destacadas').length) return;

  function escaparHtml(valor) {
    return String(valor || '').replace(/[&<>"']/g, function (caractere) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[caractere];
    });
  }

  function iconeTag() {
    return [
      '<svg viewBox="0 0 24 24" aria-hidden="true">',
        '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3.4 13.4a2 2 0 0 1-.6-1.4V5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.4.6l7.4 7a2 2 0 0 1 0 2.8Z"></path>',
        '<circle cx="7.5" cy="7.5" r="1.1"></circle>',
      '</svg>'
    ].join('');
  }

  var ofertasHtml = ofertas.map(function (oferta, indice) {
    var tipo = oferta.tipo || 'link';
    var botao;

    if (tipo === 'cupom') {
      botao = [
        '<button type="button" class="oferta-destaque-botao js-copiar-cupom" ',
          'data-cupom="', escaparHtml(oferta.cupom), '">',
          escaparHtml(oferta.textoBotao || 'COPIAR'),
        '</button>'
      ].join('');
    } else {
      botao = [
        '<a class="oferta-destaque-botao" href="', escaparHtml(oferta.link || '#'), '">',
          escaparHtml(oferta.textoBotao || 'VER OFERTAS'),
        '</a>'
      ].join('');
    }

    return [
      '<article class="oferta-destaque-item" data-oferta="', indice, '">',
        '<div class="oferta-destaque-icone">', iconeTag(), '</div>',
        '<div class="oferta-destaque-textos">',
          '<strong>', escaparHtml(oferta.titulo), '</strong>',
          '<span>', escaparHtml(oferta.descricao), '</span>',
        '</div>',
        botao,
      '</article>'
    ].join('');
  }).join('');

  var html = [
    '<div id="ofertas-destacadas" class="ofertas-destacadas">',
      '<button type="button" class="ofertas-destacadas-aba" aria-label="Abrir ofertas especiais">',
        '<span class="ofertas-destacadas-aba-icone">', iconeTag(), '</span>',
        '<span>', escaparHtml(configOfertas.tituloAba || 'Ofertas para você'), '</span>',
      '</button>',

      '<div class="ofertas-destacadas-overlay"></div>',

      '<aside class="ofertas-destacadas-painel" aria-hidden="true">',
        '<header class="ofertas-destacadas-header">',
          '<h2>', escaparHtml(configOfertas.tituloPainel || 'Ofertas especiais'), '</h2>',
          '<button type="button" class="ofertas-destacadas-fechar" aria-label="Fechar ofertas">×</button>',
        '</header>',

        '<div class="ofertas-destacadas-lista">',
          ofertasHtml || '<p class="ofertas-destacadas-vazio">' +
            escaparHtml(configOfertas.textoVazio || 'Nenhuma oferta disponível no momento.') +
          '</p>',
        '</div>',
      '</aside>',
    '</div>'
  ].join('');

  $('body').append(html);

  var $container = $('#ofertas-destacadas');

  function abrirOfertas() {
    $container.addClass('ofertas-abertas');
    $container.find('.ofertas-destacadas-painel').attr('aria-hidden', 'false');
    $('body').addClass('ofertas-destacadas-abertas');
  }

  function fecharOfertas() {
    $container.removeClass('ofertas-abertas');
    $container.find('.ofertas-destacadas-painel').attr('aria-hidden', 'true');
    $('body').removeClass('ofertas-destacadas-abertas');
  }

  $container.on('click', '.ofertas-destacadas-aba', abrirOfertas);
  $container.on('click', '.ofertas-destacadas-fechar, .ofertas-destacadas-overlay', fecharOfertas);

  $(document).on('keydown', function (evento) {
    if (evento.key === 'Escape') fecharOfertas();
  });

  $container.on('click', '.js-copiar-cupom', function () {
    var $botao = $(this);
    var cupom = $botao.attr('data-cupom') || '';
    var textoOriginal = $botao.text();

    function feedback() {
      $botao.text('COPIADO!');
      setTimeout(function () {
        $botao.text(textoOriginal);
      }, 1800);
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(cupom).then(feedback).catch(function () {
        $botao.text('Cupom: ' + cupom).attr('aria-live', 'polite');
      });
      return;
    }

    var campo = document.createElement('textarea');
    campo.value = cupom;
    campo.style.position = 'fixed';
    campo.style.opacity = '0';
    document.body.appendChild(campo);
    campo.select();
    var copied = false;
    try { copied = document.execCommand('copy'); } catch (_) {}
    document.body.removeChild(campo);
    if (copied) feedback();
    else $botao.text('Cupom: ' + cupom).attr('aria-live', 'polite');
  });

  if (configOfertas.abrirAutomaticamente) {
    try {
      if (!sessionStorage.getItem('orbyte-offers-seen')) {
        sessionStorage.setItem('orbyte-offers-seen', '1');
        setTimeout(abrirOfertas, 800);
      }
    } catch (_) { /* Armazenamento indisponível: abertura manual. */ }
  }
})();

/* =========================
  BOTÃO WHATSAPP — LISTAGEM
========================== */
(function () {
  var configWhatsapp = (
    window.THEME_CONFIG &&
    window.THEME_CONFIG.whatsappListagem
  ) || {};

  if (!configWhatsapp.ativo || !configWhatsapp.telefone) return;

  function obterNomeProduto($produto) {
    return (
      $produto.find('.nome-produto').first().text() ||
      $produto.find('.produto-nome').first().text() ||
      $produto.find('a[data-produto-id]').first().attr('title') ||
      $produto.find('img').first().attr('alt') ||
      'Produto da loja'
    ).trim();
  }

  function obterLinkProduto($produto) {
    var link = (
      $produto.find('a.nome-produto, .nome-produto a').first().attr('href') ||
      $produto.find('.produto-nome a').first().attr('href') ||
      $produto.find('a[href*="/produto/"]').first().attr('href') ||
      $produto.find('a').first().attr('href') ||
      ''
    );

    if (link && link.indexOf('http') !== 0) {
      try { link = new URL(link, window.location.href).href; } catch (_) { return window.location.href; }
    }

    return link || window.location.href;
  }

  function criarBotaoWhatsapp($produto) {
    if ($produto.find('.botao-comprar-whatsapp').length) return;

    var nomeProduto = obterNomeProduto($produto);
    var linkProduto = obterLinkProduto($produto);

    var mensagem = String(
      configWhatsapp.mensagem ||
      'Olá! Tenho interesse neste produto:\n\n{produto}\n{link}'
    )
      .replace(/\{produto\}/gi, nomeProduto)
      .replace(/\{link\}/gi, linkProduto);

    var urlWhatsapp =
      'https://wa.me/' +
      String(configWhatsapp.telefone).replace(/\D/g, '') +
      '?text=' +
      encodeURIComponent(mensagem);

    var target = configWhatsapp.novaAba !== false
      ? ' target="_blank" rel="noopener noreferrer"'
      : '';

    var html = [
      '<a class="botao-comprar-whatsapp" href="', urlWhatsapp, '"', target, '>',
        '<img src="https://cdn.awsli.com.br/2942/2942234/arquivos/whatsapp.png" alt="Whatsapp"/>',
        '<span>', configWhatsapp.textoBotao || 'COMPRE PELO WHATSAPP', '</span>',
      '</a>'
    ].join('');

    /* Insere abaixo do botão de comprar de cada produto */
    var $acoes = $produto.find('.acoes-produto').first();

    if ($acoes.length) {
      $acoes.append(html);
    } else {
      $produto.find('.produto-info, .info-produto').first().append(html);
    }
  }

  function adicionarBotoesWhatsapp() {
    $('.listagem .listagem-item, .vitrine .listagem-item').each(function () {
      criarBotaoWhatsapp($(this));
    });
  }

  adicionarBotoesWhatsapp();

  var scheduled = false;
  var observer = new MutationObserver(function () {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () { scheduled = false; adicionarBotoesWhatsapp(); });
  });

  var listRoot = document.querySelector('.listagem');
  if (listRoot) observer.observe(listRoot, {
    childList: true,
    subtree: true
  });
})();

/* ======================================================
   AVALIAÇÕES — HOME | Slick Carousel
====================================================== */
(function () {
  var config = (
    window.THEME_CONFIG &&
    window.THEME_CONFIG.avaliacoesHome
  ) || {};

  if (!config.ativo || $('#avaliacoes-home').length) return;

  /* Exibe apenas na home, salvo se somenteHome for false */
  if (
    config.somenteHome !== false &&
    !$('body').hasClass('pagina-inicial') &&
    !$('.pagina-inicial').length
  ) {
    return;
  }

  function escaparHtml(valor) {
    return String(valor || '').replace(/[&<>"']/g, function (caractere) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[caractere];
    });
  }

  function criarEstrelas(nota) {
    var parsed = parseFloat(nota);
    var notaFinal = Math.min(5, Math.max(0, isNaN(parsed) ? 5 : parsed));
    var html = '';

    for (var i = 1; i <= 5; i++) {
      var classe = i <= Math.ceil(notaFinal)
        ? 'avaliacoes-home-estrela ativa'
        : 'avaliacoes-home-estrela';

      html += [
        '<svg class="', classe, '" viewBox="0 0 24 24" aria-hidden="true">',
          '<path d="m12 2.5 2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.57l-5.91 3.1 1.13-6.57-4.77-4.65 6.6-.96L12 2.5Z"></path>',
        '</svg>'
      ].join('');
    }

    return html;
  }

  var reviews = (config.reviews || []).filter(function (review) {
    return review && review.ativo;
  });

  if (!reviews.length) return;

  var cardsHtml = reviews.map(function (review) {
    var nome = review.nome || 'Cliente';
    var inicial = nome.charAt(0).toUpperCase();

    var fotoHtml = review.foto
      ? '<img src="' + escaparHtml(review.foto) + '" alt="' + escaparHtml(nome) + '" loading="lazy">'
      : '<span>' + escaparHtml(inicial) + '</span>';

    return [
      '<article class="avaliacoes-home-card">',
        '<div class="avaliacoes-home-nota">',
          '<div class="avaliacoes-home-estrelas">',
            criarEstrelas(review.nota),
          '</div>',
          '<span>', escaparHtml(review.nota || 5), ' / 5</span>',
        '</div>',

        '<p class="avaliacoes-home-texto">“',
          escaparHtml(review.texto),
        '”</p>',

        '<footer class="avaliacoes-home-cliente">',
          '<div class="avaliacoes-home-foto">',
            fotoHtml,
          '</div>',
          '<div class="avaliacoes-home-cliente-info">',
            '<strong>', escaparHtml(nome), '</strong>',
            review.cargo
              ? '<span>' + escaparHtml(review.cargo) + '</span>'
              : '',
          '</div>',
        '</footer>',
      '</article>'
    ].join('');
  }).join('');

  var html = [
    '<section id="avaliacoes-home" class="avaliacoes-home">',
      '<div class="conteiner">',
        '<header class="avaliacoes-home-cabecalho">',
          config.etiqueta
            ? '<span class="avaliacoes-home-etiqueta">' +
              escaparHtml(config.etiqueta) +
              '</span>'
            : '',
          '<h2>', escaparHtml(config.titulo || 'Quem compra, recomenda'), '</h2>',
        '</header>',

        '<div class="avaliacoes-home-slider">',
          cardsHtml,
        '</div>',
      '</div>',
    '</section>'
  ].join('');

  var seletorInsercao = config.seletorInsercao || '#rodape';
  var $destino = $(seletorInsercao).first();

  if ($destino.length) {
    $destino.before(html);
  } else {
    $('.pagina-inicial').append(html);
  }

  var $slider = $('#avaliacoes-home .avaliacoes-home-slider');

  if (typeof $slider.slick !== 'function') {
    console.warn('Slick não foi encontrado para inicializar as avaliações.');
    return;
  }

  $slider.slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: reviews.length > 4,
    arrows: true,
    dots: false,
    autoplay: false,
    adaptiveHeight: false,

    prevArrow:
      '<button type="button" class="avaliacoes-home-seta avaliacoes-home-anterior" aria-label="Avaliação anterior">‹</button>',

    nextArrow:
      '<button type="button" class="avaliacoes-home-seta avaliacoes-home-proximo" aria-label="Próxima avaliação">›</button>',

    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true
        }
      }
    ]
  });
})();

/* ======================================================
   VÍDEO EM DESTAQUE — HOME
====================================================== */
(function () {
  var configVideo = (
    window.THEME_CONFIG &&
    window.THEME_CONFIG.videoDestaqueHome
  ) || {};

  if (!configVideo.ativo || $('#video-destaque-home').length) return;

  if (
    configVideo.somenteHome !== false &&
    !$('body').hasClass('pagina-inicial') &&
    !$('.pagina-inicial').length
  ) {
    return;
  }

  var youtubeId = String(configVideo.youtubeId || '').trim();

  if (!/^[A-Za-z0-9_-]{11}$/.test(youtubeId)) return;

  function escaparHtml(valor) {
    return String(valor || '').replace(/[&<>"']/g, function (caractere) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[caractere];
    });
  }

  var imagemFundo = configVideo.imagemFundo ||
    'https://img.youtube.com/vi/' + youtubeId + '/maxresdefault.jpg';

  var alinhamento = configVideo.alinhamentoTexto === 'centro'
    ? ' video-destaque-home-centro'
    : '';

  var html = [
    '<section id="video-destaque-home" class="video-destaque-home', alinhamento, '">',
      '<div class="conteiner">',
        '<div class="video-destaque-home-capa" style="background-image: url(\'', escaparHtml(imagemFundo), '\');">',
          '<div class="video-destaque-home-overlay"></div>',

          '<div class="video-destaque-home-conteudo">',
            configVideo.etiqueta
              ? '<span class="video-destaque-home-etiqueta">' +
                escaparHtml(configVideo.etiqueta) +
                '</span>'
              : '',
            '<h2>', escaparHtml(configVideo.titulo || 'Assista ao nosso vídeo'), '</h2>',
            configVideo.descricao
              ? '<p>' + escaparHtml(configVideo.descricao) + '</p>'
              : '',
            '<button type="button" class="video-destaque-home-botao" aria-label="Assistir vídeo">',
              '<span class="video-destaque-home-play-menor"><img src="https://cdn.awsli.com.br/2942/2942234/arquivos/play.svg" alt="Video Play"></span>',
              escaparHtml(configVideo.textoBotao || 'ASSISTIR AGORA'),
            '</button>',
          '</div>',

          '<button type="button" class="video-destaque-home-play" aria-label="Assistir vídeo">',
            '<span><img src="https://cdn.awsli.com.br/2942/2942234/arquivos/play.svg" alt="Video Play"></span>',
          '</button>',
        '</div>',
      '</div>',
    '</section>',

    '<div id="video-destaque-modal" class="video-destaque-modal" aria-hidden="true">',
      '<div class="video-destaque-modal-fundo"></div>',
      '<div class="video-destaque-modal-conteudo" role="dialog" aria-modal="true" aria-label="Vídeo">',
        '<button type="button" class="video-destaque-modal-fechar" aria-label="Fechar vídeo">×</button>',
        '<div class="video-destaque-modal-player"></div>',
      '</div>',
    '</div>'
  ].join('');

  var $destino = $(configVideo.seletorInsercao || '#rodape').first();

  if ($destino.length) {
    $destino.before(html);
  } else {
    $('.pagina-inicial').append(html);
  }

  function abrirVideo() {
    var $modal = $('#video-destaque-modal');

    $modal
      .addClass('video-destaque-modal-aberto')
      .attr('aria-hidden', 'false');

    $modal.find('.video-destaque-modal-player').html(
      '<iframe ' +
        'src="https://www.youtube-nocookie.com/embed/' + youtubeId + '?autoplay=1&rel=0" ' +
        'title="Vídeo em destaque" ' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ' +
        'allowfullscreen>' +
      '</iframe>'
    );

    $('body').addClass('video-destaque-modal-ativo');
  }

  function fecharVideo() {
    $('#video-destaque-modal')
      .removeClass('video-destaque-modal-aberto')
      .attr('aria-hidden', 'true')
      .find('.video-destaque-modal-player')
      .empty();

    $('body').removeClass('video-destaque-modal-ativo');
  }

  $(document).on(
    'click',
    '#video-destaque-home .video-destaque-home-play, #video-destaque-home .video-destaque-home-botao',
    abrirVideo
  );

  $(document).on(
    'click',
    '.video-destaque-modal-fechar, .video-destaque-modal-fundo',
    fecharVideo
  );

  $(document).on('keydown', function (evento) {
    if (evento.key === 'Escape') {
      fecharVideo();
    }
  });
})();
/* Interações comuns: responsivas, teclado, foco e aprimoramento progressivo. */
(function () {
  var mobile = window.matchMedia('(max-width: 767px)');
  var $menu = $('#cabecalho .menu.superior .nivel-um').first();
  var $search = $('#cabecalho .conteudo-topo > .inferior').first();
  var $cart = $('#cabecalho .carrinho').first();
  var $cartHome = $cart.parent();
  var previousMobile;
  if ($menu.length) {
    $menu.attr('id', 'orbyte-main-menu');
    $('.h-menu').attr('aria-controls', 'orbyte-main-menu');
    $('<li class="orbyte-menu-heading"><span>Explore a loja</span><button type="button" class="close-menu" aria-label="Fechar menu">×</button></li>').prependTo($menu);
    $('<button type="button" class="orbyte-menu-backdrop" tabindex="-1" aria-label="Fechar menu"></button>').insertBefore($menu);
  }
  function closeMenu() {
    $menu.removeClass('active');
    $('.h-menu').attr('aria-expanded', 'false');
    $('body').removeClass('orbyte-menu-open');
    if (mobile.matches) $menu.attr('inert', '');
  }
  function closeSearch() {
    $search.removeClass('active');
    $('.h-search').attr('aria-expanded', 'false');
  }
  function updateHeader() {
    var header = document.querySelector('#cabecalho');
    if (header) document.documentElement.style.setProperty('--orbyte-header-bottom', Math.max(0, header.getBoundingClientRect().bottom) + 'px');
  }
  function syncViewport() {
    updateHeader();
    if (previousMobile === mobile.matches) return;
    previousMobile = mobile.matches;
    closeMenu(); closeSearch();
    if (mobile.matches) {
      $('.h-menu').before($cart);
      $menu.attr('inert', '').find('> li.com-filho > ul').hide();
    } else {
      $cartHome.append($cart);
      $menu.removeAttr('inert').find('li.com-filho').removeClass('menu-aberto').children('ul').css('display', '');
    }
    $('.toggle-submenu').attr('aria-expanded', 'false');
  }
  $(document).on('click.orbyte', '.h-menu', function () {
    if (!mobile.matches) return;
    closeSearch();
    $menu.removeAttr('inert').addClass('active');
    $('body').addClass('orbyte-menu-open');
    $(this).attr('aria-expanded', 'true');
    $menu.find('.close-menu').trigger('focus');
  }).on('click.orbyte', '.close-menu, .orbyte-menu-backdrop', function () {
    closeMenu(); $('.h-menu').trigger('focus');
  }).on('click.orbyte', '.h-search', function () {
    closeMenu();
    var open = !$search.hasClass('active');
    $search.toggleClass('active', open);
    $(this).attr('aria-expanded', String(open));
    updateHeader();
    if (open) $search.find('input').first().trigger('focus');
  }).on('click.orbyte', '.toggle-submenu', function () {
    $('.toggle-submenu').each(function () {
      $(this).attr('aria-expanded', String($(this).parent().hasClass('menu-aberto')));
    });
  });
  var framePending = false;
  $(window).on('scroll.orbyte resize.orbyte', function () {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(function () { framePending = false; syncViewport(); });
  });
  syncViewport();

  // O link continua nativo: nenhuma interceptação de compra, preço ou variante.
  $('.listagem-item .botao-comprar').each(function () {
    var $button = $(this);
    if (($button.attr('title') || '').indexOf('detalhes') >= 0 || /ver mais/i.test($button.text())) {
      $button.addClass('orbyte-view-product').attr('aria-label', 'Ver opções do produto');
    }
  });
  $('.c-item img').each(function () { $(this).attr('alt', $(this).siblings('.c-titulo-categoria').text()); });
  $('.carrinho > a').attr('aria-label', 'Abrir carrinho');
  $('#form-buscar input').attr('aria-label', 'Buscar produtos');
  $('.newsletter-cadastro input[type=email]').attr('aria-label', 'Seu e-mail');
  $('a[target="_blank"]').attr('rel', 'noopener noreferrer');
  $('.listagem-item img, .c-item img').attr('loading', 'lazy').attr('decoding', 'async');
  $('.pagina-inicial .titulo-categoria').each(function () {
    var $list = $(this).next('ul');
    if ($list.length && !$list.find('.listagem-item').length) { $(this).hide(); $list.hide(); }
  });
  $('.faq-section').each(function () {
    $(this).find('h2').text('Dúvidas frequentes');
    $(this).find('.faq-subtitle').text('Encontre respostas antes de comprar.');
  });
  // As avaliações e a FAQ formam uma única sequência antes da newsletter.
  if ($('body').hasClass('pagina-inicial') && $('.faq-section').length) {
    $('#avaliacoes-home').insertBefore($('.faq-section').first());
  }

  // Gerencia foco de overlays próprios sem alterar os modais da plataforma.
  var roots = [
    { selector: '#modal-pagamento', panel: '.modal-conteudo', open: function ($r) { return $r.hasClass('ativo'); }, close: closePayment },
    { selector: '#modalFiltros', panel: '.orbyte-filter-panel', open: function ($r) { return $r.hasClass('ativo'); }, close: closeFilters },
    { selector: '#ofertas-destacadas', panel: '.ofertas-destacadas-painel', open: function ($r) { return $r.hasClass('ofertas-abertas'); }, close: function () { $('.ofertas-destacadas-fechar').trigger('click'); } },
    { selector: '#video-destaque-modal', panel: '.video-destaque-modal-conteudo', open: function ($r) { return $r.hasClass('video-destaque-modal-aberto'); }, close: function () { $('.video-destaque-modal-fechar').trigger('click'); } }
  ];
  var active = null;
  roots.forEach(function (entry) {
    var root = document.querySelector(entry.selector);
    if (!root) return;
    entry.$root = $(root); entry.$panel = entry.$root.find(entry.panel);
    entry.$panel.attr({ role: 'dialog', 'aria-modal': 'true', tabindex: '-1' });
    if (entry.selector === '#ofertas-destacadas') entry.$panel.attr('aria-label', 'Ofertas especiais');
    var wasOpen = false;
    function sync() {
      var open = entry.open(entry.$root);
      entry.$panel.prop('inert', !open);
      if (open === wasOpen) return;
      wasOpen = open;
      if (open) {
        if (active && active !== entry) active.close();
        entry.returnFocus = document.activeElement;
        active = entry;
        entry.$panel.trigger('focus');
      } else {
        if (active === entry) {
          active = null;
          if (entry.returnFocus && entry.returnFocus.isConnected) entry.returnFocus.focus();
        }
      }
    }
    new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['class'] });
    sync();
  });
  $(document).on('keydown.orbyte', function (event) {
    if (event.key === 'Escape') {
      closePayment(); closeFilters();
      if ($menu.hasClass('active')) { closeMenu(); $('.h-menu').trigger('focus'); }
      if ($search.hasClass('active')) { closeSearch(); $('.h-search').trigger('focus'); }
    }
    if (event.key !== 'Tab') return;
    var $scope = active ? active.$panel : ($menu.hasClass('active') ? $menu : $());
    if (!$scope.length) return;
    var $focusable = $scope.find('a[href], button, input, select, textarea, [tabindex="0"]').filter(':visible').filter(':not(:disabled)').filter(function () { return !$(this).closest('[inert]').length; });
    var first = $focusable[0], last = $focusable[$focusable.length - 1];
    if (!first) { event.preventDefault(); $scope.trigger('focus'); return; }
    if (event.shiftKey && (document.activeElement === first || document.activeElement === $scope[0])) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && (document.activeElement === last || document.activeElement === $scope[0])) { event.preventDefault(); first.focus(); }
  });
})();

});
})(window.jQuery);
