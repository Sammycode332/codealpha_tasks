import { Router } from "express";
import { getOriginalUrl, shortenUrl } from "../url.service";
const router = Router();



/**
 * @openapi
 * /api/shorten:
 *   post:
 *     summary: Shorten a URL
 *     description: Creates a short code or reuses the existing code for the same URL.
 *     tags:
 *       - URLs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 format: uri
 *                 example: https://www.wikipedia.org
 *     responses:
 *       201:
 *         description: URL shortened successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: a1b2c3d4
 *       400:
 *         description: URL is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.post("/api/shorten", (req, res) => {
    const { url } = req.body
    if (typeof url !== "string" || !url.trim()) {
       return res.status(400).json({ error: "Please provide a URL." });
    }
    try {
     new URL(url);
     } catch {
       return res.status(400).json({ error: "Please provide a valid URL." });
     }

    const code = shortenUrl(url)
    return res.status(201).json({code})

});

/**
 * @openapi
 * /{code}:
 *   get:
 *     summary: Redirect to the original URL
 *     description: Looks up a short code and redirects to its original URL.
 *     tags:
 *       - URLs
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         example: a1b2c3d4
 *         description: The short code returned by the shortening endpoint.
 *     responses:
 *       302:
 *         description: Redirects to the original URL.
 *       404:
 *         description: No URL exists for this short code.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Short URL not found.
 */

router.get("/:code", (req, res) => {
  const originalUrl = getOriginalUrl(req.params.code);

  if (!originalUrl) {
    return res.status(404).json({ error: "Short URL not found." });
  }

  return res.redirect(originalUrl);
});
export default router;