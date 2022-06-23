import cloudinary from "cloudinary"
import Env from '@ioc:Adonis/Core/Env'

// @ts-ignore
cloudinary.config({
  cloud_name: Env.get('CLOUDINARY_CLOUD_NAME'),
  api_key: Env.get('CLOUDINARY_API_KEY'),
  api_secret: Env.get('CLOUDINARY_API_SECRET')
});

export default cloudinary
