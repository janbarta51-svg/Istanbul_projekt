# Cesta do Istanbulu

Statický cestovní deník publikovaný přes GitHub Pages a spravovaný
přes Pages CMS.

## Přidání nového dne z mobilu

1. Nahraj hlasovou zprávu do připraveného vlákna v ChatGPT.
2. Zkopíruj číslo dne, datum, nadpis, odkud, kam a text.
3. Otevři Pages CMS a přihlas se přes GitHub.
4. Otevři sekci **Denní zápisky**.
5. Klepni na **New**, vyplň pole a nahraj fotografie.
6. Klepni na **Save**.

GitHub Pages následně web automaticky znovu sestaví.

Nadpis má vystihnout příběh dne a nemá obsahovat trasu. Výchozí a
cílové místo patří pouze do polí **Odkud** a **Kam**, ideálně s vlajkou
země (například `🇷🇸 Mol` → `🇷🇸 Zrenjanin`).

## Struktura

- `_days/den-N.md` – jednotlivé zápisky;
- `media/` – fotografie a loga externích služeb;
- `index.html` – struktura stránky a vykreslení zápisků;
- `_includes/journey-hero.html` – SVG ilustrace v záhlaví;
- `assets/css/style.css` – kompletní vzhled a responzivní pravidla;
- `assets/js/main.js` – otevření zápisku odkazovaného v URL;
- `.pages.yml` – konfigurace Pages CMS;
- `_config.yml` – konfigurace Jekyllu;
- `CHATGPT-PROMPT.md` – pokyn pro hlasové zápisky.

Web je navržený jako průběžný polní deník. Jednotlivé zápisky jsou
řazené chronologicky a ve výchozím stavu sbalené, aby zůstal přehledný
i na mobilu. Klepnutím na den se zápisek kdykoli rozbalí. Animace v
záhlaví je součástí HTML a CSS, takže nevyžaduje těžký GIF ani externí
knihovnu. Při zapnutém omezení pohybu v systému se automaticky zastaví.
