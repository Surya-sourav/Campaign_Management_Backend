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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePersonalizedMessage = void 0;
const cerebras_cloud_sdk_1 = __importDefault(require("@cerebras/cerebras_cloud_sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = require("crypto");
dotenv_1.default.config();
const cerebras = new cerebras_cloud_sdk_1.default({
    apiKey: process.env.CEREBRAS_API_KEY,
});
const generatePersonalizedMessage = (profile) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    var _d, _e;
    try {
        if (!process.env.CEREBRAS_API_KEY) {
            throw new Error('Cerebras API key is missing');
        }
        // Build our prompt, including the personalization data.
        const prompt = `
Generate a personalized outreach message based on the following LinkedIn profile:
Name: ${profile.name}
Job Title: ${profile.job_title}
Company: ${profile.company}
Location: ${profile.location}
Summary: ${profile.summary}

The message should be friendly, professional, and mention how our campaign management 
platform can help with outreach and lead generation. Keep it under 150 words and tailor it 
to their role and industry.
    `;
        // The Cerebras SDK expects messages with tool_call_id to have a role exactly "tool".
        // Therefore, we set the role to "tool" for all messages.
        const messages = [
            {
                role: "tool", // Using the literal "tool" required by the SDK
                content: prompt,
                tool_call_id: (0, crypto_1.randomUUID)(),
            },
        ];
        const stream = yield cerebras.chat.completions.create({
            messages,
            model: 'llama3.1-8b',
            stream: true,
            max_completion_tokens: 200,
            temperature: 0.7,
            top_p: 1,
        });
        let generatedMessage = '';
        try {
            for (var _f = true, _g = __asyncValues(stream), _h; _h = yield _g.next(), _a = _h.done, !_a; _f = true) {
                _c = _h.value;
                _f = false;
                const chunk = _c;
                generatedMessage += ((_e = (_d = chunk.choices[0]) === null || _d === void 0 ? void 0 : _d.delta) === null || _e === void 0 ? void 0 : _e.content) || '';
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_f && !_a && (_b = _g.return)) yield _b.call(_g);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return generatedMessage.trim() ||
            `Hey ${profile.name}, I noticed you're working as a ${profile.job_title} at ${profile.company}. Our platform could help streamline your outreach campaigns. Would you be interested in learning more?`;
    }
    catch (error) {
        console.error('Error generating message:', error);
        return `Hey ${profile.name}, I noticed you're working as a ${profile.job_title} at ${profile.company}. Our platform could help streamline your outreach campaigns. Would you be interested in learning more?`;
    }
});
exports.generatePersonalizedMessage = generatePersonalizedMessage;
