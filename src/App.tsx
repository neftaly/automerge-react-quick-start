import viteLogo from '/vite.svg'
import { useBootstrap } from './automerge-hooks';
import { useDocument } from 'automerge-repo-react-hooks';

function App({ userId }: { userId: string }) {
  // Load a document based on the URL hash or localStorage; else create one
  const handle = useBootstrap({
    // key: 'documentId',
    // onInvalidDocumentId: error => alert('Document ID not formatted correctly!'),
    onNoDocument: repo => {
      // Create a new document & add initial data
      const handle = repo.create()
      handle.doc = {
        data: 'test data',
        count: 0
      }
      return handle
    }
  });
  const doc = useDocument(handle.documentId)

  const docIsReady = handle.isReady() // Has document loaded yet?

  if (!docIsReady) {
    return (
      <span>
      Loading...<br />
      Note that if no-one is sharing an existing document ID, it will never load.
      </span>
    )
  }

  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />

        <pre children={JSON.stringify({
          userId,
          docIsReady,
          doc
        }, null, 2)} />
      </div>

      <button onClick={() => {
        doc.count = doc.count + 1
      }} children={`${doc?.count} + 1`} />
    </>
  )
}

export default App
