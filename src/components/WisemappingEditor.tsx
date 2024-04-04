import MapInfoImpl from '../models/MapInfoImpl';
import CustomPersistenceManager from '../services/CustomPersistenceManager';
import { WisemappingEditorProps } from '../types/WisemappingEditorProps';
import { findLanguage } from '../utils/i18nUtils';
import { setUserInfoApiUrl } from '../utils/soffitUtils';
import Editor, {
  Designer,
  EditorOptions,
  MapInfo,
  Mindmap,
  PersistenceManager,
  useEditor,
} from '@gip-recia/wisemapping-editor';
import { useEffect } from 'react';

export default function WisemappingEditor({
  persistanceApiUrl,
  fileId,
  userInfoApiUrl,
  mode,
}: Readonly<WisemappingEditorProps>) {
  setUserInfoApiUrl(userInfoApiUrl);

  const mapInfo: MapInfo = new MapInfoImpl(fileId, '', '', false);
  const options: EditorOptions = {
    mode,
    locale: findLanguage('fr'),
    enableKeyboardEvents: true,
    enableAppBar: false,
  };
  const persistenceManager: PersistenceManager = new CustomPersistenceManager({
    documentUrl: `${persistanceApiUrl}/{id}`,
  });

  const initialization = (designer: Designer) => {
    designer.addEvent('loadSuccess', () => {
      document.getElementById('mindmap-comp')?.classList.add('ready');
    });
  };

  const editor = useEditor({
    mapInfo,
    options,
    persistenceManager,
  });

  return <Editor editor={editor} onLoad={initialization} />;
}
