"use strict";
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
exports.createPersonalizedMessage = void 0;
const Aiservice_1 = require("../services/Aiservice");
const createPersonalizedMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, job_title, company, location, summary } = req.body;
        // Validate required fields
        if (!name || !job_title || !company) {
            res.status(400).json({ message: 'Name, job title, and company are required' });
            return;
        }
        const profile = {
            name,
            job_title,
            company,
            location: location || '',
            summary: summary || ''
        };
        const message = yield (0, Aiservice_1.generatePersonalizedMessage)(profile);
        res.status(200).json({ message });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
exports.createPersonalizedMessage = createPersonalizedMessage;
