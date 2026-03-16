/**
 * DIVULGA+ - JavaScript
 * Funcionalidades interativas do site
 */

// ============================================
// Dados dos Eventos
// ============================================

const eventos = {
  'Marcha da Consciência Negra': {
    data: '20/11/2025',
    local: 'Marco da Consciência Negra (próximo à Praça dos Estudantes - Centro) Guarulhos-SP',
    descricao: 'Guarulhos Contra o racismo. Por Demobracia e igualdade, reparação e justiça racial.',
    imagem: 'images/marcha-consciencia-infos.jpg'
  },
  'Feira de Artesanato': {
    data: '12/11/2025',
    local: 'Area de Piquenique',
    descricao: 'Descubra produtos artesanais únicos feitos por artesãos locais. A Feira de Artesanato oferece uma variedade de peças exclusivas, desde decoração até roupas e acessórios, tudo criado com criatividade e paixão.',
    imagem: 'images/artisan-fair.png'
  },
  'Aula de Yoga ao Ar Livre': {
    data: '18/11/2025',
    local: 'Gramado Central',
    descricao: 'Pratique yoga em contato direto com a natureza. Esta aula ao ar livre é perfeita para relaxar, meditar e conectar-se com o corpo e a mente em um ambiente tranquilo e acolhedor no coração do Ibirapuera.',
    imagem: 'images/yoga-outdoor.jpg'
  }
};

const galeria = {
  'Marcha da Consciência Negra': {
    descricao: 'Guarulhos Contra o racismo. Por Demobracia e igualdade, reparação e justiça racial.',
    images: ['images/marcha-consciencia.jpeg', 'images/xxx', 'images/xxx']
  },
  'xxx': {
    descricao: 'xxx',
    images: ['images/xxx', 'images/xxx', 'images/xxx']
  }
};

// ============================================
// Função para rolar até uma seção
// ============================================

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// ============================================
// Função para mostrar detalhes do evento
// ============================================

function showEventDetails(eventName) {
  const evento = eventos[eventName];
  
  if (evento) {
    // Atualizar conteúdo do modal
    document.getElementById('eventModalLabel').textContent = eventName;
    
    const modalBody = document.getElementById('eventModalBody');
    modalBody.innerHTML = `
      <div class="event-details">
        <img src="${evento.imagem}" alt="${eventName}" style="width: 100%; border-radius: 0.5rem; margin-bottom: 1rem;">
        <p><strong>Data:</strong> ${evento.data}</p>
        <p><strong>Local:</strong> ${evento.local}</p>
        <p style="margin-top: 1rem; line-height: 1.6;">${evento.descricao}</p>
      </div>
    `;
    
    // Mostrar modal
    const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
    eventModal.show();
  }
}

function showEventGallery(eventName) {
    const evento = galeria[eventName]; // Use o objeto eventosGaleria global
    
    if (evento) {
        // 1. Atualizar o título do modal
        document.getElementById('eventModalLabelGallery').textContent = eventName;
        
        const modalBody = document.getElementById('eventModalBodyGallery');
        
        // 2. Gerar o HTML das miniaturas
        let galleryHTML = '<div class="row row-cols-3 g-2">'; // Usando o grid do Bootstrap para miniaturas
        
        evento.images.forEach(imagePath => {
            galleryHTML += `
                <div class="col">
                    <img 
                        src="${imagePath}" 
                        alt="${eventName}" 
                        class="img-fluid rounded shadow-sm gallery-thumbnail"
                        onclick="showFullscreenImage('${imagePath}', '${eventName}')" 
                        style="cursor: pointer; height: 100px; object-fit: cover;"
                    >
                </div>
            `;
        });
        
        galleryHTML += '</div>';

        // 3. Adicionar a descrição e a galeria ao modal
        modalBody.innerHTML = `
            <p style="margin-top: 0; line-height: 1.6;">${evento.descricao}</p>
            <hr>
            ${galleryHTML}
        `;
        
        // 4. Mostrar o modal
        const eventModal = new bootstrap.Modal(document.getElementById('eventModalGallery'));
        eventModal.show();
    }
}

/**
 * Função para abrir a imagem em tela cheia (usando o FullscreenModal)
 */
