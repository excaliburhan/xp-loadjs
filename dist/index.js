(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.xpLib = {})));
}(this, (function (exports) { 'use strict';

  /**
   * @author xiaoping
   * @email edwardhjp@gmail.com
   * @create date 2018-01-17 11:48:00
   * @modify date 2018-01-17 11:48:00
   * @desc [动态加载js]
  */

  function createLoadJS() {
    // 执行函数
    function exec(options) {
      if (typeof options === 'string') {
        options = { url: options };
      }
      if (!options.url) {
        throw new Error('loadjs: you must provide a url');
      }
      if (checkLoaded(options.url)) {
        return Promise.resolve('loaded');
      } else {
        return loadScript(options.selector, createScript(options));
      }
    }

    // 去除协议
    function removeProtocol(url) {
      return url.replace(/^https?:/, '');
    }
    // 检查是否已经加载
    function checkLoaded(url) {
      url = removeProtocol(url);
      var tags = Array.prototype.slice.apply(document.getElementsByTagName('script'));
      var urls = tags.map(function (item) {
        return removeProtocol(item.src);
      });
      return urls.indexOf(url) > -1;
    }
    // 加载
    function loadScript(selector, script) {
      selector = selector || document.body;
      return new Promise(function (resolve, reject) {
        var done = false;
        // 处理浏览器兼容
        script.onload = script.onreadystatechange = function () {
          if (!done && (!script.readyState || script.readyState === 'loaded' || script.readyState === 'complete')) {
            done = true;
            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null;
            resolve(script);
          }
        };
        script.onerror = reject;

        selector.appendChild(script);
      });
    }

    // 创建
    function createScript(options) {
      var script = document.createElement('script');
      script.charset = options.charset || 'utf-8';
      script.type = options.type || 'text/javascript';
      script.async = !!options.async;

      if (options.url) {
        script.src = options.url;
      }

      return script;
    }

    return function load(items) {
      return items instanceof Array ? Promise.all(items.map(exec)) : exec(items);
    };
  }

  var index = createLoadJS();

  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
