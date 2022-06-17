<script>
  import { onMount } from "svelte";
  export let severity;
  export let title;
  export let message;
  export let show;

  let alertOpen = true;

  const closeAlert = () => {
    alertOpen = false;
  };

  onMount(() => {
    console.log(alertOpen);
  });
</script>

{#if alertOpen && show}
  <div
    v-if="alertOpen"
    class="flex justify-between text-white px-6 py-4 border-0 rounded relative mb-4 bg-{severity ===
    'error'
      ? 'red'
      : severity === 'success'
      ? 'emerald'
      : 'blue'}-500"
  >
    <div>
      <span class="text-xl inline-block mr-5 align-middle">
        <i class="fas fa-bell" />
      </span>
      <span class="inline-block align-middle mr-8">
        <b class="capitalize">{title}</b>
        {message}
      </span>
    </div>
    <div>
      <button
        class="absolute bg-transparent text-2xl font-semibold leading-none top-0 mt-4 pr-1 outline-none focus:outline-none"
        on:click={closeAlert}
      >
        <span>×</span>
      </button>
    </div>
  </div>
{/if}
