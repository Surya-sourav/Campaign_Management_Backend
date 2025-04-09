import { Request, Response } from 'express';
import Campaign, { CampaignStatus } from '../models/campaign';

// Get all campaigns (excluding DELETED)
export const getCampaigns = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaigns = await Campaign.find({ status: { $ne: CampaignStatus.DELETED } });
    res.status(200).json(campaigns);
  } catch (error : any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get campaign by ID
export const getCampaignById = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      res.status(404).json({ message: 'Campaign not found' });
      return;
    }
    
    if (campaign.status === CampaignStatus.DELETED) {
      res.status(404).json({ message: 'Campaign not found' });
      return;
    }
    
    res.status(200).json(campaign);
  } catch (error : any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Create new campaign
export const createCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, status, leads, accountIDs } = req.body;
    
    if (!name || !description) {
      res.status(400).json({ message: 'Name and description are required' });
      return;
    }
    
    const newCampaign = new Campaign({
      name,
      description,
      status: status || CampaignStatus.ACTIVE,
      leads: leads || [],
      accountIDs: accountIDs || []
    });
    
    const savedCampaign = await newCampaign.save();
    res.status(201).json(savedCampaign);
  } catch (error : any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update campaign
export const updateCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, status, leads, accountIDs } = req.body;
    
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      res.status(404).json({ message: 'Campaign not found' });
      return;
    }
    
    if (campaign.status === CampaignStatus.DELETED) {
      res.status(400).json({ message: 'Cannot update a deleted campaign' });
      return;
    }
    
    // Validate status if provided
    if (status && !Object.values(CampaignStatus).includes(status)) {
      res.status(400).json({ message: 'Invalid status value' });
      return;
    }
    
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { name, description, status, leads, accountIDs },
      { new: true, runValidators: true }
    );
    
    res.status(200).json(updatedCampaign);
  } catch (error : any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Soft delete campaign (set status to DELETED)
export const deleteCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      res.status(404).json({ message: 'Campaign not found' });
      return;
    }
    
    if (campaign.status === CampaignStatus.DELETED) {
      res.status(400).json({ message: 'Campaign already deleted' });
      return;
    }
    
    campaign.status = CampaignStatus.DELETED;
    await campaign.save();
    
    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (error : any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};