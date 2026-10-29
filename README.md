# SCULPTURA — Where Form Becomes Meaning
> **Art Appreciation Midterm Project • Group 6: Sculpture**  
> An interactive digital sculpture museum and educational experience built for the General Education Curriculum.

---

## 🏛️ Project Overview

**SCULPTURA** is an editorial, gallery-like digital art museum exploring the history, materials, techniques, and philosophy of sculpture. The project is strictly grounded in **Module 6 ("Topic – Sculpture")** of *Art Appreciation for the New General Education Curriculum* (Arnulfo B. Ramos, 2018) and addresses the official Art Appreciation Midterm Project rubric.

### 🌟 Key Highlights & Rubric Alignment

1. **Content Accuracy & Completeness (25 pts):**
   - Detailed synthesis of Module 6 Sections 6.1 (Origins & History), 6.2 (Importance), 6.5 (Types of Sculptures), 6.6 (Medium & Techniques), and 6.7 (Basic Sculpture Terms).
   - Authentic case studies: *Löwenmensch* (30,000 BCE ivory statuette), *The Great Sphinx of Giza* (Khafre, 240' × 65'), *People Power Monument* by Eduardo Castrillo (Figure 1), *The Thinker* by Auguste Rodin (Figure 2), *David* by Michelangelo (Figure 3), and *Christ the Redeemer* by Paul Landowski (Figure 5).
   - Verbatim inclusion of all required glossary concepts: *Rough, Abstractionism, Atélier, Mould, Conceptual, Figurative, Sketch, Armature, Assemblage, Freestanding,* etc.

2. **Creativity & Originality (20 pts):**
   - Custom museum identity with warm ivory (`#F5F1E8`), terracotta (`#B66A4D`), muted olive (`#777B62`), and charcoal typography.
   - Distinctive layout avoiding generic templates or copied frameworks.

3. **Visual Design & Aesthetics (15 pts):**
   - Editorial typography (Playfair Display, Cormorant Garamond, Plus Jakarta Sans), generous whitespace, accessible contrast, and mobile-first responsiveness.

4. **Original Creative Output (15 pts):**
   - **Digital Sculpture Studio:** A hands-on virtual carving atelier directly inspired by Module 6's soap sculpture self-evaluation activity. Allows visitors to choose raw medium blocks (Bar Soap, Clay, Marble, Bronze), carve with craft sticks, smooth rough surfaces using body heat (Module Step 6), compose an artist statement (Module Step 8), and generate an exhibition plaque.

5. **Interactive Activities (10 pts):**
   - **Sculpture Master Quiz:** 12 questions derived from Module 6 with real-time scoring, explanations, and confetti badge.
   - **Match the Terms:** Interactive terminology matching challenge.
   - **Artwork Detective (Guess the Sculpture):** Progressive clue-based deduction game.
   - **Decode the Artwork:** Guided hermeneutic analysis of form, material, and meaning.

6. **Organization & References (10 pts):**
   - Full APA 7th Edition citations for Ramos (2018), Sheldon (1968), Witcombe (1997), and Roland's Art, paired with complete image licensing attributions.

7. **Group & Instructor Information (5 pts):**
   - Complete directory profile cards for Group 6 student members and dedicated course instructor placeholder.

8. **The Sculpture Community Wall (Final Challenge):**
   - A real shared commenting system powered by **Supabase PostgreSQL** (`@supabase/supabase-js`) with Row Level Security (RLS).

---

## 🗄️ Manual Supabase Setup

Follow these exact steps to connect your Supabase PostgreSQL database to SCULPTURA.

