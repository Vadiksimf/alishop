document.addEventListener('DOMContentLoaded', () => {

    const search = document.querySelector('.search');
    const cartBtn = document.getElementById('cart');
    const wishlistBtn = document.getElementById('wishlist');
    const goodsWrapper = document.querySelector('.goods-wrapper');
    const cart = document.querySelector('.cart');

    

    const createCardGoods = (id, title, price, img) => {
        const card = document.createElement('div');
        card.className ='card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        // card.innerHTML = '<div class="card"> <div class="card-img-wrapper"> <img class="card-img-top" src="img/temp.png" alt=""> <button class="card-add-wishlist"></button> </div> <div class="card-body justify-content-between"><a href="#" class="card-title">Имя товара</a> <div class="card-price">100000 ₽</div><div> <button class="card-add-cart">Добавить в корзину</button> </div>  </div> </div>'
        
        // Modern method to add HTML use: ``, and to add some code use: ${} (calls interpolation)
        card.innerHTML = `<div class="card">
        <div class="card-img-wrapper">
            <img class="card-img-top" src="${img}" alt="">
            <button class="card-add-wishlist"
                data-goods-id="${id}"></button>
        </div>
        <div class="card-body justify-content-between">
            <a href="#" class="card-title">${title}</a>
            <div class="card-price">${price} ₽</div>
            <div>
                <button class="card-add-cart" data-goods-id="${id}">Добавить в корзину</button>
            </div>
        </div>
        </div>`

        return card;
    };


    
    goodsWrapper.appendChild(createCardGoods(1, 'Дартс', 2200, 'img/temp/Archer.jpg'));
    goodsWrapper.appendChild(createCardGoods(2, 'Фламнго', 3200, 'img/temp/Flamingo.jpg'));
    goodsWrapper.appendChild(createCardGoods(3, 'Носки', 200, 'img/temp/Socks.jpg'));

    // CLOSE CART BLOCK *****************************************
    const closeCart = (event) => {
        const target = event.target;
        //console.log(target);

        if (target === cart ||
            target.classList.contains('cart-close') ||
            event.keyCode === 27 ||
            event.which === 27) {
            cart.style.display = 'none';
            document.removeEventListener('keyup', closeCart); // Remove EventListener

        }
    };

    // OPEN CART BLOCK
    const openCart = event => {
        event.preventDefault();   // PREVENTION OF OPENING LINKS
        cart.style.display = 'flex';
        document.addEventListener('keydown', closeCart); // Create EventListener
    };

    const renderCard = (items) => {
        goodsWrapper.textContent = ''; // Удалчет предыдущие товары (очищает список)
        items.forEach((item) => {
            const {id, title, price, imgMin} = item; // Деструктуризация с присвоением, позволяет обращаться не через item.id, а через id !!!
            goodsWrapper.appendChild(createCardGoods(id, title, price, imgMin));
        });
    };

    const getGoods = (handler, filter) => {
        // Запрос к данным
        fetch('db/db.json')
        .then(response => {
            return response.json()
        })
        .then(filter)
        .then(handler);
    };

    const randomSort = (item) => {
        return item.sort(() => Math.random() - 0.5);    // Случайно сортируем товары на листе от -0,5 до 0,5
    };

    cartBtn.addEventListener('click', openCart);
    cart.addEventListener('click', closeCart);

    getGoods(renderCard, randomSort);













})








