import mongoose, { Document, Schema } from 'mongoose';

export enum CampaignStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted'
}

export interface ICampaign extends Document {
  name: string;
  description: string;
  status: CampaignStatus;
  leads: string[];
  accountIDs: string[];
  createdAt: Date;
  updatedAt: Date;
}

const campaignSchema = new Schema<ICampaign>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: Object.values(CampaignStatus),
      default: CampaignStatus.ACTIVE
    },
    leads: {
      type: [String],
      default: []
    },
    accountIDs: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

const Campaign = mongoose.model<ICampaign>('Campaign', campaignSchema);

export default Campaign;