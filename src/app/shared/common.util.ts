import uuid from 'uuid';

export class CommonUtil {
  static generateUUID(): string {
    return uuid();
  }
}
