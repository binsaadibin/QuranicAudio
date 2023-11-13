let audio=document.querySelector(".quranPlayer");
let surahContainer=document.querySelector(".surahs")
let ayah=document.querySelector('.ayah');
let ayah2=document.querySelector('.ayah2');
let next=document.querySelector('.next');
let prev=document.querySelector('.prev');
let play=document.querySelector('.play');
getSurahs();
function getSurahs() {

    //**fetch data **//
    fetch('https://api.quran.gading.dev/surah')
    .then((response)=> response.json())
    .then((data)=>{
        // console.log(data)
        // console.log(data.data)
        for (let surah in data.data) {
            // console.log(surah)
            // console.log(data.data[surah])
            const surahDiv = document.createElement("div");
            surahContainer.appendChild(surahDiv);
            let peragraph1=document.createElement("p")
            let peragraph2=document.createElement("p")
            peragraph1.innerText=`${data.data[surah].name.long}`;
            peragraph2.innerText=`${data.data[surah].name.transliteration.en}`;
            // console.log(peragraph1)
            // console.log(peragraph2)
            surahDiv.appendChild(peragraph1)
            surahDiv.appendChild(peragraph2)
        }
        //*select all surahs*//
       let allSurahs=document.querySelectorAll(".surahs div");
    //    console.log(allSurahs[0])
    //    AyahsAudios,
    //    AyahsText;
       allSurahs.forEach((surah,index)=>{
          surah.addEventListener("click",()=>{
           
            fetch(`https://api.quran.gading.dev/surah/${index + 1}`)
             .then((response)=> response.json())
              .then((data)=>{
                console.log(data)
                let verses=data.data.verses;
                AyahsAudios=[];
                AyahsText=[];
                Ayahstranslation=[];
                // console.log(verses)
                verses.forEach((verse)=>{
                    AyahsAudios.push(verse.audio.primary);
                    AyahsText.push(verse.text.arab)
                    Ayahstranslation.push(verse.translation.en)
                    // console.log(verse.translation.en)
                    // console.log(verse.text.transliteration.en)
                    // console.log(verse.text.arab)
                    // console.log(verse.audio.primary)
                })
                // console.log(AyahsAudios);
                // console.log(AyahsText)
                // console.log(AyahsAudios[ayahIndex])
                // audio.src=AyahsAudios[ayahIndex];
                // ayah.innerHTML=AyahsText[ayahIndex];
                // audio.play();
                let ayahIndex=0;
                changeAyah(ayahIndex)
                audio.addEventListener("ended",()=>{
                    ayahIndex=ayahIndex + 1;
                    // changeAyah(ayahIndex)
                    if (ayahIndex < AyahsAudios.length) {
                        changeAyah(ayahIndex)
                    }
                    else
                    {
                      ayahIndex=0;
                      changeAyah(ayahIndex)
                      audio.pause()
                    //   swal("!Surah has been ended", "success");
                    }
                    // isPlaying=true;
                    // togglePlay()
                    // console.log(ayahIndex)
                })
                //* handle next and prev*//
                next.addEventListener("click",()=>{
                    if (ayahIndex < AyahsAudios.length-1) {
                     ayahIndex=ayahIndex +1;
                     changeAyah(ayahIndex)
                    }
                    else
                    {
                       ayahIndex=0;
                    }
                });
                prev.addEventListener("click",()=>{
                    if (ayahIndex >= 1) {
                        ayahIndex=ayahIndex -1;
                        changeAyah(ayahIndex)
                       }
                       else
                       {
                          ayahIndex=0;
                       }
                })
                let isPlaying=false;
                togglePlay()
                function togglePlay() {
                    if (isPlaying) {
                        audio.pause();
                        play.innerHTML=`<i class="fas fa-play"></i>`;
                        isPlaying=false;
                    } else {
                        audio.play();
                        play.innerHTML=`<i class="fas fa-pause"></i>`;
                        isPlaying=true;
                    }
                }
                play.addEventListener("click",togglePlay)


                function changeAyah(index) {
                    audio.src=AyahsAudios[index];
                    ayah.innerHTML=AyahsText[index];
                    ayah2.innerHTML=Ayahstranslation[index];
                    // audio.play()
                }

               })
        })
       })
    })
}

