import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UploadApiErrorResponse, UploadApiResponse, v2 } from "cloudinary"
import streamifier from "streamifier";
@Injectable()
export class UploadService implements OnModuleInit {
    constructor(
        private readonly config: ConfigService
    ) { }
    onModuleInit() {
        v2.config({
            cloud_name: this.config.get<string>("CLOUD_NAME"),
            api_key: this.config.get<string>("CLOUD_API_KEY"),
            api_secret: this.config.get<string>("CLOUD_API_SECRET"),
            secure: true
        })
    }

    async uploadProfileImage(file: Buffer): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const uploadStream = v2.uploader.upload_stream({
                transformation: {
                    width: 300,
                    height: 300,
                    crop: "fill",
                    radius: "max"
                }
            }, (error, result) => {

                if (error || !result) {
                    return reject(error ?? new Error("Upload failed"));
                }


                resolve(result);
            })
            streamifier
                .createReadStream(file)
                .pipe(uploadStream);

        })
    }

    async deleteImage(public_id) {
        await v2.uploader.destroy(public_id)
    }
}

