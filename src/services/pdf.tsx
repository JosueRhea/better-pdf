import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiPostResponse, ApiResponse, Doc } from './types';

const DOCS_KEY = 'docs';

export async function getDocs(): ApiResponse<Doc[]> {
  try {
    const data = await AsyncStorage.getItem(DOCS_KEY);
    if (!data) return { data: [], error: null };
    const docs = JSON.parse(data);
    return { data: docs, error: null };
  } catch (error) {
    return {
      data: null,
      error: { message: 'Something went wrong retrieving the docs' },
    };
  }
}

export async function saveDocs(docs: Doc[]): ApiPostResponse {
  try {
    const jsonValue = JSON.stringify(docs);
    await AsyncStorage.setItem(DOCS_KEY, jsonValue);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
