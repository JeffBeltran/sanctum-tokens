<template>
  <modal tabindex="-1" role="dialog">
    <form
      @keydown="handleKeydown"
      autocomplete="off"
      class="bg-white rounded-lg shadow-lg overflow-hidden w-action-fields"
    >
      <div>
        <h2 class="border-b border-40 py-8 px-8 text-90 font-normal text-xl">
          Personal Access Token
        </h2>
        <div>
          <div class="action">
            <div class="flex flex-col border-b border-40">
              <div class="flex items-center py-6 px-8">
                <slot></slot>
              </div>
              <div class="flex items-center pb-6 px-8">
                <div
                  class="w-full rounded bg-danger-light text-danger-dark border-l-4 border-danger-dark p-4"
                >
                  <div class="flex">
                    <div class="flex flex-shrink-0 items-center">
                      <svg
                        class="h-5 w-5 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div class="flex items-center ml-3">
                      <p class="text-sm leading-5 text-yellow-700">
                        Make sure to copy your new personal access token now.
                        You won't be able to see it again!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-30 px-6 py-3 flex">
        <div class="flex items-center ml-auto">
          <button
            dusk="confirm-action-button"
            type="submit"
            class="btn btn-default btn-primary"
          >
            Got it!
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
    handleConfirm() {
      this.$emit("confirm");
    },
  },
};
</script>
