!(function (t) {
  var e = {};
  function n(o) {
    if (e[o]) return e[o].exports;
    var s = (e[o] = { i: o, l: !1, exports: {} });
    return t[o].call(s.exports, s, s.exports, n), (s.l = !0), s.exports;
  }
  (n.m = t),
    (n.c = e),
    (n.d = function (t, e, o) {
      n.o(t, e) ||
        Object.defineProperty(t, e, {
          configurable: !1,
          enumerable: !0,
          get: o,
        });
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(e, "a", e), e;
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ""),
    n((n.s = 1));
})([
  function (t, e) {
    t.exports = function (t, e, n, o, s, a) {
      var i,
        r = (t = t || {}),
        l = typeof t.default;
      ("object" !== l && "function" !== l) || ((i = t), (r = t.default));
      var c,
        d = "function" == typeof r ? r.options : r;
      if (
        (e &&
          ((d.render = e.render),
          (d.staticRenderFns = e.staticRenderFns),
          (d._compiled = !0)),
        n && (d.functional = !0),
        s && (d._scopeId = s),
        a
          ? ((c = function (t) {
              (t =
                t ||
                (this.$vnode && this.$vnode.ssrContext) ||
                (this.parent &&
                  this.parent.$vnode &&
                  this.parent.$vnode.ssrContext)) ||
                "undefined" == typeof __VUE_SSR_CONTEXT__ ||
                (t = __VUE_SSR_CONTEXT__),
                o && o.call(this, t),
                t && t._registeredComponents && t._registeredComponents.add(a);
            }),
            (d._ssrRegister = c))
          : o && (c = o),
        c)
      ) {
        var u = d.functional,
          f = u ? d.render : d.beforeCreate;
        u
          ? ((d._injectStyles = c),
            (d.render = function (t, e) {
              return c.call(e), f(t, e);
            }))
          : (d.beforeCreate = f ? [].concat(f, c) : [c]);
      }
      return { esModule: i, exports: r, options: d };
    };
  },
  function (t, e, n) {
    n(2), (t.exports = n(23));
  },
  function (t, e, n) {
    Nova.booting(function (t, e, o) {
      t.component("sanctum-tokens", n(3)),
        t.component("create-token", n(6)),
        t.component("delete-token", n(9)),
        t.component("show-token", n(12)),
        t.component("token", n(15));
    });
  },
  function (t, e, n) {
    var o = n(0)(n(4), n(5), !1, null, null, null);
    t.exports = o.exports;
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = {
        props: ["resourceName", "resourceId", "panel"],
        data: function () {
          return {
            tokens: [],
            showAddModal: !1,
            tokenName: null,
            tokenAbilities: null,
            personalAccessToken: null,
            showPersonalAccessTokenModal: !1,
          };
        },
        created: function () {
          this.fetchTokens();
        },
        methods: {
          copyToken: function () {
            this.$refs.token.select(), document.execCommand("copy");
          },
          openModal: function () {
            this.showAddModal = !0;
          },
          confirmModal: function () {
            this.modalOpen = !1;
          },
          closeModal: function () {
            (this.showAddModal = !1), (this.tokenName = null);
          },
          createToken: function () {
            this.getNewToken(), this.closeModal();
          },
          getNewToken: function () {
            var t = this;
            Nova.request()
              .post(
                "/nova-vendor/sanctum-tokens/tokens/" +
                  this.resourceName +
                  "/" +
                  this.resourceId,
                { name: this.tokenName, abilities: this.tokenAbilities }
              )
              .then(function (e) {
                console.log(e.data),
                  (t.personalAccessToken = e.data),
                  (t.showPersonalAccessTokenModal = !0);
              });
          },
          fetchTokens: function () {
            var t = this;
            Nova.request()
              .get(
                "/nova-vendor/sanctum-tokens/tokens/" +
                  this.resourceName +
                  "/" +
                  this.resourceId
              )
              .then(function (e) {
                t.tokens = e.data.tokens;
              });
          },
          revokeToken: function (t) {
            Nova.request()
              .post(
                "/nova-vendor/sanctum-tokens/tokens/" +
                  this.resourceName +
                  "/" +
                  this.resourceId +
                  "/revoke",
                { token_id: t }
              )
              .then(function (t) {
                location.reload();
              });
          },
        },
      });
  },
  function (t, e) {
    t.exports = {
      render: function () {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "div",
          {
            staticClass: "relative",
            attrs: { dusk: "profiles-index-component" },
          },
          [
            n("h1", { staticClass: "mb-3 text-90 font-normal text-2xl" }, [
              t._v("Personal Access Tokens"),
            ]),
            t._v(" "),
            n("div", { staticClass: "flex" }, [
              n("div", { staticClass: "w-full flex items-center" }, [
                n("div", { staticClass: "flex-no-shrink ml-auto mb-6" }, [
                  n(
                    "button",
                    {
                      staticClass: "btn btn-default btn-primary",
                      on: {
                        click: function (e) {
                          t.showAddModal = !0;
                        },
                      },
                    },
                    [t._v("\n          Create Token\n        ")]
                  ),
                ]),
              ]),
            ]),
            t._v(" "),
            n("div", { staticClass: "card" }, [
              t.tokens.length
                ? n(
                    "div",
                    { staticClass: "overflow-hidden overflow-x-auto relative" },
                    [
                      n(
                        "table",
                        {
                          staticClass: "table w-full",
                          attrs: { cellspacing: "0", cellpadding: "0" },
                        },
                        [
                          t._m(0),
                          t._v(" "),
                          n(
                            "tbody",
                            t._l(t.tokens, function (e) {
                              return n("token", {
                                key: e.id,
                                attrs: { token: e },
                                on: { "revoke-token": t.revokeToken },
                              });
                            }),
                            1
                          ),
                        ]
                      ),
                    ]
                  )
                : n(
                    "div",
                    {
                      staticClass: "flex justify-center items-center px-6 py-8",
                    },
                    [
                      n("div", { staticClass: "text-center" }, [
                        n(
                          "svg",
                          {
                            staticClass: "w-5 h-5 mb-3",
                            attrs: {
                              fill: "none",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                            },
                          },
                          [
                            n("path", {
                              attrs: {
                                d:
                                  "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
                              },
                            }),
                          ]
                        ),
                        t._v(" "),
                        n(
                          "h3",
                          { staticClass: "text-base text-80 font-normal mb-6" },
                          [t._v("\n          No Tokens For User.\n        ")]
                        ),
                        t._v(" "),
                        n("div", [
                          n(
                            "button",
                            {
                              staticClass:
                                "btn btn-sm btn-outline inline-flex items-center focus:outline-none focus:shadow-outline active:outline-none active:shadow-outline",
                              on: {
                                click: function (e) {
                                  t.showAddModal = !0;
                                },
                              },
                            },
                            [t._v("\n            Create Token\n          ")]
                          ),
                        ]),
                      ]),
                    ]
                  ),
            ]),
            t._v(" "),
            n(
              "portal",
              { attrs: { to: "modals", transition: "fade-transition" } },
              [
                t.showAddModal
                  ? n(
                      "create-token",
                      {
                        on: {
                          create: t.createToken,
                          "cancelled-create": t.closeModal,
                        },
                      },
                      [
                        n("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: t.tokenName,
                              expression: "tokenName",
                            },
                          ],
                          staticClass:
                            "w-full form-control form-input form-input-bordered",
                          attrs: {
                            slot: "name",
                            id: "name",
                            list: "name-list",
                            type: "text",
                            placeholder: "Name",
                          },
                          domProps: { value: t.tokenName },
                          on: {
                            input: function (e) {
                              e.target.composing ||
                                (t.tokenName = e.target.value);
                            },
                          },
                          slot: "name",
                        }),
                        t._v(" "),
                        n("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: t.tokenAbilities,
                              expression: "tokenAbilities",
                            },
                          ],
                          staticClass:
                            "w-full form-control form-input form-input-bordered",
                          attrs: {
                            slot: "abilities",
                            id: "abilities",
                            list: "abilities-list",
                            type: "text",
                            placeholder: "Abilities",
                          },
                          domProps: { value: t.tokenAbilities },
                          on: {
                            input: function (e) {
                              e.target.composing ||
                                (t.tokenAbilities = e.target.value);
                            },
                          },
                          slot: "abilities",
                        }),
                      ]
                    )
                  : t._e(),
                t._v(" "),
                t.showPersonalAccessTokenModal
                  ? n(
                      "show-token",
                      {
                        on: {
                          confirm: function (e) {
                            t.showPersonalAccessTokenModal = !1;
                          },
                        },
                      },
                      [
                        n("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: t.personalAccessToken,
                              expression: "personalAccessToken",
                            },
                          ],
                          ref: "token",
                          staticClass:
                            "w-full form-control form-input form-input-bordered",
                          attrs: {
                            id: "name",
                            type: "text",
                            placeholder: "Name",
                            readonly: "",
                          },
                          domProps: { value: t.personalAccessToken },
                          on: {
                            input: function (e) {
                              e.target.composing ||
                                (t.personalAccessToken = e.target.value);
                            },
                          },
                        }),
                        t._v(" "),
                        n(
                          "button",
                          {
                            staticClass:
                              "ml-4 flex items-center btn btn-link dim cursor-pointer text-80",
                            attrs: { type: "button" },
                            on: { click: t.copyToken },
                          },
                          [
                            n(
                              "svg",
                              {
                                staticClass: "-ml-1 mr-2 h-5 w-5",
                                attrs: {
                                  fill: "none",
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor",
                                },
                              },
                              [
                                n("path", {
                                  attrs: {
                                    d:
                                      "M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3",
                                  },
                                }),
                              ]
                            ),
                            t._v("\n        Copy\n      "),
                          ]
                        ),
                      ]
                    )
                  : t._e(),
              ],
              1
            ),
          ],
          1
        );
      },
      staticRenderFns: [
        function () {
          var t = this.$createElement,
            e = this._self._c || t;
          return e("thead", [
            e("tr", [
              e("th", { staticClass: "text-left" }, [
                e("span", [this._v("Name")]),
              ]),
              this._v(" "),
              e("th", { staticClass: "text-left" }, [
                e("span", [this._v("Abilities")]),
              ]),
              this._v(" "),
              e("th", { staticClass: "text-left" }, [
                e("span", [this._v("Last Used At")]),
              ]),
              this._v(" "),
              e("th", [this._v(" ")]),
            ]),
          ]);
        },
      ],
    };
  },
  function (t, e, n) {
    var o = n(0)(n(7), n(8), !1, null, null, null);
    t.exports = o.exports;
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = {
        mounted: function () {
          document.querySelectorAll(".modal input")[0].focus();
        },
        methods: {
          handleKeydown: function (t) {
            -1 === ["Escape", "Enter"].indexOf(t.key) && t.stopPropagation();
          },
          handleCreate: function () {
            this.$emit("create");
          },
          handleCancelledCreate: function () {
            this.$emit("cancelled-create");
          },
        },
      });
  },
  function (t, e) {
    t.exports = {
      render: function () {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "modal",
          {
            attrs: { tabindex: "-1", role: "dialog" },
            on: { "modal-close": t.handleCancelledCreate },
          },
          [
            n(
              "form",
              {
                staticClass:
                  "bg-white rounded-lg shadow-lg overflow-hidden w-action-fields",
                attrs: { autocomplete: "off" },
                on: {
                  keydown: t.handleKeydown,
                  submit: function (e) {
                    return (
                      e.preventDefault(), e.stopPropagation(), t.handleCreate(e)
                    );
                  },
                },
              },
              [
                n("div", [
                  n(
                    "h2",
                    {
                      staticClass:
                        "border-b border-40 py-8 px-8 text-90 font-normal text-xl",
                    },
                    [t._v("\n        Create Personal Access Token\n      ")]
                  ),
                  t._v(" "),
                  n("div", [
                    n("div", { staticClass: "action" }, [
                      n("div", { staticClass: "border-b border-40" }, [
                        n("div", { staticClass: "flex w-full" }, [
                          n("div", { staticClass: "w-1/5 px-8 py-6" }, [
                            n(
                              "label",
                              {
                                staticClass:
                                  "inline-block text-80 pt-2 leading-tight",
                                attrs: { for: "name" },
                              },
                              [t._v("Name")]
                            ),
                          ]),
                          t._v(" "),
                          n(
                            "div",
                            { staticClass: "py-6 px-8 w-1/2" },
                            [
                              t._t("name"),
                              t._v(" "),
                              n("div", {
                                staticClass: "help-text help-text mt-2",
                              }),
                            ],
                            2
                          ),
                        ]),
                        t._v(" "),
                        n("div", { staticClass: "flex w-full" }, [
                          n("div", { staticClass: "w-1/5 px-8 py-6" }, [
                            n(
                              "label",
                              {
                                staticClass:
                                  "inline-block text-80 pt-2 leading-tight",
                                attrs: { for: "scopes" },
                              },
                              [t._v("Abilities")]
                            ),
                          ]),
                          t._v(" "),
                          n(
                            "div",
                            { staticClass: "py-6 px-8 w-1/2" },
                            [
                              t._t("abilities"),
                              t._v(" "),
                              n(
                                "div",
                                { staticClass: "help-text help-text mt-2" },
                                [
                                  t._v(
                                    "\n                  Comma separated list of abilities to apply to token.\n                "
                                  ),
                                ]
                              ),
                            ],
                            2
                          ),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
                t._v(" "),
                n("div", { staticClass: "bg-30 px-6 py-3 flex" }, [
                  n("div", { staticClass: "flex items-center ml-auto" }, [
                    n(
                      "button",
                      {
                        staticClass:
                          "btn btn-link dim cursor-pointer text-80 ml-auto mr-6",
                        attrs: { type: "button" },
                        on: {
                          click: function (e) {
                            return (
                              e.preventDefault(), t.handleCancelledCreate(e)
                            );
                          },
                        },
                      },
                      [
                        t._v(
                          "\n          " + t._s(t.__("Cancel")) + "\n        "
                        ),
                      ]
                    ),
                    t._v(" "),
                    n(
                      "button",
                      {
                        staticClass: "btn btn-default btn-primary",
                        attrs: {
                          dusk: "confirm-action-button",
                          type: "submit",
                        },
                      },
                      [n("span", [t._v(t._s(t.__("Create Token")))])]
                    ),
                  ]),
                ]),
              ]
            ),
          ]
        );
      },
      staticRenderFns: [],
    };
  },
  function (t, e, n) {
    var o = n(0)(n(10), n(11), !1, null, null, null);
    t.exports = o.exports;
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = {
        props: { token: { required: !0, type: Object } },
        methods: {
          handleClose: function () {
            this.$emit("close");
          },
          handleConfirm: function () {
            this.$emit("confirm");
          },
        },
        mounted: function () {
          this.$refs.confirmButton.focus();
        },
      });
  },
  function (t, e) {
    t.exports = {
      render: function () {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("modal", { on: { "modal-close": t.handleClose } }, [
          n(
            "form",
            {
              staticClass: "bg-white rounded-lg shadow-lg overflow-hidden",
              staticStyle: { width: "460px" },
              on: {
                submit: function (e) {
                  return e.preventDefault(), t.handleConfirm(e);
                },
              },
            },
            [
              n(
                "div",
                { staticClass: "p-8" },
                [
                  n("heading", { staticClass: "mb-6", attrs: { level: 2 } }, [
                    t._v(
                      "\n        " + t._s(t.__("Delete Token")) + "\n      "
                    ),
                  ]),
                  t._v(" "),
                  n("p", { staticClass: "text-80 leading-normal" }, [
                    t._v(
                      "\n        Are you sure you want to delete the " +
                        t._s(t.token.name) +
                        " token?\n      "
                    ),
                  ]),
                ],
                1
              ),
              t._v(" "),
              n("div", { staticClass: "bg-30 px-6 py-3 flex" }, [
                n("div", { staticClass: "ml-auto" }, [
                  n(
                    "button",
                    {
                      staticClass:
                        "btn text-80 font-normal h-9 px-3 mr-3 btn-link",
                      attrs: { type: "button" },
                      on: {
                        click: function (e) {
                          return e.preventDefault(), t.handleClose(e);
                        },
                      },
                    },
                    [t._v("\n          " + t._s(t.__("Cancel")) + "\n        ")]
                  ),
                  t._v(" "),
                  n(
                    "button",
                    {
                      ref: "confirmButton",
                      staticClass: "btn btn-default btn-danger",
                      attrs: { id: "confirm-delete-button", type: "submit" },
                    },
                    [
                      t._v(
                        "\n          " +
                          t._s(t.__("Delete Token")) +
                          "\n        "
                      ),
                    ]
                  ),
                ]),
              ]),
            ]
          ),
        ]);
      },
      staticRenderFns: [],
    };
  },
  function (t, e, n) {
    var o = n(0)(n(13), n(14), !1, null, null, null);
    t.exports = o.exports;
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = {
        mounted: function () {
          document.querySelectorAll(".modal input")[0].focus();
        },
        methods: {
          handleKeydown: function (t) {
            -1 === ["Escape", "Enter"].indexOf(t.key) && t.stopPropagation();
          },
          handleConfirm: function () {
            this.$emit("confirm");
          },
        },
      });
  },
  function (t, e) {
    t.exports = {
      render: function () {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("modal", { attrs: { tabindex: "-1", role: "dialog" } }, [
          n(
            "form",
            {
              staticClass:
                "bg-white rounded-lg shadow-lg overflow-hidden w-action-fields",
              attrs: { autocomplete: "off" },
              on: { keydown: t.handleKeydown },
            },
            [
              n("div", [
                n(
                  "h2",
                  {
                    staticClass:
                      "border-b border-40 py-8 px-8 text-90 font-normal text-xl",
                  },
                  [t._v("\n        Personal Access Token\n      ")]
                ),
                t._v(" "),
                n("div", [
                  n("div", { staticClass: "action" }, [
                    n(
                      "div",
                      { staticClass: "flex flex-col border-b border-40" },
                      [
                        n(
                          "div",
                          { staticClass: "flex items-center py-6 px-8" },
                          [t._t("default")],
                          2
                        ),
                        t._v(" "),
                        n(
                          "div",
                          { staticClass: "flex items-center pb-6 px-8" },
                          [
                            n(
                              "div",
                              {
                                staticClass:
                                  "w-full rounded bg-danger-light text-danger-dark border-l-4 border-danger-dark p-4",
                              },
                              [
                                n("div", { staticClass: "flex" }, [
                                  n(
                                    "div",
                                    {
                                      staticClass:
                                        "flex flex-shrink-0 items-center",
                                    },
                                    [
                                      n(
                                        "svg",
                                        {
                                          staticClass:
                                            "h-5 w-5 text-yellow-400",
                                          attrs: {
                                            viewBox: "0 0 20 20",
                                            fill: "currentColor",
                                          },
                                        },
                                        [
                                          n("path", {
                                            attrs: {
                                              "fill-rule": "evenodd",
                                              d:
                                                "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
                                              "clip-rule": "evenodd",
                                            },
                                          }),
                                        ]
                                      ),
                                    ]
                                  ),
                                  t._v(" "),
                                  n(
                                    "div",
                                    { staticClass: "flex items-center ml-3" },
                                    [
                                      n(
                                        "p",
                                        {
                                          staticClass:
                                            "text-sm leading-5 text-yellow-700",
                                        },
                                        [
                                          t._v(
                                            "\n                      Make sure to copy your new personal access token now.\n                      You won't be able to see it again!\n                    "
                                          ),
                                        ]
                                      ),
                                    ]
                                  ),
                                ]),
                              ]
                            ),
                          ]
                        ),
                      ]
                    ),
                  ]),
                ]),
              ]),
              t._v(" "),
              n("div", { staticClass: "bg-30 px-6 py-3 flex" }, [
                n("div", { staticClass: "flex items-center ml-auto" }, [
                  n(
                    "button",
                    {
                      staticClass: "btn btn-default btn-primary",
                      attrs: { dusk: "confirm-action-button", type: "submit" },
                    },
                    [t._v("\n          Got it!\n        ")]
                  ),
                ]),
              ]),
            ]
          ),
        ]);
      },
      staticRenderFns: [],
    };
  },
  function (t, e, n) {
    var o = n(0)(
      n(21),
      n(22),
      !1,
      function (t) {
        n(16);
      },
      "data-v-1fd54148",
      null
    );
    t.exports = o.exports;
  },
  function (t, e, n) {
    var o = n(17);
    "string" == typeof o && (o = [[t.i, o, ""]]),
      o.locals && (t.exports = o.locals);
    n(19)("6f6a8085", o, !0, {});
  },
  function (t, e, n) {
    (t.exports = n(18)(!1)).push([t.i, "", ""]);
  },
  function (t, e) {
    t.exports = function (t) {
      var e = [];
      return (
        (e.toString = function () {
          return this.map(function (e) {
            var n = (function (t, e) {
              var n = t[1] || "",
                o = t[3];
              if (!o) return n;
              if (e && "function" == typeof btoa) {
                var s =
                    ((i = o),
                    "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," +
                      btoa(unescape(encodeURIComponent(JSON.stringify(i)))) +
                      " */"),
                  a = o.sources.map(function (t) {
                    return "/*# sourceURL=" + o.sourceRoot + t + " */";
                  });
                return [n].concat(a).concat([s]).join("\n");
              }
              var i;
              return [n].join("\n");
            })(e, t);
            return e[2] ? "@media " + e[2] + "{" + n + "}" : n;
          }).join("");
        }),
        (e.i = function (t, n) {
          "string" == typeof t && (t = [[null, t, ""]]);
          for (var o = {}, s = 0; s < this.length; s++) {
            var a = this[s][0];
            "number" == typeof a && (o[a] = !0);
          }
          for (s = 0; s < t.length; s++) {
            var i = t[s];
            ("number" == typeof i[0] && o[i[0]]) ||
              (n && !i[2]
                ? (i[2] = n)
                : n && (i[2] = "(" + i[2] + ") and (" + n + ")"),
              e.push(i));
          }
        }),
        e
      );
    };
  },
  function (t, e, n) {
    var o = "undefined" != typeof document;
    if ("undefined" != typeof DEBUG && DEBUG && !o)
      throw new Error(
        "vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
      );
    var s = n(20),
      a = {},
      i = o && (document.head || document.getElementsByTagName("head")[0]),
      r = null,
      l = 0,
      c = !1,
      d = function () {},
      u = null,
      f = "data-vue-ssr-id",
      p =
        "undefined" != typeof navigator &&
        /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
    function v(t) {
      for (var e = 0; e < t.length; e++) {
        var n = t[e],
          o = a[n.id];
        if (o) {
          o.refs++;
          for (var s = 0; s < o.parts.length; s++) o.parts[s](n.parts[s]);
          for (; s < n.parts.length; s++) o.parts.push(h(n.parts[s]));
          o.parts.length > n.parts.length && (o.parts.length = n.parts.length);
        } else {
          var i = [];
          for (s = 0; s < n.parts.length; s++) i.push(h(n.parts[s]));
          a[n.id] = { id: n.id, refs: 1, parts: i };
        }
      }
    }
    function m() {
      var t = document.createElement("style");
      return (t.type = "text/css"), i.appendChild(t), t;
    }
    function h(t) {
      var e,
        n,
        o = document.querySelector("style[" + f + '~="' + t.id + '"]');
      if (o) {
        if (c) return d;
        o.parentNode.removeChild(o);
      }
      if (p) {
        var s = l++;
        (o = r || (r = m())),
          (e = x.bind(null, o, s, !1)),
          (n = x.bind(null, o, s, !0));
      } else
        (o = m()),
          (e = function (t, e) {
            var n = e.css,
              o = e.media,
              s = e.sourceMap;
            o && t.setAttribute("media", o);
            u.ssrId && t.setAttribute(f, e.id);
            s &&
              ((n += "\n/*# sourceURL=" + s.sources[0] + " */"),
              (n +=
                "\n/*# sourceMappingURL=data:application/json;base64," +
                btoa(unescape(encodeURIComponent(JSON.stringify(s)))) +
                " */"));
            if (t.styleSheet) t.styleSheet.cssText = n;
            else {
              for (; t.firstChild; ) t.removeChild(t.firstChild);
              t.appendChild(document.createTextNode(n));
            }
          }.bind(null, o)),
          (n = function () {
            o.parentNode.removeChild(o);
          });
      return (
        e(t),
        function (o) {
          if (o) {
            if (
              o.css === t.css &&
              o.media === t.media &&
              o.sourceMap === t.sourceMap
            )
              return;
            e((t = o));
          } else n();
        }
      );
    }
    t.exports = function (t, e, n, o) {
      (c = n), (u = o || {});
      var i = s(t, e);
      return (
        v(i),
        function (e) {
          for (var n = [], o = 0; o < i.length; o++) {
            var r = i[o];
            (l = a[r.id]).refs--, n.push(l);
          }
          e ? v((i = s(t, e))) : (i = []);
          for (o = 0; o < n.length; o++) {
            var l;
            if (0 === (l = n[o]).refs) {
              for (var c = 0; c < l.parts.length; c++) l.parts[c]();
              delete a[l.id];
            }
          }
        }
      );
    };
    var b,
      _ =
        ((b = []),
        function (t, e) {
          return (b[t] = e), b.filter(Boolean).join("\n");
        });
    function x(t, e, n, o) {
      var s = n ? "" : o.css;
      if (t.styleSheet) t.styleSheet.cssText = _(e, s);
      else {
        var a = document.createTextNode(s),
          i = t.childNodes;
        i[e] && t.removeChild(i[e]),
          i.length ? t.insertBefore(a, i[e]) : t.appendChild(a);
      }
    }
  },
  function (t, e) {
    t.exports = function (t, e) {
      for (var n = [], o = {}, s = 0; s < e.length; s++) {
        var a = e[s],
          i = a[0],
          r = { id: t + ":" + s, css: a[1], media: a[2], sourceMap: a[3] };
        o[i] ? o[i].parts.push(r) : n.push((o[i] = { id: i, parts: [r] }));
      }
      return n;
    };
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = {
        props: { token: { required: !0, type: Object } },
        data: function () {
          return { showDeleteModal: !1 };
        },
        methods: {
          revokeToken: function () {
            this.$emit("revoke-token", this.token.id);
          },
        },
        computed: {
          lastUsed: function () {
            return this.token.last_used_at
              ? moment(this.token.last_used_at).calendar()
              : "—";
          },
        },
      });
  },
  function (t, e) {
    t.exports = {
      render: function () {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "tr",
          [
            n("td", [
              n(
                "div",
                {
                  staticClass: "text-left text-left",
                  attrs: { "via-resource": "users", "via-resource-id": "1" },
                },
                [
                  n("span", { staticClass: "whitespace-no-wrap" }, [
                    t._v(t._s(t.token.name)),
                  ]),
                ]
              ),
            ]),
            t._v(" "),
            n("td", [
              n(
                "div",
                {
                  staticClass: "text-left text-left",
                  attrs: { "via-resource": "users", "via-resource-id": "1" },
                },
                [
                  n("span", { staticClass: "whitespace-no-wrap" }, [
                    t._v(t._s(t.token.abilities)),
                  ]),
                ]
              ),
            ]),
            t._v(" "),
            n("td", [
              n(
                "div",
                {
                  staticClass: "text-left text-left",
                  attrs: { "via-resource": "users", "via-resource-id": "1" },
                },
                [
                  n("span", { staticClass: "whitespace-no-wrap" }, [
                    t._v(t._s(t.lastUsed)),
                  ]),
                ]
              ),
            ]),
            t._v(" "),
            n("td", { staticClass: "td-fit text-right pr-6 align-middle" }, [
              n("div", { staticClass: "inline-flex items-center" }, [
                n(
                  "button",
                  {
                    staticClass:
                      "inline-flex appearance-none cursor-pointer text-70 hover:text-primary mr-3 has-tooltip",
                    on: {
                      click: function (e) {
                        t.showDeleteModal = !0;
                      },
                    },
                  },
                  [
                    n(
                      "svg",
                      {
                        staticClass: "fill-current",
                        attrs: {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "20",
                          height: "20",
                          viewBox: "0 0 20 20",
                          "aria-labelledby": "delete",
                          role: "presentation",
                        },
                      },
                      [
                        n("path", {
                          attrs: {
                            "fill-rule": "nonzero",
                            d:
                              "M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z",
                          },
                        }),
                      ]
                    ),
                  ]
                ),
              ]),
            ]),
            t._v(" "),
            n(
              "portal",
              { attrs: { to: "modals", transition: "fade-transition" } },
              [
                t.showDeleteModal
                  ? n("delete-token", {
                      attrs: { token: t.token },
                      on: {
                        confirm: t.revokeToken,
                        close: function (e) {
                          t.showDeleteModal = !1;
                        },
                      },
                    })
                  : t._e(),
              ],
              1
            ),
          ],
          1
        );
      },
      staticRenderFns: [],
    };
  },
  function (t, e) {},
]);
