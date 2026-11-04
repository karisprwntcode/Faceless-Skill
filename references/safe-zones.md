# Safe Zones & Canvas Layout Guidelines

When generating video content for technical topics, readability and visual clarity are crucial. Content placed in areas obscured by mobile app UI will be unreadable and lower viewer retention.

## 1. Vertical 9:16 (1080 x 1920) — TikTok / Instagram Reels / YouTube Shorts

### Pixel Dimension Breakdown:
- **Total Canvas**: `1080px` width x `1920px` height
- **Top Safe Zone Boundary**: `Y = 180px`
  - Elements above `180px` may collide with the search icon, audio picker, or status bar.
- **Bottom Safe Zone Boundary**: `Y = 1560px` (`360px` from bottom)
  - Elements below `1560px` will be covered by the user handle (`@username`), caption, hashtag tags, and audio marquee banner.
- **Right Safe Zone Boundary**: `X = 940px` (`140px` from right)
  - Elements further right than `940px` will be blocked by the Like, Comment, Bookmark, and Share button column.
- **Left Safe Zone Boundary**: `X = 80px`
  - Ensure comfortable breathing room from the left bezel.

### The Ideal Eyeball Sweetspot:
- Vertical Range: `Y: 300px` to `Y: 1500px`
- Maximum content width: `920px` centered (`margin: 0 auto` or centered flexbox with `padding: 0 80px`).

---

## 2. Horizontal 16:9 (1920 x 1080) — YouTube Desktop / Explainer

- **Total Canvas**: `1920px` width x `1080px` height
- **Safe Margins**: `80px` on all 4 borders.
- **Two-Column Grid Layout**:
  - Column 1 (Left, 48% width): Concept Diagram, Flowchart, or Architecture Nodes.
  - Column 2 (Right, 48% width): Live Code Terminal or Dynamic Benchmark Counter.
- **Header Zone**: `Y: 80px` to `Y: 200px` for topic title and category badge.
- **Footer Zone**: `Y: 960px` to `Y: 1040px` for subtle branding or chapter indicator.

