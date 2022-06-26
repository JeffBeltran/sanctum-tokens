<template>
  <Modal :show="show">
    <div
      class="mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <slot>
        <ModalHeader>{{ __("Created Token") }}</ModalHeader>
        <ModalContent>
          <div class="flex flex-col">
            <div class="flex flex-col space-y-2">
              <div class="text-lg bg-gray-100 rounded p-4">
                <button
                  v-tooltip="__('Copy to clipboard')"
                  type="button"
                  class="flex items-center justify-between w-full hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-500 dark:text-gray-400 hover:text-gray-500 active:text-gray-600 rounded-lg px-1 -mx-1"
                  @click.prevent.stop="copyValueToClipboard(newToken)"
                >
                  <span ref="theFieldValue">
                    {{ newToken }}
                  </span>

                  <Icon
                    class="text-gray-500 dark:text-gray-400 ml-1"
                    :solid="true"
                    type="clipboard"
                    width="14"
                  />
                </button>
              </div>
              <HelpText class="mt-2 help-text-error">
                {{
                  __(
                    "Make sure to copy your new personal access token now. You won't be able to see it again!"
                  )
                }}
              </HelpText>
            </div>
          </div>
        </ModalContent>
      </slot>

      <ModalFooter>
        <div class="ml-auto">
          <DefaultButton type="button" @click.prevent="handleConfirmed">
            {{ __("Confirm") }}
          </DefaultButton>
        </div>
      </ModalFooter>
    </div>
  </Modal>
</template>

<script>
export default {
  props: {
    newToken: {
      required: true,
      type: String,
    },
    show: { type: Boolean, default: false },
  },
  emits: ["confirmed"],
  methods: {
    handleConfirmed() {
      this.$emit("confirmed");
    },
    copyValueToClipboard(value) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(value);
      } else if (window.clipboardData) {
        window.clipboardData.setData("Text", value);
      } else {
        const input = document.createElement("input");
        const [scrollTop, scrollLeft] = [
          document.documentElement.scrollTop,
          document.documentElement.scrollLeft,
        ];
        document.body.appendChild(input);
        input.value = value;
        input.focus();
        input.select();
        document.documentElement.scrollTop = scrollTop;
        document.documentElement.scrollLeft = scrollLeft;
        document.execCommand("copy");
        input.remove();
      }
    },
  },
};
</script>
