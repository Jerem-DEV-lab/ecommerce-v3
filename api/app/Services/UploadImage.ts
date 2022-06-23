import {cuid} from "@ioc:Adonis/Core/Helpers";
/*import fs from "fs"*/

export default class UploadImage {
  constructor(public image, public path: string) {
    this.image = image
    this.path = path
  }

  public async upload() {
    const fileName = `${cuid()}.${this.image.extname}`

    await this.image?.move(this.path, {
      name: fileName,
      overwrite: true
    })
    return {
      upload: {
        success: true,
        fileName
      }
    }
  }
}
