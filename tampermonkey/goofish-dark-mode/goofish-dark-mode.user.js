// ==UserScript==
// @name         闲鱼网页版暗夜模式
// @namespace    https://www.goofish.com/
// @version      1.2.3
// @description  为闲鱼网页版提供护眼暗夜主题，支持菜单和 Alt/Option + D 快速切换。
// @author       Felix & Codex
// @homepageURL  https://github.com/xioFelix/userscripts/tree/main/tampermonkey/goofish-dark-mode
// @supportURL   https://github.com/xioFelix/userscripts/issues
// @updateURL    https://raw.githubusercontent.com/xioFelix/userscripts/main/tampermonkey/goofish-dark-mode/goofish-dark-mode.user.js
// @downloadURL  https://raw.githubusercontent.com/xioFelix/userscripts/main/tampermonkey/goofish-dark-mode/goofish-dark-mode.user.js
// @match        https://www.goofish.com/*
// @match        https://h5.m.goofish.com/*
// @run-at       document-start
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function () {
  'use strict';

  const STORAGE_KEY = 'goofish-dark-mode-enabled';
  const ROOT_CLASS = 'gf-dark-mode';
  const enabled = GM_getValue(STORAGE_KEY, true);

  function applyTheme(value) {
    document.documentElement.classList.toggle(ROOT_CLASS, value);
    document.documentElement.classList.toggle('gf-dark-h5', location.hostname === 'h5.m.goofish.com');
    document.documentElement.style.colorScheme = value ? 'dark' : '';
    GM_setValue(STORAGE_KEY, value);
  }

  // Apply before the page paints to reduce the initial white flash.
  applyTheme(enabled);

  GM_addStyle(`
    html.${ROOT_CLASS} {
      color-scheme: dark !important;
      --gf-bg: #0f1115;
      --gf-bg-raised: #171a20;
      --gf-bg-soft: #20242c;
      --gf-bg-hover: #292e38;
      --gf-border: #343a46;
      --gf-text: #e8eaf0;
      --gf-text-secondary: #aeb4c0;
      --gf-text-muted: #858c99;
      --gf-yellow: #ffe60f;
      --gf-yellow-soft: rgba(255, 230, 15, .14);
      background: var(--gf-bg) !important;
    }

    html.${ROOT_CLASS} body,
    html.${ROOT_CLASS} #root,
    html.${ROOT_CLASS} #app,
    html.${ROOT_CLASS} [class*="page-container"],
    html.${ROOT_CLASS} [class*="content-container"],
    html.${ROOT_CLASS} [class*="feeds-main"] {
      background-color: var(--gf-bg) !important;
      color: var(--gf-text) !important;
    }
    html.${ROOT_CLASS} body { color: var(--gf-text); }
    html.${ROOT_CLASS} a { color: inherit; }
    html.${ROOT_CLASS}.page-home body > main,
    html.${ROOT_CLASS}.page-home [class*="content-container"] > main {
      background-color: var(--gf-bg) !important;
    }

    /* Mobile H5 documents use inline text colors rather than desktop module classes. */
    html.${ROOT_CLASS}.gf-dark-h5 body,
    html.${ROOT_CLASS}.gf-dark-h5 [class*="docWrap"] {
      background-color: var(--gf-bg) !important;
      color: var(--gf-text) !important;
    }
    html.${ROOT_CLASS}.gf-dark-h5 body :where(h1, h2, h3, h4, h5, h6, p, span, li, label, td, th) {
      color: var(--gf-text) !important;
      border-color: var(--gf-border) !important;
    }
    html.${ROOT_CLASS}.gf-dark-h5 body a,
    html.${ROOT_CLASS}.gf-dark-h5 body a :where(span, p) {
      color: #f6dc28 !important;
    }

    /* Header, search bar and navigation */
    html.${ROOT_CLASS} [class*="header-container"],
    html.${ROOT_CLASS} [class*="header-main"],
    html.${ROOT_CLASS} header,
    html.${ROOT_CLASS} nav {
      background-color: rgba(15, 17, 21, .94) !important;
      color: var(--gf-text) !important;
      border-color: var(--gf-border) !important;
    }
    html.${ROOT_CLASS} [class*="search-container"],
    html.${ROOT_CLASS} [class*="search-input"],
    html.${ROOT_CLASS} input,
    html.${ROOT_CLASS} textarea,
    html.${ROOT_CLASS} select {
      background-color: var(--gf-bg-soft) !important;
      color: var(--gf-text) !important;
      border-color: var(--gf-border) !important;
      caret-color: var(--gf-yellow) !important;
    }
    html.${ROOT_CLASS} [class*="search-history"] {
      background-color: var(--gf-bg-raised) !important;
      color: var(--gf-text) !important;
      border: 1px solid var(--gf-border) !important;
      box-shadow: 0 14px 40px rgba(0, 0, 0, .5) !important;
    }
    html.${ROOT_CLASS} [class*="search-select-items-container"] {
      background-color: var(--gf-bg-raised) !important;
      color: var(--gf-text) !important;
      border: 1px solid var(--gf-border) !important;
      box-shadow: 0 12px 32px rgba(0, 0, 0, .45) !important;
    }
    html.${ROOT_CLASS} [class*="search-select-items-container"] > * {
      color: var(--gf-text) !important;
    }
    html.${ROOT_CLASS} [class*="search-select-items-container"] > *:hover {
      background-color: var(--gf-bg-hover) !important;
    }
    html.${ROOT_CLASS} [class*="history-item"] {
      background-color: transparent !important;
      color: var(--gf-text) !important;
    }
    html.${ROOT_CLASS} [class*="history-item"]:hover,
    html.${ROOT_CLASS} [class*="history-item"]:focus-visible {
      background-color: var(--gf-bg-hover) !important;
    }
    html.${ROOT_CLASS} [class*="search-item"],
    html.${ROOT_CLASS} [class*="nick"],
    html.${ROOT_CLASS} [class*="orderText"],
    html.${ROOT_CLASS} [class*="text--"],
    html.${ROOT_CLASS} [class*="search-select-title"],
    html.${ROOT_CLASS} [class*="areaText"],
    html.${ROOT_CLASS} [class*="search-page-tiny-page"],
    html.${ROOT_CLASS} [class*="search-checkbox-label"],
    html.${ROOT_CLASS} [class*="item-user-info-nick"],
    html.${ROOT_CLASS} [class*="item-feeds-title"],
    html.${ROOT_CLASS} [class*="sidebar-item-text"],
    html.${ROOT_CLASS} [class*="post"],
    html.${ROOT_CLASS} [class*="value"] {
      color: var(--gf-text) !important;
    }
    html.${ROOT_CLASS} [class*="cate-item-title-divider"] {
      color: var(--gf-text-muted) !important;
    }
    html.${ROOT_CLASS} [class*="cate-item-sub-container"] {
      background-color: var(--gf-bg-raised) !important;
      color: var(--gf-text) !important;
      border: 1px solid var(--gf-border) !important;
      box-shadow: 0 16px 44px rgba(0, 0, 0, .5) !important;
    }
    html.${ROOT_CLASS} [class*="cate-item-sub-container"] :where(
      [class*="cate-item-sub-wrap"], [class*="cate-item-sub-item-container"],
      [class*="cate-item-sub-item-cate2"], [class*="cate-item-sub-item-cate3"]
    ) {
      background-color: transparent !important;
      color: var(--gf-text) !important;
      border-color: var(--gf-border) !important;
    }
    html.${ROOT_CLASS} [class*="cate-item-sub-container"] a {
      color: var(--gf-text-secondary) !important;
    }
    html.${ROOT_CLASS} [class*="cate-item-sub-container"] [class*="cate-item-sub-item-cate2"] a,
    html.${ROOT_CLASS} [class*="cate-item-sub-container"] a:hover {
      color: var(--gf-yellow) !important;
    }
    html.${ROOT_CLASS} input::placeholder,
    html.${ROOT_CLASS} textarea::placeholder { color: var(--gf-text-muted) !important; }

    /* Cards, feeds, filters and common overlays */
    html.${ROOT_CLASS} [class*="cate-card"],
    html.${ROOT_CLASS} [class*="mid-card-container"],
    html.${ROOT_CLASS} [class*="right-card-container"],
    html.${ROOT_CLASS} [class*="feeds-item"],
    html.${ROOT_CLASS} [class*="item-card"],
    html.${ROOT_CLASS} [class*="goods-card"],
    html.${ROOT_CLASS} [class*="filter-tab"],
    html.${ROOT_CLASS} [class*="announcementWrap"],
    html.${ROOT_CLASS} [class*="search-filter"],
    html.${ROOT_CLASS} [class*="search-select-container"],
    html.${ROOT_CLASS} [class*="search-price-input-container"],
    html.${ROOT_CLASS} [class*="item-user-container"],
    html.${ROOT_CLASS} [class*="item-main-container"],
    html.${ROOT_CLASS} [class*="item-feeds-container"],
    html.${ROOT_CLASS} [class*="item-user-fish-shop"],
    html.${ROOT_CLASS} [class*="carousel-container"],
    html.${ROOT_CLASS} [class*="notLoginContainer"],
    html.${ROOT_CLASS} [class*="dialog"],
    html.${ROOT_CLASS} [class*="modal"],
    html.${ROOT_CLASS} [class*="popover"],
    html.${ROOT_CLASS} [class*="dropdown"],
    html.${ROOT_CLASS} [role="dialog"],
    html.${ROOT_CLASS} [role="menu"],
    html.${ROOT_CLASS} [role="listbox"] {
      background-color: var(--gf-bg-raised) !important;
      color: var(--gf-text) !important;
      border-color: var(--gf-border) !important;
      box-shadow: 0 10px 36px rgba(0, 0, 0, .42) !important;
    }
    html.${ROOT_CLASS} [class*="search-checkbox"],
    html.${ROOT_CLASS} [class*="search-page-tiny-arrow"],
    html.${ROOT_CLASS} [class*="buttons"] [class*="right"] {
      background-color: var(--gf-bg-soft) !important;
      color: var(--gf-text) !important;
      border-color: var(--gf-border) !important;
    }
    html.${ROOT_CLASS} [class*="feeds-item"]:hover,
    html.${ROOT_CLASS} [class*="item-card"]:hover,
    html.${ROOT_CLASS} [class*="goods-card"]:hover,
    html.${ROOT_CLASS} [role="option"]:hover { background-color: var(--gf-bg-hover) !important; }

    /* Product titles, prices and secondary information */
    html.${ROOT_CLASS} [class*="main-title"],
    html.${ROOT_CLASS} [class*="title"],
    html.${ROOT_CLASS} [class*="seller"],
    html.${ROOT_CLASS} h1,
    html.${ROOT_CLASS} h2,
    html.${ROOT_CLASS} h3,
    html.${ROOT_CLASS} p,
    html.${ROOT_CLASS} span,
    html.${ROOT_CLASS} a,
    html.${ROOT_CLASS} label { border-color: var(--gf-border); }
    html.${ROOT_CLASS} [class*="main-title"],
    html.${ROOT_CLASS} h1,
    html.${ROOT_CLASS} h2,
    html.${ROOT_CLASS} h3 { color: var(--gf-text) !important; }
    html.${ROOT_CLASS} [class*="desc"],
    html.${ROOT_CLASS} [class*="sub-title"],
    html.${ROOT_CLASS} [class*="want"],
    html.${ROOT_CLASS} [class*="credit"] { color: var(--gf-text-secondary) !important; }
    html.${ROOT_CLASS} [class*="gradient-image-text"] {
      background: #3b2a1d !important;
      color: #ffb266 !important;
      border-color: #68472c !important;
    }
    html.${ROOT_CLASS} [class*="credit-container"] {
      background: #3b2a1d !important;
      color: #ffb266 !important;
      border-color: #68472c !important;
    }
    html.${ROOT_CLASS} [class*="credit-container"] > * {
      background: transparent !important;
      color: inherit !important;
      border-color: inherit !important;
    }
    html.${ROOT_CLASS} [class*="right-card-main"] {
      background-color: rgba(23, 26, 32, .9) !important;
      color: var(--gf-text) !important;
    }
    html.${ROOT_CLASS} :where([class*="right-card-main-symbol"], [class*="right-card-main-number"]) {
      color: #ff744d !important;
    }

    /* Region picker is rendered inside an Ant popover but owns light nested columns. */
    html.${ROOT_CLASS} [class*="areaWrap"],
    html.${ROOT_CLASS} [class*="areaWrap"] :where([class*="panel--"], [class*="col--"],
      [class*="provItem"], [class*="cityItem"], [class*="districtItem"]) {
      background-color: var(--gf-bg-raised) !important;
      color: var(--gf-text) !important;
      border-color: var(--gf-border) !important;
    }
    html.${ROOT_CLASS} [class*="areaWrap"] :where([class*="provItemActive"], [class*="cityItemActive"],
      [class*="districtItemActive"]) {
      background-color: var(--gf-bg-hover) !important;
      color: var(--gf-yellow) !important;
    }

    /* Personal center and order/account navigation. Scoped to avoid generic module names elsewhere. */
    html.${ROOT_CLASS} [class*="container--OBD"],
    html.${ROOT_CLASS}.page-personal [class*="personalWrap"],
    html.${ROOT_CLASS} :where([class*="itemContent"], [class*="itemChild"]) {
      background-color: var(--gf-bg-raised) !important;
      color: var(--gf-text) !important;
      border-color: var(--gf-border) !important;
    }
    html.${ROOT_CLASS} [class*="itemContentSelected"],
    html.${ROOT_CLASS} [class*="itemChildSelect"],
    html.${ROOT_CLASS} [class*="itemChild"]:hover {
      background-color: var(--gf-bg-hover) !important;
    }
    html.${ROOT_CLASS}.page-personal :where([class*="itemContent"], [class*="itemChild"],
      [class*="personalWrap"], [class*="tabWrap"]) :where(span, div, a, li) {
      color: inherit !important;
    }
    html.${ROOT_CLASS}.page-personal :where([class*="textReal"], [class*="textShadow"],
      [class*="num"], [class*="infoCenterText"]) {
      color: var(--gf-text) !important;
    }
    html.${ROOT_CLASS}.page-bought :where([class*="content--"], [class*="header--"],
      [class*="container--"], [class*="list--"]) {
      border-color: var(--gf-border) !important;
    }
    html.${ROOT_CLASS}.page-bought > body [class*="content--"] {
      background-color: var(--gf-bg-raised) !important;
      color: var(--gf-text) !important;
    }
    html.${ROOT_CLASS}.page-bought :where([class*="content--"], [class*="header--"],
      [class*="tabs--"], [class*="list--"]) :where(span, div, a, li) {
      color: inherit;
    }
    html.${ROOT_CLASS}.page-bought :where([class*="textReal"], [class*="textShadow"],
      [class*="button--"], [class*="name--"], [class*="sku--"]) {
      color: var(--gf-text) !important;
    }
    html.${ROOT_CLASS}.page-bought [class*="button--"] {
      background-color: var(--gf-bg-soft) !important;
      border-color: var(--gf-border) !important;
    }
    html.${ROOT_CLASS}.page-changelog [class*="changelogWrap"] {
      background-color: var(--gf-bg-raised) !important;
      color: var(--gf-text) !important;
      border-color: var(--gf-border) !important;
    }
    html.${ROOT_CLASS}.page-changelog :where([class*="title--"], [class*="changelogItem"],
      [class*="publish--"], [class*="time--"]) {
      color: var(--gf-text) !important;
      border-color: var(--gf-border) !important;
    }
    html.${ROOT_CLASS}.page-changelog :where([class*="changelogItemDesc"], [class*="publish--"],
      [class*="time--"]) { color: var(--gf-text-secondary) !important; }

    /* Publish form */
    html.${ROOT_CLASS}.page-publish :where([class*="wrapper--"], [class*="editor--"],
      [class*="upload-item"], [class*="addressWrap"], [class*="container--M1N"]) {
      background-color: var(--gf-bg-raised) !important;
      color: var(--gf-text) !important;
      border-color: var(--gf-border) !important;
    }
    html.${ROOT_CLASS}.page-publish :where([class*="upload-item"], [class*="addressWrap"]) {
      background-color: var(--gf-bg-soft) !important;
    }
    html.${ROOT_CLASS}.page-publish :where([class*="title-container"], [class*="info-title"],
      [class*="categoryText"], [class*="address--"], [class*="label--"],
      .ant-input-prefix, .ant-radio-wrapper, .ant-form-item-label > label) {
      color: var(--gf-text) !important;
    }
    html.${ROOT_CLASS}.page-publish :where([class*="counter--"], [class*="serviceFeeDesc"]) {
      color: var(--gf-text-secondary) !important;
    }
    html.${ROOT_CLASS}.page-publish .ant-radio-inner {
      background-color: var(--gf-bg-soft) !important;
      border-color: var(--gf-text-muted) !important;
    }
    html.${ROOT_CLASS}.page-publish .ant-radio-checked .ant-radio-inner {
      background-color: var(--gf-yellow) !important;
      border-color: var(--gf-yellow) !important;
    }
    html.${ROOT_CLASS} a:hover { color: var(--gf-yellow) !important; }
    html.${ROOT_CLASS} [class*="price"],
    html.${ROOT_CLASS} [class*="Price"] { filter: brightness(1.15) saturate(.92); }

    /* Active tabs keep the original Xianyu yellow identity. */
    html.${ROOT_CLASS} [class*="filter"][class*="checked"],
    html.${ROOT_CLASS} [class*="tab"][class*="active"],
    html.${ROOT_CLASS} [class*="tab"][class*="selected"],
    html.${ROOT_CLASS} [aria-selected="true"] {
      background-color: var(--gf-yellow-soft) !important;
      color: var(--gf-yellow) !important;
    }

    /* Footer and floating toolbar */
    html.${ROOT_CLASS} [class*="footer-container"],
    html.${ROOT_CLASS} [class*="footer-wrap"],
    html.${ROOT_CLASS} [class*="float"],
    html.${ROOT_CLASS} [class*="side-bar"],
    html.${ROOT_CLASS} [class*="sidebar-container"],
    html.${ROOT_CLASS} footer {
      background-color: var(--gf-bg-raised) !important;
      color: var(--gf-text-secondary) !important;
      border-color: var(--gf-border) !important;
    }

    /* Ant Design components used on detail, publishing and account pages. */
    html.${ROOT_CLASS} :where(.ant-modal-content, .ant-drawer-content, .ant-popover-inner,
      .ant-dropdown-menu, .ant-select-dropdown, .ant-picker-panel-container,
      .ant-message-notice-content, .ant-notification-notice) {
      background: var(--gf-bg-raised) !important;
      color: var(--gf-text) !important;
      border-color: var(--gf-border) !important;
    }
    html.${ROOT_CLASS} :where(.ant-input, .ant-input-affix-wrapper, .ant-select-selector,
      .ant-picker, .ant-input-number, .ant-upload, .ant-table, .ant-table-container) {
      background: var(--gf-bg-soft) !important;
      color: var(--gf-text) !important;
      border-color: var(--gf-border) !important;
    }
    html.${ROOT_CLASS} :where(.ant-modal-title, .ant-drawer-title, .ant-form-item-label > label,
      .ant-select-selection-item, .ant-empty-description, .ant-table-cell) {
      color: var(--gf-text) !important;
    }

    /* Generic white surfaces used by asynchronously mounted components. */
    html.${ROOT_CLASS} :where(div, section, aside, article, ul)[style*="background: rgb(255, 255, 255)"],
    html.${ROOT_CLASS} :where(div, section, aside, article, ul)[style*="background-color: rgb(255, 255, 255)"],
    html.${ROOT_CLASS} :where(div, section, aside, article, ul)[style*="background: #fff"],
    html.${ROOT_CLASS} :where(div, section, aside, article, ul)[style*="background-color: #fff"] {
      background-color: var(--gf-bg-raised) !important;
    }

    html.${ROOT_CLASS} ::selection { background: rgba(255, 230, 15, .32); color: #fff; }
    html.${ROOT_CLASS} * { scrollbar-color: #4b5260 var(--gf-bg); }
    html.${ROOT_CLASS} ::-webkit-scrollbar { width: 10px; height: 10px; }
    html.${ROOT_CLASS} ::-webkit-scrollbar-track { background: var(--gf-bg); }
    html.${ROOT_CLASS} ::-webkit-scrollbar-thumb { background: #454b57; border: 2px solid var(--gf-bg); border-radius: 8px; }
    html.${ROOT_CLASS} ::-webkit-scrollbar-thumb:hover { background: #5c6472; }

    /* Never recolor or invert product media, avatars, QR codes, SVG logos or video. */
    html.${ROOT_CLASS} img,
    html.${ROOT_CLASS} picture,
    html.${ROOT_CLASS} video,
    html.${ROOT_CLASS} canvas,
    html.${ROOT_CLASS} svg { color-scheme: normal; }
  `);

  function toggleTheme() {
    applyTheme(!document.documentElement.classList.contains(ROOT_CLASS));
  }

  GM_registerMenuCommand('切换闲鱼暗夜模式', toggleTheme);
  window.addEventListener('keydown', (event) => {
    if (event.altKey && event.key.toLowerCase() === 'd') {
      event.preventDefault();
      toggleTheme();
    }
  });
})();
