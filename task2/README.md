Tu som trosku googlil + AI lebo nemam konkretnu skusenost ale tiez by som si s tym asi poradil

## 🚀 1. Postup napojenia (Workflow)

1)
a)Treba nakonfugurovat webhook/trigger. V adm nastavim webhook na udalost order:create, aktivujem async trigger. Cielovu url zadam endpoint skriptu. Triger posle pri kazdej objednavke http post request s json payload.

b)Prijem a autentifikacia. Scriptom zachytim post request. Zvalidujem HMAC podpis v header. Overim ci data prisli zo shoptetu.

c)Spracujem a transformujem data - prijaty JSON objekt rozparsujem a pripravim strukturu pre google sheet api. 

d)Cez knznicu Google a Service Account key poslem request na spreadsheets.values.append. Prida data ako novy riadok v dokumente.

e)Zo skusenosti sme mali sem tam nejaku duplicitu v objednavke. Teoreticky by sme to mohli riesit v sheets aby se validaciou nespomalili kod.

---

## 📊 2. Struktura reportovanych dat

2)
Order ID / Number: unikatne ID prodktu/ov
Datum a cas: Kedy objednavka vznikla.
Zoznam produktov (SKU, nazov, mnozstvo): Aby napr v sklade vedeli, co balit.
Sposob dopravy a platby: uctovnik/logistika.
Mena: samozrejmost ak je viac krajin
Zľavový kód: aby si marketing zmeral pripadnu kampan

---

## 🛠 3. Pouzite nastroje a pristup

3)
Odpourca sa pouzit Make.com.
a)Rychle pouzitie, pretoze ma shoptet moduly, aj google sheet, netreba riesit vlastnu autentizaciu pre google

b)logy a error handling
Ak spadne API, malo by to vediet poslat znova

c)Nizka cena pre mensie objemy.

d)Ak by sa jednalo o velky eshop, mohlo by sa napisat vlastne riesenie kvoli rychlosti a cene 

---