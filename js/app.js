/********* Model ************/
/* Set up a model with five different cats */
// Cat images were found on pixabay.com
var model = {
  currentCat: null,
  allCats: [
    {
      name: 'Bruce',
      src: 'images/bruce.jpg',
      clickCount: 0
    },
    {
      name: 'Katniss',
      src: 'images/katniss.jpg',
      clickCount: 0
    },
    {
      name: 'Leonard',
      src: 'images/leonard.jpg',
      clickCount: 0
    },
    {
      name: 'Paco',
      src: 'images/paco.jpg',
      clickCount: 0
    },
    {
      name: 'Shadow',
      src: 'images/shadow.jpg',
      clickCount: 0
    }
  ]
};

/************* Octopus (Controller) ***************/

var octopus = {
  init: function() {
    // Display first cat as currentCat
    model.currentCat = model.allCats[0];

    // Initialize views
    currentCatView.init();
    catListView.init();
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  getAllCats: function() {
    return model.allCats;
  },

  // Set the currentCat to cat argument
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  // Adds one to currentCat's clickCount
  incrementClickCount: function() {
    model.currentCat.clickCount++;
    currentCatView.render();
  }
};

/************** View ******************/

var currentCatView = {
  init: function() {
    // Set variables for currentCat DOM elements
    this.catElem = document.getElementById('cat');
    this.catNameElem = document.getElementById('cat-name');
    this.catImageElem = document.getElementById('cat-img');
    this.counterElem = document.getElementById('click-counter');

    // On click, add to the cat's clickCount
    this.catImageElem.addEventListener('click', function() {
      octopus.incrementClickCount();
    });

    // Render proper view
    this.render();
  },

  render: function() {
    // Update DOM elements with values of currentCat
    var currentCat = octopus.getCurrentCat();
    this.counterElem.textContent = currentCat.clickCount;
    this.catNameElem.textContent = currentCat.name;
    this.catImageElem.src = currentCat.src;
  }
};

var catListView = {
  init: function() {
    // Set variables for cat-list DOM elements
    this.catListElem = document.getElementById('cat-list');

    this.render();
  },

  render: function() {
    var iCat, listElem;

    // Set allCats array to local variable & Set length array for for-loop
    var allCats = octopus.getAllCats();
    var allCatsLength = allCats.length;

    // Clear catListElem
    this.catListElem.innerHTML = '';

    for (var i = 0; i < allCatsLength; i++) {
      // Set iCat to current cat in loop
      iCat = allCats[i];

      // Create a li element and set its text
      listElem = document.createElement('li');
      listElem.textContent = iCat.name;

      // On click, setCurrentCat and render the currentCatView
      // Uses closure-in-a-loop JS magic
      // (connect value of cat variable to click event function)
      listElem.addEventListener('click', (function(thatCat) {
        return function() {
          octopus.setCurrentCat(thatCat);
          currentCatView.render();
        };
      })(iCat));

      // Add element to the list
      this.catListElem.appendChild(listElem);
    }
  }
};

octopus.init();
