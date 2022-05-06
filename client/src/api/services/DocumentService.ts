import axios from "axios";
import documentEndpoints from "../endpoints/Document";

const getDocument = async (id: string) => {
  try {
    const response = await axios.get<IDocument>(documentEndpoints.getById(id));
    return response.data;
  }
  catch (error) {
    throw error
  }
}

const getDocuments = async () => {
  try {
    const response = await axios.get<IDocument[]>(documentEndpoints.base);
    return response.data;
  }
  catch (error) {
    throw error
  }
}

const createDocument = async (document: IDocument) => {
  try {
    const response = await axios.post<IDocument>(documentEndpoints.base, document);
    return response.data;
  }
  catch (error) {
    throw error
  }
}

const updateDocument = async (id: string, document: IDocument) => {
  try {
    const response = await axios.put<IDocument>(documentEndpoints.update(id), document);
    return response.data;
  }
  catch (error) {
    throw error
  }
}

const deleteDocument = async (id: string) => {
  try {
    const response = await axios.delete<IDocument>(documentEndpoints.getById(id));
    return response.data;
  }
  catch (error) {
    throw error
  }
}

const downloadDocument = async (id: string) => {
  try {
    const response = await axios.get(documentEndpoints.download(id),
      {
        responseType: "blob"
      }
    );
    return response.data;
  }
  catch (error) {
    throw error
  }
}


const previewDocument = async (id: string) => {
  try {
    const response = await axios.get(documentEndpoints.download(id));
    return response.data;
  }
  catch (error) {
    throw error
  }
}

export const DocumentService = {
  getDocument,
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  downloadDocument,
  previewDocument
}
