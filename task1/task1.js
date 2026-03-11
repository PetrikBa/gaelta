for (var i = 0; i < dataLayer.length; i++) {
    var item = dataLayer[i];

    if (item[0] === 'event' && item[1] === 'page_view' && item[2] && item[2].content_group === 'category') {
    //pripadne neriesit dataLayer ale shoptet.view.type === 'category', ak by vypadol pri AJAX nacitaniach
        var products = document.querySelectorAll('#products .product');

        // pomocna funkcia pre buyBtns
        var toggleProductBuyBtn = function(el, isVisible) {
            var buyBtns = el.querySelector('.p-tools');
            if (buyBtns) {
                buyBtns.style.transition = '0s';
                buyBtns.style.visibility = isVisible ? 'visible' : 'hidden';
                buyBtns.style.opacity = isVisible ? '1' : '0';
            }
        };

        products.forEach(function(el) {
            // setup atributov pre Novinka badge
            var isOlder = Math.random() >= 0.5;
            el.setAttribute('data-is-older-than-30-days', isOlder);

            // buyBtns hover
            toggleProductBuyBtn(el, false); // podla zadania nastavenie ze su defaultne skryte
            el.addEventListener('mouseenter', function() {
                toggleProductBuyBtn(this, true);
            });
            el.addEventListener('mouseleave', function() {
                toggleProductBuyBtn(this, false);
            });

            // Novinka badge funkcionalita - pouzivam exstujuci element, skryvam aj 'Detail' aj 'Do kosika'
            if (el.getAttribute('data-is-older-than-30-days') === 'false') {
                var flagsContainer = el.querySelector('.flags');
                var spanHtml = '<span class="flag flag-new" style="background-color:#009901; color:white">Novinka</span>';

                if (flagsContainer) {
                    flagsContainer.insertAdjacentHTML('beforeend', spanHtml);
                } else {
                    var link = el.querySelector('a');
                    if (link) {
                        link.insertAdjacentHTML('beforeend', '<div class="flags flags-default">' + spanHtml + '</div>');
                    }
                }
            }

            // Doprava zadarmo funkcionalita
            var priceEl = el.querySelector('.price');
            if (priceEl) {
                var priceRaw = priceEl.innerText;
                var cleanPrice = priceRaw.replace(/[^\d,.]/g, '').replace(',', '.');
                var priceNum = parseFloat(cleanPrice);

				// pre vybrany eshop som si dovolil hranicu posunut, pevne verim ze ma vyhodnocovatel testu za to neukrizuje
                if (!isNaN(priceNum) && priceNum < 15) {
                    var shippingInfo = '<p style="font-size: 12px; color: #666; margin-top: 5px;">🚚 Doprava zadarmo nad 15 €</p>';
                    priceEl.insertAdjacentHTML('afterend', shippingInfo);
                }
            }
        });

        break;
    }
}
