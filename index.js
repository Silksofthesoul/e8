"use strict";
(function() {
  const { random, floor } = Math;
  const insert = (child, root = document.body) => {
    if (!child) return false;
    root.appendChild(child);
  };

  const element = (type, params = {}) => {
    const {
      id,
      class: cls = null,
      style,
      text,
      title,
      event,
      events,
      href,
      src,
      alt,
    } = params;

    const newElement = document.createElement(type);
    if (id) newElement.setAttribute('id', id);
    if (cls) newElement.setAttribute('class', cls);
    if (style) newElement.setAttribute('style', style);
    if (text) newElement.innerText = text;
    if (title) newElement.title = title;
    if (event) newElement.addEventListener(event.type, e => {
      event.handler({
        element: newElement,
        event: e
      });
    });
    if (events) events.forEach(item => {
      newElement.addEventListener(item.type, e => {
        item.handler({
          element: newElement,
          event: e
        });
      });
    });
    if (type === 'a' && href) newElement.setAttribute('href', href);
    if (type === 'a' && target) newElement.setAttribute('target', target);
    if ((type === 'img' || type === 'script') && src) newElement.setAttribute('src', src);
    if (type === 'img' && alt) newElement.setAttribute('alt', alt);
    return newElement;
  };

  const rndMinMaxInt = (min, max) => floor(random() * (max - min + 1)) + min;
  const rndFromArray = (ar) => ar[rndMinMaxInt(0, ar.length -1)];

  const setAttr = (el, keyAttribute, valAttribute) => el.setAttribute(keyAttribute, valAttribute);

  const die = fn => {
    let [this_is, the, E, N, D] = [document, false, 'DOMContentLoaded', 'interactive', 'complete'];
    this_is.addEventListener(E, _ => !the ? (the = true, fn()) : '');
    if (!the && (this_is.readyState === N || this_is.readyState === D))(the = true, fn());
  };

  die(_ => {

    const imgs = ['2.gif', '4.gif'];

    const body = document.body;

    const html = body.parentNode;

    const text = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html, body {
        min-height: 100vh;
      }
      body {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        transition: background-image%0.15s%0s%ease-out;
      }`
    .replace(/[\s\n]/gim, '')
    .replace(/\;\}/gim, '}')
    .replace(/%/gim, ' ');

    const style = element('style', { text });

    insert(style, document.head);

    setAttr(body, 'style', `background-image: url('${rndFromArray(imgs)}')`);

    let t = rndMinMaxInt(1000, 6000);

    const flip = f => f % 2 === 0 ? setAttr(html, 'style', 'transform: scale(-1, 1)') :setAttr(html, 'style', '');

    const loop = _ => {
      let t = rndMinMaxInt(1000, 6000);
      setAttr(body, 'style', `background-image: url('${rndFromArray(imgs)}')`);
      let f = rndMinMaxInt(1, 1000);
      flip(f);
      setTimeout(loop, t);
    };

    loop();
  });
})();
