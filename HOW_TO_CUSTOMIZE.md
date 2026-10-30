# 💜 A Little World of Us – Customization Guide

This website was designed especially for **Raksha** to celebrate your unique friendship journey, internship memories, and brother-sister bond.

All content, photographs, letter text, and audio are completely modular and easy to customize without needing to touch any complex layout code.

---

## 📸 1. How to Replace Sample Photos With Your Real Photographs

Currently, the photo gallery is loaded with 8 beautiful pastel sample stock photos. To replace them with your real photos:

1. **Copy your photos** into the folder:
   ```
   public/images/memories/
   ```
   *(For example: `photo1.jpg`, `photo2.jpg`, etc.)*

2. **Open the file**:
   [`src/data/galleryData.js`](file:///c:/Users/karthik.T/OneDrive/Desktop/DayDream%20Duo/src/data/galleryData.js)

3. **Change the `url` and `caption`**:
   ```javascript
   {
     id: 1,
     title: "Our First Internship Project",
     caption: "The day we finally wrapped up that presentation!",
     date: "August 2024",
     tag: "Internship Days",
     url: "/images/memories/photo1.jpg", // <-- your local photo
     alt: "Photo of me and Raksha",
     aspect: "tall"
   },
   ```
4. Save the file and the website updates instantly!

---

## ✉️ 2. How to Add Photos of Your Handwritten Letter

In **Section 7: A Letter From My Heart**, there is a button:
`"View Original Handwritten Letter Photos"`.

1. **Place scanned photos or camera pictures of your actual written letter** into:
   ```
   public/images/letter/
   ```
   *(e.g., `letter_page1.jpg`, `letter_page2.jpg`)*

2. **Open the file**:
   [`src/data/letterData.js`](file:///c:/Users/karthik.T/OneDrive/Desktop/DayDream%20Duo/src/data/letterData.js)

3. Update the `originalLetterPhotos` array:
   ```javascript
   originalLetterPhotos: [
     {
       id: 1,
       title: "Handwritten Letter – Page 1",
       url: "/images/letter/letter_page1.jpg",
       caption: "Penned with care on Raksha Bandhan."
     }
   ]
   ```

---

## 💌 3. How to Adjust the Letter Text

You can edit any paragraph of your letter directly inside [`src/data/letterData.js`](file:///c:/Users/karthik.T/OneDrive/Desktop/DayDream%20Duo/src/data/letterData.js) under the `paragraphs` list.

---

## 🎵 4. Background Music

The website has a built-in calming pentatonic chime synthesizer powered by the Web Audio API that plays on click with zero setup.

If you have an audio track (lofi, acoustic guitar, or a favorite ambient song):
1. Save your MP3 file as:
   ```
   public/audio/bgm.mp3
   ```
2. The website will automatically detect and play your MP3 track instead!

---

## 🚀 How to Run the Website Locally

In your terminal or PowerShell inside `DayDream Duo`:

```bash
# Start development server
npm run dev
```

Then open your browser to `http://localhost:5173`.
To build a production-ready package:
```bash
npm run build
```
The output will be created inside the `dist/` folder ready for deployment to Vercel, Netlify, or GitHub Pages.
