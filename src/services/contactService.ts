import { addDoc, collection, Timestamp } from "firebase/firestore";
import { ContactForm } from "../schemas/contactSchema";
import { db } from "../configs/firebase";

export const contactService = {
    async addContactMessage(contactData: ContactForm): Promise<void> {
        const contactRef = collection(db, "contactMessages");
        await addDoc(contactRef, {
            ...contactData,
            createdAt: Timestamp.now(),
        });
    },
};
