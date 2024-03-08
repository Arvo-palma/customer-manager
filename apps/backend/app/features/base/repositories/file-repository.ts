import { S3 } from '@aws-sdk/client-s3'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import { readFileSync } from 'fs'

export default class FileRepository {
  private readonly files: S3

  constructor() {
    this.files = new S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
      },
      region: process.env.AWS_REGION,
    })
  }

  public async insert(key: string, file: MultipartFileContract): Promise<string> {
    const buffer = readFileSync(file.tmpPath!)
    return this.insertFromBuffer(key, buffer, `${file.type}/${file.subtype}`)
  }

  public async insertFromBuffer(
    key: string,
    buffer: Buffer,
    contentType?: string
  ): Promise<string> {
    const uploadedImage = await this.files.putObject({
      Body: buffer,
      Bucket: process.env.AWS_FILES_BUCKET!,
      Key: key,
      ContentType: contentType,
    })
    return uploadedImage.SSEKMSKeyId || key
  }

  async delete(key: string): Promise<void> {
    await this.files.deleteObject({
      Bucket: process.env.AWS_FILES_BUCKET!,
      Key: key,
    })
  }
}
