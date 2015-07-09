/* global Sanitizer */

import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-list/gaia-list';
import 'components/gaia-button/gaia-button';
import { IconHelper } from 'js/lib/helpers';

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export default class ListView extends View {
  constructor() {
    this.el = document.createElement('gaia-list');
    this.el.className = 'app-list';
    
    this.elements = Object.create(null);
  }

  update(list) {
    for (let key in list) {
      let data = list[key];
      if (!this.elements[key]) {
        this.elements[key] = this.addElement(data);
      }
    }
  }

  setOpenHandler(handler) {
    if (!this.openHandler) {
      this.openHandler = handler;
    }
  }

  addElement(data) {
    var item = document.createElement('li');
    item.classList.add('app');
    item.innerHTML = Sanitizer.unwrapSafeHTML(this.listItemTemplate(data));
    IconHelper.setImage(item.querySelector('.icon'), data.icon);
    this.el.appendChild(item);

    item.querySelector('.open-button').addEventListener('click',
      function(data) {
        this.openHandler(data);
      }.bind(this, data));

    return item;
  }

  listItemTemplate({ name, author }) {
    var string = Sanitizer.createSafeHTML`
      <img class="icon" />
      <div flex class="description">
        <p class="name">${capitalize(name)}</p>
        <p class="author">${author}</p>
      </div>
      <gaia-button class="open-button">Open</gaia-button>`;
    return string;
  }

}
