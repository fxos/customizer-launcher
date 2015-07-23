import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-header/dist/gaia-header';
import 'components/fxos-dev-mode-dialog/fxos-dev-mode-dialog';

export default class MainView extends View {

  render() {
    super();
  }

  template() {
    var string = `
      <gaia-header class="hidden main-header">
        <h1>Customizer Launcher</h1>
        <a id="help-button"><i data-icon="help"></i></a>
      </gaia-header>
      <fxos-dev-mode-dialog></fxos-dev-mode-dialog>`;
    return string;
  }
}
