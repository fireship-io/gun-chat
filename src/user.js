import { writable } from 'svelte/store';
import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';

// Database
export const db = GUN();

// Gun User
export const user = db.user().recall({sessionStorage: true});

// Current User's username
export const username = writable('');

user.get('alias').on(v => username.set(v))

db.on('auth', async(event) => {
    const alias = await db.user().get('alias'); // username string
    username.set(alias);

    console.log(`signed in as ${alias}`);
});