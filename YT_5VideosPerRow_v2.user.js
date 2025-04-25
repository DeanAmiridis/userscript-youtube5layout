// ==UserScript==
// @name         YouTube 5 Videos Per Row V2
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Forces YouTube to always show 5 videos per row, including correcting pre-rendered top rows reliably every time
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

    // Inject CSS
    if (typeof GM_addStyle !== 'undefined') {
        GM_addStyle(css);
    } else {
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    function forceTopRowsFix() {
        const gridRenderers = document.querySelectorAll('ytd-rich-grid-renderer');
        gridRenderers.forEach((renderer, index) => {
            renderer.style.setProperty('--ytd-rich-grid-items-per-row', '5', 'important');

            if (index < 3) {
                renderer.style.display = 'none';
                renderer.offsetHeight; // trigger reflow
                renderer.style.display = '';
            }
        });
    }

    function applyFixes() {
        forceTopRowsFix();

        document.querySelectorAll('ytd-rich-grid-row, #contents.ytd-rich-grid-row').forEach(row => {
            row.style.setProperty('display', 'contents', 'important');
        });

        document.querySelectorAll('ytd-rich-item-renderer').forEach(item => {
            item.style.setProperty('margin-right', 'calc(var(--ytd-rich-grid-item-margin)/2)', 'important');
            item.style.setProperty('margin-left', 'calc(var(--ytd-rich-grid-item-margin)/2)', 'important');
        });
    }

    // Repeated correction interval for early-rendered rows
    let retryCount = 0;
    const retryInterval = setInterval(() => {
        applyFixes();
        retryCount++;

        // Stop after 2.5 seconds (~5 tries)
        if (retryCount > 5) {
            clearInterval(retryInterval);
        }
    }, 500);

    // Observe dynamic changes (scrolling, page navigation)
    const observer = new MutationObserver(() => {
        applyFixes();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
