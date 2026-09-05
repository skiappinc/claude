\# Poulef Automatic Recipe Publishing Workflow



\## MAIN COMMAND



The user can simply provide:



create recipe: RECIPE NAME



or:



recipe: RECIPE NAME



or provide a recipe hook/source.



The assistant must handle the complete workflow automatically.



\---



\# WORKFLOW



When the user requests a recipe:



\## STEP 1 — Identify the recipe



Extract the recipe name from the user's request.



Example:



create recipe: Lemon Coconut Cottage Cheese Scones



The recipe name is:



Lemon Coconut Cottage Cheese Scones



\---



\## STEP 2 — Find the recipe source



Before writing the article, look for an existing source containing the recipe.



Check, in order:



1\. Current conversation

2\. Files supplied by the user

3\. Local recipe/source files available to the project

4\. Other explicitly approved Poulef source material

5\. If none of the above yield a complete recipe, automatically run a live web search (WebSearch) for the recipe name to find real published recipe sources — do not ask the user for a source first. Fetch the most promising 1-3 results (WebFetch) to compare actual ingredients/quantities/instructions.



If a complete recipe source exists (from any of the above, including step 5), use it as the source of truth.



If step 5 turns up multiple candidate recipes that differ meaningfully in ingredients, method, or final dish (e.g. a simple version vs. a richer version with extra components), briefly present the 2-3 best candidates to the user and ask which to use as the source of truth before proceeding — this is a real judgment call, not something to guess silently. If the candidates are essentially the same recipe with minor wording differences, just pick the most reputable/complete one and proceed without asking.



Only if the web search itself turns up no usable recipe source should you ask the user to provide one — do not invent precise recipe facts in that case.



\---



\# RECIPE ACCURACY RULE



Never invent:



\- ingredients

\- ingredient quantities

\- cooking temperature

\- cooking time

\- preparation time

\- serving count

\- nutrition values

\- dietary claims



when those details are not available in the source.



If the user provides only a recipe name and no recipe source can be found, ask for the recipe/source instead of fabricating the recipe.



\---



\# STEP 3 — READ POULef SKILLS



Read:



\~/.claude/skills/poulef-article/SKILL.md



and:



\~/.claude/skills/poulef-recipe-card/SKILL.md



Follow those instructions exactly.



\---



\# STEP 4 — GENERATE FULL SEO ARTICLE



Create the complete Poulef SEO article.



The article body (excluding the recipe card block, which is a separate component) must be at least 1500 words. Reach this length by writing genuinely useful, non-repetitive content in the sections below (ingredient notes, tips, storage/freezing detail, common mistakes, recipe background, a fuller FAQ, etc.) — never by padding with filler, restating the same point in different words, or inventing unsupported recipe facts to hit the count.



The article must include, when applicable:



\- SEO title

\- Focus keyword

\- Introduction

\- Recipe overview

\- Why You'll Love This Recipe

\- Taste/texture description

\- Ingredients

\- Ingredient notes

\- Equipment

\- Variations

\- Substitutions

\- Step-by-step instructions

\- Tips

\- Serving suggestions

\- Storage

\- Freezing

\- Common mistakes

\- Recipe background/general information

\- FAQ

\- Conclusion

\- More recipes

\- Pinterest CTA

\- Interactive section

\- Nutrition



Use clean WordPress-compatible HTML.



Do not output Markdown headings or Markdown tables for the WordPress article.



Do not include an `<h1>` tag inside the article's HTML content. WordPress already renders the post title as the page's H1, so an `<h1>` inside the content body creates a duplicate title on the page. The content body's top-level heading should start at `<h2>` (e.g. "Why You'll Love This Recipe").



\---



\# STEP 4.5 — REQUEST RECIPE IMAGES



Immediately after the article is generated (Step 4), and before any RankMath image alt-text work in Step 8.6, ask the user for three images:



1\. Feature image — the finished dish

2\. Ingredients image — ingredients laid out

3\. Preparation/mixing image — a mid-process shot (e.g. batter being mixed)



Tell them they can either upload the images directly in this conversation, or add them manually in WordPress themselves later — both are fine.



\## If the user provides images (uploaded in chat)



1\. Upload all three to the WordPress media library via the REST API (`POST {WP\_URL}/wp-json/wp/v2/media`).

