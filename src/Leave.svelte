<script>
  import { gun, currentUser } from './user';

  function signout() {
    gun.user().leave();
    currentUser.set('');
  }
</script>

{#if $currentUser}
  <p>Signed in as <strong>{$currentUser}</strong></p>
  <button on:click={signout}>Sign Out</button>
{/if}
