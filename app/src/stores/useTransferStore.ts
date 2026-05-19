import { create } from 'zustand';
import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { deleteObject, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase.config';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

export interface Transfer {
    id: string;
    amount: number;
    targetSenderAccount: { id: string; account_name: string };
    targetReceiverAccount: { id: string; account_name: string };
    description?: string;
    photoRef: string;
    photoUrl: string;
    timestamp: Date | string;
    user_id: string;
}

interface TransferStore {
    transfers: Transfer[];
    getTransfer: () => void;
    setTransfers: (data: Transfer[]) => void;
    createTransfer: (newTransfer: Omit<Transfer, 'id' | 'timestamp' | 'photoRef' | 'photoUrl'>, currentFile?: File) => Promise<void>;
    updateTransfer: (documentId: string, updatedTransfer: Partial<Transfer>, newFile?: { source: string; file: File } | null) => Promise<boolean>;
    deleteTransfer: (documentId: string, fileReference: string) => Promise<boolean | undefined>;
    setTransactions: (transferList: Transfer[]) => void;
}

const transferStore = (set: any, get: any): TransferStore => ({
    transfers: [],
    getTransfer: () => {},
    setTransfers: (data) => set({ transfers: data }),
    createTransfer: async (newTransfer, currentFile) => {
        const loader = toast.loading('Creating Transfer');
        try {
            const receiverAccountRef = doc(db, 'accounts', newTransfer.targetReceiverAccount.id);
            const senderAccountRef = doc(db, 'accounts', newTransfer.targetSenderAccount.id);
            const receiverAccount = (await getDoc(receiverAccountRef)).data()!;
            const senderAccount = (await getDoc(senderAccountRef)).data()!;

            let fileUrl: string | undefined, fileRefName: string | undefined;
            if (currentFile) {
                fileRefName = `transfers/${uuidv4()}-${currentFile.name}`;
                const imageRef = ref(storage, fileRefName);
                const fileUpload = await uploadBytes(imageRef, currentFile);
                fileUrl = await getDownloadURL(fileUpload.ref);
            }

            await updateDoc(senderAccountRef, { account_amount: senderAccount.account_amount - newTransfer.amount });
            await updateDoc(receiverAccountRef, { account_amount: receiverAccount.account_amount + newTransfer.amount });

            await addDoc(collection(db, 'transfers'), {
                ...newTransfer,
                photoRef: fileRefName || '',
                photoUrl: fileUrl || '',
                timestamp: serverTimestamp(),
            });

            toast.dismiss(loader);
            toast.success('Transfer successfully created!');
        } catch (err: any) {
            toast.error(err.message);
            toast.dismiss(loader);
        }
    },
    updateTransfer: async (documentId, updatedTransfer, newFile) => {
        const editLoader = toast.loading('Updating Transfer');
        try {
            const docRef = doc(db, 'transfers', documentId);
            const currentTransfer = (await getDoc(docRef)).data()!;

            const fileRef = ref(storage, currentTransfer.photoRef);
            let fileUrl: string | undefined, fileRefName: string | undefined;
            if (currentTransfer.photoUrl !== newFile?.source) {
                if (currentTransfer.photoUrl !== '') await deleteObject(fileRef);
                if (newFile) {
                    fileRefName = `transfers/${uuidv4()}-${newFile.file.name}`;
                    const imageRef = ref(storage, fileRefName);
                    const fileUpload = await uploadBytes(imageRef, newFile.file);
                    fileUrl = await getDownloadURL(fileUpload.ref);
                }
            }

            const prevReceiverAccountRef = doc(db, 'accounts', currentTransfer.targetReceiverAccount.id);
            const prevSenderAccountRef = doc(db, 'accounts', currentTransfer.targetSenderAccount.id);
            const prevReceiverAccount = (await getDoc(prevReceiverAccountRef)).data()!;
            const prevSenderAccount = (await getDoc(prevSenderAccountRef)).data()!;

            await updateDoc(prevSenderAccountRef, { account_amount: prevSenderAccount.account_amount + currentTransfer.amount });
            await updateDoc(prevReceiverAccountRef, { account_amount: prevReceiverAccount.account_amount - currentTransfer.amount });

            const receiverAccountRef = doc(db, 'accounts', updatedTransfer.targetReceiverAccount!.id);
            const senderAccountRef = doc(db, 'accounts', updatedTransfer.targetSenderAccount!.id);
            const receiverAccount = (await getDoc(receiverAccountRef)).data()!;
            const senderAccount = (await getDoc(senderAccountRef)).data()!;

            await updateDoc(senderAccountRef, { account_amount: senderAccount.account_amount - updatedTransfer.amount! });
            await updateDoc(receiverAccountRef, { account_amount: receiverAccount.account_amount + updatedTransfer.amount! });

            await updateDoc(docRef, {
                ...updatedTransfer,
                photoRef: fileRefName || currentTransfer.photoRef,
                photoUrl: fileUrl || currentTransfer.photoUrl,
            });

            toast.success('Updated Successfully.');
            return true;
        } catch (err: any) {
            toast.error(err.message);
            return false;
        } finally {
            toast.dismiss(editLoader);
        }
    },
    deleteTransfer: async (documentId, fileReference) => {
        const deleteLoader = toast.loading('Deleting Transfer');
        const docRef = doc(db, 'transfers', documentId);
        const fileRef = ref(storage, fileReference);
        try {
            const currentTransfer = (await getDoc(docRef)).data()!;
            const receiverAccountRef = doc(db, 'accounts', currentTransfer.targetReceiverAccount.id);
            const senderAccountRef = doc(db, 'accounts', currentTransfer.targetSenderAccount.id);
            const receiverAccount = (await getDoc(receiverAccountRef)).data()!;
            const senderAccount = (await getDoc(senderAccountRef)).data()!;

            if (senderAccount && receiverAccount) {
                await updateDoc(senderAccountRef, { account_amount: senderAccount.account_amount + currentTransfer.amount });
                await updateDoc(receiverAccountRef, { account_amount: receiverAccount.account_amount - currentTransfer.amount });
            }

            await deleteDoc(docRef);
            if (fileReference) await deleteObject(fileRef);
            toast.success('Deleted Successfully!');
            return true;
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            toast.dismiss(deleteLoader);
        }
    },
    setTransactions: (transferList) => set({ transfers: transferList }),
});

export const useTransferStore = create(transferStore);
