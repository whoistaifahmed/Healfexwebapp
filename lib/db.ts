import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit,
  DocumentData
} from 'firebase/firestore';
import { db } from '@/firebase';

// Generic fetcher for collections
export async function getCollectionData(collectionName: string, constraints: any[] = []): Promise<any[]> {
  try {
    const colRef = collection(db, collectionName);
    const q = query(colRef, ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    return [];
  }
}

// Generic fetcher for single document by slug
export async function getDocBySlug(collectionName: string, slug: string): Promise<any> {
  try {
    const colRef = collection(db, collectionName);
    const q = query(colRef, where('slug', '==', slug), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const docData = snapshot.docs[0];
    return { id: docData.id, ...docData.data() };
  } catch (error) {
    console.error(`Error fetching ${collectionName} by slug ${slug}:`, error);
    return null;
  }
}

// Specific fetchers
export const getMedicines = () => getCollectionData('medicines', [orderBy('createdAt', 'desc')]);
export const getMedicineBySlug = (slug: string) => getDocBySlug('medicines', slug);

export const getGenerics = () => getCollectionData('generics', [orderBy('name', 'asc')]);
export const getGenericBySlug = (slug: string) => getDocBySlug('generics', slug);

export const getCompanies = () => getCollectionData('companies', [orderBy('name', 'asc')]);
export const getCompanyBySlug = (slug: string) => getDocBySlug('companies', slug);

export const getSideEffects = () => getCollectionData('side-effects', [orderBy('name', 'asc')]);
export const getSideEffectBySlug = (slug: string) => getDocBySlug('side-effects', slug);

export const getBlogs = () => getCollectionData('blogs', [orderBy('publishedAt', 'desc')]);
export const getBlogBySlug = (slug: string) => getDocBySlug('blogs', slug);

export const getJobs = () => getCollectionData('jobs', [orderBy('postedAt', 'desc')]);
export const getJobBySlug = (slug: string) => getDocBySlug('jobs', slug);

export const getGlobalMetaData = async () => {
  try {
    const docRef = doc(db, 'meta-data', 'global');
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? snapshot.data() : null;
  } catch (error) {
    console.error('Error fetching global meta data:', error);
    return null;
  }
};