2\. Set the feature image as the post's featured image (`featured\_media`).

3\. Use that SAME feature image in the Tasty Recipe card's image field (via the card's "Select Image" button in the browser, choosing the same media library item).

4\. Insert the ingredients image as a native `core/image` block immediately below the "Ingredients" heading in the article content.

5\. Insert the preparation/mixing image as a native `core/image` block immediately below the "Step-by-Step Instructions" heading in the article content.

6\. As part of Step 8.6, set descriptive alt text on all three images (containing the focus keyword on at least the feature image).



\## If the user skips or declines providing images



\- Do NOT perform the image alt-text sub-step in Step 8.6 — there is no image to set it on.

\- In the Step 10 final response, explicitly tell the user that no images were added and that this is likely capping the RankMath score (missing featured image + missing image alt text can cost up to ~8 points). Recommend they add a featured image with keyword-containing alt text manually in WordPress for a better score.



\---



\# NUTRITION FORMAT RULE



The Nutritional Information section must always be an HTML `<table>` (with `<thead>`/`<tbody>`, one row per nutrient: Calories, Carbohydrates, Protein, Fat, Sodium, Sugar, etc.), never a plain-text paragraph or a bullet list.



Only include rows for nutrient values actually supported by the recipe source. Never fabricate a precise value that was not supplied.



Example structure:



<table>

<thead><tr><th>Nutrient</th><th>Amount per Serving</th></tr></thead>

<tbody>

<tr><td>Calories</td><td>556</td></tr>

<tr><td>Carbohydrates</td><td>69g</td></tr>

<tr><td>Protein</td><td>6g</td></tr>

<tr><td>Fat</td><td>30g</td></tr>

<tr><td>Sodium</td><td>346mg</td></tr>

<tr><td>Sugar</td><td>43g</td></tr>

</tbody>

</table>



\---



\# STEP 5 — INTERNAL LINKS



When appropriate, find relevant existing Poulef recipes from the approved Poulef sitemap/source.



Use real Poulef URLs only.



Never invent URLs.



Include relevant internal links naturally in:



\- serving suggestions

\- related recipes

\- recipe recommendations



\---



\# RELATED RECIPES RULE ("More Delicious Recipes You'll Love")



This section must always contain exactly 5 real, clickable links to existing Poulef recipes, never generic filler text like "Explore more recipes on Poulef."



To find them:



1\. Query the live site instead of crawling the raw sitemap index (it has 20+ split sitemap files) — use the public WordPress REST search endpoint:

&#x20;   `https://poulef.com/wp-json/wp/v2/posts?search={keyword}&status=publish&per\_page=10&\_fields=id,title,link`

2\. Search using keywords drawn from the current recipe (main ingredient, dish type, cuisine, cooking method — e.g. for a cornbread recipe: "cornbread", "honey butter", "biscuit", "southern", "skillet").

3\. Pick the 5 most relevant, real results (closest in ingredient/technique/theme). Never invent a title or URL that didn't come back from this query.

4\. Render as a clickable HTML list, e.g.:



<h2>More Delicious Recipes You'll Love</h2>

<ul>

<li><a href="https://poulef.com/example-recipe/">Example Recipe Title</a></li>

...

</ul>



\---



\# PINTEREST EMBED RULE



The Pinterest CTA section must include both:



