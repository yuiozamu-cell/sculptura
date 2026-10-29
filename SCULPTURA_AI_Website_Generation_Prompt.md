# SCULPTURA — AI Website Generation Prompt

## Project Overview

Create a polished, responsive, interactive educational website for an Art Appreciation midterm project called **SCULPTURA — “Where Form Becomes Meaning.”**

The website should feel like a contemporary digital sculpture museum: artistic, elegant, immersive, educational, and easy to navigate. It must be original in its layout and visual identity. Do not copy an existing website or use a generic school-project template.

## 1. Reference Files and Content Accuracy

Before writing the website, carefully read and use both supplied files:

1. `Module-6.docx` — the primary source for the educational content.
2. `MIDTERM-PROJECT-INSTRUCTIONS-ART-APPRECIATION-ONLINE.pdf` — the official project requirements and grading rubric.

Treat the official instructions PDF as the authority for required deliverables and grading criteria. Use Module 6 as the primary content source. Keep the module's terminology, framing, and level of detail. Do not invent facts or silently replace the module's explanations with unrelated information. If additional research is needed, clearly distinguish verified outside information from module-derived content.

Build the site to address the rubric:
- Content accuracy and completeness — 25 points
- Creativity and originality — 20 points
- Visual design and aesthetics — 15 points
- Original creative output — 15 points
- Interactive activities — 10 points
- Organization and references — 10 points
- Group and instructor information — 5 points

Total: 100 points. If the official PDF specifies different criteria or values, follow the PDF.

## 2. Website Identity and Visual Direction

**Name:** SCULPTURA  
**Tagline:** Where Form Becomes Meaning

Design a contemporary digital art museum with an editorial, gallery-like experience.

### Visual style
- Warm ivory background: `#F5F1E8`
- Charcoal text: `#252525`
- Stone gray: `#B8B4AC`
- Terracotta accent: `#B66A4D`
- Muted olive accent: `#777B62`
- Elegant serif typography for major headings and clean sans-serif typography for body text.
- Generous whitespace, balanced composition, subtle borders, refined transitions, and clear visual hierarchy.
- Use large, high-quality, relevant sculpture photographs or artwork images with appropriate credits.
- Use restrained motion and transitions to enhance the experience without making the site distracting.
- Avoid excessive gradients, cluttered cards, childish visuals, and overly flashy animations.
- Make the layout distinctive; do not imitate a provided reference website's exact UI.

The site must be responsive on phones, tablets, laptops, and desktops. Follow accessibility basics: readable contrast, keyboard navigation, visible focus states, semantic HTML, descriptive alt text, and reduced-motion support.

## 3. Website Structure and Sections

Create a coherent navigation system and the following pages or clearly separated sections. Choose the implementation that best fits the required hosting environment.

### A. Home / Museum Entrance
- Strong hero section with the SCULPTURA title and tagline.
- A compelling, short introduction to sculpture as an art form.
- One striking sculpture image or a curated visual composition.
- Clear calls to explore the gallery, learn sculpture concepts, and try the activities.
- Include a concise “Explore the Museum” or equivalent navigation element.

### B. Understanding Sculpture
Use Module 6 to explain sculpture, its origins or development as covered in the module, its importance, and the concepts included in the source. Organize information into clear, digestible sections rather than long, dense paragraphs.

Include the types, materials, methods, techniques, and terminology that are actually supported by Module 6. Preserve the source's wording where appropriate, and do not add unsupported classifications as if they were in the module.

Include these terms if they appear in Module 6, with definitions based on the file:
- Rough
- Abstractionism
- Atelier
- Mould
- Conceptual
- Figurative
- Sketch

### C. Sculpture Gallery
Create a visually engaging gallery with artwork details, image captions, and accessible viewing controls. Use artwork examples supported by the module, including where relevant:
- **People Power Monument** — Eduardo Castrillo
- **David** — Michelangelo
- **Great Sphinx of Giza** — creator unknown
- **Christ the Redeemer** — Paul Landowski

For every artwork:
- Provide a short description grounded in the supplied module or clearly verified sources.
- Include the creator when known, the location or period only when verified, and the material or technique only when supported.
- Include image credits and source links.
- Do not invent artist biographies, dates, locations, materials, or historical claims.
- If an image's licensing or attribution is unclear, choose a properly credited alternative.

### D. Artist Spotlight
Include a featured artwork or artist spotlight, such as Michelangelo and *David*, if supported by the materials. Make the presentation visually strong and educational. Explain relevant artistic meaning, form, technique, and context only when supported by the module or verified sources.

### E. Interactive Learning Zone
Create at least **three distinct, functional learning activities**. They must work, not merely appear as decorative mockups.

