# BlockStalker.IO Decipher 2024 - API Showcase

## 🚀 Get Started

1. Ensure you've [created an account](https://blockstalker.io/register)
1. [Confirm your account](https://blockstalker.io/account) for a *FREE* 30-Day Premium Subscription (Real-time & API access).  *Note: This offer expires 72 hours after Decipher 2024*
1. [Create an API Key](https://blockstalker.io/account) at your Account page

## 💻 Running this Code

The `decipher2024.js` example will create the 3 filters demonstrated during the API Showcase, and then open a real-time subscription socket to receive Algorand events in real-time.  To execute:

### 1. Clone

```bash
git clone https://github.com/BlockStalker/decipher-2024.git
```

### 2. Update your API Key

[On this line of `decipher2024.js:`](https://github.com/BlockStalker/decipher-2024/blob/main/decipher2024.js#L12)

```javascript
const local_apiKey = 'INSERT_YOUR_API_KEY_HERE';
```

### 3. Run!
```
npm install
npm start
```

## 🏫 Learn More

1. Check out our other ["Hello World" source code](https://github.com/BlockStalker/hello-blockstalker-js)
1. Discover your filters & following activity on your [Following page](https://blockstalker.io/following)
1. Docs and more examples on the `client-js` library that powers this example code - [visit the GitHub!](https://github.com/BlockStalker/client-js)