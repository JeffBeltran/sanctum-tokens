Nova.booting((Vue, router, store) => {
  Vue.component("sanctum-tokens", require("./components/Tool").default);
  Vue.component("create-token", require("./components/CreateToken").default);
  Vue.component("delete-token", require("./components/DeleteToken").default);
  Vue.component("show-token", require("./components/ShowToken").default);
  Vue.component("token", require("./components/Token").default);
});
