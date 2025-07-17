import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import { BlogPost } from "../types/blogs";

export const blogService = {
  getAllPosts: async (): Promise<BlogPost[]> => {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    return querySnapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        author: data.author,
        content: data.content,
        createdAt: data.createdAt,
        imageUrl: data.imageUrl,
        isPublished: data.isPublished,
        slug: data.slug,
        tags: data.tags,
        title: data.title,
        updatedAt: data.updatedAt,
      } as BlogPost;
    });
  },

  getPostById: async (id: string) => {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        author: data.author,
        content: data.content,
        createdAt: data.createdAt,
        imageUrl: data.imageUrl,
        isPublished: data.isPublished,
        slug: data.slug,
        tags: data.tags,
        title: data.title,
        updatedAt: data.updatedAt,
      } as BlogPost;
    } else {
      return null;
    }
  },

  addPost: async (post: Omit<BlogPost, 'id'>) => {
    const docRef = await addDoc(collection(db, "blogs"), post);
    return docRef.id;
  },

  updatePost: async (id: string, post: Partial<Omit<BlogPost, 'id'>>) => {
    const docRef = doc(db, "blogs", id);
    await updateDoc(docRef, post);
  },

  deletePost: async (id: string) => {
    const docRef = doc(db, "blogs", id);
    await deleteDoc(docRef);
  }
};