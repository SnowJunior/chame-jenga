<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import Sidebar from '../components/Sidebar.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen">
  <!-- Sidebar -->
  <Sidebar />

  <!-- Main content -->
  <main class="ml-60 w-full bg-gray-100 p-6">
    {@render children()}
  </main>
</div>

<style>
  main {
    transition: margin-left 0.3s ease;
  }
</style>
