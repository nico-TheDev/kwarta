import { useState } from 'react';

interface SelectedFile {
    source: string;
    file: File;
}

export default function useUploadImage() {
    const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
    return { selectedFile, setSelectedFile };
}
