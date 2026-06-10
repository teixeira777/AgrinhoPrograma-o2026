document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '60px';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.flexDirection = 'column';
            navMenu.style.backgroundColor = '#2d5016';
            navMenu.style.padding = '1rem';
            navMenu.style.gap = '1rem';
        });
    }

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.style.display = 'none';
            }
        });
    });
});

// ===== ANIMAÇÃO DE SCROLL =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.stat-card, .innovation-card, .sustainability-card, .practice-item, .culture-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Adicionar animação CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }
`;
document.head.appendChild(style);

// Executar animações ao carregar
document.addEventListener('DOMContentLoaded', animateOnScroll);

// ===== CONTADOR DE NÚMEROS =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animar contadores quando a seção fica visível
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.innovation-number, .stat-card h3');
    
    const observerCounter = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                
                // Extrair número do texto
                const text = entry.target.textContent;
                const numberMatch = text.match(/\d+/);
                
                if (numberMatch) {
                    const number = parseInt(numberMatch[0]);
                    if (number > 100) {
                        animateCounter(entry.target, number, 1500);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observerCounter.observe(counter);
    });
});

// ===== EFEITO DE HOVER NAS BARRAS =====
document.addEventListener('DOMContentLoaded', function() {
    const bars = document.querySelectorAll('.bar');
    
    bars.forEach(bar => {
        const parent = bar.parentElement;
        parent.addEventListener('mouseenter', function() {
            bar.style.animation = 'pulse 0.6s ease';
        });
    });
});

// ===== SCROLL SUAVE PARA LINKS DE NAVEGAÇÃO =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== DETECTAR SEÇÃO ATIVA NA NAVEGAÇÃO =====
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== ADICIONAR CLASSE ACTIVE AOS LINKS =====
const style2 = document.createElement('style');
style2.textContent = `
    .nav-menu a.active {
        color: #ffc107;
        border-bottom: 2px solid #ffc107;
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style2);

// ===== EFEITO DE PARALLAX (OPCIONAL) =====
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// ===== FUNÇÃO PARA FILTRAR TABELA (OPCIONAL) =====
function filterTable(searchTerm) {
    const table = document.querySelector('.data-table tbody');
    const rows = table.querySelectorAll('tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// ===== COPIAR DADOS PARA CLIPBOARD =====
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copiado para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar:', err);
    });
}

// ===== TEMA ESCURO (OPCIONAL) =====
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Verificar preferência de tema ao carregar
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// ===== VALIDAÇÃO DE FORMULÁRIO (SE HOUVER) =====
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#2d5016';
        }
    });

    return isValid;
}

// ===== ANALYTICS BÁSICO (RASTREAMENTO DE CLIQUES) =====
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button') || e.target.classList.contains('cta-button-large')) {
        console.log('CTA clicado:', e.target.textContent);
        // Aqui você pode enviar dados para um serviço de analytics
    }
});

// ===== CARREGAR DADOS DINÂMICOS (EXEMPLO) =====
async function loadDynamicData() {
    try {
        // Simular carregamento de dados
        console.log('Dados carregados com sucesso');
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

// ===== INICIALIZAR TUDO AO CARREGAR =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Site carregado com sucesso!');
    loadDynamicData();
});

// ===== FUNÇÃO PARA COMPARTILHAR =====
function shareOnSocial(platform) {
    const url = window.location.href;
    const title = 'Agronegócio Forte, Futuro Sustentável';
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// ===== PRINT PÁGINA =====
function printPage() {
    window.print();
}

// ===== DOWNLOAD PDF (SIMULADO) =====
function downloadPDF() {
    alert('Funcionalidade de download em desenvolvimento. Você pode usar Ctrl+P para imprimir como PDF.');
}