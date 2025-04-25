# 🎬 YouTube 5 Videos Per Row – Userscript

Tired of YouTube wasting your screen space with just 3 videos per row?  
This userscript **forces 5 videos per row** across the homepage and channel views — and keeps them there, even as new videos load dynamically.

---

## ✨ Features

- 🔥 Locks in **5 videos per row** consistently
- ♻️ Fixes YouTube’s **lazy-loaded layout bugs**
- 💡 Reacts to **page navigation** inside YouTube (SPA-safe)
- 📐 Cleans up margins & font sizing for a better aesthetic
- ⚡ Lightweight, fast, and easy to install

---

## ✅ Benefits

- More content visible per screen
- Cleaner, more professional layout
- Zero UI bugs or element clipping
- Works with both light and dark mode

---

## 🚀 Demo

> 🔁 Smooth auto-fixing as you scroll and navigate  
> ![YouTube 5 Videos Per Row Demo](demo/demo.gif)

---

## 📦 Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) (or similar)
2. Click 👉 **[Install the Script](./youtube-5-per-row.user.js)**  
3. Refresh YouTube and enjoy the upgrade!

---

## 🖥 Compatibility

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge

> Fully tested across desktop browsers.  
> Mobile not currently supported.

---

## 🧠 How it Works

YouTube uses lazy grid loading and single-page navigation. This script:
- Overrides their CSS variable `--ytd-rich-grid-items-per-row`
- Observes DOM mutations and reapplies layout styles
- Forces reflow to handle early-rendered rows

No jank. No flash. Just clean layout.

---

## 📜 License

MIT — Use it, remix it, ship it.
