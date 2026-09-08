---
tags: [research, produce]
updated: 2026-09-09
---
# AI Production Platforms — the synthetic lane

**The pick: Higgsfield, through the MCP/CLI already connected to this repo — but only as the
hook-testing lane, never as the delivery lane for `WP_P1_UGC_coached`.** TopView is dropped.
Arcads is the fallback if Higgsfield's faces fail QA. Researched 2026-09-02; sources inline.
Human-creator platforms are in [[Production Platforms]].

## The answer in one table

| Piece of round one | Produce with | Why |
|---|---|---|
| `WP_P2_STATIC_100ms`, `WP_P1_STATIC_algorithm` | In-house design | Decided in [[03 Choose Videos And Five Campaigns]]; nothing to generate |
| `WP_P3_POSERESULT_stillyou` | In-house, from a real generation pair | Same |
| `WP_P2_DEMO_freecheck` | Real in-app capture + text overlays | The mechanism is the ad; an AI person adds risk and nothing else. Optional: an AI **host** voice-over line, third person |
| `WP_P1_UGC_coached` — **final creative** | **Human creator (Billo; Upwork for a single video)** — see [[Production Platforms]] | The confession-story hook is first-person lived experience. A generated person cannot say it honestly (§11.1, FTC fake-testimonial rule, and Higgsfield's own truth gate refuses it — below). The phone-flip + reaction beat is exactly where avatars break |
| **Host-style angle test** — feeds `WP_P2_DEMO_freecheck` and the backup hooks; runs **in parallel** with the shoot | **Higgsfield `ugc-website-video`** — AI host + our real app screenshots; scripts in [[Host Scripts]] | 3–5 host lines ("Would your photo pass?", "Most AI photo apps charge you for the bad result…") at ~$8–16 each. It **cannot** test the confession hook — that is first-person and human-only — so the Billo package's 3–5 creators are the test for campaign 3. Do not hold the shoot for the AI lane. The workflow composites *real* captured screens and never generates UI — matches our "we supply the app screens" rule |
| Post-win multiplication | Higgsfield `ad-multiplier` on the delivered human video | Same take, different generated person — a look/casting variable at no reshoot. Needs a likeness + derivative-edit clause in the creator contract first |

**Rule for the AI lane:** a generated creator is a *host or demonstrator*, never a user.
Host copy only — "Most AI photo apps charge you for the bad result. This one checks first." —
in the third person about the product, plus an on-frame "AI-generated presenter" line. No
first-person story, no reaction-to-result beat, no outcome claim. This is our §11 restated,
and it is also what the platform enforces.

## Why Higgsfield, and its limits

1. **Already wired in.** The Higgsfield MCP is connected to this project (official server,
   OAuth, shipped 2026-04-30 — [higgsfield.ai/cli](https://higgsfield.ai/cli),
   [setup guide](https://www.higgsfieldmcp.com/guides/setup-claude)). Zero onboarding, and the
   whole pipeline runs from the terminal like the Meta MCP in [[06 Meta Ads Configuration]].
2. **Purpose-built workflows that match our briefs**, read from the MCP catalog 2026-09-02:
   - `ugc-website-video` — one continuous 9:16 talking-head creator (US accent), the site/app
     shown **only as real captured screenshots** overlaid as cards; hard rule: "never AI-generate
     UI, never animate a screenshot". Locked models: Soul 2.0 (creator) → Seedream 5 Pro
     (de-slop pass) → Seedance 2.5 (15 s clips with native speech) → Whisper captions.
   - `ugc-review-video` — talking head with product in hand. Its **safety and truth gate**:
     "a generated creator is a host or demonstrator, never a real customer"; first-person
     experience only when a consenting real person supplies and confirms the script; no invented
     results, before/after, ratings or social proof. That gate is why the confession hook stays
     human.
   - `ad-multiplier` — one 4–30 s source video → N versions replacing people/products/backgrounds,
     preserving motion, cuts, timing and the original audio. Generated replacement people are
     adults with an explicit two-axis casting contrast.
   - Also: `product-photoshoot` (statics), `video-editing` (captions, split-screen), `subtitles`.
3. **Multi-model under one bill** — Seedance 2.5, Kling 3, Veo 3.1, Sora 2, Soul 2.0, Cinema
   Studio (30+ models, [cli page](https://higgsfield.ai/cli)). Practitioner tests put Veo 3.1
   ahead on legible on-screen text and Sora 2 ahead on UGC texture and talking heads
   ([LumiChats](https://lumichats.com/blog/ai-video-generation-tools-2026-sora-veo-runway-kling-complete-guide),
   [OneStudio](https://www.onestudio.video/blog/veo-31-vs-sora-2-vs-kling-30-product-ad-videos)) —
   we get whichever wins without a second subscription.
4. **Cost — live prices read through the MCP billing tool on 2026-09-02** (the web
   teardowns from August list other tier names and prices; trust the MCP):
   **Plus $49/month, 1,000 credits** ($39/month on annual) · **Ultra $129/month, 3,000
   credits** ($99/month on annual) · **3-day Plus trial via MCP: 100 credits for $0**, card
   required, auto-renews to Plus $49/month unless cancelled before day 3. The annual plans'
   "365-day unlimited" perks are web-only and do not apply to MCP/CLI generation.
   Credit maths from Higgsfield's own worked example — a 15 s UGC ad = **165.72 credits
   ≈ $8.30** ([Higgsfield blog, 2026-08](https://higgsfield.ai/blog/faceless-videos-ugc-ads-2026)):
   a 20–30 s host clip is two segments ≈ 250–330 credits; **3 variants ≈ 1,000–1,300 credits
   with retries; 5 variants ≈ 2,000+.** A 10 s 1080p clip ≈ 20 credits; Veo 3 lip-sync ≈ 58
   credits/clip ([lip-sync guide](https://higgsfield.ai/blog/make-ai-lipsync-videos)).
   **Plan path: the $0 trial to prove the pipeline (100 credits buys one short clip and the
   screenshot-capture + disclosure-burn test, not the hook set) → Plus monthly $49 for the
   test month, scoped to 3 variants → Ultra monthly $129 only if the AI lane earns a volume
   role. No annual: credits expire, tiers were renamed three times in 2026, and cancellation
   friction is the top Trustpilot complaint.** **Measured 2026-09-07: the 25 s S2 run cost
   228 credits** — Seedance 2.5 at 1080p with audio is a flat 9 credits per second (135 + 90),
   the Soul seed 0.12, the Seedream de-slop 3, Whisper and ffmpeg in the sandbox 0. Five runs
   ≈ 1,150 credits, one Plus month if nothing is regenerated ([[Host Run 2026-09-07]]).
   **The resolution ladder, preflighted 2026-09-07** (`get_cost`, Seedance 2.5, 9:16, 15 s +
   10 s; audio on or off makes no difference): **480p 37.5 + 25 = 62.5** · 720p 97.5 + 65 =
   162.5 · 1080p 135 + 90 = 225. **Rule since 2026-09-07: test runs at 480p, the final at
   1080p only on the owner's command** — five 480p tests ≈ 313 credits, and each 1080p
   re-render of a winner is a fresh take (same seed and prompt, different performance), 225
   each; `upscale_video` exists on the MCP as the alternative, cost and quality unverified.
   **Cheaper test models, preflighted 2026-09-08** (`get_cost`, 9:16, 12 s, 480p unless noted, native
   audio, all take an `image_references` face): Seedance 2.0 Mini **12** (1.0/s) · Wan 3.0 **12** (1.0/s)
   · Gemini Omni Flash 1.1 at 360p, 10 s max **10** · Seedance 2.0 fast 18 · Wan 3.0 Prime 18 ·
   MiniMax H3 Max 18 · Grok Video 1.5 30 · Seedance 2.5 30 (2.5/s) · Seedance 2.0 std 36 · FLUX 3
   Video (720p min) 66. **Owner's decision 2026-09-08: every test runs on Seedance 2.0 Mini at 480p** — same family
   and prompt conventions as the locked 2.5, 60 % cheaper (a 25 s run ≈ 25 credits); its
   talking-head quality against 2.5 is unverified until the first Mini run. The 1080p final
   stays on Seedance 2.5, the workflow's locked model.
   **Kling, asked 2026-09-08:** no "Kling Avatar" exists on the Higgsfield MCP (catalog searched for
   avatar / lip-sync — only Sync Lipsync 3, a video-plus-audio lip-sync tool, and the Kling video
   models). Kling 2.6 / 3.0 / 3.0 Turbo take a `start_image` (the seed becomes the literal first
   frame — 3:4 seed into a 9:16 output, weaker framing control), not an `image_references` face,
   which is why they sat outside the first ladder. Prices for 12 s, 9:16: Kling 3.0 std with
   sound **24** (2.0/s, 720p — no resolution switch) · sound off 18 · Kling 3.0 pro with sound 30 ·
   Kling 3.0 Turbo 720p 18 (no speech parameter) · Kling 2.6, 10 s with sound 20. So Kling 3.0 std
   is the cheapest *720p* talking option (Seedance 2.5 at 720p is 78), while Seedance 2.0 Mini at
   480p (12) stays the cheapest test overall.
5. **Rights.** Marketing Studio: "content you generate is yours to publish … from organic posts
   to paid campaigns, subject to Higgsfield's Terms of Use"
   ([marketing-studio-intro](https://higgsfield.ai/marketing-studio-intro)). Third-party
   teardowns say **the Free plan excludes commercial use** — paid plans include it
   ([imagine.art](https://www.imagine.art/blogs/higgsfield-ai-pricing), secondary source; read the
   ToS before the first paid ad).

**The account is on Plus since 2026-09-06** — 1,200 credits granted; `balance` read 1,210 on
2026-09-07 before the first run and 982 after it. Nothing generated on the earlier Free plan
may run as an ad; everything from 2026-09-06 on is paid-plan output.

**Trade-offs to manage.** Trustpilot 4.0 / 4,122 reviews, 19% one-star: credits expire, queues
over an hour on unlimited plans, slow support, pricing renamed three times in 2026
([Trustpilot](https://www.trustpilot.com/review/higgsfield.ai),
[Buttondown](https://buttondown.com/dstandard/archive/higgsfield-ai-pricing-in-2026-real-cost-of-plans/)).
Avatars cannot reliably hold a phone with a legible screen — the workflow itself keeps the
product out of the body of the clip and shows the app as overlay cards. Max clip 15 s per
generation; a 30 s ad is two clips cut together. MCP calls timed out repeatedly on 2026-09-02;
plan generation time generously.

6. **Nothing here renders longer than 15 seconds.** Read across the video catalog 2026-09-08:
   Marketing Studio declares `duration_range` 12–15 s, and Seedance 2.5, 2.0 and 2.0 Mini all
   cap at 15 s. **So every creative longer than 15 s is a splice, by definition** — a script is
   written as clips from the first draft, never as one continuous read, and the join is ours.
   Put the clip boundary on a sentence end, never mid-clause: the seam is exactly where the two
   renders meet, and a sentence break hides it.
7. **Marketing Studio is not the tool for our formats** (read 2026-09-08, both the model schema
   and the preset gallery). Its video side is five formats — UGC talking-head, plus 2D product
   motion, hypermotion, mixed media and SaaS motion. Everything else in the gallery (Ads,
   Posters, Product shot, Marketplace) outputs **images**, not video; the `ads` tab alone holds
   986 static presets. The `saas` presets are decorative motion graphics ("Echo Wave", "Paper
   Carousel", one of them 16:9), not screen capture — no use for an app whose product is a
   photograph. The model takes a product, an avatar, a preset slug and optionally a hook +
   setting or an `ad_reference_id`, and **there is no shot-list input**: nothing accepts "these
   thirteen stills, in this order, with these cut points". It *does* take our images
   (`product_ids`, avatars, `start_image` / `end_image`) but composes its own scenes around
   them. For a bottle that is fine. For us it is fatal: the thing on screen *is* a photograph,
   so a synthesised frame derived from ours stops being the output WinkyPie returned — invented
   proof under §11.1. Use it for nothing in this channel; the talking clip we get cheaper and
   with full control straight from `generate_video`.

## The comparison (checked 2026-09-02)

| Platform | What it is | Price | Rights | Phone / app screen? | Verdict for us |
|---|---|---|---|---|---|
| **Higgsfield** (MCP/CLI) | Multi-model studio + UGC/ad workflows, 100+ Soul avatars | Plus $49 (1,000 cr) / Ultra $129 (3,000 cr) per month, live 2026-09-02; 3-day $0 trial; ~$8 per 15 s UGC ad | Paid plans: commercial incl. paid ads | Real screenshots as overlay cards; avatar never holds a legible screen | **PICK — hook-testing lane** |
| **Arcads** | The reference AI-actor talking-head tool; 300–1,500 actors, gender/age filters | Starter $110/mo (8,000 cr; ~$77 promo), ~$11/video; **no free trial, no public pricing page** ([Wireflow](https://www.wireflow.ai/blog/arcads-pricing), [eesel](https://www.eesel.ai/blog/arcads-ai-pricing)) | Included [unverified — page requires account] | "Weak handling of physical products" ([Filmora review](https://filmora.wondershare.com/video-editor-review/arcads-review.html)) | **Fallback** if Higgsfield faces fail QA. Best-in-class faces; costs 2–5× more |
| **TopView.ai** | "Video agent": prompt/URL → multi-scene video, 5,000+ avatars, micro-drama focus | Pro ~$16–29/mo (960 cr/yr), Business $75 ([tagshop review](https://tagshop.ai/review/topview-ai)); credits do not roll over | Commercial license on Pro | Product avatar exists; lip-sync "notably poor" | **Drop.** Trustpilot 2.7/48; buggy, no preview, credits wiped after a missed renewal; nothing our brief needs that Higgsfield lacks |
| **Creatify** | URL → ad, avatars, templates; G2 4.8/1,511 | Starter $33 / Pro $49–99 per month, ~$1.65 per 30 s ([Superscale](https://superscale.ai/alternatives/creatify/pricing)) | Included | Templates, no phone-in-hand | Skip — identifiable "Creatify look", lip-sync drift ([EzUGC](https://www.ezugc.ai/review/creatify-ai)) |
| **HeyGen** | Avatar IV/V talking head, product placement | Creator $29/mo, ~$0.48 per 30 s ([EzUGC](https://www.ezugc.ai/blog/heygen-review)) | Included | "Works best with small handheld items" — a phone qualifies; no screen content | Cheapest credible avatar layer; needs an editor for everything else. Not needed while Higgsfield covers it |
| **Poolday.ai** | AI presenter + real gameplay/screen recording, built for mobile apps | Tiered, not public [unverified] | [unverified] | **Yes — its whole pitch** ([AgentMedia](https://agent-media.ai/best/ai-ugc-ads-tool-for-mobile-apps)) | Worth a demo if the AI lane ever becomes the volume lane; not for round one |
| MakeUGC | Simple talking-head UGC, 500+ creators | $49/mo (5 videos) · $69 (10) · $119 (20) ([Shhots](https://shhots.ai/blog/best-ai-ugc-ad-tools/)) | Included | No | Skip — a subset of Higgsfield |
| Captions / Mirage | AI actors + editor, dubbing | $24.99 → $279.99/mo ([Shhots](https://shhots.ai/blog/best-ai-ugc-ad-tools/)) | Included | No | Skip for now; the editor is the interesting part |
| Meta Advantage+ generative | Image → video, dubbing, AI music, persona images inside Ads Manager ([Meta](https://www.facebook.com/business/ads/meta-advantage-plus/creative)) | Free with spend | n/a | No talking creator | Use later for free variations of the statics; not a production tool |
| Raw models (Veo 3.1, Sora 2, Kling 3) | Engines, not products | Per-second API | Provider ToS | Veo best for text legibility; Sora for UGC feel | Reached through Higgsfield — no separate accounts |
| Synthesia, Runway | Corporate avatars / cinematic gen | — | — | — | Wrong product for phone-shot UGC |

## What the evidence says about AI vs human UGC (read the caveats)

Every number below comes from vendors or agencies selling one of the two — none has a
published sample size. The *direction* is consistent; the magnitudes are marketing.

| Claim | Source | Status |
|---|---|---|
| AI UGC "within 5–15% of real creator UGC" on Meta CPA/ROAS; 70–80% cheaper per asset | [Social Operator](https://socialoperator.ai/learn/ai-ugc-vs-real-ugc/) | `[vendor-adjacent]`, no sample |
| Creatify case: 28% lower cost per result, 31% lower CPA | via [inBeat, 2026-06](https://inbeat.agency/blog/ai-ugc-ads-vs-real-ugc) | `[vendor]` |
| Real UGC converted 18% better at equal spend — but the AI test cost $6, the shoot $900 | [inBeat](https://inbeat.agency/blog/ai-ugc-ads-vs-real-ugc) | `[unsourced]` case |
| CTR varies up to 180% between avatars on the *same* script; human re-shoots of winning AI ads add 15–30% CTR and fatigue slower | [AdMake, 2026-04](https://admakeai.com/blog/what-is-ai-ugc-ad) | `[agency]` |
| Consensus workflow: test hooks with AI, rebuild the winner with a real creator | inBeat, Social Operator, AdMake, Mammoth | Practitioner consensus |

The consensus is exactly our split above: AI where the *script* carries the result (hooks,
explainers, demos); a human where *belief in the speaker* carries it (the confession story,
the reaction).

## QA before any AI clip leaves the sandbox

From the same sources, plus Higgsfield's own frozen-frame checklist:

1. **Script first, face second.** The dead giveaway is copy that reads like marketing: perfect
   grammar, no contractions, three-beat lists, "game-changer". Read it aloud; add contractions.
   Our voice rules already forbid hype — they help here.
2. Frozen frames at mid-word: clean lips, ≤2 hands, no face drift, no baked text.
3. Eye contact slightly off-axis or too steady = reject. Frozen gesture mid-sentence = reject.
4. **Never a generated screen.** App UI is always our real capture; any AI-drawn phone screen
   fails on legibility and on §11.5 honesty.
5. Disclosure on frame: "AI-generated presenter." Third person about the product. No user story.
6. Same QA list as the human lane afterwards: every beat present, hook legible sound-off in
   1.5 s, 9:16 master, §11 clean.

## Compliance (verified 2026-09-02 against primary sources)

**The rule that falls out of all four regimes: the AI presenter is a host, says nothing about
past use or results, and carries the on-frame line "AI-generated presenter. Not a real
customer." from the first frame.** With that, the AI lane is no riskier than a human actor in
the US and legal in the EU. Without it, the confession-story format is a banned fake
testimonial in both.

| Regime | Rule | Hits our AI host clip? | What we do | Source |
|---|---|---|---|---|
| Meta | Mandatory "created or edited with AI" self-disclosure | **No** — only for social-issue, election and political ads | Nothing mandated. Meta may still auto-label via C2PA/IPTC metadata ("AI info" in the ad's menu); cannot be removed, does not affect delivery — leave the metadata on | [Meta help 1486382031937045](https://www.facebook.com/business/help/1486382031937045), [Meta newsroom 2025-02](https://about.fb.com/news/2025/02/gen-ai-transparency-metas-ads-products/) |
| Meta | Unacceptable business practices / unrealistic outcomes; personal attributes | Yes, medium-neutral — on the *claim*, not the AI | Third person about the product, no outcome claims — the §11 rules we already run | [help 757209948405699](https://www.facebook.com/business/help/757209948405699), [help 2557868957763449](https://www.facebook.com/business/help/2557868957763449) |
| **Meta** | **Dating policy** — "dating facilitation (for example, dating profile management)" needs prior written permission and 18+; dating ads may not show **selfies / people photographing themselves** or "fictitious individuals" | **Unresolved — and it hits the human lane too.** Our whole mechanic is a selfie | Resolve with Meta before scaling; queued in [[06 Meta Ads Configuration]]. Until then, prefer "phone in hand" over "taking a selfie" on frame | [Meta help 765622867361201](https://www.facebook.com/business/help/765622867361201) |
| US — FTC | 16 CFR 465, Consumer Reviews and Testimonials Rule, in force 2024-10-21 — bans testimonials by "someone who does not exist, such as AI-generated fake reviews" or who lacks real experience; civil penalties | Only if viewers would take the presenter for a real user. A visible demo host is outside the rule | No first-person story from a generated person. Enforcement so far: Rytr (fake-review generator, 2024), warning letters to 10 firms 2025-12; no avatar-video case yet | [FTC press release](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials), [FTC warning letters 2025-12](https://www.ftc.gov/news-events/news/press-releases/2025/12/ftc-warns-10-companies-about-possible-violations-agencys-new-consumer-review-rule) |
| US — FTC | 16 CFR 255 Endorsement Guides — an "obvious fictional dramatization" is not an endorsement; people presented as actual consumers who are not need a clear, conspicuous, unavoidable, same-modality disclosure | Applies to the **human** lane's scripted confession too | Human video: demo-user framing per the brief, no results; a small end-card "dramatization" is not enough — disclose in the same channel as the claim | [16 CFR 255](https://www.law.cornell.edu/cfr/text/16/part-255) `[wording not re-fetched]` |
| EU — AI Act | Art. 50(4): deployers of deep fakes must disclose "artificially generated or manipulated", clearly, at first exposure; applies from **2026-08-02**; fines up to €15m / 3% | **Yes.** Commission Guidelines: a realistic synthetic depiction of a *fictitious* natural-looking person is a deep fake — no real likeness needed; a realistic cloned voice too. A human actor carries zero AI Act duty | Human-readable label in the first frames (a machine-readable mark alone is insufficient). Also applies to the app's own AI portraits if shown in EU ads | [Commission FAQ](https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act), [Guidelines](https://digital-strategy.ec.europa.eu/en/policies/guidelines-transparency-ai-generated-content), [Art. 50 text](https://artificialintelligenceact.eu/article/50/) |
| EU — UCPD | Annex I pt 22–23c: posing as a consumer, fake reviews/endorsements — per se unfair | If the avatar poses as a customer | Same fix as FTC | [Directive 2005/29/EC](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32005L0029) `[not re-fetched]` |
| US — New York | Synthetic-performer ad disclosure law | `[unverified]` — reportedly an on-frame duty for ads reaching NY | Check before launch; the label above would satisfy it anyway | — |

Two agency-blog claims did **not** survive verification and must not be repeated: "Meta made
AI labels mandatory for all AI-subject ads in March 2026" and "14% of Meta rejections are
undisclosed AI" ([AdMake](https://admakeai.com/blog/what-is-ai-ugc-ad)) — no Meta surface
says either. Meta's own policy text was pulled live through the Meta Ads MCP on 2026-09-02.

## What we do not know yet

- ~~Exact credit cost of one `ugc-website-video` run~~ — measured 2026-09-07, 228 credits for
  25 s; the `transactions` read-out and the per-step table are in [[Host Run 2026-09-07]].
- Whether Higgsfield's ToS treats `ad-multiplier` output over a *human creator's* footage as
  our content — and whether a Billo-standard release covers a face replacement. Assume no until
  the contract says yes.
- Arcads' usage-rights terms (behind sign-up).
- Poolday pricing.
