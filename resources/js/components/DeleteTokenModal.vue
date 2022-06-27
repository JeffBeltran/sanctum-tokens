<template>
  <Modal :show="show" @close-via-escape="$emit('cancel')">
    <div
      class="mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <slot>
        <ModalHeader>{{ __("Revoke Token") }}</ModalHeader>
        <ModalContent>
          <div class="flex flex-col">
            <div class="flex flex-col space-y-2">
              Are you sure you want to revoke the following token?
              <pre
                class="p-4 rounded mt-3 text-red-500 text-center text-lg bg-gray-50 bor"
                >{{ tokenName }}</pre
              >
            </div>
          </div>
        </ModalContent>
      </slot>

      <ModalFooter>
        <div class="ml-auto">
          <LinkButton
            type="button"
            class="mr-4"
            @click.prevent="$emit('cancel')"
          >
            {{ __("Cancel") }}
          </LinkButton>
          <DangerButton type="button" @click.prevent="handleConfirmed">
            {{ __("Revoke Token") }}
          </DangerButton>
        </div>
      </ModalFooter>
    </div>
  </Modal>
</template>

<script>
export default {
  props: {
    tokenName: {
      required: true,
      type: String,
    },
    show: { type: Boolean, default: false },
  },
  emits: ["confirmed", "cancel"],
  methods: {
    handleConfirmed() {
      this.$emit("confirmed");
    },
  },
};
</script>
