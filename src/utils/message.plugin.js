export default {
  install(Vue) {
    Vue.prototype.$message = function(html) {
      window.M.toast({ html, classes: "cyan rounded" });
    };

    Vue.prototype.$error = function(html) {
      window.M.toast({
        html: `[Ошибка]: ${html}`,
        classes: "deep-orange darken-3 rounded"
      });
    };
  }
};
