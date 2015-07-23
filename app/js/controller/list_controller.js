import { Controller } from 'components/fxos-mvc/dist/mvc';

import ListModel from 'js/model/list_model';
import ListView from 'js/view/list_view';
import WebServer from 'js/lib/web_server';
import HelpController from 'js/controller/help_controller';

export default class ListController extends Controller {
  constructor() {
    this.model = new ListModel();
    this.listView = new ListView();
    this.webServer = new WebServer();
    this.helpController = new HelpController(this);
  }

  main() {
    this.model.getAllApps().then((allApps) => {
      this.enableCustomizerAddOn(allApps).then(() => {
        this.helpController.main();
        this.createList(allApps);
        this.handleFTU();
      });
    });
  }

  handleFTU() {
    // If the app is launched first time, show help screen
    var isFTU = window.localStorage.getItem('FIRST_LAUNCH');
    if (isFTU !== 'NO') {
      window.localStorage.setItem('FIRST_LAUNCH', 'NO');
      this.helpController.show();
    }
  }

  showAppList() {
    this.listView.el.classList.remove('hidden');
  }

  hideAppList() {
    this.listView.el.classList.add('hidden');
  }

  enableCustomizerAddOn(allApps) {
    return new Promise((resolve, reject) => {
      this.model.getCustomizerAddOn(allApps).then((addon) => {
        if (addon && !addon.enabled) {
          navigator.mozApps.mgmt.setEnabled(addon, true);
        }
        resolve();
      });
    });
  }

  createList(allApps) {
    this.listView.render();
    document.body.appendChild(this.listView.el);

    this.model.getAppList(allApps).then((appsList) => {
      this.listView.update(appsList);
      this.listView.setOpenHandler(this.handleOpen.bind(this));
    });
  }

  handleOpen(data) {
    if (data.app) {
      this.webServer.startServer().then(result => {
        if (result) {
          this.launchApp(data);
          this.webServer.setData(data.manifestURL);
        }
      });
    } else {
      throw new Error('Could not open app: ' + data);
    }
  }

  launchApp(data) {
    // Use entry_point to launch app, if entry_point exists
    if (data.entry_point) {
      data.app.launch(data.entry_point);
    } else {
      data.app.launch();
    }
  }
}
