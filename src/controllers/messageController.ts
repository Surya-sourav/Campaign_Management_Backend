import { Request, Response } from 'express';
import { generatePersonalizedMessage, LinkedInProfile } from '../services/Aiservice';

export const createPersonalizedMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, job_title, company, location, summary } = req.body;
    
    // Validate required fields
    if (!name || !job_title || !company) {
      res.status(400).json({ message: 'Name, job title, and company are required' });
      return;
    }
    
    const profile: LinkedInProfile = {
      name,
      job_title,
      company,
      location: location || '',
      summary: summary || ''
    };
    
    const message = await generatePersonalizedMessage(profile);
    
    res.status(200).json({ message });
  } catch (error : any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};