// let audio=document.querySelector(".quranPlayer");
// let surahContainer=document.querySelector(".surahs")
// let ayah=document.querySelector('.ayah');
// let ayah2=document.querySelector('.ayah2');
// let next=document.querySelector('.next');
// let prev=document.querySelector('.prev');
// let play=document.querySelector('.play');
// getSurahs();
// function getSurahs() {

//     //**fetch data **//
//     fetch('https://api.quran.gading.dev/surah')
//     .then((response)=> response.json())
//     .then((data)=>{
//         for (let surah in data.data) {
//             const surahDiv = document.createElement("div");
//             surahContainer.appendChild(surahDiv);
//             let peragraph1=document.createElement("p")
//             let peragraph2=document.createElement("p")
//             peragraph1.innerText=`${data.data[surah].name.long}`;
//             peragraph2.innerText=`${data.data[surah].name.transliteration.en}`;
//             surahDiv.appendChild(peragraph1)
//             surahDiv.appendChild(peragraph2)
//         }
//         //*select all surahs*//
//        let allSurahs=document.querySelectorAll(".surahs div");
//        allSurahs.forEach((surah,index)=>{
//           surah.addEventListener("click",()=>{
           
//             fetch(`https://api.quran.gading.dev/surah/${index + 1}`)
//              .then((response)=> response.json())
//               .then((data)=>{
//                 let verses=data.data.verses;
//                 AyahsAudios=[];
//                 AyahsText=[];
//                 Ayahstranslation=[];
//                 // console.log(verses)
//                 verses.forEach((verse)=>{
//                     AyahsAudios.push(verse.audio.primary);
//                     AyahsText.push(verse.text.arab)
//                     Ayahstranslation.push(verse.translation.en)
//                 })
//                 let ayahIndex=0;
//                 changeAyah(ayahIndex)
//                 audio.addEventListener("ended",()=>{
//                     ayahIndex=ayahIndex + 1;
//                     if (ayahIndex < AyahsAudios.length) {
//                         changeAyah(ayahIndex)
//                     }
//                     else
//                     {
//                       ayahIndex=0;
//                       changeAyah(ayahIndex)
//                       audio.pause()
//                     }
//                 })
//                 //* handle next and prev*//
//                 next.addEventListener("click",()=>{
//                     if (ayahIndex < AyahsAudios.length-1) {
//                      ayahIndex=ayahIndex +1;
//                      changeAyah(ayahIndex)
//                     }
//                     else
//                     {
//                        ayahIndex=0;
//                     }
//                 });
//                 prev.addEventListener("click",()=>{
//                     if (ayahIndex >= 1) {
//                         ayahIndex=ayahIndex -1;
//                         changeAyah(ayahIndex)
//                        }
//                        else
//                        {
//                           ayahIndex=0;
//                        }
//                 })
//                 let isPlaying=false;
//                 togglePlay()
//                 function togglePlay() {
//                     if (isPlaying) {
//                         audio.pause();
//                         play.innerHTML=`<i class="fas fa-play"></i>`;
//                         isPlaying=false;
//                     } else {
//                         audio.play();
//                         play.innerHTML=`<i class="fas fa-pause"></i>`;
//                         isPlaying=true;
//                     }
//                 }
//                 play.addEventListener("click",togglePlay)


//                 function changeAyah(index) {
//                     audio.src=AyahsAudios[index];
//                     ayah.innerHTML=AyahsText[index];
//                     ayah2.innerHTML=Ayahstranslation[index];
//                     // audio.play()
//                 }

//                })
//         })
//        })
//     })
// }