1\. The existing text CTA (mentioning @PoulefRecipe and linking to https://www.pinterest.com/poulefrecipe/).

2\. A real embedded Pinterest widget of that account — not just a text link — inserted directly in the live WordPress post as a native `core/embed` block pointed at https://www.pinterest.com/poulefrecipe/ (Gutenberg resolves this via oEmbed into a live preview of the account's pins).



A static local HTML file cannot render a live oEmbed, so the embed step only needs to happen in the live WordPress post/editor, not in the locally saved article file. Verify the embed actually resolves (shows real pin thumbnails, not a broken/empty block) before considering this step done.



\---



\# STEP 6 — TASTY RECIPES CARD



Generate the complete:



function fillRecipeForm() {

&#x20;   ...

}



fillRecipeForm();



Use the exact structure and field names defined in:



\~/.claude/skills/poulef-recipe-card/SKILL.md



Do not invent selectors.



The recipe card must contain the recipe's:



\- description

\- ingredients

\- instructions

\- notes

\- prep time

\- cook time

\- total time

\- yield

\- category

\- method

\- cuisine

\- keywords

\- diet

\- serving size

\- nutrition



ONLY when supported by the recipe source.



\---



\# STEP 6.5 — CATEGORY SELECTION



Every article must be assigned to at least one real, existing WordPress category — never left as "Uncategorized" and never assigned to an invented category name.



1\. Fetch the site's actual categories before picking one:

&#x20;   `https://poulef.com/wp-json/wp/v2/categories?per\_page=100&\_fields=id,name,slug,count`

2\. Match the recipe to the closest existing category by dish type (e.g. a baked good that's typically eaten in the morning → Breakfast & Brunch; a sweet treat → Desserts & Sweets; a small bite → Appetizers & Snacks; a main dish → Dinner Ideas).

3\. If more than one category is a reasonably close fit and the choice isn't obvious, ask the user which one to use rather than guessing — this becomes the default for similar future recipes until the user says otherwise.

4\. Pass the chosen category ID(s) in the `categories` field when creating the WordPress draft (the wordpress.py payload already supports `"categories": \[id, ...]`), and also set it on the live post via `wp.data.dispatch('core/editor').editPost({ categories: \[id] })` if the category is being fixed after the fact in the browser.



\---



\# STEP 7 — DUPLICATE CHECK



Before creating a WordPress post:



Run the WordPress publisher:



\~/.claude/skills/poulef-wordpress/wordpress.py



The title must be checked against existing:



\- published posts

\- drafts

\- pending posts

\- future posts

\- private posts



The slug must also be checked.



\---



\# DUPLICATE SAFETY



If an existing recipe is found:



STOP.



Do NOT create a new draft.



Report:



\- existing post ID

\- existing title

\- existing status

\- existing URL



\---



\# STEP 8 — CREATE WORDPRESS DRAFT



If no duplicate exists:



Create exactly ONE WordPress post with:



status = draft



NEVER use:



status = publish



The article must remain a WordPress draft for manual review.



\---



\# STEP 8.5 — INSERT AND FILL THE TASTY RECIPE CARD IN THE BROWSER



After the WordPress draft is created, automatically finish the recipe card in the live post editor instead of only handing the user a JavaScript file:



1\. Open the Browser pane and navigate to the site's WordPress login URL (see the reference memory for the current login path if the default /wp-admin or /wp-login.php redirects to "Page not found").

2\. If not already authenticated, ask the user to log in themselves in that same browser tab. Claude must NEVER type, paste, store, or otherwise handle the WordPress username/password itself — entering credentials to authenticate is permanently prohibited, even if explicitly requested. Wait for the user to confirm they are logged in before continuing.

3\. Navigate to the post editor for the newly created draft:

&#x20;   {WP\_URL}/wp-admin/post.php?post={POST\_ID}\&action=edit

4\. Locate the Tasty Recipe block already present in the post content (block name `wp-tasty/tasty-recipe`). If none exists, insert one at the end of the content via the block inserter.

5\. Click into the block to open its "No Tasty Recipe created yet" form (or its existing edit form).

6\. Execute the fillRecipeForm() logic for that recipe directly in the page (via JS execution in the browser), using the exact TinyMCE editor IDs and field names defined in \~/.claude/skills/poulef-recipe-card/SKILL.md. Do not invent selectors.

7\. Verify field values were actually set (read them back) before proceeding — do not assume success.

8\. Click "Insert" to save the recipe card into the block.

9\. Immediately below the Tasty Recipe card block (i.e. after it in the block list, at the end of the post), insert the RankMath "Table of Contents" block via the block inserter. Search the inserter for "Table of Contents" and use whatever block RankMath actually registers on this site — do not guess or hardcode a block name/shortcode; discover it live the same way the Tasty Recipe block was discovered.



&#x20;   IMPORTANT: RankMath's TOC block only detects headings that exist as real Gutenberg blocks (`core/heading`). If the article was inserted as one raw HTML "Classic" block (which is what happens when content is posted through the REST API as an HTML string), the TOC will render empty both in the editor and on the live page. Before inserting the TOC block, convert the Classic block into native blocks, e.g.:



&#x20;   `wp.blocks.rawHandler({ HTML: classicBlock.attributes.content })` to parse the HTML into an array of native blocks, then `wp.data.dispatch('core/block-editor').replaceBlock(classicBlock.clientId, parsedBlocks)`.



&#x20;   Always verify the TOC actually lists headings (in the editor) and actually renders on the front-end preview URL before considering this step done — do not assume success from the block being present.

9.5\. If the user provided recipe images (per STEP 4.5): upload them to the media library, set the feature image as the post's featured image, set that same feature image in the Tasty Recipe card (click the card's edit icon, click "Select Image", choose the uploaded feature image from the Media Library tab, click "Select Image" to confirm, then "Update" to save the card), insert the ingredients image as a `core/image` block below the "Ingredients" heading, and insert the preparation/mixing image as a `core/image` block below the "Step-by-Step Instructions" heading. If the user did not provide images, skip this step entirely — do not fabricate or source stock images.

10\. Find the "Follow Poulef on Pinterest" heading block (the text CTA paragraph should already be right after it from Step 4's article content). Insert a native `core/embed` block pointed at `https://www.pinterest.com/poulefrecipe/` immediately after that text CTA paragraph — this is the PINTEREST EMBED RULE from earlier in this file; it is a required part of this step, not optional follow-up. Verify the block actually resolved to Pinterest (`block.attributes.providerNameSlug === 'pinterest'`), not a generic/failed embed. Note: verifying that it visually renders real pin thumbnails may not be possible from this automated browser even when the embed is technically correct — Pinterest's widget can fail to paint inside a nested iframe in some automated/headless contexts while working normally for real visitors. If a screenshot of the embed area comes back blank after several seconds' wait, don't loop retrying — note the technical resolution succeeded (via `providerNameSlug`) and tell the user to give it a visual check themselves in a normal browser rather than declaring it fully verified.

11\. Click "Save draft" to persist the change. Confirm the status shown is still "Saved"/"draft", never "Published".



&#x20;   SAFETY: The "Save draft" and "Publish" buttons sit close together in the WordPress top toolbar, and a misclick between them can silently publish the post. After every save in this workflow (this step and Step 8.6 below), do NOT trust the on-screen button alone — verify the real status with a direct REST API call: `GET {WP\_URL}/wp-json/wp/v2/posts/{POST\_ID}?\_fields=id,status,link`. If it ever comes back `"status":"publish"` when it shouldn't, immediately revert it with `POST {WP\_URL}/wp-json/wp/v2/posts/{POST\_ID}` and body `{"status":"draft"}`, then tell the user what happened and confirm the revert.



This step is fully automatic except for the login itself, which always requires the human user.



\---



\# STEP 8.6 — RANKMATH SEO OPTIMIZATION



Immediately after Step 8.5 (recipe card + TOC), optimize the post's RankMath SEO score to at least 80/100 before saving. Do this in the same browser session, using the RankMath data store already loaded in the block editor (`wp.data.select('rank-math')` / `wp.data.dispatch('rank-math')`):



1\. Set the focus keyword to the recipe's natural name (e.g. "no bake protein brownie bars") via `dispatch('rank-math').updateKeywords(...)` and `updateSelectedKeyword({tag:'', index:0, data:{value: ...}})` (for the live score) AND directly via `editPost({ meta: { rank\_math\_focus\_keyword: keyword } })` (for actual persistence — the store dispatch alone does NOT save it to the database, same issue as step 3 below). An unset/unpersisted focus keyword is the single biggest score killer — this alone typically moves the score from the 20s/30s into the 80s. Always verify `meta.rank\_math\_focus\_keyword` via the REST API after saving.

2\. The RankMath SEO title (`rank\_math\_title`) must always exactly match the WordPress post title — never a modified/lengthened variant (e.g. with a suffix like " - Poulef Recipes" or an added subtitle). Set it with the post's current title string, not a customized one.

3\. IMPORTANT — persistence: `dispatch('rank-math').updateSerpTitle(...)` / `updateSerpDescription(...)` only update the live preview in the store and have been observed to silently NOT persist to the database on save. Set these fields the reliable way instead, directly through post meta:

&#x20;   `wp.data.dispatch('core/editor').editPost({ meta: { rank\_math\_title: postTitle, rank\_math\_description: metaDescription }, status: 'draft' })` followed by `await wp.data.dispatch('core/editor').savePost()`.

&#x20;   After saving, verify the actual saved value via the REST API (`GET {WP\_URL}/wp-json/wp/v2/posts/{POST\_ID}?\_fields=id,status,meta` — check `meta.rank\_math\_title` and `meta.rank\_math\_description`), not just the editor's local state, since the editor can report a value that never actually made it to the database.

4\. Image alt text — ONLY if the user provided images per STEP 4.5. If they did, set descriptive alt text containing the focus keyword on the featured image (and reasonable descriptive alt text on the ingredients/preparation images too) — this has to go through the REST API (`POST {WP\_URL}/wp-json/wp/v2/media/{IMAGE\_ID}` with `{"alt\_text": "..."}`), not the RankMath store, since alt text lives on the media attachment. If the user did NOT provide images, skip this sub-step entirely — do not invent or source a stock image just to satisfy this test, and note in the Step 10 report that the score is likely capped without a featured image (missing image + missing alt text can cost up to ~8 points) and that they should add one manually for a better score.

5\. Set the primary category via `dispatch('rank-math').updatePrimaryTermID(categoryId)` (use the same category chosen in Step 6.5).

6\. Call `dispatch('rank-math').refreshResults()` and re-read `select('rank-math').getAnalysisScore()`. If still below 80, address whatever else RankMath flags (e.g. keyword missing from an early paragraph, keyword missing from a subheading, content length) — never invent recipe facts to do this, only adjust genuinely accurate SEO metadata and phrasing.

7\. Save (per Step 8.5's SAFETY note — verify via REST API afterward, not just the UI) and confirm both the score is ≥80 and `meta.rank\_math\_title` equals the post title, by reloading the editor and re-reading fresh, since some fields (SERP title/description, primary term) can silently fail to persist across a save and need to be re-checked.



Report the before/after score to the user as part of Step 10's final response when this step was performed.



\---



\# STEP 9 — NEVER MODIFY EXISTING CONTENT



Claude must NEVER:



\- publish automatically

\- delete posts

\- overwrite existing posts

\- update existing posts

\- change existing recipes



unless the user explicitly asks for that specific action. The one standing exception is the publish/draft question asked at the end of every recipe workflow in STEP 10 — that question itself is pre-authorized by this file, but actually switching the post to `publish` still requires the user's answer to that specific question, given fresh each time; a "yes" to a previous recipe does not carry over to the next one.



\---



\# STEP 10 — FINAL RESPONSE



After successful creation report:



Recipe:

\[title]



WordPress:

Draft created



Post ID:

\[ID]



Status:

draft



Draft URL:

\[URL]



Tasty Recipe Card:

Inserted and filled in the live post



Table of Contents:

RankMath TOC block inserted below the recipe card



Category:

\[Category name]



RankMath SEO Score:

\[score]/100 (focus keyword: \[keyword])



Also confirm:



The article has NOT been published — it is currently a draft.



Then ask the user directly: do they want this recipe published now, or kept as a draft for further review? Wait for their answer before doing anything further.



\- If they say to publish: set the post's status to `publish` via the REST API (`POST {WP\_URL}/wp-json/wp/v2/posts/{POST\_ID}` with `{"status":"publish"}`), then verify the change with a `GET` on the same endpoint, and report back the live URL.

\- If they say to keep it as a draft (or don't answer / say "later"): leave it as-is. Do not publish.



\---



\# USER EXPERIENCE



The user should not need to manually run Python commands.



The user should not need to manually create JSON.



The user should not need to manually create the Tasty Recipes JavaScript.



The goal is:



User:



create recipe: Lemon Coconut Cottage Cheese Scones



Claude:



1\. Finds source

2\. Generates full SEO article

3\. Generates Tasty Recipes card

4\. Checks duplicate

5\. Creates WordPress draft

6\. Opens the post in the browser, inserts and fills the Tasty Recipe card, then inserts the RankMath Table of Contents block right below it (asking only for a manual login when needed)

7\. Optimizes the RankMath SEO score to 80+ (focus keyword, SEO title/description, image alt text, primary category)

8\. Reports draft URL and RankMath score



\---



\# IMPORTANT



Never fabricate a complete recipe from only a recipe title.



When given only a recipe name, automatically web-search for a real source before asking the user for anything (see STEP 2). Only ask the user to provide a source if that search turns up nothing usable, or if multiple meaningfully different candidate recipes are found and the choice isn't obvious.

