<template>
  <div class="relative" dusk="profiles-index-component">
    <h1 class="mb-3 text-90 font-normal text-2xl">Personal Access Tokens</h1>
    <div class="flex" style>
      <div class="w-full flex items-center">
        <div class="flex-no-shrink ml-auto mb-6">
          <button
            @click="showAddModal = true"
            class="btn btn-default btn-primary"
          >
            Create Token
          </button>
        </div>
      </div>
    </div>
    <div class="card">
      <div
        class="overflow-hidden overflow-x-auto relative"
        v-if="tokens.length"
      >
        <table class="table w-full" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th class="text-left">
                <span>Name</span>
              </th>
              <th class="text-left" v-if="panel.options.showAbilities">
                <span>Abilities</span>
              </th>
              <th class="text-left">
                <span>Last Used At</span>
              </th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <token
              v-for="token in tokens"
              :key="token.id"
              :token="token"
              :show-abilities="panel.options.showAbilities"
              @revoke-token="revokeToken"
            ></token>
          </tbody>
        </table>
      </div>
      <div class="flex justify-center items-center px-6 py-8" v-else>
        <div class="text-center">
          <svg
            class="w-5 h-5 mb-3"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
          <h3 class="text-base text-80 font-normal mb-6">
            No Tokens For User.
          </h3>
          <div>
            <button
              @click="showAddModal = true"
              class="btn btn-sm btn-outline inline-flex items-center focus:outline-none focus:shadow-outline active:outline-none active:shadow-outline"
            >
              Create Token
            </button>
          </div>
        </div>
      </div>
    </div>
    <portal to="modals" transition="fade-transition">
      <create-token
        v-if="showAddModal"
        :show-abilities="panel.options.showAbilities"
        @create="createToken"
        @cancelled-create="closeModal"
      >
        <input
          slot="name"
          v-model="tokenName"
          id="name"
          list="name-list"
          type="text"
          placeholder="Name"
          class="w-full form-control form-input form-input-bordered"
        />

        <input
          slot="abilities"
          v-model="tokenAbilities"
          id="abilities"
          list="abilities-list"
          type="text"
          placeholder="Abilities"
          class="w-full form-control form-input form-input-bordered"
        />
      </create-token>
      <show-token
        v-if="showPersonalAccessTokenModal"
        @confirm="showPersonalAccessTokenModal = false"
      >
        <input
          ref="token"
          id="name"
          v-model="personalAccessToken"
          type="text"
          placeholder="Name"
          class="w-full form-control form-input form-input-bordered"
          readonly
        />
        <button
          type="button"
          class="ml-4 flex items-center btn btn-link dim cursor-pointer text-80"
          @click="copyToken"
        >
          <svg
            class="-ml-1 mr-2 h-5 w-5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
          Copy
        </button>
      </show-token>
    </portal>
  </div>
</template>

<script>
export default {
  props: ["resourceName", "resourceId", "panel"],
  data() {
    return {
      tokens: [],
      showAddModal: false,
      tokenName: null,
      tokenAbilities: null,
      personalAccessToken: null,
      showPersonalAccessTokenModal: false,
    };
  },
  created() {
    this.fetchTokens();
  },
  methods: {
    copyToken() {
      this.$refs.token.select();
      document.execCommand("copy");
    },
    openModal() {
      this.showAddModal = true;
    },
    confirmModal() {
      this.modalOpen = false;
    },
    closeModal() {
      this.showAddModal = false;
      this.tokenName = null;
    },
    createToken() {
      this.getNewToken();
      this.closeModal();
    },
    getNewToken() {
      Nova.request()
        .post(
          `/nova-vendor/sanctum-tokens/tokens/${this.resourceName}/${this.resourceId}`,
          {
            name: this.tokenName,
            abilities: this.tokenAbilities,
          }
        )
        .then((response) => {
          console.log(response.data);
          this.personalAccessToken = response.data;
          this.showPersonalAccessTokenModal = true;
        });
    },
    fetchTokens() {
      Nova.request()
        .get(
          `/nova-vendor/sanctum-tokens/tokens/${this.resourceName}/${this.resourceId}`
        )
        .then((response) => {
          this.tokens = response.data.tokens;
        });
    },
    revokeToken(tokenId) {
      Nova.request()
        .post(
          `/nova-vendor/sanctum-tokens/tokens/${this.resourceName}/${this.resourceId}/revoke`,
          {
            token_id: tokenId,
          }
        )
        .then((response) => {
          location.reload();
        });
    },
  },
};
</script>
