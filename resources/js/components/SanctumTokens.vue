<template>
  <div class="relative">
    <Heading :level="1" class="mb-3 flex items-center justify-between">
      <p>{{ __("Personal Access Tokens") }}</p>
      <DefaultButton @click="showCreateTokenModal = true">
        {{ __("Create Token") }}
      </DefaultButton>
    </Heading>
    <Card>
      <div
        class="
          flex flex-col
          md:flex-row md:items-center
          py-3
          border-b border-gray-200
          dark:border-gray-700
        "
      ></div>
      <div
        v-if="tokens.length"
        class="overflow-hidden overflow-x-auto relative"
      >
        <table class="table w-full" cellspacing="0" cellpadding="0">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                class="
                  td-fit
                  uppercase
                  text-xxs text-gray-500
                  tracking-wide
                  pl-5
                  pr-2
                  py-2
                "
              >
                <span class="sr-only">spacer</span>
              </th>
              <th
                class="
                  text-left
                  px-2
                  whitespace-nowrap
                  uppercase
                  text-gray-500 text-xxs
                  tracking-wide
                  py-2
                "
              >
                <span>{{ __("Name") }}</span>
              </th>
              <th
                v-if="panel.fields[0].showAbilities"
                class="
                  text-left
                  px-2
                  whitespace-nowrap
                  uppercase
                  text-gray-500 text-xxs
                  tracking-wide
                  py-2
                "
              >
                <span>{{ __("Abilities") }}</span>
              </th>
              <th
                class="
                  text-left
                  px-2
                  whitespace-nowrap
                  uppercase
                  text-gray-500 text-xxs
                  tracking-wide
                  py-2
                "
              >
                <span>{{ __("Last Used") }}</span>
              </th>

              <!-- View, Edit, and Delete -->
              <th class="uppercase text-xxs tracking-wide px-2 py-2">
                <span class="sr-only">{{ __("Controls") }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <TokenRow
              v-for="token in tokens"
              :key="token.id"
              :token="token"
              :show-abilities="panel.fields[0].showAbilities"
              @revoke-token="revokeToken"
            />
          </tbody>
        </table>
      </div>
      <NoTokens v-else @show-create-token-modal="showCreateTokenModal = true" />
    </Card>
    <CreateTokenModal
      :options="panel.fields[0]"
      :show="showCreateTokenModal"
      @close="showCreateTokenModal = false"
      @create="createNewToken"
    />
    <CreatedTokenModal
      :show="showCreatedTokenModal"
      :new-token="createdToken"
      @confirmed="handleCreatedTokenConfirmation"
    />
  </div>
</template>

<script>
export default {
  props: ["resourceName", "resourceId", "panel"],
  data() {
    return {
      tokens: [],
      showCreateTokenModal: false,
      showCreatedTokenModal: false,
      createdToken: null,
    }
  },
  created() {
    this.fetchTokens()
  },
  methods: {
    createNewToken(tokenName, tokenAbilities) {
      this.showCreateTokenModal = false
      Nova.request()
        .post(
          `/nova-vendor/sanctum-tokens/tokens/${this.resourceName}/${this.resourceId}`,
          {
            name: tokenName,
            abilities:
              tokenAbilities === null
                ? this.panel.fields[0].defaultAbilities
                : tokenAbilities,
          },
        )
        .then((response) => {
          this.createdToken = response.data
          this.showCreatedTokenModal = true
        })
    },
    handleCreatedTokenConfirmation() {
      this.showCreatedTokenModal = false
      this.fetchTokens()
      this.createdToken = null
    },
    fetchTokens() {
      Nova.request()
        .get(
          `/nova-vendor/sanctum-tokens/tokens/${this.resourceName}/${this.resourceId}`,
        )
        .then((response) => {
          this.tokens = response.data.tokens
        })
    },
    revokeToken(tokenId) {
      Nova.request()
        .post(
          `/nova-vendor/sanctum-tokens/tokens/${this.resourceName}/${this.resourceId}/revoke`,
          {
            token_id: tokenId,
          },
        )
        .then(() => {
          this.fetchTokens()
        })
    },
  },
}
</script>
