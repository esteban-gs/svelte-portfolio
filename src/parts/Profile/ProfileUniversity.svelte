<script>
  export let university;
</script>

{#if university !== "_"}
  <div class="mb-2 text-blueGray-600">
    <i class="fas fa-university mr-2 text-lg text-blueGray-400" />
    {university}
  </div>
{/if}
