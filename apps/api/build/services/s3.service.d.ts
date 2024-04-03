import { CompleteMultipartUploadCommandOutput, DeleteObjectCommandOutput, GetObjectCommandOutput } from "@aws-sdk/client-s3";
declare function uploadFile(name: string, file: string): Promise<CompleteMultipartUploadCommandOutput>;
declare function retriveFile(name: string): Promise<GetObjectCommandOutput>;
declare function deleteFile(name: string): Promise<DeleteObjectCommandOutput>;
declare function deleteFiles(names: string[]): Promise<DeleteObjectCommandOutput>;
export { uploadFile, retriveFile, deleteFile, deleteFiles };
//# sourceMappingURL=s3.service.d.ts.map