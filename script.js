let menus = [{
        menuName: "Margherita",
        topping: "mit Tomatensoße, Käse",
        price: "6.50",
    },
    {
        menuName: "Salami",
        topping: "mit Tomatensoße, Käse, Salami",
        price: "7.50",
    },
    {
        menuName: "Schinken",
        topping: "mit Tomatensoße, Käse, Schinken",
        price: "7.50",
    },
    {
        menuName: "Tonno",
        topping: "mit Tomatensoße, Käse, Thunfisch",
        price: "8.50",
    }, {
        menuName: "Mozzarella",
        topping: "mit Tomatensoße, Mozzarella, Tomaten",
        price: "9.50",
    },
];

let cart = [];



function render() {
    let content = document.getElementById('contentMenu');
    content.innerHTML = '';

    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        content.innerHTML += contentGen(menu, i);
    }
}

function contentGen(menu, i) {
    return `
    <div onclick="addToCart(${i})" class="menusHeader">
        <div class="menus">
            <h3>
                ${menu['menuName']}
            </h3>
            <span>
                ${menu['topping']}
            </span><br>
            <span>
                ${menu['price']} €
            </span>                    
            <img class="addMenu" src="img/add_FILL0_wght400_GRAD0_opsz48.png" alt="">                    
        </div>
    </div>
    `;
}

function getIndex(word, array) {
    var index = array.findIndex((obj) => obj.menuName == word);
    console.log(index);
    return index;
}

function addToCart(i) {
    let menu = menus[i];
    let index = getIndex(menu['menuName'], cart);
    if (index == -1) {
        cart.push(menu);
        newIndex = getIndex(menu['menuName'], cart);
        cart[newIndex]["amount"] = 1;
    } else {
        cart[index]["amount"]++;
    }

    renderBasket();
}



function renderBasket() {
    basketContent = document.getElementById('basketContent');
    basketContent.innerHTML = '';
    for (let b = 0; b < cart.length; b++) {
        const cartItem = cart[b];

        basketContent.innerHTML += genBasket(b, cartItem);
    }
    calcPayment();

}


function genPrice(cartItem) {
    let priceItem = parseFloat(cartItem['price']);
    let amountItem = cartItem['amount'];
    let sum = (priceItem * amountItem).toFixed(2);
    return sum;
}



function genBasket(b, cartItem) {
    let price = genPrice(cartItem);
    return `
    <div class="cartamount">
        <div><b>${cartItem["amount"]}</b>
    </div>
    <div class="basketMeal">
        <div class="cartmealname">
            <div><b>${cartItem["menuName"]}</b></div>
            <div>${price} €</div>
        </div>
        <div class="cartmealname">
            <a href="#" class="subheadDescription">Anmerkung hinzufügen</a>
            <div class="carticons">
            <img src="img/remove_FILL0_wght400_GRAD0_opsz48.png" alt="" onclick="decreaseBasket(${b})" class="iconbtn">
            <img src="img/add_FILL0_wght400_GRAD0_opsz48.png" alt="" onclick="increaseBasket(${b})" class="iconbtn">
            </div>
        </div>
    </div>
  </div>
    `
}

function decreaseBasket(b) {
    cart[b]['amount']--;
    if (cart[b]['amount'] == 0) {
        cart.splice(b, 1)
    }
    renderBasket();
    if (cart.length == 0) {
        renderEmptyBasket();
    }
}

function increaseBasket(b) {
    cart[b]['amount']++;
    renderBasket()
}

function renderEmptyBasket() {
    document.getElementById('basketContent').innerHTML = `
    <span>Fülle deinen Warenkorb</span>
    <span>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</span>
    `
    document.getElementById('paycalc').innerHTML = '';
    document.getElementById('basketRespon').innerHTML = '';
}

function calcSum() {
    let sum = 0;
    for (let s = 0; s < cart.length; s++) {
        const cartPos = cart[s];
        let priceItem = parseFloat(cartPos['price']);
        let amountItem = cartPos['amount'];
        sum += (priceItem * amountItem);
    }
    return sum;

}

function calcPayment() {
    let sum = calcSum();
    let totalSum = +sum + 2.50;
    let paycalc = document.getElementById('paycalc');
    paycalc.innerHTML = `
    <div class="pay">
        <div>Zwischensumme</div>
        <div>${sum.toFixed(2)} €</div>
    </div>
    <div class="pay">
        <div>Lieferkosten</div>
        <div>2.50 €</div>
    </div>
    <div class="pay payTotal">
        <div>Gesamt</div>
        <div>${totalSum.toFixed(2)} €</div>
    </div>
    `;
    basketRespon(totalSum)
}

function basketRespon(totalSum) {
    document.getElementById('basketRespon').innerHTML = `${totalSum.toFixed(2)} €`;

}

function openBasket() {
    let open = document.getElementById('openCart').classList;
    if (open.contains('cartopen')) {
        open.remove('cartopen')
    } else {
        open.add('cartopen');
    }
}