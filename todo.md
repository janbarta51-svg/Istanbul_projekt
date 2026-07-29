## Krok 1: Sloučit PR

Na GitHubu otevře pull request a zvolí:

```text
Merge pull request
→ Confirm merge
```

Protože finální větev obsahuje jeden souhrnný commit, může použít běžné **Merge pull request** nebo **Squash and merge**.

---

## Krok 2: Přepnout GitHub Pages na GitHub Actions

V repozitáři:

```text
Settings
→ Pages
→ Build and deployment
→ Source
→ GitHub Actions
```

Custom workflow je nutný, protože před sestavením webu zmenšuje a převádí fotografie. GitHub Pages pro takové případy podporuje workflow s kroky `configure-pages`, vytvořením artefaktu a `deploy-pages`. ([GitHub Docs][1])

Potom otevře:

```text
Actions
→ Optimize images and deploy Pages
```

Pokud se workflow po merge nespustilo nebo první běh selhal kvůli předchozímu nastavení Pages:

```text
Run workflow
→ Branch: main
→ Run workflow
```

Výsledkem mají být dvě zelené části:

```text
Optimize and build
Deploy
```

### Případná chyba oprávnění

Pokud krok `git push` skončí chybou 403:

```text
Settings
→ Actions
→ General
→ Workflow permissions
→ Read and write permissions
→ Save
```

Workflow už požaduje `contents: write`, `pages: write` a `id-token: write`.

---

# 5. Nastavení Pages CMS na kamarádově telefonu

Pages CMS pracuje přímo se soubory v GitHub repozitáři a `.pages.yml` čte samostatně pro každý repozitář a větev. ([Pages CMS][2])

## Krok 1: Přihlášení

V mobilním Safari nebo Chrome otevře:

```text
https://app.pagescms.org/
```

Potom:

```text
Sign in with GitHub
```

## Krok 2: Instalace GitHub aplikace

Zvolí:

```text
Install GitHub App
→ Only select repositories
→ janbarta51-svg/Istanbul_projekt
```

Pages CMS musí být nainstalováno na účtu, který vlastní cílový repozitář. ([Pages CMS][3])

## Krok 3: Otevření správné větve

V Pages CMS vybere:

```text
janbarta51-svg / Istanbul_projekt
→ branch main
→ Denní zápisky
```

Nemá používat tvoji větev `pages-cms-preview`.

## Krok 4: Běžné přidávání zápisků

U každého dne vyplní:

```text
Číslo dne
Datum
Nadpis dne
Odkud
Kam
Fotografie
Publikovat
Text zápisku
```

Po klepnutí na **Save**:

1. Pages CMS uloží zápisek a fotografie do `main`;
2. GitHub Actions převede nové JPG/PNG na WebP;
3. původní fotografii odstraní;
4. opraví odkaz v Markdown souboru;
5. sestaví a nasadí web.

Pages CMS nemá vlastní databázi obsahu; uložené změny se vracejí přímo jako GitHub commity. ([Pages CMS][4])

---

# 6. Připojení domény od WEDOS

Níže nahraďte:

```text
DOMENA.CZ
```

skutečnou doménou.

Doporučená varianta:

```text
https://DOMENA.CZ
```

jako hlavní adresa a:

```text
https://www.DOMENA.CZ
```

jako automaticky přesměrovaná varianta.

GitHub doporučuje u apex domény nastavit také `www`; pokud jsou DNS záznamy správné, GitHub provede přesměrování mezi oběma variantami. ([GitHub Docs][5])

---

## Krok 1: Doporučené ověření vlastnictví domény

Kamarád otevře nastavení svého GitHub profilu, nikoli repozitáře:

```text
GitHub profil
→ Settings
→ Pages
→ Add a domain
```

Zadá:

```text
DOMENA.CZ
```

GitHub mu zobrazí TXT záznam, například:

```text
Název:
_github-pages-challenge-janbarta51-svg

Hodnota:
unikátní-hodnota-z-githubu
```

V administraci WEDOS:

```text
DNS
→ vybrat DOMENA.CZ
→ DNS záznamy
→ Nový záznam
```

Přidá TXT záznam podle hodnot z GitHubu. U WEDOS se do názvu zadává jen subdoménová část, protože samotná doména je už předvyplněná. ([help.wedos.cz][6])

TXT záznam je vhodné ponechat trvale.

---

## Krok 2: Přidat doménu do repozitáře na GitHubu

Ještě před změnou hlavních DNS záznamů:

```text
janbarta51-svg/Istanbul_projekt
→ Settings
→ Pages
→ Custom domain
```

