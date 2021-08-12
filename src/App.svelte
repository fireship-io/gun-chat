<script>
  import Login from './Login.svelte';
  import Chat from './Chat.svelte';
  import Leave from './Leave.svelte';

  import { gun, currentUser } from './user';
</script>

<div class="app">
  <header>
    <h1>🔫💬</h1>
    <Leave />
  </header>

  <section>
    <Chat />
  </section>
</div>

<style>
</style>
