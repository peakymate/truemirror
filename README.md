# TrueMirror – sito del progetto

Sito di presentazione di **TrueMirror**, camerino virtuale 3D inclusivo (progetto scolastico GPOI 2026/27, team Foxtrot).

**Sito:** https://peakymate.github.io/truemirror/

## Contenuto

- `index.html`: pagina unica, in italiano e inglese (pulsante IT/EN).
- `assets/avatar.js`: avatar 3D disegnato su canvas, senza librerie. Si ruota trascinando o con le frecce, ha i preset inclusivi (gravidanza, assenza di arto, protesi, asimmetria) e le misure regolabili.
- `assets/main.js`: lingua, tabella dei concorrenti, grafici.
- `assets/style.css`, `assets/fonts/`: stile e font self-hosted (licenza SIL OFL), nessuna richiesta a servizi esterni.

## Pubblicazione

GitHub Pages da branch: **Settings → Pages → Deploy from a branch → `main` / `/ (root)`**. Il file `.nojekyll` evita l'elaborazione Jekyll.

Per provarlo in locale: `python3 -m http.server` nella cartella del repository, poi apri http://localhost:8000.
