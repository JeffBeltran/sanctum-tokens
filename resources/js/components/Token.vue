<template>
  <tr>
    <td>
      <div class="text-left text-left" via-resource="users" via-resource-id="1">
        <span class="whitespace-no-wrap">{{ token.name }}</span>
      </div>
    </td>
    <td v-if="showAbilities">
      <div class="text-left text-left" via-resource="users" via-resource-id="1">
        <span class="whitespace-no-wrap">{{ token.abilities }}</span>
      </div>
    </td>
    <td>
      <div class="text-left text-left" via-resource="users" via-resource-id="1">
        <span class="whitespace-no-wrap">{{ lastUsed }}</span>
      </div>
    </td>
    <td class="td-fit text-right pr-6 align-middle">
      <div class="inline-flex items-center">
        <button
          @click="showDeleteModal = true"
          class="inline-flex appearance-none cursor-pointer text-70 hover:text-primary mr-3 has-tooltip"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            aria-labelledby="delete"
            role="presentation"
            class="fill-current"
          >
            <path
              fill-rule="nonzero"
              d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z"
            />
          </svg>
        </button>
      </div>
    </td>
    <portal to="modals" transition="fade-transition">
      <delete-token
        v-if="showDeleteModal"
        @confirm="revokeToken"
        @close="showDeleteModal = false"
        :token="token"
      ></delete-token>
    </portal>
  </tr>
</template>

<script>
export default {
  props: {
    token: {
      required: true,
      type: Object,
    },
    showAbilities: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      showDeleteModal: false,
    };
  },
  methods: {
    revokeToken() {
      this.$emit("revoke-token", this.token.id);
    },
  },
  computed: {
    lastUsed() {
      if (this.token.last_used_at) {
        return moment(this.token.last_used_at).calendar();
      } else {
        return "—";
      }
    },
  },
};
</script>

<style lang="css" scoped></style>
