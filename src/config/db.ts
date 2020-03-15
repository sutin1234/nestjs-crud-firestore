const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

export class FirestoreDatabase {
  firestoreApp: any;

  constructor() {
      this.initialApp()
  }

  initialApp() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://scorching-torch-3321.firebaseio.com',
    });
    this.firestoreApp = admin.firestore();
  }

  getCollection(collect_name) {
    const collection = this.firestoreApp.collection(collect_name);
    return collection;
  }
  getDocument(collect_name, doc_id): Promise<any> {
    const collect = this.getCollection(collect_name);
    const doc = collect.doc(doc_id)
    return doc.get();
  }
}
