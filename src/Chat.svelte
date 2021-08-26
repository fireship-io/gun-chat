<script>
  import Login from './Login.svelte';
  import ChatMessage from './ChatMessage.svelte';
  import { onMount } from 'svelte';
  import { username } from './user';

  import GUN from 'gun';
  const db = GUN();

  let newMessage;
  let messages = [];

  let scrollBottom;
  let lastScrollTop;
  let canAutoScroll = true;
  let unreadMessages = false;

  function autoScroll() {
    setTimeout(() => scrollBottom?.scrollIntoView({ behavior: 'smooth' }), 100);
    unreadMessages = false;
  }

  function watchScroll(e) {
    console.log(e.target.scrollHeight, e.target.scrollTop);
    canAutoScroll = lastScrollTop < e.target.scrollTop;
    lastScrollTop = e.target.scrollTop;
  }

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
    db
      .get('chat')
      .map(match)
      .once(async (data, id) => {
        if (data) {

          // Key for end-to-end encryption
          const key = '#foo';

          var message = {
            // transform the data
            who: await db.user(data).get('alias'), // a user might lie who they are! So let the user system detect whose data it is.
            what: (await SEA.decrypt(data.what, '#foo')) + '', // force decrypt as text.
            when: GUN.state.is(data, 'what'), // get the internal timestamp for the what property.
          };

          if (message.what) {
            // TODO Limit messages to 100
            messages = [...messages.slice(-100), message].sort((a, b) => a.when - b.when);

            unreadMessages = true;
            canAutoScroll && autoScroll();
          }
        }
      });
  });

  async function sendMessage() {
    const secret = await SEA.encrypt(newMessage, '#foo');
    const message = db.user().get('all').set({ what: secret });
    const index = new Date().toISOString();
    db.get('chat').get(index).put(message);

    // const hash = await SEA.work(secret, null, null, {name: "SHA-256"});
    // const index = (new Date).toISOString() + ('#'+hash); // index by time with hash.

    // const ref = gun.get('#chat').get(index).put(secret); // SEA, not GUN, will treat # records as immutable.
    // gun.user().get('all').set(ref); // index all messages they send!
    newMessage = '';
  }
</script>

<div class="container">
  {#if $username}
    <main on:scroll={watchScroll}>
      {#each messages as message (message.when)}
        <ChatMessage {message} sender={$username} />
      {/each}

      <div class="dummy" bind:this={scrollBottom} />
    </main>

    <form on:submit|preventDefault={sendMessage}>
      <input type="text" placeholder="Type a message..." bind:value={newMessage} maxlength="100" />

      <button type="submit" disabled={!newMessage}>💥</button>
    </form>

    <button class="scroll-button" on:click={autoScroll} class:red={unreadMessages}>
      {#if unreadMessages}
        New Messages
      {/if}

      👇
    </button>
  {:else}
    <main>
      <Login />
    </main>
  {/if}
</div>
