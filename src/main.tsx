import React from 'react'
import ReactDOM from 'react-dom/client'
import { Repo } from "@automerge/automerge-repo";
import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel";
// import { BrowserWebSocketClientAdapter } from "automerge-repo-network-websocket";
// import { LocalForageStorageAdapter } from "automerge-repo-storage-localforage";
import App from './App.tsx'


const repo = new Repo({
  network: [
    // new BrowserWebSocketClientAdapter("wss://kwjh7g-3030.csb.app"),
    new BroadcastChannelNetworkAdapter(), // Local only networking (tab-to-tab)
  ],
  // storage: new LocalForageStorageAdapter(),
});

// Create a random user ID
// Currently anyone can lie about their identity - https://github.com/automerge/automerge-repo/pull/40
const userId = String(Math.round(Math.random() * 10000000000000000))

// FOR TESTING - DON'T REMEMBER DOCUMENT ID
localStorage.removeItem('documentId')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RepoContext.Provider value={repo}>
      <App userId={userId} />
    </RepoContext.Provider>
  </React.StrictMode>,
)
