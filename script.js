// Dados dos produtos
const produtos = [
  // Doces
  {
    categoria: 'doces',
    titulo: 'Bolo de Chocolate',
    descricao: 'Bolo macio com recheio de ganache e cobertura de chocolate belga.',
    preco: 'R$ 45,00',
    imagem: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    categoria: 'doces',
    titulo: 'Torta de Morango',
    descricao: 'Torta com massa amanteigada, creme de baunilha e morangos frescos.',
    preco: 'R$ 35,00',
    imagem: 'https://i.pinimg.com/736x/ea/ff/ec/eaffecea0eff972f73d646aacef67605.jpg',
  },
  {
    categoria: 'doces',
    titulo: 'Cupcake Especial',
    descricao: 'Cupcake com massa de baunilha e cobertura de buttercream.',
    preco: 'R$ 12,00',
    imagem: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    categoria: 'doces',
    titulo: 'Cookies Artesanais',
    descricao: 'Cookies crocantes com gotas de chocolate meio amargo.',
    preco: 'R$ 8,00 (unidade)',
    imagem: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },

  // Salgados
  {
    categoria: 'salgados',
    titulo: 'Empada de Frango',
    descricao: 'Empada com massa folhada e recheio de frango desfiado.',
    preco: 'R$ 10,00',
    imagem: 'https://i.pinimg.com/736x/b7/f7/23/b7f723e637cb0b652fec4134a72ada0e.jpg',
  },
  {
    categoria: 'salgados',
    titulo: 'Batata Frita Crocante',
    descricao: 'Porção de batata frita crocante com molho especial.',
    preco: 'R$ 18,00',
    imagem: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    categoria: 'salgados',
    titulo: 'Sanduíche Natural',
    descricao: 'Pão integral com peito de peru, queijo branco e vegetais frescos.',
    preco: 'R$ 22,00',
    imagem: 'https://i.pinimg.com/736x/fb/e9/9e/fbe99e0b35f932c31719b159ead1b5d5.jpg',
  },
  {
    categoria: 'salgados',
    titulo: 'Pão de Queijo',
    descricao: 'Pão de queijo mineiro tradicional, feito com queijo canastra.',
    preco: 'R$ 6,00 (unidade)',
    imagem: 'https://i.pinimg.com/736x/e5/cd/6b/e5cd6b0e847b606a583a3f4615644bc3.jpg',
  },

  // Bebidas
  {
    categoria: 'bebidas',
    titulo: 'Coca-Cola',
    descricao: 'Lata 350ml de Coca-Cola gelada.',
    preco: 'R$ 6,00',
    imagem: 'https://images.unsplash.com/photo-1561758033-48d52648ae8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    categoria: 'bebidas',
    titulo: 'Suco Natural',
    descricao: 'Suco natural feito na hora (laranja, abacaxi ou maracujá).',
    preco: 'R$ 12,00',
    imagem: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    categoria: 'bebidas',
    titulo: 'Milkshake',
    descricao: 'Milkshake cremoso (chocolate, morango ou baunilha).',
    preco: 'R$ 18,00',
    imagem: 'https://i.pinimg.com/736x/f3/88/91/f38891ec8c049f04c4e317ff28bd0771.jpg',
  },
  {
    categoria: 'bebidas',
    titulo: 'Água Mineral',
    descricao: 'Garrafa 500ml de água mineral com ou sem gás.',
    preco: 'R$ 5,00',
    imagem: 'https://i.pinimg.com/736x/03/fd/b9/03fdb975fe206a8c214e1d4ba8ab6b44.jpg',
  }
];

// Variáveis globais
let cart = [];

// Função para criar e inserir os itens no menu
function criarItensMenu() {
  const menuGrid = document.querySelector('.menu-grid');
  menuGrid.innerHTML = ''; // Limpa o container antes de inserir

  produtos.forEach(produto => {
    const item = document.createElement('div');
    item.classList.add('menu-item');
    item.dataset.category = produto.categoria;

    item.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.titulo}">
      <div class="menu-item-content">
        <h3 class="menu-item-title">${produto.titulo}</h3>
        <p class="menu-item-description">${produto.descricao}</p>
        <p class="menu-item-price">${produto.preco}</p>
        <button class="add-to-cart">Adicionar ao Carrinho</button>
      </div>
    `;

    menuGrid.appendChild(item);
  });

  ativarEventosAddToCart();
}

// Filtro de Categorias
const categoryBtns = document.querySelectorAll('.category-btn');

categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const category = btn.dataset.category;
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
      item.style.display = (category === 'all' || item.dataset.category === category) ? 'block' : 'none';
    });
  });
});

// Seletores para carrinho
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartSummary = document.getElementById('cart-summary');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');

// Abrir/Fechar Carrinho
cartBtn.addEventListener('click', e => {
  e.preventDefault();
  cartSidebar.classList.add('active');
  overlay.classList.add('active');
});

closeCartBtn.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
  overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
  overlay.classList.remove('active');
  document.getElementById('login-section').style.display = 'none';
});

// Função para ativar eventos dos botões "Adicionar ao Carrinho"
function ativarEventosAddToCart() {
  const addToCartBtns = document.querySelectorAll('.add-to-cart');
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const menuItem = btn.closest('.menu-item');
      const title = menuItem.querySelector('.menu-item-title').textContent;
      const price = menuItem.querySelector('.menu-item-price').textContent;
      const image = menuItem.querySelector('img').src;

      const existingItem = cart.find(item => item.title === title);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ title, price, image, quantity: 1 });
      }
      updateCart();
    });
  });
}

// Função para atualizar carrinho
function updateCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart-message">Seu carrinho está vazio</p>';
    cartSummary.style.display = 'none';
  } else {
    cartItemsContainer.innerHTML = '';
    cartSummary.style.display = 'block';
    let total = 0;

    cart.forEach(item => {
      const priceNumber = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
      total += priceNumber * item.quantity;

      const cartItemElement = document.createElement('div');
      cartItemElement.className = 'cart-item';
      cartItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.title}</h4>
          <p class="cart-item-price">${item.price}</p>
          <div class="cart-item-quantity">
            <button class="quantity-btn minus" data-title="${item.title}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn plus" data-title="${item.title}">+</button>
          </div>
        </div>
        <button class="remove-item" data-title="${item.title}">&times;</button>
      `;
      cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

    // Eventos para botões de quantidade/remoção
    document.querySelectorAll('.minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.dataset.title;
        const item = cart.find(i => i.title === title);
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          cart = cart.filter(i => i.title !== title);
        }
        updateCart();
      });
    });

    document.querySelectorAll('.plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.dataset.title;
        const item = cart.find(i => i.title === title);
        item.quantity += 1;
        updateCart();
      });
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.dataset.title;
        cart = cart.filter(i => i.title !== title);
        updateCart();
      });
    });
  }
}

// Sistema de login
const loginBtn = document.getElementById('login-btn');
const loginSection = document.getElementById('login-section');

loginBtn.addEventListener('click', e => {
  e.preventDefault();
  loginSection.style.display = 'block';
  overlay.classList.add('active');
});

document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  alert('Login realizado com sucesso!');
  loginSection.style.display = 'none';
  overlay.classList.remove('active');
});

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
  criarItensMenu();

  // Define filtro padrão para "all"
  categoryBtns.forEach(btn => btn.classList.remove('active'));
  const allBtn = document.querySelector('.category-btn[data-category="all"]');
  if (allBtn) allBtn.classList.add('active');
});
