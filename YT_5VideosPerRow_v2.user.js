// ==UserScript==
// @name         YouTube 5 Videos Per Row V2
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Forces 5 videos per row on YouTube without resetting scroll position or causing layout jumps.
// @author       Dean
// @match        https://www.youtube.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';

    const css = `
    ytd-rich-grid-renderer {
        --ytd-rich-grid-items-per-row: 5 !important;
    }

    ytd-rich-grid-row, #contents.ytd-rich-grid-row {
        display: contents !important;
    }

    ytd-rich-item-renderer {
        margin-right: calc(var(--ytd-rich-grid-item-margin) / 2) !important;
        margin-left: calc(var(--ytd-rich-grid-item-margin) / 2) !important;
    }

    #video-title.ytd-rich-grid-media,
    #video-title.ytd-rich-grid-slim-media {
        font-size: 1.4rem !important;
        line-height: 2rem !important;
    }

    #metadata-line.ytd-video-meta-block {
        font-size: 1.2rem !important;
        line-height: 1.8rem !important;
    }
    `;

    // Inject static CSS
    const injectCSS = () => {
        if (typeof GM_addStyle !== 'undefined') {
            GM_addStyle(css);
        } else {
            const style = document.createElement('style');
            style.textContent = css;
            document.head.appendChild(style);
        }
    };

    // Apply styles to new items without forcing reflow
    const applyFixes = () => {
        const renderers = document.querySelectorAll('ytd-rich-grid-renderer');
        const rows = document.querySelectorAll('ytd-rich-grid-row, #contents.ytd-rich-grid-row');
        const items = document.querySelectorAll('ytd-rich-item-renderer');

        renderers.forEach(renderer => renderer.style.setProperty('--ytd-rich-grid-items-per-row', '5', 'important'));
        rows.forEach(row => row.style.setProperty('display', 'contents', 'important'));
        items.forEach(item => {
            item.style.setProperty('margin-right', 'calc(var(--ytd-rich-grid-item-margin)/2)', 'important');
            item.style.setProperty('margin-left', 'calc(var(--ytd-rich-grid-item-margin)/2)', 'important');
        });
    };

    // Observe DOM for new rows loading
    const observeDOM = () => {
        const observer = new MutationObserver(mutations => {
            if (mutations.some(mutation => [...mutation.addedNodes].some(n => n.nodeName.includes('YTD-RICH-GRID')))) {
                applyFixes();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    };

    // Initialize script
    const init = () => {
        injectCSS();
        applyFixes();
        observeDOM();
    };

    init();
})();
