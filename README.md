# Cesta do Istanbulu

Statický cestovní deník publikovaný přes GitHub Pages a spravovaný přes Pages CMS.

## Přidání nového dne z mobilu

1. Nahraj hlasovou zprávu do připraveného vlákna v ChatGPT.
2. Zkopíruj číslo dne, datum, nadpis a hotový text.
3. Otevři https://app.pagescms.org/ a přihlas se přes GitHub.
4. Otevři tento repozitář a sekci **Denní zápisky**.
5. Klepni na **New**, vyplň pole a nahraj fotografie.
6. Klepni na **Save**. GitHub Pages web automaticky znovu sestaví.

## Struktura

- `_days/den-N.md` – jednotlivé denní zápisky
- `media/` – fotografie
- `index.html` – vzhled a Jekyll šablona
- `.pages.yml` – formulář Pages CMS
- `_config.yml` – konfigurace GitHub Pages/Jekyll
- `CHATGPT-PROMPT.md` – stálý pokyn pro ChatGPT

## Vlastní doména

Dokud web běží na projektové GitHub Pages adrese, `_config.yml` obsahuje:

```yml
baseurl: /Istanbul_projekt
```

Po připojení vlastní domény změň na:

```yml
url: https://vlastni-domena.cz
baseurl: ""
```
