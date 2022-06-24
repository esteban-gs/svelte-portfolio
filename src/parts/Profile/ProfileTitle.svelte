<script>
  export let education;
  export let title;
</script>

<div class="mb-2 text-blueGray-600 mt-10">
  <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400" />
  {title}
  {education === "_" ? "" : education}
</div>
