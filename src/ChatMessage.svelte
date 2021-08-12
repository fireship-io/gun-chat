<script>

    export let message;
    export let currentUser;

    const messageClass = message.who === currentUser ? 'sent' : 'received';

    const avatar = `https://ui-avatars.com/api/?name=${message.who}`;

    const ts = new Date(message.when).toLocaleTimeString()

</script>

<div class={`message ${messageClass}`}>
    <img src={avatar} alt="avatar" />
    <div>
        <p>{message.what}</p>
        <time class="ts">{ts}</time>
    </div>

</div>