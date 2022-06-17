<script>
  export let severity;
  export let title;
  export let message;
  export let show;

  let alertOpen = true;

  const closeAlert = () => {
    alertOpen = false;
  };
</script>

{#if alertOpen && show}
  <div
    class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-{severity ===
    'error'
      ? 'red'
      : severity === 'success'
      ? 'green'
      : 'blue'}-500"
  >
    <span class="text-xl inline-block mr-5 align-middle">
      <i class="fas fa-bell" />
    </span>
    <span class="inline-block align-middle mr-8">
      <b class="capitalize">{title}</b>
      {message}
    </span>
    <button
      class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
      on:click={closeAlert}
    >
      <span>×</span>
    </button>
  </div>
{/if}
