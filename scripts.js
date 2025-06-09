import { avignonMap } from './map.js';
import { bookmarkletGeneratePage } from './bookmarklet.js';

export function parseParams(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var faveTitle = "Mes favoris";
  if (urlParams.has("n")){
    const nameString = urlParams.get('n');
    faveTitle = nameString;
  }
  if (urlParams.has("p")){
    const tagsString = urlParams.get('p');
    showFaveMode(faveTitle, tagsString);
    return
  }
  
  creationMode();
}


function setFooter(){
  const footer = `
  <footer class="text-center d-flex flex-column justify-content-center" style="height: 150px;">
    <div class="footerRow">Ce site est un projet open source et totalement indépendant.</div>
    <div class="footerRow">Il n’est ni affilié ni soutenu par AF& C.</div>
    <div class="footerRow">Dernière mise à jour des données : 09 juin 2025 à 19h00</div>
    <div class="footerRow">Le code source est disponible <a class="custom-link" href="https://github.com/renatocribeiro/monprogoff">ici</a></div>
  </footer>`
  $("body").append(footer);

}
function creationMode() {
  const home = `
  <h1 class="text-center my-4" id="h1-title">Mur d'affiches</h1>
  <h5 class="text-center my-4">Choisissez une option pour commencer</h5>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-12 col-md-5 col-lg-4 col-xl-4 colSquare300" role="button" data-bs-toggle="modal" data-bs-target="#copyModal">
        <div class="card cardSquare300 hover-border" id="cardCopy">
          <div class="card-body">
            <h5 class="card-title">Génération à partir de liens</h5>
            <p class="card-text">Collez une ou plusieurs URLs de festivaloffavignon.com : une liste de spectacles sera générée automatiquement à partir de ces liens.</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-5 col-lg-4 col-xl-4 colSquare300" role="button" data-bs-toggle="modal" data-bs-target="#uploadModal">
        <div class="card cardSquare300 hover-border">
          <div class="card-body">
            <h5 class="card-title">Créer depuis une page enregistrée</h5>
            <p class="card-text">Sauvegardez une page de favoris sur festivaloffavignon.com, puis importez ce fichier ici. La liste sera générée automatiquement.</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-5 col-lg-4 col-xl-4 colSquare300" role="button" data-bs-toggle="modal" data-bs-target="#bookmarkletModal">
        <div class="card cardSquare300 hover-border">
          <div class="card-body">
            <h5 class="card-title">Créer via Marque-page</h5>
            <p class="card-text">Sauvegardez le marque-page fourni dans votre barre de favoris. Ensuite, allez sur la page de favoris de festivaloffavignon.com et ouvrez ce marque-page pour générer automatiquement votre liste.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="copyModal" tabindex="-1" role="dialog" aria-labelledby="copyModalTitle" show="false">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Génération à partir de liens</h5>
        </div>
        <div class="modal-body" id="copyModalBody">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          <button type="button" class="btn btn-primary" id="copySendBtn">Voir ma page de favoris!</button>
        </div>
      </div>
    </div>
  </div>


  <div class="modal fade" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="uploadModalTitle" show="false">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Créer depuis une page enregistrée</h5>
        </div>
        <div class="modal-body" id="uploadModalBody">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          <button type="button" class="btn btn-primary" id="uploadSendBtn">Voir ma page de favoris!</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="bookmarkletModal" tabindex="-1" role="dialog" aria-labelledby="bookmarkletModalTitle" show="false">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Créer via Marque-page</h5>
        </div>
        <div class="modal-body" id="bookmarkletModalBody">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
        </div>
      </div>
    </div>
  </div>
  `;
  $("body").append(home);
  setCopyModal();
  setUploadModal();
  setBookmarkletModal();
  setFooter();
}

