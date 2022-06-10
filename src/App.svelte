<!-- App.svelte -->
<script>
  import { Router, Route } from "svelte-routing";
  import ContactUs from "./views/ContactUs.svelte";
  import AuthNavbar from "./components/Navbars/AuthNavbar.svelte";

  // Admin Layout
  // import Admin from "./layouts/Admin.svelte";
  // Auth Layout
  // import Auth from "./layouts/Auth.svelte";

  // No Layout Pages
  import Index from "./views/Index.svelte";
  // import Landing from "./views/Landing.svelte";
  import Profile from "./views/Profile.svelte";

  export let url = "";
</script>

<AuthNavbar />
<Router {url}>
  <!-- admin layout -->
  <!-- <Route path="admin/*admin" component="{Admin}" /> -->
  <!-- auth layout -->
  <!-- <Route path="auth/*auth" component="{Auth}" /> -->
  <!-- no layout pages -->
  <!-- <Route path="landing" component="{Landing}" /> -->
  <Route path="/" component={Profile} />
  <Route path="/work-with-me" component={ContactUs} />
  <!-- <Route path="/" component="{Index}" /> -->
</Router>
