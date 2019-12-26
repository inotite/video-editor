import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from 'src/environments/environment';
import { VideoService } from './video.service';

@Injectable({
  providedIn: 'root'
})
export class FrameService {

  FOLDER = 'sparka/';
  uploading = false;
  uploaded = 0;
  totalFrames = 0;

  constructor(
    private videoService: VideoService
  ) {}

  reset() {
    this.uploading = false;
    this.uploaded = 0;
  }

  start() {
    this.uploading = true;
  }

  isUploading() {
    return this.uploading;
  }

  setFrames(frames) {
    this.totalFrames = frames;
  }

  uploadFrame(dataUrl, frameId) {
    const bucket = new S3({
      accessKeyId: environment.aws.accessKey,
      secretAccessKey: environment.aws.secretkey,
      region: environment.aws.region
    });

    let byteString;
    if (dataUrl.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataUrl.split(',')[1]);
    } else {
        byteString = unescape(dataUrl.split(',')[1]);
    }

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    const params = {
      Bucket: 'sparka-video-rendering-images',
      Key: this.videoService.getVideoId() + '/' + frameId + '.jpg',
      Body: new Blob([ia], {
        type: 'image/jpeg'
      }),
      ACL: 'public-read',
      ContentType: 'image/jpeg'
    };
    // console.log(dataUrl);
    bucket.upload(params, (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      // console.log('Successfully uploaded file.', data);
      console.log(this.uploaded);
      this.uploaded ++;
      if (this.uploaded === this.totalFrames) {
        console.log('Finished rendering');
        this.videoService.renderVideo();
      }
      return true;
    });
  }
}