function setCopyModal() {
  const $container = $("<div>", {class : "container"}).appendTo("#copyModalBody");
  
  const $rowtitle = $("<div>", {class : "row justify-content-center"}).appendTo($container);
  const $colTitle = $("<div>", {class : "col"}).appendTo($rowtitle);
  const $mbTitle = $("<div>", {class : "mb-3"}).appendTo($colTitle);
  
  const $form = $("<form>", {id : "formUrls"}).appendTo($container);
  
  const $rowName = $("<div>", {class : "row justify-content-center"}).appendTo($form);
  const $colName = $("<div>", {class : "col"}).appendTo($rowName);
  const $mbName = $("<div>", {class : "mb-3"}).appendTo($colName);

  const $lblName = $("<label>", {for: "inputName", text:"Veuillez saisir un nom pour la liste de favoris:"}).appendTo($mbName);
  const $inputName = $("<input>", {type: "text", class: "form-control", id: "inputName", value: "Mes favoris du " + moment().format('DD/MM/YYYY à HH:mm'), required: true}).appendTo($mbName);


  const $row = $("<div>", {class : "row justify-content-center"}).appendTo($form);
  const $col = $("<div>", {class : "col"}).appendTo($row);
  const $mb = $("<div>", {class : "mb-3"}).appendTo($col);
  const $label = $("<label>", {for: "textAreaUrls", text: "Veuillez saisir une ou plusieurs URLs pointant vers des pages de spectacles sur le site officiel du Festival Off:"}).appendTo($mb);
  const $textArea = $("<textarea>", {class: "form-control", id: "textAreaUrls", rows: 10, placeholder: "https://www.festivaloffavignon.com/spectacles/0123-le-spectacle-qui-n-existe-pas", required: true}).appendTo($mb);
  const $smallUrls = $("<small>", {class: "form-text text-muted", text: "Ce champ accepte plusieurs URL, séparées par tout type de délimiteur (espace, virgule, point-virgule, etc.)."}).appendTo($mb);

  const $rowBtm = $("<div>", {class : "row justify-content-center"}).appendTo($form);
  const $colBtn = $("<div>", {class : "col"}).appendTo($rowBtm);
  const $mbBtn = $("<div>", {class : "mb-3"}).appendTo($colBtn);

  $('#copySendBtn').on('click', function() {
    const textarea = document.getElementById("textAreaUrls");
    const urls = textarea.value
  
    const newUrl = parseUrls(urls);
    window.open(newUrl, '_blank');
  });
}

function setUploadModal() {
  const $container = $("<div>", {class : "container"}).appendTo("#uploadModalBody");
  const $rowtitle = $("<div>", {class : "row justify-content-center"}).appendTo($container);
  const $colTitle = $("<div>", {class : "col"}).appendTo($rowtitle);
  const $mbTitle = $("<div>", {class : "mb-3"}).appendTo($colTitle);
  const instructions = `Rendez vous sur https://www.festivaloffavignon.com/espace-client/mes-favoris.<br>
    Appuyez sur CTRL+S ou ⌘+S.<br>
    Choisissez l’emplacement où vous voulez sauvegarder le fichier.<br>
    Cliquez sur le bouton te téléchargement ci-dessous et choisissez le fichier html que vous venez de sauvegarder.<br>
    Cliquez sur le bouton 'Voir ma page de favoris!'.`;
  $("<p>", {html: instructions}).appendTo($mbTitle);

  const $lblName = $("<label>", {for: "inputNameUpload", text:"Veuillez saisir un nom pour la liste de favoris:"}).appendTo($mbTitle);
  const $inputName = $("<input>", {type: "text", class: "form-control", id: "inputNameUpload", value: "Mes favoris du " + moment().format('DD/MM/YYYY à HH:mm'), required: true}).appendTo($mbTitle);


  const $uploadTitle = $("<label>", {for: "formFile", class: "form-label", text: "Téléchargez votre fichier:"}).appendTo($mbTitle);
  const $inputTitle = $("<input>", {class : "form-control", type: "file", id: "formFile"}).appendTo($mbTitle);
  let selectedFile = null;
      document.getElementById('formFile').addEventListener('change', function(event) {
      selectedFile = event.target.files[0];
    });

    document.getElementById('uploadSendBtn').addEventListener('click', function() {
      if (!selectedFile) return;
      const reader = new FileReader();
      reader.onload = function(e) {
        const htmlContent = e.target.result;
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const cardImages = doc.querySelectorAll('a.card-image');
        var ids = [];
        cardImages.forEach((card, i) => {
          const regex = /https:\/\/www\.festivaloffavignon\.com\/spectacles\/(\d*)-\s*/g;
          const idArr = [...card.href.matchAll(regex)].map(match => match[1]);
          ids.push(idArr[0]);
        });
        const uniqueIds = [...new Set(ids)];
        const inputName = $("#inputNameUpload").val();
        const newUrl = `${window.location.href}?p=${uniqueIds.join()}&n=${inputName}`;
        window.open(newUrl, '_blank');
      };

      reader.readAsText(selectedFile);
    });
}


function setBookmarkletModal() {
  const $container = $("<div>", {class : "container"}).appendTo("#bookmarkletModalBody");
  const $rowtitle = $("<div>", {class : "row justify-content-center"}).appendTo($container);
  const $colTitle = $("<div>", {class : "col"}).appendTo($rowtitle);
  const $mbTitle = $("<div>", {class : "mb-3"}).appendTo($colTitle);
  $("<p>", {text : "Pour commencer, faites glisser (drag & drop) le lien du marque-page proposé vers votre barre de favoris de votre navigateur."}).appendTo($mbTitle);
  $("<p>", {text : "Ensuite, rendez-vous sur la page de favoris de festivaloffavignon.com et cliquez sur ce marque-page dans votre barre pour générer automatiquement votre liste."}).appendTo($mbTitle);
  const bookmarkletStr = getBookmarkletUriEncoded();
  const $aBookmarklet = $("<a>", {href : bookmarkletStr, text: "marque-page", style: "color: black;"}).appendTo($mbTitle);

}

