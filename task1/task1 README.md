# 🚀 Shoptet Task Solution

Vybral som si jeden z vasich eshopov a vyrobil som script, ktory renderuje vsetky upravy z tohoto bodu. Uobil som to stylom, akym so zvyknuty, myslim ze by sa vam to mohlo pacit. Bolo to super, po dlhej dobe vanilla js, bavilo ma to. Kod sa da sazmorejme rozdelit do tematickych blokov, ja to mam v jednom. Staci to vloit na stranku kategorie. Napr https://www.andyhoauto.sk/udrzba-okien/

---

## 🛠️ Implementácia

Cely kod by sa mal spustat v momente kedy je DOM plne pripraveny. Ak sa jedna o AJAX nacitanie produktov, mohol by sa script spustat pri 'shoptet.scripts.contentUpdated.' Pripadne vyrobit JS mutationObserver.

- `window.onload = function() { ... }` (netreba ak je v paticke)
- `Shoptet.scripts.onComplete` (udajne existuje taketo nativne riešenie pre Shoptet - uprimne skusenost s tym nemam ale asi by som to nejak zvladol)

### Kam vlozit kod na shoptet?
Ako uz viete, nemam skusenosti so shoptetom ale malo by to ist medzi scripty, patral som a zistil som ze priblizne sem:
ADM -> Vzhľad a obsah -> Editor vzhľadu -> HTML kód - > Vlozit do sekcie paticka (pred koncovým tagom </body>). Tym by malo byt zaistene, ze cela struktura stranky (produkty, ceny, obrazky) su uz nacitane a je globalne platny. Obalil by som ho do znacky <script>

### Bod č. 3: Optimalizácia cez CSS - skryvanie buyBtn
Ak by klient chcel menit len vizual, cistejsie riesenie pre bod 3 by bolo vlozit doplnkove CSS do zálozky 'Vlastné CSS', ale moj script je komplexnym riesenim, ktore pokryva vsetky tri body naraz v ramci jednej logiky. Vlozit ako <style> do hlavicky.

```css
.product .p-tools {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.product:hover .p-tools {
  opacity: 1;
  visibility: visible;
}

.product:hover {
  z-index: 10;
  position: relative;
}