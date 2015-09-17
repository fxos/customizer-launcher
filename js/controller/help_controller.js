define(["exports", "components/fxos-mvc/dist/mvc", "js/view/help_view"], function (exports, _componentsFxosMvcDistMvc, _jsViewHelpView) {
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

  var Controller = _componentsFxosMvcDistMvc.Controller;
  var HelpView = _jsViewHelpView["default"];
  var HelpController = (function (Controller) {
    var HelpController = function HelpController(listController) {
      this.helpView = new HelpView();
      this.listController = listController;
    };

    _extends(HelpController, Controller);

    HelpController.prototype.main = function () {
      this.helpView.render();
      document.body.appendChild(this.helpView.el);
      this.helpView.setHandlers(this.hide.bind(this));
      this.helpView.goToStep(1);

      // On first launch we hide main header to display help
      // and hide momemtarily header flash seen while rendering help view.
      // Now that help view is displayed we can remove hidden on main header
      document.querySelector(".main-header").classList.remove("hidden");
    };

    HelpController.prototype.show = function () {
      this.listController.hideAppList();
      this.helpView.goToStep(1);
      this.helpView.show();
    };

    HelpController.prototype.hide = function () {
      this.helpView.hide();
      this.listController.showAppList();
    };

    return HelpController;
  })(Controller);

  exports["default"] = HelpController;
});