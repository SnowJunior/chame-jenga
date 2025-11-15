<script lang="ts">
  export let image: string;
  export let title: string;
  export let description: string;
  export let totalReceived: number = 0;
  export let progress: number = 0;
  export let onView: () => void;
</script>

<div
  class="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition p-0 cursor-pointer"
>
  <img src={image} alt={title} class="h-40 w-full object-cover" />

  <div class="p-5">
    <h3 class="text-lg font-semibold text-gray-800">{title}</h3>
    <p class="mt-1 text-sm text-gray-500">{description}</p>

    <p class="mt-3 text-sm text-gray-600">
      Funded:
      <span class="font-medium text-gray-800">${totalReceived}</span>
    </p>

    <!-- Progress Bar -->
    <div class="mt-4">
      <div class="flex justify-between text-xs text-gray-500 mb-1">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>

      <div class="w-full h-2 bg-gray-200 rounded-full">
        <div
          class="h-2 bg-green-600 rounded-full transition-all"
          style={`width: ${progress}%`}
        ></div>
      </div>
    </div>

    <button
      class="mt-5 w-full rounded-xl bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 transition"
      on:click={onView}
    >
      View
    </button>
  </div>
</div>
