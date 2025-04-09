"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCampaign = exports.updateCampaign = exports.createCampaign = exports.getCampaignById = exports.getCampaigns = void 0;
const campaign_1 = __importStar(require("../models/campaign"));
// Get all campaigns (excluding DELETED)
const getCampaigns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const campaigns = yield campaign_1.default.find({ status: { $ne: campaign_1.CampaignStatus.DELETED } });
        res.status(200).json(campaigns);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
exports.getCampaigns = getCampaigns;
// Get campaign by ID
const getCampaignById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const campaign = yield campaign_1.default.findById(req.params.id);
        if (!campaign) {
            res.status(404).json({ message: 'Campaign not found' });
            return;
        }
        if (campaign.status === campaign_1.CampaignStatus.DELETED) {
            res.status(404).json({ message: 'Campaign not found' });
            return;
        }
        res.status(200).json(campaign);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
exports.getCampaignById = getCampaignById;
// Create new campaign
const createCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, status, leads, accountIDs } = req.body;
        if (!name || !description) {
            res.status(400).json({ message: 'Name and description are required' });
            return;
        }
        const newCampaign = new campaign_1.default({
            name,
            description,
            status: status || campaign_1.CampaignStatus.ACTIVE,
            leads: leads || [],
            accountIDs: accountIDs || []
        });
        const savedCampaign = yield newCampaign.save();
        res.status(201).json(savedCampaign);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
exports.createCampaign = createCampaign;
// Update campaign
const updateCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, status, leads, accountIDs } = req.body;
        const campaign = yield campaign_1.default.findById(req.params.id);
        if (!campaign) {
            res.status(404).json({ message: 'Campaign not found' });
            return;
        }
        if (campaign.status === campaign_1.CampaignStatus.DELETED) {
            res.status(400).json({ message: 'Cannot update a deleted campaign' });
            return;
        }
        // Validate status if provided
        if (status && !Object.values(campaign_1.CampaignStatus).includes(status)) {
            res.status(400).json({ message: 'Invalid status value' });
            return;
        }
        const updatedCampaign = yield campaign_1.default.findByIdAndUpdate(req.params.id, { name, description, status, leads, accountIDs }, { new: true, runValidators: true });
        res.status(200).json(updatedCampaign);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
exports.updateCampaign = updateCampaign;
// Soft delete campaign (set status to DELETED)
const deleteCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const campaign = yield campaign_1.default.findById(req.params.id);
        if (!campaign) {
            res.status(404).json({ message: 'Campaign not found' });
            return;
        }
        if (campaign.status === campaign_1.CampaignStatus.DELETED) {
            res.status(400).json({ message: 'Campaign already deleted' });
            return;
        }
        campaign.status = campaign_1.CampaignStatus.DELETED;
        yield campaign.save();
        res.status(200).json({ message: 'Campaign deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
exports.deleteCampaign = deleteCampaign;
