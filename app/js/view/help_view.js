import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-button/gaia-button';


export default class HelpView extends View {

  constructor() {
    this.el = document.createElement('div');
    this.el.className = 'help-view hidden';
    this.el.innerHTML = this.template();
  }

  show() {
    this.el.classList.remove('hidden');
  }

  hide() {
    this.el.classList.add('hidden');
  }

  setHandlers(handleDone) {
    this.nextButton = this.el.querySelector('.next-button');
    this.backButton = this.el.querySelector('.back-button');
    this.doneButton = this.el.querySelector('.done-button');

    this.nextButton.addEventListener('click',
      function() {
        this.goToStep(2);
      }.bind(this));

    this.backButton.addEventListener('click',
      function() {
        this.goToStep(1);
      }.bind(this));

    this.doneButton.addEventListener('click', handleDone);
  }

  setButtonVisibility(step) {
    if (step === 2) {
      this.nextButton.classList.add('hidden');
      this.backButton.classList.remove('hidden');
      this.doneButton.classList.remove('hidden');
    } else if (step === 1) {
      this.nextButton.classList.remove('hidden');
      this.backButton.classList.add('hidden');
      this.doneButton.classList.add('hidden');
    }
  }

  fillStepDetails(title, src) {
    document.getElementById('tutorial-step-title').textContent = title;

    var helpImage = document.getElementById('tutorial-step-image');
    helpImage.src = src;

    helpImage.onload = function () {
      helpImage.classList.remove('hidden');
    };
  }

  goToStep(step) {
    var stepText, imgSrc;
    if (step === 2) {
      stepText = 'To close the Customizer, use the 2-finger swipe down gesture.';
      imgSrc = 'img/close.gif';
    } else if (step === 1) {
      stepText = 'From any app, perform the 2-finger swipe up gesture shown below to open Customizer.';
      imgSrc = 'img/open.gif';
    }
    this.fillStepDetails(stepText, imgSrc);
    this.setButtonVisibility(step);
  }

  template() {
     var string = `<section id="tutorial">
        <article id="tutorial-steps-container">
          <section id="tutorial-step-header">
            <p id="tutorial-step-title">
            </p>
          </section>
          <section id="tutorial-step-media">
            <img id="tutorial-step-image" class="hidden">
          </section>
        </article>
        <menu>
          <button class="next-button recommend">Next</button>
          <button class="back-button hidden">Back</button>
          <button class="done-button recommend hidden">Done</button>
        </menu>
      </section>`;
    return string;
  }
}