### Step 1: Create a Supabase Account & Project
1. Visit [supabase.com](https://supabase.com) and sign in or create a free account.
2. In the dashboard, click **"New Project"**.
3. Fill in your project details:
   - **Name:** `sculptura-museum` (or your preferred name)
   - **Database Password:** Enter a secure password and save it somewhere safe.
   - **Region:** Choose a region close to your users (e.g. `Southeast Asia (Singapore)`).
   - **Pricing Plan:** Select the **Free Tier**.
4. Click **"Create new project"** and wait about 1-2 minutes for project provisioning to finish.

### Step 2: Locate Project URL & Public Anon Key
1. In your Supabase project dashboard, click on the **Project Settings** (gear icon) in the left sidebar.
2. Navigate to **API** under Configuration (or go to `https://supabase.com/dashboard/project/_/settings/api`).
3. Under **Project API keys**, you will see:
   - **Project URL:** e.g. `https://xyzcompany.supabase.co`
   - **Project API keys -> anon (public):** A long JWT token starting with `eyJ...`
4. Copy both values. *(Never use or expose the `service_role` secret key!)*

### Step 3: Open the Supabase SQL Editor
1. In the left navigation sidebar of your Supabase dashboard, click the **SQL Editor** icon (`>_`).
2. Click **"New Query"** to open a blank SQL query tab.

### Step 4: Run `database/schema.sql`
1. In your local SCULPTURA project folder, open `database/schema.sql`.
2. Copy the entire file content.
3. Paste it into the Supabase SQL Editor.
4. Click the green **"Run"** button in the bottom right corner (or press `Ctrl + Enter` / `Cmd + Enter`).
5. Verify the output message:
   ```text
   Success. No rows returned.
   ```
6. In the left sidebar, click **Table Editor** to confirm that the `comments` table has been created with Row Level Security (RLS) active and initial seed comments populated.

### Step 5: Configure Environment Variables
1. In the root directory of this project, locate `.env.example`.
2. Create a new file named `.env` in the project root:
   - On Windows PowerShell:
     ```powershell
     Copy-Item .env.example .env
     ```
   - Or on Mac/Linux:
     ```bash
     cp .env.example .env
     ```
3. Open `.env` and replace the placeholder values with your real Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-real-anon-key
   ```
4. Save the file.

### Step 6: Start Locally
Run the development server:
```powershell
npm run dev
```
Open your browser to `http://localhost:3000`. Navigate to **The Sculpture Community Wall** section. You should immediately see the live comments loaded directly from your Supabase PostgreSQL database!

---

## 🧪 Required Acceptance Test

To verify that the shared commenting system is functioning across devices and adheres to all security constraints:

1. **Verify Database Setup:**
   Run `database/schema.sql` in Supabase SQL Editor.
2. **Configure Frontend:**
   Supply your valid `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` and run `npm run dev`.
3. **Submit Comment in Browser A:**
   Open `http://localhost:3000#community-wall` in Google Chrome (or Browser A). Fill in your name, select an artwork topic (e.g. *David*), enter a comment, and click **"Publish to Wall"**.
4. **Confirm Database Record:**
   In your Supabase Dashboard, open **Table Editor -> comments**. Verify that your newly submitted row is present with `status = 'approved'`.
5. **Multi-Device / Cross-Browser Verification in Browser B:**
   Open the website in an Incognito window, another browser (Edge / Firefox / Safari), or a mobile phone on the same network. Navigate to the Community Wall.
6. **Persistence & Refresh:**
   Confirm that your comment appears in Browser B without needing to log in. Refresh both browsers; the comment persists from the database.
7. **Security & RLS Verification:**
   Confirm that anonymous visitors cannot edit, delete, or alter the `status` of existing comments. The frontend client uses only the restricted public key, ensuring safe read/insert policies.

---

## 🚀 Deployment Instructions

SCULPTURA is fully optimized for static zero-config deployment on **Vercel** with dedicated SPA routing rewrites, edge caching headers, and automatic code-split bundling.

### Option A: Deploy to Vercel (Recommended)
1. Push your project repository to GitHub (or GitLab / Bitbucket).
2. Log in to [vercel.com](https://vercel.com) and click **"Add New" > "Project"**.
3. Import your `Sculpture` repository.
4. Vercel automatically detects the Vite framework settings:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. In the **Environment Variables** section, add your two Supabase variables:
   - `VITE_SUPABASE_URL`: `https://mxhshlhhwhiitdkgedwv.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `sb_publishable_RMldnMdzbScbJruDYeROcg_gGDn5Oku`
6. Click **"Deploy"**. Vercel will build the project and provide you with an active, free SSL HTTPS URL (e.g., `https://sculptura.vercel.app`).

---

## 👥 Student Development Team & Faculty

| Member | Name | Role |
| :---: | :--- | :--- |
| **1** | **Cayasa, Ian Jay** | Lead Web Developer, UI/UX Designer & Deployment Lead |
| **2** | **Aves, Dannah Kraite C.** | Researcher & Content Writer |
| **3** | **Calimlim, Jann Michael N.** | Gallery & Artist Researcher |
| **4** | **Dumas, Kent Bryan M.** | Interactive Activities Developer |
| **5** | **Salinas, Kevin Carl C.** | Database & Backend Developer |
| **6** | **Erno, Jhelmar C.** | Documentation & References Specialist |
| **7** | **Olvis, Bert** | Quality Assurance & Testing Specialist |

* **Faculty Mentor & Evaluator:** **Orejas, Benedict A.** — Faculty Instructor, College of Arts and Sciences
