"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
app.use((0, cors_1.default)({
    origin: [
        'https://campaign-management-frontend.vercel.app',
        'https://campaign-management-frontend-git-main-surya-souravs-projects.vercel.app',
        'https://campaign-management-frontend-dv86b4er0-surya-souravs-projects.vercel.app'
    ]
}));
const campaignRoutes_1 = __importDefault(require("./routes/campaignRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/campaigns', campaignRoutes_1.default);
app.use('/api/personalized-message', messageRoutes_1.default);
// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});
exports.default = app;
