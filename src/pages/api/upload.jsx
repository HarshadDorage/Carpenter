import { getSession } from 'next-auth/react';
import fs from 'fs';
import formidable from 'formidable';
import path from 'path';

export const config = {
  api: {
    bodyParser: false
  }
};

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  if (!session || session.user.role !== 'shopOwner') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: MAX_FILE_SIZE,
      filter: ({ mimetype }) => allowedMimeTypes.includes(mimetype)
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Upload error:', err);
        return res.status(500).json({ 
          error: err.message.includes('maxFileSize') 
            ? 'File too large' 
            : 'Upload failed' 
        });
      }

      if (!files.image) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const file = files.image[0]; // formidable v2+ returns array
      const safeFilename = `${Date.now()}-${file.originalFilename}`;
      const newPath = path.join(uploadDir, safeFilename);

      try {
        await fs.promises.rename(file.filepath, newPath);
        return res.json({ 
          url: `/uploads/${safeFilename}` 
        });
      } catch (renameError) {
        console.error('Rename error:', renameError);
        await fs.promises.unlink(file.filepath); // Cleanup temp file
        return res.status(500).json({ error: 'File processing failed' });
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}