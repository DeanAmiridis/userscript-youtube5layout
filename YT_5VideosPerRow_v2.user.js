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
    if (typeof GM_addStyle !== 'undefined') {
        GM_addStyle(css);
    } else {
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    // Apply styles to new items without forcing reflow
    function applyFixes() {
        document.querySelectorAll('ytd-rich-grid-renderer').forEach(renderer => {
            renderer.style.setProperty('--ytd-rich-grid-items-per-row', '5', 'important');
        });

        document.querySelectorAll('ytd-rich-grid-row, #contents.ytd-rich-grid-row').forEach(row => {
            row.style.setProperty('display', 'contents', 'important');
        });

        document.querySelectorAll('ytd-rich-item-renderer').forEach(item => {
            item.style.setProperty('margin-right', 'calc(var(--ytd-rich-grid-item-margin)/2)', 'important');
            item.style.setProperty('margin-left', 'calc(var(--ytd-rich-grid-item-margin)/2)', 'important');
        });
    }

    // Initial fix
    applyFixes();

    // Observe DOM for new rows loading
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if ([...mutation.addedNodes].some(n => n.nodeName.includes('YTD-RICH-GRID'))) {
                applyFixes(); // Only apply without reflow
                break;
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
