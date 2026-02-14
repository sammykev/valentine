This folder is for the media used by the valentine page. The site is set up for memories starting in October 2020.

Story format:
- The page is driven by the `story` array in `js/script.js`.
- Each `story` entry is an object with `type`: `'text' | 'image' | 'video'`.
   - Text example: `{type: 'text', html: '<p>Your paragraph here</p>'}`
   - Image example: `{type: 'image', src: 'assets/images/2020-oct-our-start.jpg', caption: 'The day we started — October 2020'}`
   - Video example: `{type: 'video', src: 'assets/videos/our-video.mp4', caption: 'That day on the pier'}`

Steps:
1. Create folders: `assets/images/` and `assets/videos/`.
2. Add your pictures and videos into those folders.
3. Edit the `story` array in `js/script.js` to insert your paragraphs and media in the order you want them to appear.
4. Serve the folder with a static server and open `valentine.html` in your browser.

Quick local preview command:
```
python3 -m http.server 8000
```

Open `http://localhost:8000/valentine.html` after starting the server.
