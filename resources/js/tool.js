Nova.booting((Vue, router, store) => {
  Vue.component("sanctum-tokens", require("./components/Tool"));
  Vue.component("create-token", require("./components/CreateToken"));
  Vue.component("delete-token", require("./components/DeleteToken"));
  Vue.component("show-token", require("./components/ShowToken"));
  Vue.component("token", require("./components/Token"));
});
