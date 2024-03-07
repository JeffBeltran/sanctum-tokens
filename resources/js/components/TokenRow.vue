<template>
  <tr>
    <td
      class="py-2 border-t border-gray-100 dark:border-gray-700 px-2 td-fit pl-5 pr-5 dark:bg-gray-800"
    ></td>
    <td
      class="px-2 py-2 border-t border-gray-100 dark:border-gray-700 whitespace-nowrap dark:bg-gray-800"
    >
      <div class="text-left text-left" via-resource="users" via-resource-id="1">
        <span class="whitespace-no-wrap">{{ token.name }}</span>
      </div>
    </td>
    <td
      v-if="showAbilities"
      class="px-2 py-2 border-t border-gray-100 dark:border-gray-700 whitespace-nowrap dark:bg-gray-800"
    >
      <div class="text-left text-left" via-resource="users" via-resource-id="1">
        <span class="whitespace-no-wrap">{{ token.abilities }}</span>
      </div>
    </td>
    <td
      class="px-2 py-2 border-t border-gray-100 dark:border-gray-700 whitespace-nowrap dark:bg-gray-800"
    >
      <div
        class="text-left text-left"
        via-resource="users"
        via-resource-id="1"
        :title="lastUsedTooltip"
      >
        <span class="whitespace-no-wrap">{{ lastUsed }}</span>
      </div>
    </td>
    <td
      class="px-2 py-2 border-t border-gray-100 dark:border-gray-700 whitespace-nowrap dark:bg-gray-800"
    >
      <div
        class="text-left text-left"
        via-resource="users"
        via-resource-id="1"
        :title="expiresTooltip"
      >
        <span class="whitespace-no-wrap">{{ expires }}</span>
      </div>
    </td>
    <td
      class="py-2 border-t border-gray-100 dark:border-gray-700 px-2 td-fit text-right align-middle dark:bg-gray-800"
    >
      <div class="flex items-center justify-end space-x-0 text-gray-400">
        <button
          aria-label="Delete"
          class="toolbar-button hover:text-primary-500 px-2 v-popper--has-tooltip"
          @click="showDeleteModal = true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="24"
            height="24"
            class="inline-block"
            role="presentation"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
        </button>
      </div>
    </td>
    <DeleteTokenModal
      :show="showDeleteModal"
      :token-name="token.name"
      @cancel="showDeleteModal = false"
      @confirmed="revokeToken"
    />
  </tr>
</template>

<script>
import { DateTime } from "luxon";

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
  emits: ["revoke-token"],
  data() {
    return {
      showDeleteModal: false,
    };
  },
  computed: {
    lastUsed() {
      if (this.token.last_used_at) {
        return DateTime.fromISO(this.token.last_used_at).toRelativeCalendar();
      } else {
        return "—";
      }
    },
    lastUsedTooltip() {
      if (this.token.last_used_at) {
        return DateTime.fromISO(this.token.last_used_at).toFormat("f ZZZZ");
      } else {
        return "—";
      }
    },
    expires() {
      if (this.token.expires_at) {
        return DateTime.fromISO(this.token.expires_at).toRelativeCalendar();
      } else {
        return "N/A";
      }
    },
    expiresTooltip() {
      if (this.token.expires_at) {
        return DateTime.fromISO(this.token.expires_at).toFormat("f ZZZZ");
      } else {
        return "N/A";
      }
    },
  },
  methods: {
    revokeToken() {
      this.showDeleteModal = false;
      this.$emit("revoke-token", this.token.id);
    },
  },
};
</script>

<style lang="css" scoped></style>
