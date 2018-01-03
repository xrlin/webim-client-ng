import {Injectable} from '@angular/core';
import {ApiConfig} from '../config/api.config';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/concatMap';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FileUploadService {
  constructor(private api: ApiConfig, private http: HttpClient) {
  }

  uploadFile(file: Blob): Observable<any> {
    if (!file) {
      return Observable.throw('file is empty');
    }
    return this.http.get<{ [uptoken: string]: string }>(this.api.getUploadTokenApi())
      .concatMap((resp) => {
          const formData = new FormData();
          formData.append('token', resp.uptoken);
          formData.append('file', file);
          return this.http.post(this.api.fileUploadApi(), formData);
        }
      );
  }
}
