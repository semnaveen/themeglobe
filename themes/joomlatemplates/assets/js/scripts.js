function toggleFilterList(element) {
  // Check aria-expanded state
  const pressed = (element.getAttribute("aria-expanded") === "true");
  element.setAttribute("aria-expanded", !pressed);
  element.classList.toggle('closed');
  element.parentNode.parentNode.classList.toggle('closed');
}

document.querySelectorAll(".toggle-icon").forEach((toggleIcon) => {
  toggleIcon.addEventListener('click', (e) => {
    toggleFilterList(e.currentTarget);
  })
  toggleIcon.addEventListener('keydown', (e) => {
    if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") { // "Spacebar" for IE11 support
      // Prevent the default action to stop scrolling when space is pressed
      e.preventDefault();
      toggleFilterList(event.target);
    }
  })
})

function classToggle() {
  const toggle = document.getElementById('filter-toggle')
  const navs = document.querySelectorAll('.sidebar')

  navs.forEach(nav => nav.classList.toggle('open'));
  toggle.classList.toggle('open');
}

document.querySelector('.filter-toggle')
  .addEventListener('click', classToggle);


// Google Analytics
(function(context, trackingId, options) {
  const history = context.history;
  const doc = document;
  const nav = navigator || {};
  const storage = localStorage;
  const encode = encodeURIComponent;
  const pushState = history.pushState;
  const typeException = 'exception';
  const generateId = () => Math.random().toString(36);
  const getId = () => {
    if (!storage.cid) {
      storage.cid = generateId()
    }
    return storage.cid;
  };
  const serialize = (obj) => {
    var str = [];
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (obj[p] !== undefined) {
          str.push(encode(p) + "=" + encode(obj[p]));
        }
      }
    }
    return str.join("&");
  };
  const track = (
    type,
    eventCategory,
    eventAction,
    eventLabel,
    eventValue,
    exceptionDescription,
    exceptionFatal
  ) => {
    const url = 'https://www.google-analytics.com/collect';
    const data = serialize({
      v: '1',
      ds: 'web',
      aip: options.anonymizeIp ? 1 : undefined,
      tid: trackingId,
      cid: getId(),
      t: type || 'pageview',
      sd: options.colorDepth && screen.colorDepth ? `${screen.colorDepth}-bits` : undefined,
      dr: doc.referrer || undefined,
      dt: doc.title,
      dl: doc.location.origin + doc.location.pathname + doc.location.search,
      ul: options.language ? (nav.language || "").toLowerCase() : undefined,
      de: options.characterSet ? doc.characterSet : undefined,
      sr: options.screenSize ? `${(context.screen || {}).width}x${(context.screen || {}).height}` : undefined,
      vp: options.screenSize && context.visualViewport ? `${(context.visualViewport || {}).width}x${(context.visualViewport || {}).height}` : undefined,
      ec: eventCategory || undefined,
      ea: eventAction || undefined,
      el: eventLabel || undefined,
      ev: eventValue || undefined,
      exd: exceptionDescription || undefined,
      exf: typeof exceptionFatal !== 'undefined' && !!exceptionFatal === false ? 0 : undefined,
    });

    if (nav.sendBeacon) {
      nav.sendBeacon(url, data)
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.send(data);
    }
  };
  const trackEvent = (category, action, label, value) => track('event', category, action, label, value);
  const trackException = (description, fatal) => track(typeException, null, null, null, null, description, fatal);
  history.pushState = function(state) {
    if (typeof history.onpushstate == "function") {
      history.onpushstate({
        state: state
      });
    }
    setTimeout(track, options.delay || 10);
    return pushState.apply(history, arguments);
  }
  track();
  context.ma = {
    trackEvent,
    trackException
  }
})(window, "UA-157812294-1", {
  anonymizeIp: true,
  colorDepth: true,
  characterSet: true,
  screenSize: true,
  language: true
});
