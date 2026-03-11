// Pri asynchronnom spravani sa pri shoptete teoreticky nemusi spustat funkcia po zmene 
// filtrov alebo po preklknuti sa na strankovani... Udajne existuje shoptet hook 'Shoptet.scripts.onComplete',
// ktory by to mohol riesit. Pripadne zvolit iny event miesto DomContentLoaded.
document.addEventListener('DOMContentLoaded', function() {
  const addToCartBtns = document.querySelectorAll('.btn-add-to-cart');
  
  addToCartBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
       //e.preventDefault(); inak sa metoda nespusti
        e.preventDefault;
        
      const productId = btn.getAttribute('data-product');
      //ak sa jedna o vannilla js, treba pouzit .value(); val() je jQuery metoda
      const quantity = document.querySelector('#qty-' + productId).val();
      
      // udajne by sa mohla pouzit aj metoda shoptet.cartShared.addToCart(productId, quantity), 
      // spusta naviazanu funkcionalitu shoptetu - aktualizacie kosika, potvrdenia, animacie, validaciu skladovost, atd
      fetch('/api/cart/add', {
        method: 'POST',
        //pre POST pri JSON.stringify sa odporuca pouzit aj hlavicka headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: productId,
          //zo skusenosti som mal niekedy problemy s typmi, niekedy som musel pozuit napr parseInt() na quantity, alebo cenu
          qty: quantity
        })
      })
      //opat je tu metoda tzn. response.json()
      .then(response => response.json)
      .then(data => {
        console.log('Pridané do košíka', data);
      });
    });
  });
});

//teoreticky mozme pridat este try/catch pre pripadne chyby
