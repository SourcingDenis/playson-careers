import express from 'express';
import { createServer as createViteServer } from 'vite';
import multer from 'multer';
import FormData from 'form-data';
import axios from 'axios';

const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route to submit application
  app.post('/api/apply', upload.single('resume'), async (req, res) => {
    try {
      const { jobId, firstName, lastName, email, phone, utmData } = req.body;
      const resumeFile = req.file;

      if (!process.env.ASHBY_API_KEY) {
        return res.status(500).json({ success: false, error: 'ASHBY_API_KEY is not configured' });
      }

      if (!jobId || !firstName || !lastName || !email) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
      }

      // Construct applicationForm
      const applicationForm = {
        firstName: firstName,
        lastName: lastName,
        name: `${firstName} ${lastName}`,
        email: email,
        phone: phone || '',
        resume: resumeFile ? { file: 'resume' } : undefined,
      };

      const formData = new FormData();
      formData.append('jobPostingId', jobId);
      formData.append('applicationForm', JSON.stringify(applicationForm));
      formData.append('allowSubmissionForUnpublishedJobPosting', 'true');
      
      if (utmData) {
        formData.append('utmData', utmData);
      }
      
      if (resumeFile) {
        formData.append('resume', resumeFile.buffer, {
          filename: resumeFile.originalname,
          contentType: resumeFile.mimetype,
        });
      }

      const authHeader = `Basic ${Buffer.from(`${process.env.ASHBY_API_KEY}:`).toString('base64')}`;

      const response = await axios.post('https://api.ashbyhq.com/applicationForm.submit', formData, {
        headers: {
          'Authorization': authHeader,
          ...formData.getHeaders(),
        },
      });

      const data = response.data;

      if (data.success === false) {
        console.error('Ashby API Error:', data);
        return res.status(400).json({ success: false, error: data.error || 'Failed to submit application' });
      }

      res.json({ success: true, data });
    } catch (error: any) {
      console.error('Application submission error:', error.response?.data || error.message);
      res.status(500).json({ success: false, error: error.response?.data?.error || 'Internal server error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
