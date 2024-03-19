import WisemappingEditorSFC from './components/WisemappingEditor.tsx';
import r2wc from '@r2wc/react-to-web-component';

const WisemappingEditor = r2wc(WisemappingEditorSFC, {
  props: {},
});

const register = (): void => {
  customElements.define('wisemapping-editor', WisemappingEditor);
};

export { WisemappingEditor, register };
