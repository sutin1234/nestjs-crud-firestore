import { Injectable } from '@nestjs/common';
const admin = require('firebase-admin');
const serviceAccount = require('../../../serviceAccountKey.json');

@Injectable()
export class FirestoreService {
  firestoreApp: any;

  constructor() {
    this.initialApp();
  }

  initialApp() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://scorching-torch-3321.firebaseio.com',
    });
    this.firestoreApp = admin.firestore();
  }

  getServerTimeStamp() {
    return admin.firestore.FieldValue.serverTimestamp();
  }

  async getCollection(collect_name): Promise<any> {
    const collection = this.firestoreApp.collection(collect_name).orderBy('created', 'desc');
    return collection.get();
  }

  async getLastRecord(collect_name) {
    const collection = this.firestoreApp
      .collection(collect_name)
      .orderBy('created', 'desc')
      .limit(1).get();
      return collection
  }

  async createDoc(collec_name, doc_data) {
    const docAdded = this.firestoreApp
      .collection(collec_name)
      .doc()
      .set(doc_data);
    return docAdded;
  }

  async updateDoc(collect_name, doc_id, doc_data){
    const docUpdated = this.firestoreApp
    .collection(collect_name)
    .doc(doc_id)
    .set(doc_data);
    return docUpdated
  }

  async deleteDoc(collect_name, doc_id){
    const deleted = this.firestoreApp.collection(collect_name).doc(doc_id).delete()
    return deleted
  }

  async getDocument(collect_name, doc_id): Promise<any> {
    const collect = this.firestoreApp.collection(collect_name);
    const doc = collect.doc(doc_id);
    return doc.get();
  }
}
