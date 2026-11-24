import { createStressData, validateStressData } from './stress-data.mjs';

const data = createStressData();
const summary = validateStressData(data);
const [projectId] = process.argv.slice(2);

if (projectId && projectId === 'tasks-f16b8') {
  throw new Error('Choose your own Assignment 12 Firebase project.');
}

if (projectId) {
  const { initializeApp } = await import('firebase-admin/app');
  const { getFirestore } = await import('firebase-admin/firestore');
  const db = getFirestore(initializeApp({ projectId }));
  const batch = db.batch();
  for (const [collection, rows] of Object.entries(data)) {
    for (const { id, ...fields } of rows) {
      batch.set(db.collection(collection).doc(id), fields);
    }
  }
  await batch.commit();
  const stored = await Promise.all(Object.entries(data).map(async ([collection, rows]) => {
    const docs = await db.getAll(...rows.map(({ id }) => db.collection(collection).doc(id)));
    if (docs.some(doc => !doc.exists)) throw new Error(`Missing seed documents in ${collection}`);
    return [collection, docs.map(doc => ({ ...doc.data(), id: doc.id }))];
  }));
  console.log('Verified Firestore readback', validateStressData(Object.fromEntries(stored)));
} else {
  console.log('Dry run', summary);
}
