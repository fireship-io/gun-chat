<script>
  import Login from './Login.svelte';
  import ChatMessage from './ChatMessage.svelte';
  import { onMount } from 'svelte';
  import { gun, currentUser } from './user';

  export let user;

  let newMessage;
  let messages = [];
  let scrollBottom;

  onMount(() => {
    var match = {
      // lexical queries are kind of like a limited RegEx or Glob.
      '.': {
        // property selector
        '>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
      },
      '-': 1, // filter in reverse
    };

    // Get Messages
    gun
      .get('chat')
      .map(match)
      .once(async (data, id) => {
        if (data) {



        var message = {
          // transform the data
          who: await gun.user(data).get('alias'), // a user might lie who they are! So let the user system detect whose data it is.
          what: (await SEA.decrypt(data.what, '#foo')) + '', // force decrypt as text.
          when: GUN.state.is(data, 'what'), // get the internal timestamp for the what property.
        };

        if (message.what) {
          // TODO Limit messages to 100
          messages = [...messages, message].sort((a, b) => a.when - b.when);
          scrollBottom.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }

        // message.when = new Date(message.when).toDateString() + ', ' + new Date(message.when).toLocaleTimeString();


        }
      });
  });

  async function sendMessage() {
    console.log(user);
    const secret = await SEA.encrypt(newMessage, '#foo');
    const message = gun.user().get('all').set({ what: secret });
    const index = new Date().toISOString();
    gun.get('chat').get(index).put(message);

    // const hash = await SEA.work(secret, null, null, {name: "SHA-256"});
    // const index = (new Date).toISOString() + ('#'+hash); // index by time with hash.

    // const ref = gun.get('#chat').get(index).put(secret); // SEA, not GUN, will treat # records as immutable.
    // gun.user().get('all').set(ref); // index all messages they send!
    newMessage = '';
    setTimeout(() => scrollBottom.scrollIntoView({ behavior: 'smooth' }), 100);
  }
</script>

{#if $currentUser}
  <main>
    {#each messages as message (message.when)}
      <ChatMessage {message} currentUser={$currentUser} />
    {/each}

    <div class="dummy" bind:this={scrollBottom} />
  </main>

  <form on:submit|preventDefault={sendMessage}>
    <input type="text" placeholder="Type a message..." bind:value={newMessage} maxlength="100" />

    <button type="submit" disabled={!newMessage}>🕊️</button>
  </form>
{:else}
  <main>
    <Login />
  </main>
{/if}
