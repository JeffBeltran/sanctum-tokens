<template>
  <Modal :show="show" @close-via-escape="handleCancelled">
    <form
      class="mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      autocomplete="off"
      @submit.prevent.stop="handleCreate"
    >
      <slot>
        <ModalHeader>{{ __("Create Token") }}</ModalHeader>
        <ModalContent>
          <div class="flex flex-col">
            <div class="flex flex-col space-y-2">
              <label for="name" class="inline-block leading-tight">
                {{ __("Name") }}
                <span class="text-red-500 text-sm">
                  {{ __("*") }}
                </span>
              </label>
              <input
                id="name"
                v-model="tokenName"
                list="name-list"
                type="text"
                placeholder="Name"
                class="w-full form-control form-input form-input-bordered"
                required
              />
            </div>
            <div
              v-if="options.showAbilities"
              class="flex flex-col space-y-2 mt-3"
            >
              <label for="abilities" class="inline-block leading-tight">
                {{ __("Abilities") }}
              </label>
              <input
                id="abilities"
                v-model="tokenAbilities"
                type="text"
                :placeholder="options.defaultAbilities"
                class="w-full form-control form-input form-input-bordered"
              />
              <p>
                {{ __("Comma separated list of abilities to apply to token.") }}
              </p>
            </div>
          </div>
        </ModalContent>
      </slot>

      <ModalFooter>
        <div class="ml-auto">
          <LinkButton
            type="button"
            class="mr-3"
            @click.prevent="handleCancelled"
          >
            {{ __("Cancel") }}
          </LinkButton>

          <LoadingButton
            ref="confirmButton"
            :processing="false"
            :disabled="false"
            component="DefaultButton"
            type="submit"
          >
            {{ __("Create New Token") }}
          </LoadingButton>
        </div>
      </ModalFooter>
    </form>
  </Modal>
</template>

<script>
export default {
  props: {
    options: {
      required: true,
      type: Object,
    },
    show: { type: Boolean, default: false },
  },
  emits: ["create", "close"],
  data() {
    return {
      tokenName: null,
      tokenAbilities: null,
    };
  },
  methods: {
    handleCreate() {
      this.$emit("create", this.tokenName, this.tokenAbilities);
      this.resetForm();
    },
    handleCancelled() {
      this.resetForm();
      this.$emit("close");
    },
    resetForm() {
      this.tokenName = null;
      this.tokenAbilities = null;
    },
  },
};
</script>
