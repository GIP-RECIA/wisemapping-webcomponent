import { EditorRenderMode } from '@gip-recia/wisemapping-mindplot';

export type WisemappingEditorProps = {
  persistanceApiUrl: string;
  fileId: string;
  userInfoApiUrl: string;
  mode: EditorRenderMode;
};
