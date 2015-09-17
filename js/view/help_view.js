define(["exports", "components/fxos-mvc/dist/mvc", "components/gaia-button/gaia-button"], function (exports, _componentsFxosMvcDistMvc, _componentsGaiaButtonGaiaButton) {
  "use strict";

  var _extends = function (child, parent) {
    child.prototype = Object.create(parent.prototype, {
      constructor: {
        value: child,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    child.__proto__ = parent;
  };

  var View = _componentsFxosMvcDistMvc.View;
  var HelpView = (function (View) {
    var HelpView = function HelpView() {
      this.el = document.createElement("div");
      this.el.className = "help-view hidden";
      this.el.innerHTML = this.template();
    };

    _extends(HelpView, View);

    HelpView.prototype.show = function () {
      this.el.classList.remove("hidden");
    };

    HelpView.prototype.hide = function () {
      this.el.classList.add("hidden");
    };

    HelpView.prototype.setHandlers = function (handleDone) {
      this.nextButton = this.el.querySelector(".next-button");
      this.backButton = this.el.querySelector(".back-button");
      this.doneButton = this.el.querySelector(".done-button");

      this.nextButton.addEventListener("click", function () {
        this.goToStep(2);
      }.bind(this));

      this.backButton.addEventListener("click", function () {
        this.goToStep(1);
      }.bind(this));

      this.doneButton.addEventListener("click", handleDone);
    };

    HelpView.prototype.setButtonVisibility = function (step) {
      if (step === 2) {
        this.nextButton.classList.add("hidden");
        this.backButton.classList.remove("hidden");
        this.doneButton.classList.remove("hidden");
      } else if (step === 1) {
        this.nextButton.classList.remove("hidden");
        this.backButton.classList.add("hidden");
        this.doneButton.classList.add("hidden");
      }
    };

    HelpView.prototype.fillStepDetails = function (title, src) {
      document.getElementById("tutorial-step-title").textContent = title;

      var helpImage = document.getElementById("tutorial-step-image");
      helpImage.src = src;

      helpImage.onload = function () {
        helpImage.classList.remove("hidden");
      };
    };

    HelpView.prototype.goToStep = function (step) {
      var stepText, imgSrc;
      if (step === 2) {
        stepText = "To close the Customizer, use the 2-finger swipe down gesture.";
        imgSrc = "img/close.gif";
      } else if (step === 1) {
        stepText = "From any app, perform the 2-finger swipe up gesture shown below to open Customizer.";
        imgSrc = "img/open.gif";
      }
      this.fillStepDetails(stepText, imgSrc);
      this.setButtonVisibility(step);
    };

    HelpView.prototype.template = function () {
      var string = "<section id=\"tutorial\">\n        <article id=\"tutorial-steps-container\">\n          <section id=\"tutorial-step-header\">\n            <p id=\"tutorial-step-title\">\n            </p>\n          </section>\n          <section id=\"tutorial-step-media\">\n            <img id=\"tutorial-step-image\" class=\"hidden\">\n          </section>\n        </article>\n        <menu>\n          <button class=\"next-button recommend\">Next</button>\n          <button class=\"back-button hidden\">Back</button>\n          <button class=\"done-button recommend hidden\">Done</button>\n        </menu>\n      </section>";
      return string;
    };

    return HelpView;
  })(View);

  exports["default"] = HelpView;
});