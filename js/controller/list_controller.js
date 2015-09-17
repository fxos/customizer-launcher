define(["exports", "components/fxos-mvc/dist/mvc", "js/model/list_model", "js/view/list_view", "js/lib/web_server", "js/controller/help_controller"], function (exports, _componentsFxosMvcDistMvc, _jsModelListModel, _jsViewListView, _jsLibWebServer, _jsControllerHelpController) {
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
  var ListModel = _jsModelListModel["default"];
  var ListView = _jsViewListView["default"];
  var WebServer = _jsLibWebServer["default"];
  var HelpController = _jsControllerHelpController["default"];
  var ListController = (function (Controller) {
    var ListController = function ListController() {
      this.model = new ListModel();
      this.listView = new ListView();
      this.webServer = new WebServer();
      this.helpController = new HelpController(this);
    };

    _extends(ListController, Controller);

    ListController.prototype.main = function () {
      var _this = this;
      this.model.getAllApps().then(function (allApps) {
        _this.enableCustomizerAddOn(allApps).then(function () {
          _this.helpController.main();
          _this.createList(allApps);
          _this.handleFTU();
        });
      });
    };

    ListController.prototype.handleFTU = function () {
      // If the app is launched first time, show help screen
      var isFTU = window.localStorage.getItem("FIRST_LAUNCH");
      if (isFTU !== "NO") {
        window.localStorage.setItem("FIRST_LAUNCH", "NO");
        this.helpController.show();
      }
    };

    ListController.prototype.showAppList = function () {
      this.listView.el.classList.remove("hidden");
    };

    ListController.prototype.hideAppList = function () {
      this.listView.el.classList.add("hidden");
    };

    ListController.prototype.enableCustomizerAddOn = function (allApps) {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        _this2.model.getCustomizerAddOn(allApps).then(function (addon) {
          if (addon && !addon.enabled) {
            navigator.mozApps.mgmt.setEnabled(addon, true);
          }
          resolve();
        });
      });
    };

    ListController.prototype.createList = function (allApps) {
      var _this3 = this;
      this.listView.render();
      document.body.appendChild(this.listView.el);

      this.model.getAppList(allApps).then(function (appsList) {
        _this3.listView.update(appsList);
        _this3.listView.setOpenHandler(_this3.handleOpen.bind(_this3));
      });
    };

    ListController.prototype.handleOpen = function (data) {
      var _this4 = this;
      if (data.app) {
        this.webServer.startServer().then(function (result) {
          if (result) {
            _this4.launchApp(data);
            _this4.webServer.setData(data.manifestURL);
          }
        });
      } else {
        throw new Error("Could not open app: " + data);
      }
    };

    ListController.prototype.launchApp = function (data) {
      // Use entry_point to launch app, if entry_point exists
      if (data.entry_point) {
        data.app.launch(data.entry_point);
      } else {
        data.app.launch();
      }
    };

    return ListController;
  })(Controller);

  exports["default"] = ListController;
});