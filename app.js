/* Yuragi CTF home mockup: language switching, diagram channel picker, "not built" notices. */
(function () {
  "use strict";

  var DICT = window.YURAGI_I18N || {};
  var STORE_KEY = "yuragi-ctf-lang";
  var lang = "en";
  var channel = "xt";
  var toastTimer = null;
  var lastSoonKey = null;

  function supported(code) {
    return code === "ja" || code === "en";
  }

  function readStored() {
    try {
      return window.localStorage.getItem(STORE_KEY);
    } catch (e) {
      return null;
    }
  }

  function writeStored(code) {
    try {
      window.localStorage.setItem(STORE_KEY, code);
    } catch (e) {
      /* storage unavailable: the choice simply lasts for this visit */
    }
  }

  function initialLang() {
    var fromUrl = null;
    try {
      fromUrl = new URLSearchParams(window.location.search).get("lang");
    } catch (e) {
      fromUrl = null;
    }
    if (supported(fromUrl)) return fromUrl;
    var stored = readStored();
    if (supported(stored)) return stored;
    var nav = (navigator.language || "").toLowerCase();
    return nav.indexOf("ja") === 0 ? "ja" : "en";
  }

  function t(key) {
    var table = DICT[lang] || {};
    return Object.prototype.hasOwnProperty.call(table, key) ? table[key] : key;
  }

  function applyText() {
    document.documentElement.lang = lang;
    document.title = t("meta.title");

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = t(nodes[i].getAttribute("data-i18n"));
    }

    var attrNodes = document.querySelectorAll("[data-i18n-attr]");
    for (var j = 0; j < attrNodes.length; j++) {
      var pairs = attrNodes[j].getAttribute("data-i18n-attr").split(",");
      for (var k = 0; k < pairs.length; k++) {
        var parts = pairs[k].split(":");
        attrNodes[j].setAttribute(parts[0].trim(), t(parts[1].trim()));
      }
    }

    var langButtons = document.querySelectorAll("[data-lang]");
    for (var m = 0; m < langButtons.length; m++) {
      var on = langButtons[m].getAttribute("data-lang") === lang;
      langButtons[m].setAttribute("aria-pressed", on ? "true" : "false");
    }

    applyChannel();
    if (lastSoonKey && !document.getElementById("toast").hidden) {
      setToastText(lastSoonKey);
    }
  }

  function applyChannel() {
    var figure = document.getElementById("chip");
    if (figure) figure.setAttribute("data-channel", channel);
    var buttons = document.querySelectorAll("[data-channel-pick]");
    for (var i = 0; i < buttons.length; i++) {
      var on = buttons[i].getAttribute("data-channel-pick") === channel;
      buttons[i].setAttribute("aria-pressed", on ? "true" : "false");
    }
    var caption = document.getElementById("chip-caption");
    if (caption) caption.textContent = t("cap." + channel);
  }

  function setToastText(nameKey) {
    document.getElementById("toast-text").textContent =
      t("toast.soon").replace("{name}", t(nameKey));
  }

  function showSoon(nameKey) {
    var toast = document.getElementById("toast");
    lastSoonKey = nameKey;
    setToastText(nameKey);
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(hideToast, 6000);
  }

  function hideToast() {
    window.clearTimeout(toastTimer);
    document.getElementById("toast").hidden = true;
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || !target.closest) return;

    var langButton = target.closest("[data-lang]");
    if (langButton) {
      var next = langButton.getAttribute("data-lang");
      if (supported(next)) {
        lang = next;
        writeStored(lang);
        applyText();
      }
      return;
    }

    var pick = target.closest("[data-channel-pick]");
    if (pick) {
      channel = pick.getAttribute("data-channel-pick");
      applyChannel();
      return;
    }

    var soon = target.closest("[data-soon]");
    if (soon) {
      showSoon(soon.getAttribute("data-soon"));
      return;
    }

    if (target.closest("#toast-close")) hideToast();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") hideToast();
  });

  lang = initialLang();
  applyText();
  document.documentElement.classList.add("ready");
})();