function showFullscreenImage(imagePath, altText) {
    // 1. Atualizar o conteúdo do modal de tela cheia
    const fullscreenBody = document.getElementById('fullscreenModalBody');
    fullscreenBody.innerHTML = `<img src="${imagePath}" alt="${altText}" class="img-fluid">`;

    // 2. Mostrar o modal de tela cheia
    const fullscreenModal = new bootstrap.Modal(document.getElementById('fullscreenModal'));
    fullscreenModal.show();
}
// ============================================
// Função para inscrição em evento
// ============================================

function inscreverEvento() {
  const eventName = document.getElementById('eventModalLabel').textContent;
  alert(`Você foi inscrito com sucesso no evento: ${eventName}!\n\nEm breve você receberá um email de confirmação.`);
  
  // Fechar modal
  const eventModal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
  if (eventModal) {
    eventModal.hide();
  }
}

// ============================================
// Efeito de animação ao scroll
// ============================================

function observarElementos() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });

  // Observar todos os cards de eventos
  document.querySelectorAll('.event-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// ============================================
// Função para atualizar botão de inscrição no modal
// ============================================

function atualizarBotaoInscricao() {
  const botaoInscricao = document.querySelector('.modal-footer .btn-custom');
  if (botaoInscricao) {
    botaoInscricao.addEventListener('click', inscreverEvento);
  }
}

// ============================================
// Função para adicionar efeito hover nos links do footer
// ============================================

function adicionarEfeitosFooter() {
  const footerLinks = document.querySelectorAll('footer a');
  
  footerLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.textDecoration = 'underline';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.textDecoration = 'none';
    });
  });
}

// ============================================
// Função para adicionar classe ativa ao navbar
// ============================================

function ativarNavLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Remover classe ativa de todos os links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Adicionar classe ativa ao link clicado
      this.classList.add('active');
    });
  });
}

// ============================================
// Função para fechar navbar ao clicar em um link
// ============================================

function fecharNavbarAoClicar() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }
    });
  });
}

// ============================================
// Inicialização
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Executar funções de inicialização
  observarElementos();
  atualizarBotaoInscricao();
  adicionarEfeitosFooter();
  ativarNavLink();
  fecharNavbarAoClicar();
  
  // Log de inicialização
  console.log('Divulga+ - Site inicializado com sucesso!');
});

// ============================================
// Função para validar formulário de contato
// ============================================

function validarFormularioContato(formulario) {
  const email = formulario.email.value;
  const mensagem = formulario.mensagem.value;
  
  if (!email || !mensagem) {
    alert('Por favor, preencha todos os campos!');
    return false;
  }
  
  if (!email.includes('@')) {
    alert('Por favor, insira um email válido!');
    return false;
  }
  
  alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
  formulario.reset();
  return false;
}

// ============================================
// Função para adicionar evento ao calendário
// ============================================

function adicionarAoCalendario(eventName) {
  const evento = eventos[eventName];
  
  if (evento) {
    // Converter data para formato YYYY-MM-DD
    const [dia, mes, ano] = evento.data.split('/');
    const dataFormatada = `${ano}-${mes}-${dia}`;
    
    // URL do Google Calendar
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventName)}&dates=${dataFormatada}/${dataFormatada}&details=${encodeURIComponent(evento.descricao)}&location=${encodeURIComponent(evento.local)}`;
    
    window.open(googleCalendarUrl, '_blank');
  }
}

// ============================================
// Função para compartilhar evento
// ============================================

function compartilharEvento(eventName) {
  const evento = eventos[eventName];
  
  if (evento) {
    const textoCompartilhamento = `Confira o evento "${eventName}" no Ibirapuera! Data: ${evento.data} | Local: ${evento.local}`;
    
    // Verificar se a API de compartilhamento está disponível
    if (navigator.share) {
      navigator.share({
        title: 'Divulga+',
        text: textoCompartilhamento,
        url: window.location.href
      }).catch(err => console.log('Erro ao compartilhar:', err));
    } else {
      // Fallback: copiar para clipboard
      navigator.clipboard.writeText(textoCompartilhamento);
      alert('Texto copiado para a área de transferência!');
    }
  }
}