Suggested activities:
1. **Sculpture Quiz:** At least 10 multiple-choice questions based on Module 6. Show feedback after an answer, track the score, and provide a final result with explanations.
2. **Match the Terms:** A matching activity using terms and definitions from the module.
3. **Guess the Sculpture:** Display a credited artwork image with clues and let the visitor choose or reveal the answer.
4. **Decode the Artwork:** Let visitors interpret a sculpture using guided prompts about form, material, subject, and meaning.

Use accurate module-derived questions and definitions. If the source does not contain enough material for a particular activity, create a smaller activity using only supported facts rather than inventing content.

### F. Digital Sculpture Studio — Original Creative Output
Create an interactive digital studio inspired by the sculpture-making activity in Module 6, including the soap sculpture activity if that is what the module describes.

Allow visitors to:
- Select an inspiration or subject.
- Choose a shape or visual form.
- Choose a material or technique from options supported by the module.
- Give their artwork a title.
- Write a short artist statement describing the intended meaning.
- Preview their choices in a polished, gallery-like presentation.

If feasible, include a simple drawing or shape-building interaction. If not feasible, create a meaningful interactive composition tool with a live preview. Clearly label this as a conceptual digital studio; do not imply that it replaces the physical activity described in the module.

The studio should count as an original creative output and should feel central to the experience.

### G. Art Appreciation Reflection
Add a section that helps visitors think about how sculpture communicates ideas, feelings, stories, and cultural meanings. Use guided reflection questions, but keep factual explanations grounded in the module.

### H. Meet the Creators
Add an attractive group-information section containing placeholders for:
- Each group member's name
- Role or contribution
- Photo or avatar
- Instructor's name

Do not fabricate real names, photos, or credentials. Make these fields easy for the group to replace.

### I. References and Image Credits
Provide a clean references section containing the supplied module and other sources actually used.

The module reference appears to be:

Ramos, Arnulfo B. (2018). *Art Appreciation for the New General Education Curriculum*. First edition. SMKC Printshoppe.

The module also lists `http://rolands-art.org/all-about-sculpture/`. Verify whether this source is accessible and relevant before using it. Follow the official assignment's required citation style; use APA 7 if the instructions require it or do not specify another style.

Credit every externally sourced artwork image. Link to the source of each image and clearly distinguish image credits from textual references. Never fabricate citations or claim to have consulted sources that were not accessed.

## 4. Shared Comment System — Supabase PostgreSQL

Implement a real shared commenting feature named **“The Sculpture Community Wall.”** Visitors should be able to submit comments about the website, featured artworks, or their learning experience. Comments must be stored in Supabase PostgreSQL and shared across browsers and devices.

**Important: I want to configure Supabase manually. Do not attempt to create, access, or configure a Supabase project on my behalf.** Generate the code, SQL, and instructions, then leave the account setup and SQL execution for me.

### Required implementation
- Use the official `@supabase/supabase-js` client library.
- Use Supabase PostgreSQL as the only database for shared comments.
- Do not use MySQL, SQLite, MongoDB, a local JSON file, `localStorage`, or `sessionStorage` as a substitute for persistent shared comments.
- Do not use hardcoded sample comments or fake submissions.
- If Supabase is not configured yet, show a clear setup-required state rather than pretending that comments are being saved.
- Include loading, empty, success, and error states.
- Validate the display name and comment text on both the client and database where practical.
- Show comment timestamps in a readable format.
- Use safe text rendering to prevent user-submitted content from being interpreted as HTML.
- Add basic spam and abuse protections appropriate for a student project.
- Make the UI attractive and consistent with the museum's visual design.

### Database schema and security
Generate an executable SQL file at `database/schema.sql` for me to run manually in the Supabase SQL Editor. It should create the required table and configure Row Level Security (RLS).

At minimum, the `public.comments` table should contain:
- `id`: UUID primary key with a generated default
- `display_name`: required text field with sensible length limits
- `comment_text`: required text field with sensible length limits
- `artwork_id`: optional identifier for the related artwork or section
- `created_at`: timestamp with time zone and a generated default
- `status`: moderation status if moderation is implemented, with a safe default such as `pending`

Security requirements:
- Enable RLS.
- Allow public visitors to read only comments that are approved/published.
- Allow visitors to submit comments only through appropriately restricted insert policies.
- Do not allow anonymous visitors to approve comments, change moderation status, or update/delete other users' comments.
- Do not expose a Supabase secret key or service-role key in frontend code.
- Do not claim that client-side checks alone provide security.
- Ensure the generated SQL and frontend queries agree on table names, fields, statuses, and permissions.
- Explain any trade-offs or extra setup needed for moderation. If a server-side moderation workflow is not included, clearly document the limitation and provide a safe, honest approach appropriate for a student project.

Do not create or execute the SQL remotely. Put all SQL in the project so I can inspect and run it myself.

