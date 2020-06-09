<template>
  <modal tabindex="-1" role="dialog" @modal-close="handleCancelledCreate">
    <form
      @keydown="handleKeydown"
      @submit.prevent.stop="handleCreate"
      autocomplete="off"
      class="bg-white rounded-lg shadow-lg overflow-hidden w-action-fields"
    >
      <div>
        <h2
          class="border-b border-40 py-8 px-8 text-90 font-normal text-xl"
        >Create Personal Access Token</h2>
        <div>
          <div class="action">
            <div class="flex border-b border-40">
              <div class="w-1/5 px-8 py-6">
                <label for="name" class="inline-block text-80 pt-2 leading-tight">Name</label>
              </div>
              <div class="py-6 px-8 w-1/2">
                <slot></slot>

                <div class="help-text help-text mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-30 px-6 py-3 flex">
        <div class="flex items-center ml-auto">
          <button
            @click.prevent="handleCancelledCreate"
            type="button"
            class="btn btn-link dim cursor-pointer text-80 ml-auto mr-6"
          >{{ __('Cancel') }}</button>
          <button dusk="confirm-action-button" type="submit" class="btn btn-default btn-primary">
            <span>{{ __('Create Token') }}</span>
          </button>
        </div>
      </div>
    </form>
  </modal>
</template>

<script>
export default {
  /**
   * Mount the component.
   */
  mounted() {
    document.querySelectorAll(".modal input")[0].focus();
  },
  methods: {
    /**
     * Stop propogation of input events unless it's for an escape or enter keypress
     */
    handleKeydown(e) {
      if (["Escape", "Enter"].indexOf(e.key) !== -1) {
        return;
      }
      e.stopPropagation();
    },
    /**
     * Execute the selected action.
     */
    handleCreate() {
      this.$emit("create");
    },
    /**
     * Close the modal.
     */
    handleCancelledCreate() {
      this.$emit("cancelled-create");
    }
  }
};
</script>