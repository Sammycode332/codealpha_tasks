import { Router } from "express";
import { shortenUrl } from "../url.service";
const router = Router();

router.post("/api/shorten", (req, res) => {
    const { url } = req.body
    if (typeof url !== "string" || !url.trim()) {
       return res.status(400).json({ error: "Please provide a URL." });
    }
    const code = shortenUrl(url)
    return res.status(201).json({code})
    
});

export default router;