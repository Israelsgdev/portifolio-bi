document.addEventListener('DOMContentLoaded', function() {
    // Atualiza o ano no footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Smooth scrolling para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Fecha o menu mobile após clicar
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
    
    // Filtro do portfólio
    const filterButtons = document.querySelectorAll('.btn-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona a classe active ao botão clicado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Animação ao rolar
    function animateOnScroll() {
        const elements = document.querySelectorAll('.solucao-card, .portfolio-item, .destaque-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Estado inicial para elementos animados
    document.querySelectorAll('.solucao-card, .portfolio-item, .destaque-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Executa a animação no carregamento e ao rolar
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio - na implementação real, você usaria AJAX ou similar
            const name = document.getElementById('nome').value;
            alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entrarei em contato em breve.`);
            
            // Reset do formulário
            contactForm.reset();
        });
    }
    
    // Adiciona classe ao navbar quando scrollar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
});

// Gráfico no Hero Section
function initHeroChart() {
    const ctx = document.getElementById('heroChart').getContext('2d');
    
    // Dados do gráfico
    const data = {
      labels: ['Tomada de Decisão', 'Eficiência', 'Visibilidade', 'Produtividade', 'Resultados'],
      datasets: [
        {
          label: 'Antes',
          data: [30, 40, 35, 25, 20],
          backgroundColor: '#4361ee',
          borderRadius: 5,
          borderSkipped: false,
          barPercentage: 0.6, // Controla a largura das barras
          categoryPercentage: 0.8 // Espaço entre categorias
        },
        {
          label: 'Depois',
          data: [85, 90, 80, 75, 95],
          backgroundColor: '#4cc9f0',
          borderRadius: 5,
          borderSkipped: false,
          barPercentage: 0.6,
          categoryPercentage: 0.8
        }
      ]
    };
  
    const config = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false, // Importante para respeitar o container
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(30, 30, 36, 0.9)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.raw}%`;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: false,
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              font: {
                size: 12 // Tamanho reduzido para caber melhor
              }
            }
          },
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
              drawBorder: false
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              callback: function(value) {
                return value + '%';
              },
              stepSize: 20 // Intervalo fixo entre valores
            }
          }
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        animation: {
          duration: 1500,
          easing: 'easeOutQuart'
        }
      }
    };
  
    new Chart(ctx, config);
  }