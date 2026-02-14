// Story-driven layout: a long speech with media interleaved.
// Edit the `story` array below to add/remove paragraphs, images, or videos.
// Put media files in `assets/images/` or `assets/videos/` and reference those paths.

const story = [
  {type: 'text', html: `<p>My love, when I think back to October 2020 — the way you laughed at the smallest things, the way your hand fit mine — I remember thinking how lucky I was. From that first moment, you made the ordinary feel like the most important thing in the world.</p>`},
  {type: 'image', src: 'IMG_8993.jpeg', caption: 'The day we started — October 2020'},
  {type: 'text', html: `<p>We grew together through quiet nights and big changes. You were patient when things were hard, and you celebrated each small victory as if it were your own. You taught me how to be kinder, how to listen, and how to find joy in the simple.</p>`},
  {type: 'video', src: 'IMG_7351.mov', caption: 'A favorite video moment'},
  {type: 'text', html: `<p>There are memories I keep on repeat in my head: that road trip where we sang off-key until we cried, the late-night talks that turned into plans, and the quiet mornings where our coffee tasted like home. Thank you for being my person through them all.</p>`},
  {type: 'image', src: 'IMG_8903.jpeg', caption: 'That trip photo'},
  {type: 'text', html: `<p>As we head toward our sixth year together, I want you to know this: I choose you every day. Not because you are perfect, but because the life we build together is more beautiful than anything I ever imagined.</p>`},
  {type: 'image', src: 'IMG_8911.jpeg', caption: 'Cozy memories'},
  {type: 'text', html: `<p>Happy Valentine's Day. Here's to the next chapter, to more late-night jokes, to more quiet mornings, and to a forever that starts anew with every small, perfect day we share.</p>`}
  {type: 'image', src: 'c8032ae0-ce1d-42bd-b11f-287af80773e5.jpeg', caption: 'Another favorite moment'},
];

const storyContainer = document.getElementById('story-content');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const closeBtn = document.getElementById('close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let mediaIndices = []; // indices in story array pointing to media items
let currentMediaIdx = 0; // index inside mediaIndices

function buildStory(){
  storyContainer.innerHTML = '';
  mediaIndices = [];
  story.forEach((block, i) =>{
    if(block.type === 'text'){
      const div = document.createElement('div');
      div.className = 'speech';
      div.innerHTML = block.html;
      storyContainer.appendChild(div);
    } else if(block.type === 'image' || block.type === 'video'){
      const figure = document.createElement('figure');
      figure.className = 'media';
      if(block.type === 'image'){
        const img = document.createElement('img');
        img.src = block.src;
        img.alt = block.caption || '';
        img.loading = 'lazy';
        img.addEventListener('click', ()=> openLightboxFor(i));
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

function openLightboxFor(storyIndex){
  currentMediaIdx = mediaIndices.indexOf(storyIndex);
  if(currentMediaIdx === -1) return;
  const block = story[storyIndex];
  if(block.type === 'image'){
    lbImg.src = block.src;
    lightbox.classList.remove('hidden');
  }
}

function closeLightbox(){
  lightbox.classList.add('hidden');
  lbImg.src = '';
}

function showPrev(){
  if(mediaIndices.length === 0) return;
  currentMediaIdx = (currentMediaIdx - 1 + mediaIndices.length) % mediaIndices.length;
  const idx = mediaIndices[currentMediaIdx];
  openLightboxFor(idx);
}

function showNext(){
  if(mediaIndices.length === 0) return;
  currentMediaIdx = (currentMediaIdx + 1) % mediaIndices.length;
  const idx = mediaIndices[currentMediaIdx];
  openLightboxFor(idx);
}

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);
lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) closeLightbox(); });

buildStory();

