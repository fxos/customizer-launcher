import { Controller } from 'components/fxos-mvc/dist/mvc';

import HelpView from 'js/view/help_view';

export default class HelpController extends Controller {
  constructor(listController) {
    this.helpView = new HelpView();
    this.listController = listController;
  }

  main() {
    this.helpView.render();
    document.body.appendChild(this.helpView.el);
    this.helpView.setHandlers(this.hide.bind(this));
    this.helpView.goToStep(1);

    // On first launch we hide main header to display help
    // and hide momemtarily header flash seen while rendering help view.
    // Now that help view is displayed we can remove hidden on main header
    document.querySelector('.main-header').classList.remove('hidden');
  }

  show() {
    this.listController.hideAppList();
    this.helpView.goToStep(1);
    this.helpView.show();
  }

  hide() {
    this.helpView.hide();
    this.listController.showAppList();
  }
}
