import { Router } from "express";
import { getOriginalUrl, shortenUrl } from "../url.service";
const router = Router();

router.post("/api/shorten", (req, res) => {
    const { url } = req.body
    if (typeof url !== "string" || !url.trim()) {
       return res.status(400).json({ error: "Please provide a URL." });
    }
    const code = shortenUrl(url)
    return res.status(201).json({code})

});
router.get("/:code", (req, res) => {
  const originalUrl = getOriginalUrl(req.params.code);

  if (!originalUrl) {
    return res.status(404).json({ error: "Short URL not found." });
  }

  return res.redirect(originalUrl);
});
export default router;