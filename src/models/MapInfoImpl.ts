import { MapInfo } from '@gip-recia/wisemapping-editor';

class MapInfoImpl implements MapInfo {
  private id: string;
  private title: string;
  private creatorFullName: string;
  private locked: boolean;
  private starred: boolean;
  private lockedMsg: string | undefined;

  constructor(id: string, title: string, creatorFullName: string, locked: boolean, lockedMsg?: string) {
    this.id = id;
    this.title = title;
    this.locked = locked;
    this.lockedMsg = lockedMsg;
    this.starred = true;
    this.creatorFullName = creatorFullName;
  }

  getId(): string {
    return this.id;
  }

  updateStarred(value: boolean): Promise<void> {
    this.starred = value;
    return Promise.resolve();
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(value: string): void {
    throw (this.title = value);
  }

  getCreatorFullName(): string {
    return this.creatorFullName;
  }

  isLocked(): boolean {
    return this.locked;
  }

  isStarred(): Promise<boolean> {
    return Promise.resolve(this.starred);
  }

  getLockedMessage(): string {
    return 'Map Is Locked !';
  }

  getZoom(): number {
    return 0.8;
  }
}

export default MapInfoImpl;
