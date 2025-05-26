// Variáveis globais
let cart = [];
let currentScreen = 'login';

// Mostrar tela de login inicialmente
document.getElementById('loginScreen').style.display = 'flex';

// Função para login (simplificada)
document.querySelector('.login-btn').addEventListener('click', function() {
    // Aqui iria a validação do login
    // Por enquanto, vamos apenas ir para o menu principal
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'flex';
    currentScreen = 'mainMenu';
});

// Funções para navegação
function showCategory(category) {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById(category + 'Screen').style.display = 'flex';
    currentScreen = category;
}

function backToMainMenu() {
    document.querySelectorAll('.category-screen, .cart-screen, .payment-screen').forEach(screen => {
        screen.style.display = 'none';
    });
    document.getElementById('mainMenu').style.display = 'flex';
    currentScreen = 'mainMenu';
}

function backToCart() {
    document.getElementById('paymentScreen').style.display = 'none';
    document.getElementById('cartScreen').style.display = 'flex';
    currentScreen = 'cart';
}

// Funções do carrinho
function addToCart(itemName, itemPrice) {
    // Verifica se o item já está no carrinho
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: itemPrice,
            quantity: 1
        });
    }
    
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cartItems');
    cartItemsElement.innerHTML = '';
    
    let total = 0;
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
        `;
        cartItemsElement.appendChild(itemElement);
        
        total += item.price * item.quantity;
    });
    
    document.getElementById('totalAmount').textContent = total.toFixed(2);
}

function showCart() {
    document.querySelectorAll('.category-screen').forEach(screen => {
        screen.style.display = 'none';
    });
    document.getElementById('cartScreen').style.display = 'flex';
    currentScreen = 'cart';
}

function showPaymentOptions() {
    document.getElementById('cartScreen').style.display = 'none';
    document.getElementById('paymentScreen').style.display = 'flex';
    currentScreen = 'payment';
}

function completePurchase() {
    document.getElementById('paymentScreen').style.display = 'none';
    document.getElementById('thankYouScreen').style.display = 'flex';
    currentScreen = 'thankYou';
    
    // Limpa o carrinho após a compra
    cart = [];
}

function returnToMainMenu() {
    document.getElementById('thankYouScreen').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'flex';
    currentScreen = 'mainMenu';
}

// Adicionando eventos aos botões de pagamento
document.querySelectorAll('.payment-btn').forEach(btn => {
    btn.addEventListener('click', completePurchase);
});

// Para fins de demonstração, vamos adicionar alguns itens ao carrinho automaticamente
// Isso simularia o usuário adicionando itens
setTimeout(() => {
    if (currentScreen === 'mainMenu') {
        addToCart('Pão de Queijo', 1.50);
        addToCart('lata refri c/sem açucar', 7.00);
        addToCart('Bolos', 12.00);
    }
}, 1000);