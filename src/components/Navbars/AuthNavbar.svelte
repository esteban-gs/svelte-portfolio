<script>
  export let githubUrl;
  export let linkedInUrl;

  // core components
  import PagesDropdown from "components/Dropdowns/PagesDropdown.svelte";
  import { onMount } from "svelte";

  let navbarOpen = false;

  const setNavbarOpen = () => {
    navbarOpen = !navbarOpen;
  };

  $: navLinks = [
    {
      id: "gihubLink",
      link: githubUrl,
      icon: "fa-github",
      largeText: "Connect On Github",
    },
    {
      id: "linkedInUrl",
      link: linkedInUrl,
      icon: "fa-linkedin",
      largeText: "Connect On LinkedIn",
    },
  ];
</script>

<nav
  class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg"
>
  <div
    class="container px-4 mx-auto flex flex-wrap items-center justify-between"
  >
    <div
      class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
    >
      <!-- <a
        use:link
        class="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
        href="/"
      >
        Notus Svelte
      </a> -->
      <button
        class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
        type="button"
        on:click={setNavbarOpen}
      >
        <i class="text-white fas fa-bars" />
      </button>
    </div>

    <div
      class="lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none rounded shadow-lg {navbarOpen
        ? 'block'
        : 'hidden'}"
      id="example-navbar-warning"
    >
      <ul class="flex flex-col lg:flex-row list-none mr-auto">
        <li class="flex items-center" />
      </ul>
      <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
        {#each navLinks as { id, link, icon, largeText }}
          <li class="flex items-center">
            <a
              class="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href={link}
              target="_blank"
            >
              <i
                class="lg:text-blueGray-200 text-blueGray-400 fab {icon} text-lg leading-lg"
              />
              <span class="lg:hidden inline-block ml-2">{largeText}</span>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>