### Configuration
- Create a clear configuration module for the Supabase URL and publishable/appropriate public client key.
- Provide a `.env.example` or equivalent configuration template with placeholder values.
- Never include actual credentials in generated source code.
- For Vercel or Netlify, explain how to set supported environment variables.
- For static hosting such as GitHub Pages, explain how configuration works in the chosen build setup and what is safe to expose. A Supabase publishable/anonymous client key may be exposed in a browser only when RLS and policies are correctly configured. Never expose secret/service-role keys.
- Make it easy for me to enter my own project details after I create the Supabase project.

### Manual setup documentation
Create a clear `README.md` section titled **“Manual Supabase Setup”** that explains:
1. How to create a Supabase account and a new project.
2. Where to find the project URL and publishable/appropriate public client key.
3. How to open the Supabase SQL Editor.
4. Which file to copy into the SQL Editor (`database/schema.sql`) and how to run it.
5. Where to put the project URL and public key in the generated website.
6. How to start the project locally and deploy it.
7. How to verify that the comment system works.
8. How to troubleshoot missing configuration, SQL errors, RLS policy errors, and failed submissions.

Provide exact file names, locations, and commands based on the actual framework you implement. Do not provide imaginary menu labels or steps. If a platform interface may change, keep instructions general enough to remain accurate.

### Required acceptance test
Document this manual test:
1. Create the Supabase project and run the SQL manually.
2. Configure the website using the project's URL and public client key.
3. Open the website in Browser A and submit a comment.
4. Confirm the comment was stored in Supabase.
5. Open the website in Browser B or on another device.
6. Confirm that the comment appears there after the page loads or refreshes, if it is approved/published according to the chosen moderation design.
7. Refresh both browsers and confirm persistence.
8. Confirm that visitors cannot change moderation status or modify/delete comments they do not own.

The implementation is not complete until the real Supabase integration and the documented test are ready. However, do not claim the live service is operational until I complete the manual setup and testing.

## 5. Technical and Hosting Requirements

- Choose a suitable framework that can be deployed to GitHub Pages, Vercel, and Netlify. Prefer a static-friendly implementation unless a backend is genuinely required.
- Explain any hosting-specific build or configuration steps.
- Keep code modular, readable, and maintainable.
- Avoid unnecessary dependencies.
- Ensure navigation, gallery interactions, quiz scoring, matching activities, studio controls, and comment submission actually function.
- Add clear form labels, helpful validation, and meaningful error messages.
- Include a responsive navigation menu and sensible behavior on smaller screens.
- Do not include broken links, placeholder buttons that do nothing, or unfinished sections presented as complete.
- Use environment variables only in ways supported by the selected framework and host. Remember that client-side environment values are visible in the built website and are not secrets.

## 6. Suggested Project Structure

Adapt this structure to the selected framework, but keep responsibilities clear:

```text
sculptura/
├── public/
│   └── images/
├── src/
│   ├── components/
│   ├── pages/ or sections/
│   ├── data/
│   ├── styles/
│   ├── lib/
│   │   └── supabaseClient.js
│   └── main.js or framework entry files
├── database/
│   └── schema.sql
├── .env.example
├── .gitignore
├── README.md
└── package.json
```

Include all necessary files for the selected framework. Do not leave out essential implementation files.

## 7. Quality Assurance Before Delivery

Before declaring the website complete:
- Check every navigation link and interactive control.
- Confirm the layout works on mobile, tablet, and desktop widths.
- Check keyboard navigation, labels, contrast, alt text, and focus states.
- Confirm the educational content follows Module 6 and the official assignment.
- Verify that all references and image credits correspond to real sources used.
- Confirm that the quiz, matching game, and studio are functional.
- Check that the Supabase client handles missing configuration gracefully.
- Review `database/schema.sql` for consistency with the frontend code.
- Explain any manual steps that remain.
- Never claim to have run, deployed, or tested anything that you did not actually run, deploy, or test.

## 8. Final Deliverables

Generate a complete, organized project containing:
1. A polished, responsive SCULPTURA website.
2. Educational content grounded in Module 6.
3. A sculpture gallery with appropriate image credits.
4. At least three functioning interactive learning activities.
5. An original interactive Digital Sculpture Studio.
6. A group and instructor information section with editable placeholders.
7. A references and image-credits section.
8. A real Supabase-powered shared comment system.
9. `database/schema.sql` ready for me to run manually.
10. `.env.example` or equivalent safe configuration template.
11. A complete `README.md` with manual Supabase setup, local development, deployment, troubleshooting, and testing instructions.

## Final Instruction

Build the website itself, not a presentation or a deployment tutorial. Prioritize artistic quality, educational accuracy, originality, accessibility, and working interactions. Generate the full source code and all supporting files. Leave Supabase account creation, SQL execution, credential entry, and live-service verification to me, with clear step-by-step instructions. Do not pretend that the Supabase database is live before I complete those steps.
