# Trinadh Marneni — Portfolio

A responsive personal portfolio website built with HTML, CSS, and vanilla JavaScript.

## Features
- Modern dark blue / grey / purple visual theme
- Light mode and dark mode toggle (preference saved in local storage)
- Responsive mobile navigation
- Hero, about, skills, projects, education, achievements, and contact sections
- Project category filters
- Scroll reveal animations and active navigation state
- CSS-made project preview artwork, so external screenshot assets are not required

## Run locally
No build step is required.

1. Extract the ZIP.
2. Open `index.html` in your browser, or use the VS Code Live Server extension.
3. To publish, upload the folder to GitHub and enable GitHub Pages, or import the repository into Vercel.

## Deploy to Vercel
1. Push the extracted project to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Framework preset: **Other**.
4. Build command: leave empty.
5. Output directory: leave empty / root.
6. Deploy.

## Personalization
- Profile image: `assets/profile.jpg` (if extracted from the supplied DOCX).
- Main content and project URLs: `index.html`.
- Colors, layout, responsive styles: `styles.css`.
- Theme, filters, menu, and animations: `script.js`.

## Notes
Project descriptions and links are based on the resume and portfolio details supplied by Trinadh. Check all live URLs before sharing this portfolio with recruiters. A few projects do not have an individual repository link in the provided material, so the portfolio links those to the user's GitHub profile instead.


## Resume
The resume PDF is included at `assets/Trinadh_Marneni_Resume.pdf` and linked from the hero and footer download buttons.

- Project cards use the 11 screenshots extracted from the supplied portfolio Word document, in the requested order.
- Resume opens in a browser tab rather than forcing a download.
- Skill tags link to official documentation.
- Contact form opens a prepared email draft or WhatsApp message; the visitor must press Send in their own app.


Education timeline updated to show B.Tech, Intermediate, and 10th Class using the education details in the supplied resume. Recognition remains in the right-hand column.


## Contact form setup (required before email sending works)

The contact form uses EmailJS to send email without a custom backend and shows success/error messages inside the portfolio. WhatsApp opens a prefilled message; the visitor must press Send in WhatsApp.

1. Create/sign in to an account at https://www.emailjs.com/.
2. Add and connect an Email Service.
3. Create an Email Template addressed to `thrinadhmarineni73@gmail.com`. Use these variables in the template: `{{name}}`, `{{email}}`, `{{title}}`, `{{message}}`, and `{{time}}`. Set Reply To to `{{email}}`.
4. Copy your Public Key, Service ID, and Template ID into the three constants in `script.js`: `EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`, and `EMAILJS_TEMPLATE_ID`. Do not put a private key or account password in frontend code.
5. Save and commit `index.html`, `styles.css`, and `script.js` to the GitHub Pages repository, then test the live form.

Until the three EmailJS IDs are filled in, the email button intentionally displays an in-page setup warning instead of pretending that a message was sent.
