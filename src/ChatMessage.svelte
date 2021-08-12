<script>

    export let message;
    export let currentUser;

    const messageClass = message.who === currentUser ? 'sent' : 'received';

    const avatar = `https://avatar.oxro.io/avatar.svg?name=${message.who}`;

    const ts = new Date(message.when);

</script>

<!-- style={`order: ${ts.getTime()}` -->

<div class={`message ${messageClass}`}>
    <img src={avatar} alt="avatar" />
    <div class="message-text">
        <p>{message.what}</p>
        <time>{ts.toLocaleTimeString()}</time>
    </div>

</div>