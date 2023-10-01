import { DocumentPickerResponse } from 'react-native-document-picker';

export type Doc = DocumentPickerResponse;
export type ApiResponse<T> = Promise<
  { data: T; error: null } | { data: null; error: { message: string } }
>;

export type ApiPostResponse = Promise<{ success: boolean }>;
