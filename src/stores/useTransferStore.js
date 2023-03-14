import { create } from 'zustand';

import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { deleteObject, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

import { db, storage } from '../../firebase.config';

const transferStore = (set,get) => ({
    transfers: [],
    getTransfer: () => {},
    setTransfers: (data) => set({ transfers: data }),
    createTransfer: async (newTransfer, currentFile) => {
        const loader = toast.loading('Creating Transfer');
        try {

            // UPLOAD IMAGE
            let fileUrl, fileRefName;
            if (currentFile) {
                fileRefName = `transfers/${uuidv4()}-${currentFile.name}`;
                const imageRef = ref(storage, fileRefName);

                const fileUpload = await uploadBytes(imageRef, currentFile);
                fileUrl = await getDownloadURL(fileUpload.ref);
                console.log('UPLOADED');
            }

            await addDoc(collection(db, 'transfers'), {
                ...newTransfer,
                photoRef: fileRefName || '',
                photoUrl: fileUrl || '',
                timestamp: serverTimestamp()
            });
            console.log('NEW DOCUMENT CREATED');
            // HANDLE TOAST
            toast.dismiss(loader);
            toast.success('Transfer successfully created!');
        } catch (err) {
            console.log('addTransferError:', err);
            toast.error(err.message);
            toast.dismiss(loader);
        }
    },
    updateTransfer: async (documentId, updatedTransfer, newFile) => {
        const editLoader = toast.loading('Updating Transfer');
        try {
            const docRef = doc(db, 'transfers', documentId);
            const currentTransferResponse = await getDoc(docRef);
            const currentTransfer = currentTransferResponse.data();

            // UPDATE THE FILES
            // UPLOAD IMAGE
            const fileRef = ref(storage, currentTransfer.photoRef);
            let fileUrl, fileRefName;
            if (currentTransfer.photoUrl !== newFile?.source) {
                if (currentTransfer.photoUrl !== '') {
                    // DELETE THE OBJECT
                    await deleteObject(fileRef);
                }

                if (newFile) {
                    {
                        fileRefName = `transfers/${uuidv4()}-${newFile.file.name}`;
                        const imageRef = ref(storage, fileRefName);

                        const fileUpload = await uploadBytes(imageRef, newFile.file);
                        fileUrl = await getDownloadURL(fileUpload.ref);
                        console.log('UPLOADED');
                    }
                }
            }
            // CREATE A REFERENCE TO THE DOCUMENT AND THE FILE
            await updateDoc(docRef, {
                ...updatedTransfer,
                photoRef: fileRefName || currentTransfer.photoRef,
                photoUrl: fileUrl || currentTransfer.photoUrl
            });

            toast.success('Updated Successfully.');

            return true;
        } catch (err) {
            console.log('updateTransferError:', err);
            toast.error(err.message);

            return false;
        } finally {
            toast.dismiss(editLoader);
        }
    },
    deleteTransaction: async (documentId, fileReference) => {
        console.log('Delete', documentId);
        const deleteLoader = toast.loading('Deleting Transaction');
        // CREATE A REFERENCE FOR THE DOCUMENT AND THE FILE
        const docRef = doc(db, 'transfer', documentId);
        const fileRef = ref(storage, fileReference);
        try {

            // DELETE THE DOCUMENT AND OBJECT
            await deleteDoc(docRef);
            if (fileReference) {
                await deleteObject(fileRef);
            }
            // ALERT A MESSAGE

            toast.success('Deleted Successfully!');

            return true;
        } catch (err) {
            console.log('deleteTransferError:', err);
            toast.error(err.message);
        } finally {
            toast.dismiss(deleteLoader);
        }
    },
    setTransactions: (transferList) => {
        set({
            transfers: transferList
        });
    },
})

export const useTransferStore = create(transferStore);