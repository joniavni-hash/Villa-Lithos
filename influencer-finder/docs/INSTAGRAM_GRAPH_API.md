# Instagram Graph API: what it can and cannot do for this product

Status: **needs credentials** (source `instagram_graph` in the `sources` table).
Written from the Meta developer documentation as known to the author; the exact
field lists and limits must be re-checked against
https://developers.facebook.com/docs/instagram-platform before enabling, because
Meta changes them. The sandbox used to build this product could not reach
developers.facebook.com, so this page is labelled "to be verified".

## What is needed from the owner
1. The Villa Lithos Instagram account set to **Business** (or Creator) and linked to a Facebook Page.
2. A Meta app (type Business) with the Instagram Graph API product added.
3. A long-lived user access token for an admin of that Page with
   `instagram_basic`, `pages_read_engagement`, `pages_show_list`
   (or, with Instagram Login, `instagram_business_basic`).
4. The Instagram Business Account ID (`ig_user_id`).
Store the token and id as backend secrets (`IG_ACCESS_TOKEN`, `IG_USER_ID`). Never in the browser.

## Capabilities relevant here (to be verified)
| Capability | Use in the product | Limits |
| --- | --- | --- |
| **Business Discovery** `GET /{ig_user_id}?fields=business_discovery.username(<handle>){followers_count,media_count,biography,website,name,profile_picture_url,media{caption,like_count,comments_count,timestamp,permalink,media_type}}` | Enrichment of a known handle found by Tavily: authorised follower count (`independently_verified`), bio, website, recent media with public like/comment counts | Only works for Business/Creator accounts; personal accounts return an error. No audience demographics of third parties. Subject to the app's rate limit (200 calls × users per hour). |
| **Hashtag Search** `GET /ig_hashtag_search?user_id=…&q=<tag>` then `/{hashtag_id}/top_media` or `/recent_media` | Discovery of posts under hashtags like `retreathost`, `yogaretreat2027` | 30 unique hashtags per rolling 7 days per account. Media objects do **not** include the author's username, only caption/permalink/like_count/comments_count/media_type/timestamp; the author must then be resolved from the permalink (Tavily extract). |
| **Mentions / tags on our own account** | Seed expansion: who tags or mentions Villa Lithos | Only our own account's data. |
| Insights (`/insights`) | Only for **our own** account; third-party insights are not available by API, which is why Stage 2 relies on influencer-shared documents | — |

## Not possible via the API (by design)
- Reading another account's Instagram Insights (reach, audience countries, story views).
- Listing another account's followers or who they follow.
- Searching accounts by keyword/bio; only hashtag search and business discovery by exact username exist.
- Accessing personal (non-Business/Creator) accounts' metrics.

## Edge-function design once credentials exist
`enrich-instagram` (not yet deployed): for each candidate with `followers_provenance != 'independently_verified'`,
call Business Discovery; on success set `followers`, `followers_provenance = 'independently_verified'`,
`profile_picture_url`, `website`, `bio` (if empty) and store up to 20 recent media in `recent_posts`
with an `engagement` summary; on "not a business account" error, record `account_type = 'unknown'`
and keep the Tavily-derived values. Record every call in `api_usage` (provider `instagram_graph`).
