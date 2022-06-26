<template>
  <div class="flex flex-col justify-center items-center px-6 py-8">
    <svg
      class="w-10 h-10"
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
    <h3 class="text-base text-80 font-normal mb-6 mt-3">
      {{ __("No Tokens For User.") }}
    </h3>
    <DefaultButton @click="$emit('showCreateTokenModal')">
      {{ __("Create Token") }}
    </DefaultButton>
  </div>
</template>

<script>
export default {
  emits: ["showCreateTokenModal"],
};
</script>
