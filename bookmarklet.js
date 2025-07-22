export function bookmarkletGeneratePage(){ 

  if (!window.location.href.includes('festivaloffavignon.com/espace-client/mes-favoris')) {
    alert('Ouvrez https://www.festivaloffavignon.com/espace-client/mes-favoris');
    return
  }

    const cardImages = document.querySelectorAll('a.card-image');
    var ids = [];
    cardImages.forEach((card, i) => {
      const regex = /https:\/\/www\.festivaloffavignon\.com\/spectacles\/(\d*)-\s*/g;
      const idArr = [...card.href.matchAll(regex)].map(match => match[1]);
      ids.push(idArr[0]);
    });
    const uniqueIds = [...new Set(ids)];
    const inputName = "Mur d'affiches"
    const newUrl = 'https://renatocribeiro.github.io/murdaffiches/index.html?p='+uniqueIds.join()+'&n='+inputName;
    window.open(newUrl, '_blank');
    console.log(newUrl); 
  }