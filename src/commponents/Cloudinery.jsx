// src/components/CloudinaryImage.jsx
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as qAuto } from '@cloudinary/url-gen/qualifiers/quality';

const cld = new Cloudinary({ cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME } });

export default function Cloudinery() {
  const img = cld.image('folder/photo'); // public_id ללא סיומת
  img.format(auto()).quality(qAuto()).resize(fill().width(800).height(600));

  return <AdvancedImage cldImg={img} alt="desc" />;
}