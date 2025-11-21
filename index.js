function hideLoader() {
  document.getElementById('loader').classList.add('hidden')
  document.getElementById('vocabulary-container').classList.remove('hidden')
};

function showLoader() {
  document.getElementById('loader').classList.remove('hidden')
  document.getElementById('vocabulary-container').classList.add('hidden')
};

hideLoader();

function loadLessonBtn() {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(data => displayLessonBtn(data.data))
}
function displayLessonBtn(buttons) {
  for (const btn of buttons) {
    const btnLessonContainer = document.getElementById('btn-lesson-container');
    const li = document.createElement('li');
    li.innerHTML = `
    <a id="level-${btn.level_no}" onclick="loadLessonVocabulary(${btn.level_no})" class="font-bold"><i class="fa-solid fa-book-open"></i> Lesson - ${btn.level_no}</a>
    `
    li.classList.add('border-indigo-700', 'border', 'rounded-sm', 'hover:bg-indigo-700', 'hover:text-white', 'option-btn')
    btnLessonContainer.append(li);

    // funtion for showing selected button
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove('bg-indigo-700', 'text-white')); // Remove active from all
        btn.classList.add('bg-indigo-700', 'text-white'); // Add to clicked one
      });
    });
  }
}

loadLessonBtn()

function loadLessonVocabulary(id) {
  showLoader();
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(res => res.json())
    .then(data => displayLessonVocabulary(data.data))
    .catch(error => {
      console.error("API Error:", error);
    })
    .finally(() => {
      hideLoader();
    });
}

function displayLessonVocabulary(object) {
  document.getElementById('vocabulary-container').innerHTML = '';
  if (object.length === 0) {
    document.getElementById('vocabulary-container').innerHTML = `
    <div class="py-5 col-span-full mx-auto">
      <img class="mx-auto" src="assets/alert-error.png" alt="">
      <p class="text-stone-500 py-3">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি</p>
      <h1 class="text-3xl font-semibold mt-4 text-stone-800">নেক্সট Lesson এ যান</h1>
    </div>
  `
  }
  for (const element of object) {
    const vocabularyContainer = document.getElementById('vocabulary-container');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card-body">
      <div>
        <h2 class="text-xl font-bold">${element.word}</h2>
        <p class="py-3 text-lg">Meaning / Pronounciation</p>
        <h1 class="text-xl font-bold pt-4 pb-10">"${element.meaning} / ${element.pronunciation}"</h1>
      </div>
      <div class="flex justify-between p-2">
        <button id="word-btn" onclick="loadModal(${element.id})" class="bg-sky-100 p-2 rounded-lg cursor-pointer"><i class="fa-solid fa-circle-exclamation text-xl text-slate-700"></i></button>
        <button class="bg-sky-100 p-2 rounded-lg cursor-pointer"><i class="fa-solid fa-volume-high text-xl text-slate-700"></i></button>
      </div>
    </div>
`
    div.classList.add('card', 'bg-base-100', 'card-md', 'shadow-sm')
    vocabularyContainer.append(div);
  };
}

// active button class add & remove function
const buttons = document.querySelectorAll(".menu-btn");
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove('bg-indigo-700', 'text-white'));
    btn.classList.add('bg-indigo-700', 'text-white');
  });
});

// smooth scrolling function for faq & learn
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

// modal api load function
function loadModal(id) {

  const content = document.getElementById("modal-container");
  content.innerHTML = `
    <div class="border-2 border-sky-100 p-5 rounded-lg">
      <div class="flex flex-col   gap-3">
        <div class="skeleton h-7 w-44"></div>
        <div class="skeleton h-5 w-28"></div>
        <div class="skeleton h-5 w-32"></div>
        <div class="skeleton h-5 w-32"></div>
        <div class="skeleton h-3 w-3/4"></div>
        <div class="skeleton h-7 w-32"></div>
        <div class="flex justify-start gap-3">
          <div class="skeleton h-8 w-20"></div>
          <div class="skeleton h-8 w-20"></div>
          <div class="skeleton h-8 w-20"></div>
        </div>
      </div>
    </div>
    <div class="mt-6 flex justify-between">
        <div class="skeleton h-8 w-1/2">
    </div>
  `;
  document.getElementById('my_modal').showModal();
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(res => res.json())
    .then(data => {
      modalDisplay(data.data)
    })
}

// modal display function
function modalDisplay(id) {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = `
    <div class="border border-sky-100 p-5 rounded-lg">
      <h3 class="text-2xl font-bold">${id.word} - (${id.pronunciation})</h3>
      <p class="text-lg font-bold mt-3">Meaning</p>
      <p>${id.meaning}</p>
      <h4 class="text-lg font-bold mt-3">Example</h4>
      <p>${id.sentence}</p>
      <h4 class="my-3 font-bold">সমার্থক শব্দগুলো</h4>
      <p class="text-lg">
        <span class="bg-sky-100 p-3 rounded-md border border-sky-200 py-1">${id.synonyms[0]}</span>
        <span class="bg-sky-100 p-3 rounded-md border border-sky-200 py-1">${id.synonyms[1]}</span>
        <span class="bg-sky-100 p-3 rounded-md border border-sky-200 py-1">${id.synonyms[2]}</span>
      </p>
    </div>
    <div class="modal-action justify-start mt-5">
      <form method="dialog">
        <button class="btn btn-primary">Complete Learning</button>
      </form>
    </div>
    `
}

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollBtn.classList.remove("hidden"); // Show button
  } else {
    scrollBtn.classList.add("hidden"); // Hide button
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});