// Story-driven layout: a long speech with media interleaved.
// Edit the `story` array below to add/remove paragraphs, images, or videos.
// Put media files in `assets/images/` or `assets/videos/` and reference those paths.

const story = [
  {
    type: 'text',
    html: `
      <h1>Happy Valentine's Day, Babe</h1>
      <p>I was scrolling through old chats to write this, and honestly, it hit me—there's no emoji or thread that can capture everything we've built. Our vibe kicked off back when I was 17 and you were 16, straight out of high school in November 2019. I was that guy sliding into your DMs (or more like begging) for airtime, and you still made it happen—even with that brutal Lagos sun roasting everything. Lowkey, that was the moment I knew you were different, no cap.</p>
    `
  },
  {
    type: 'image',
    src: 'IMG_8993.jpeg',
    caption: 'The day we started — November 2019 airtime moment'
  },
  {
    type: 'text',
    html: `
      <h2>Then vs. Now: What I Didn't Know</h2>
      <p>Back then, I thought love was just vibes—late-night calls, memes, and endless "what ifs." But fast-forward to that year-and-three-months stretch where we couldn't link up? Straight ghosted by life, no face-to-face, just voice notes and "you up?" texts holding us down. We had our glitches—petty arguments over signal drops, overthinking "read" receipts—but we powered through. That's when I got it: real love isn't just the highlight reel; it's grinding through the lag, choosing each other when the WiFi's weak and the distance hits different.</p>
    `
  },
  {
    type: 'video',
    src: 'IMG_7351.mov',
    caption: 'A favorite moment from our journey'
  },
  {
    type: 'text',
    html: `
      <h2>The Milestone That Changed Everything</h2>
      <p>Proudest flex? Surviving that phase and leveling up. That first reunion after all those months? Felt like unmuting the best playlist—everything snapped into focus. We've stacked wins since: turning casual hangs into real plans, hyping each other's glow-ups, and turning "someday" goals into active Pinterest boards. You've been my day-one, my go-to in the group chat of life.</p>
    `
  },
  {
    type: 'image',
    src: 'IMG_8903.jpeg',
    caption: 'Our reunion vibes'
  },
  {
    type: 'text',
    html: `
      <h2>Where We're Heading</h2>
      <p>We're not at the end credits yet—still chasing that coupled-up life where we're not counting days apart, building our spot, traveling on vibes, and making content out of the everyday. But looking at our story? We're trending upward, no doubt. Couldn't imagine this timeline with anyone else.</p>
    `
  },
  {
    type: 'image',
    src: 'IMG_8911.jpeg',
    caption: 'Future goals mood'
  },
  {
    type: 'text',
    html: `
      <h2>My Promise to You</h2>
      <p>Thanks for being my rock, my fave notification, and my ride-or-die since that airtime save. Here's to the past scrolls, the present stories, and dropping the mic on an even crazier future.</p>
      <p><strong>Yours always. 💯</strong></p>
    `
  },
  {
    type: 'image',
    src: 'c8032ae0-ce1d-42bd-b11f-287af80773e5.jpeg',
    caption: 'Forever us'
  }
];

const storyContainer = document.getElementById('story-content');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const closeBtn = document.getElementById('close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let mediaIndices = []; // indices in story array pointing to media items
let currentMediaIdx = 0; // index inside mediaIndices

function buildStory() {
  storyContainer.innerHTML = '';
  mediaIndices = [];
  story.forEach((block, i) => {
    if (block.type === 'text') {
      const div = document.createElement('div');
      div.className = 'speech';
      div.innerHTML = block.html;
      storyContainer.appendChild(div);
    } else if (block.type === 'image' || block.type === 'video') {
      const figure = document.createElement('figure');
      figure.className = 'media';
      if (block.type === 'image') {
        const img = document.createElement('img');
        img.src = block.src;
        img.alt = block.caption || '';
        img.loading = 'lazy';
        img.addEventListener('click', () => openLightboxFor(i));
        figure.appendChild(img);
      } else {
        const vid = document.createElement('video');
        vid.src = block.src;
        vid.controls = true;
        vid.preload = 'metadata';
        figure.appendChild(vid);
      }
      // intentionally omit captions under images per user request
      storyContainer.appendChild(figure);
      mediaIndices.push(i);
    }
  });
}

function openLightboxFor(storyIndex) {
  currentMediaIdx = mediaIndices.indexOf(storyIndex);
  if (currentMediaIdx === -1) return;
  const block = story[storyIndex];
  if (block.type === 'image') {
    lbImg.src = block.src;
    lightbox.classList.remove('hidden');
  }
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  lbImg.src = '';
}

function showPrev() {
  if (mediaIndices.length === 0) return;
  currentMediaIdx = (currentMediaIdx - 1 + mediaIndices.length) % mediaIndices.length;
  const idx = mediaIndices[currentMediaIdx];
  openLightboxFor(idx);
}

function showNext() {
  if (mediaIndices.length === 0) return;
  currentMediaIdx = (currentMediaIdx + 1) % mediaIndices.length;
  const idx = mediaIndices[currentMediaIdx];
  openLightboxFor(idx);
}

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

buildStory();

// Apple Music embed helper
const appleInput = document.getElementById('apple-url');
const appleBtn = document.getElementById('apple-apply');
const appleClear = document.getElementById('apple-clear');
const appleContainer = document.getElementById('apple-embed');
const appleOpen = document.getElementById('apple-open');
const DEFAULT_APPLE_LINK = 'https://music.apple.com/ng/playlist/pl.u-JPAZEGNTLo66RJl';

function toEmbedUrl(url){
  if(!url) return '';
  // convert music.apple.com/... to embed.music.apple.com/...
  return url.replace(/^https?:\/\/(music\.apple\.com)/i, 'https://embed.music.apple.com');
}

function loadAppleFrom(url){
  const embed = toEmbedUrl(url.trim());
  if(!embed) return;
  appleContainer.innerHTML = `<iframe allow="autoplay *; encrypted-media *; fullscreen *" frameborder="0" height="120" style="width:100%;max-width:660px;overflow:hidden;border-radius:8px" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" src="${embed}"></iframe>`;
  localStorage.setItem('valentine-apple-url', url);
  if(appleOpen) appleOpen.href = url.trim();
}

appleBtn.addEventListener('click', ()=>{
  loadAppleFrom(appleInput.value);
});

appleClear.addEventListener('click', ()=>{
  appleContainer.innerHTML = '';
  appleInput.value = '';
  localStorage.removeItem('valentine-apple-url');
  if(appleOpen) appleOpen.href = DEFAULT_APPLE_LINK;
});

// load saved
window.addEventListener('load', ()=>{
  const saved = localStorage.getItem('valentine-apple-url');
  if(saved){ appleInput.value = saved; loadAppleFrom(saved); }
  else if(appleOpen) appleOpen.href = DEFAULT_APPLE_LINK;
});