function parseUrls(urls) {
  const regex = /https:\/\/www\.festivaloffavignon\.com\/spectacles\/(\d*)-\s*/g;
  const idsArray = [...urls.matchAll(regex)].map(match => match[1]);
  const uniqueArray = [...new Set(idsArray)];

  const inputName = $("#inputName").val();
  return `${window.location.href}?p=${uniqueArray.join()}&n=${inputName}`;
}

function getBookmarkletUriEncoded() {
  const funcStr = bookmarkletGeneratePage.toString();
  const iifeStr = `(${funcStr})()`;
  const encoded = encodeURIComponent(iifeStr);
  const bookmarklet = `javascript:${encoded}`;
  return bookmarklet;
}

function getDateText(beg, end) {
  if (beg === end) {
    return `le ${beg} juillet`
  } else {
    return `du ${beg} au ${end} juillet`
  }
}

function formatHour(s) {
  return s.replace(":", "h");
}

function showFaveMode(faveTitle, strParams) {
  const title = `<p class="showModeTitle">${faveTitle}</p>`;
  $("body").append(title);
  
    const idsArray = strParams ? strParams.split(',') : [];

    const $container = $("<div>", { class: "container" });
    const $row = $("<div>", { class: "row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-5 row-cols-xxl-6 gy-4" }).appendTo($container);

    idsArray.forEach(id => {
      if (!avignonMap.has(id)) {
        console.log("skip - ", id, " doesn't exist");
        return;
      }

        const vals = avignonMap.get(id);
        const name = vals[0]
        const url = `http://www.festivaloffavignon.com/spectacles/${id}-${vals[1]}`;
        const url_image = `https://www.festivaloffavignon.com/data/spectacles/${id}-${vals[2]}-catalogue.${vals[3]}`;
        const beg = vals[4];
        const end = vals[5];
        const heure = formatHour(vals[6]);
        const heureFin = formatHour(vals[7]);
        const duree = formatHour(vals[8]);
        const location = vals[9];
        const genre = vals[10] == "nan" ? '' : vals[10];

        const $col = $("<div>", { class: "col" }).appendTo($row);
        const $card = $("<div>", { class: "card h-100 hover-border"}).appendTo($col);
        const $aImg = $("<a>", { href: url, target: "_blank"}).appendTo($card);
        const $img = $("<img>", {class: "card-img-top", src: url_image, alt: url_image}).appendTo($aImg);
        const $cardBody = $("<div>", { class: "card-body" }).appendTo($card);
        
        const $rowTitle = $("<div>", {class: "row"}).appendTo($cardBody);   
        const $colTitle = $("<div>", {class: "col col-box", style:"--height: 20px"}).appendTo($rowTitle);    
        const $aTitle = $("<a>", { href: url, target: "_blank", class: "text-decoration-none text-reset"}).appendTo($colTitle);
        const $cardTitle = $("<h6>", { class: "card-title truncate-lines", text: name, style:"--lines: 1"}).appendTo($aTitle);    
        
        const $rowLocation = $("<div>", {class: "row"}).appendTo($cardBody);   
        const $colLocation = $("<div>", {class: "col col-box", style:"--height: 20px"}).appendTo($rowLocation);    
        const $location = $("<small>", { class: "text-muted truncate-lines", text: location, style:"--lines: 1"}).appendTo($colLocation);

        const $rowDate = $("<div>", {class: "row"}).appendTo($cardBody);   
        const $colDate = $("<div>", {class: "col"}).appendTo($rowDate);    
        const $date = $("<p>", { class: "cardRow m-0", text: getDateText(beg, end)}).appendTo($colDate);


        const $rowTime = $("<div>", {class: "row"}).appendTo($cardBody);   
        const $colTime = $("<div>", {class: "col"}).appendTo($rowTime);    
        const $time = $("<p>", { class: "cardRow m-0", text: `${heure}→${heureFin} · ${duree}`}).appendTo($colTime);


        const $rowGenre = $("<div>", {class: "row"}).appendTo($cardBody);   
        const $colGenre = $("<div>", {class: "col"}).appendTo($rowGenre);    
        const $genre = $("<p>", { class: "cardRow m-0", text: genre}).appendTo($colGenre);


      });
    $container.appendTo("body");
    setFooter();
}