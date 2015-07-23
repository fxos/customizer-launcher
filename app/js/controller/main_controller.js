import { Controller } from 'components/fxos-mvc/dist/mvc';
import 'gaia-component';
import MainView from 'js/view/main_view';
import ListController from 'js/controller/list_controller';
import { AchievementsHelper } from 'js/lib/helpers';

export default class MainController extends Controller {
  constructor() {
    this.achievementsHelper = new AchievementsHelper();
    this.view = new MainView({ el: document.body });
    this.listController = new ListController();
    super();
  }

  main() {
    this.view.render();
    this.dialog = document.querySelector('fxos-dev-mode-dialog');

    // fxos-dev-mode-dialog checks and emit event 'enabled' when
    // device dev mode perf is set to true. Continue to load
    // list of apps inside dialog enabled event handler.
    this.dialog.addEventListener('enabled', function() {
      this.listController.main();
    }.bind(this));

    this.helpButton = document.getElementById('help-button');

    // Show help screen on click of help icon
    this.helpButton.addEventListener('click', function() {
      this.listController.helpController.show();
    }.bind(this));
  }
}
