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
              <div v-if="options.displayAbilitiesType === 'inline'">
                <label for="abilities" class="inline-block leading-tight">
                  {{ __("Abilities") }}
                </label>
                <input
                  id="abilities"
                  v-model="tokenAbilities"
                  type="text"
                  :placeholder="options.defaultAbilities.join(', ')"
                  class="w-full form-control form-input form-input-bordered"
                />
                <p>
                  {{ __("Comma separated list of abilities to apply to token.") }}
                </p>
              </div>

              <div v-if="options.displayAbilitiesType === 'checkboxes' && availableAbilities.length > 0" class="flex flex-col">
                <label for="abilities" class="mb-2 inline-block leading-tight">
                  {{ __("Abilities") }}
                </label>
                <label class="mb-2 md:px-8 md:w-3/5 w-full md:py-2">
                  <input type="checkbox" class="checkbox mr-2" v-model="allAbilitiesSelected" @change="allAbilitiesSelectedChange"> {{ __("Select all") }}
                </label>
                <hr>
                <label v-for="ability in availableAbilities" class="mt-2 md:px-8 md:w-3/5 w-full md:py-2">
                  <input type="checkbox" class="checkbox mr-2" v-model="ability.selected" @change="checkAbilitiesStatus"> {{ ability.name }}
                </label>
                <p class="mt-2 italic">
                  {{ __("Select the required abilities for this token.") }}
                </p>
              </div>
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
      availableAbilities: [],
      allAbilitiesSelected: false,
      selectedAbilities: [],
    };
  },

  mounted() {
    this.setAbilitiesList(false, true);
    this.checkAbilitiesStatus();
  },


  methods: {
    handleCreate() {
      this.$emit("create", this.tokenName, this.getListOfSelectedAbilities());
      this.resetForm();
    },
    handleCancelled() {
      this.resetForm();
      this.$emit("close");
    },
    resetForm() {
      this.tokenName = null;
      this.tokenAbilities = null;
      this.availableAbilities = [];
      this.allAbilitiesSelected = false;
      this.selectedAbilities = [];
    },
    setAbilitiesList(forcedStatus = false, useDefaultAbilities = false) {
      this.availableAbilities = this.options.abilitiesAvailable.map((ability, index) => ({
        id: index,
        name: ability,
        selected: useDefaultAbilities ? this.options.defaultAbilities.includes(ability) : forcedStatus,
      }));
    },
    allAbilitiesSelectedChange() {
      if (this.allAbilitiesSelected) {
        return this.setAbilitiesList(true)
      }
      this.setAbilitiesList(false)
    },
    getListOfSelectedAbilities() {
      let abilitiesList = '';

      switch (this.options.displayAbilitiesType) {
        case 'inline':
          abilitiesList = this.tokenAbilities
          break;
        case 'checkboxes':
          abilitiesList = this.availableAbilities.filter((ability) => ability.selected).map((ability) => ability.name).join(',')
          break;
        default:
          break;
      }
      return abilitiesList;
    },

    checkAbilitiesStatus() {
      if (this.availableAbilities.every((ability) => ability.selected)) {
        this.allAbilitiesSelected = true;
      } else {
        this.allAbilitiesSelected = false;
      }
    }
  },
};
</script>