Zadá:

```text
DOMENA.CZ
```

a klikne **Save**.

GitHub doporučuje přidat vlastní doménu do Pages nastavení před nasměrováním DNS, aby se snížilo riziko převzetí domény jiným Pages webem. Při deploymentu přes GitHub Actions se nevytváří a není potřeba soubor `CNAME`; doména je uložena v nastavení Pages. ([GitHub Docs][5])

---

## Krok 3: Upravit DNS záznamy ve WEDOS

V administraci:

```text
DNS
→ DOMENA.CZ
→ DNS záznamy
```

### Apex doména

Pro název nechat pole **prázdné** a vytvořit čtyři A záznamy:

| Název   | Typ | Data              |
| ------- | --- | ----------------- |
| prázdné | A   | `185.199.108.153` |
| prázdné | A   | `185.199.109.153` |
| prázdné | A   | `185.199.110.153` |
| prázdné | A   | `185.199.111.153` |

### Varianta `www`

| Název | Typ   | Data                       |
| ----- | ----- | -------------------------- |
| `www` | CNAME | `janbarta51-svg.github.io` |

CNAME musí směřovat přímo na:

```text
janbarta51-svg.github.io
```

nikoli na:

```text
janbarta51-svg.github.io/Istanbul_projekt
```

GitHub pro apex doménu uvádí tyto čtyři IPv4 adresy a pro `www` požaduje CNAME na uživatelskou doménu `USERNAME.github.io`. ([GitHub Docs][7])

### Co odstranit

Odstranit nebo nahradit jen konfliktní webové záznamy:

* staré A záznamy pro prázdný název;
* staré AAAA záznamy pro prázdný název;
* staré A, AAAA nebo CNAME záznamy pro `www`;
* případný starý ALIAS pro hlavní doménu.

### Co určitě ponechat

Nesmazat:

* MX záznamy;
* SPF, DKIM a DMARC;
* ostatní e-mailové TXT záznamy;
* ověřovací TXT pro GitHub;
* NS záznamy.

Změna hostingu webu nemusí ovlivnit e-mail, pokud zůstanou e-mailové DNS záznamy zachované.

Nakonec ve WEDOS klikne:

```text
Aplikovat změny
```

WEDOS uvádí, že pro kořen domény se název nechává prázdný a u CNAME se zadává pouze název subdomény, například `www`. ([help.wedos.cz][6])

---

# 7. Ověření DNS

Na Macu:

```bash
dig +short DOMENA.CZ A
```

Výsledek má obsahovat:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Pro `www`:

```bash
dig +short www.DOMENA.CZ CNAME
```

Výsledek:

```text
janbarta51-svg.github.io.
```

Změny DNS mohou být viditelné postupně a GitHub uvádí, že úplná propagace může trvat až 24 hodin. ([GitHub Docs][5])

---

# 8. Znovu spustit deployment po nastavení domény

Po uložení vlastní domény na GitHubu:

```text
Actions
→ Optimize images and deploy Pages
→ Run workflow
→ main
```

Je vhodné web znovu sestavit až s aktuálními Pages údaji o vlastní doméně.

Soubor `_config.yml` nyní obsahuje projektový `baseurl` pro původní GitHub Pages adresu.  Oficiální GitHub Pages build používá metadata repozitáře a Pages nastavení; po změně domény proto musí proběhnout nový build. ([GitHub][8])

---

# 9. Zapnout HTTPS

Jakmile GitHub v:

```text
Settings
→ Pages
```

ukáže správně ověřené DNS, kamarád zapne:

```text
Enforce HTTPS
```

Možnost se nemusí zobrazit okamžitě; GitHub uvádí, že vystavení certifikátu může po DNS změně nějakou dobu trvat. ([GitHub Docs][7])

---

# 10. Finální kontrola

Otevřít obě adresy:

```text
https://DOMENA.CZ
https://www.DOMENA.CZ
```

Zkontrolovat:

* jedna varianta přesměruje na druhou;
* HTTPS funguje bez varování;
* načítají se WebP fotografie;
* funguje rozbalování dnů;
* funguje navigace;
* funguje lightbox;
* Pages CMS upraví existující zápisek;
* nový mobilní zápisek spustí Actions;
* po dokončení workflow se objeví na vlastní doméně.

Po tomto nastavení už kamarád nebude pro běžné přidávání zápisků potřebovat GitHub ani Terminál. Obsah bude spravovat v Pages CMS; GitHub Actions zajistí fotografie, build a nasazení.
