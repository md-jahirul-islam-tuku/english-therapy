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
  <a class="option-btn" onclick="loadLessonVocabulary(${btn.level_no})" class="font-bold"><i class="fa-solid fa-book-open"></i> Lesson - ${btn.level_no}</a>
  `
    li.classList.add('border-indigo-700', 'border', 'rounded-sm', 'hover:bg-indigo-700', 'hover:text-white')
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
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(res => res.json())
    .then(data => displayLessonVocabulary(data.data))
}

function displayLessonVocabulary(object) {
  document.getElementById('vocabulary-container').innerHTML = '';
  if (object.length == 0) {
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
  }
}

const buttons = document.querySelectorAll(".menu-btn");
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove('bg-indigo-700', 'text-white')); // Remove active from all
    btn.classList.add('bg-indigo-700', 'text-white'); // Add to clicked one
  });
});

function loadModal(id) {
  document.getElementById('my_modal_5').showModal();
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(res => res.json())
    .then(data => {
      modalDisplay(data.data)
    })
}

function modalDisplay(id) {
  console.log(id);
  const modalContainer = document.getElementById('modal-container');
modalContainer.innerHTML=`
<h3 class="text-2xl font-bold">${id.word} - (${id.pronunciation})</h3>
      <p class="text-lg font-bold mt-3">Meaning</p>
      <p>${id.meaning}</p>
      <h4 class="text-lg font-bold mt-3">Example</h4>
      <p>${id.sentence}</p>
      <h4 class="my-5 font-bold">সমার্থক শব্দগুলো</h4>
      <p>
        <span class="bg-sky-100 p-3 rounded-md border border-sky-200 py-1">${id.synonyms[0]}</span>
        <span class="bg-sky-100 p-3 rounded-md border border-sky-200 py-1">${id.synonyms[1]}</span>
        <span class="bg-sky-100 p-3 rounded-md border border-sky-200 py-1">${id.synonyms[2]}</span>
      </p>
      <div class="modal-action justify-start">
        <form method="dialog">
          <button class="btn btn-primary">Complete Learning</button>
        </form>
      </div>
`
}