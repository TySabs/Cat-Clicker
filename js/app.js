/********* Model ************/
/* Set up a model with five different cats
 * Cat images were found on pixabay.com
 * Meow sound was found at http://audiosoundclips.com/cat-sound-effects-sfx/
 * All images and sounds were available via Creative Commons License
 */
var model = {
  currentCat: null,
  meow: 'sounds/meow.mp3',
  allCats: [
    {
      name: 'Bruce',
      src: 'images/bruce.jpg',
      clickCount: 0,
      level: 'Kitten'
    },
    {
      name: 'Katniss',
      src: 'images/katniss.jpg',
      clickCount: 0,
      level: 'Kitten'
    },
    {
      name: 'Leonard',
      src: 'images/leonard.jpg',
      clickCount: 0,
      level: 'Kitten'
    },
    {
      name: 'Paco',
      src: 'images/paco.jpg',
      clickCount: 0,
      level: 'Kitten'
    },
    {
      name: 'Whiskers',
      src: 'images/whiskers.jpg',
      clickCount: 0,
      level: 'Kitten'
    }
  ]
};

/************* Octopus (Controller) ***************/
var octopus = {
  init: function() {

    // Get random starter cat index
    var randomCatIndex = octopus.getRandomCat(0, 4);
    // Display a random cat as currentCat on page load
    model.currentCat = model.allCats[randomCatIndex];

    // Initialize views
    currentCatView.init();
    catListView.init();
  },

  // Sets the starter cat to a random cat in allCats array
  getRandomCat: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

  checkForMeow: function() {
    // Set variables to hold meow audio file and clickCount
    var meow = new Audio(model.meow),
        clickCount = model.currentCat.clickCount;

    // Check if currentCat's clickCount equals enough clicks to level up
    if (clickCount === 10 || clickCount === 20 || clickCount === 30 ||  clickCount === 40 || clickCount === 50 || clickCount === 60 || clickCount === 70 || clickCount === 80 || clickCount === 90 || clickCount === 100 || clickCount === 125 || clickCount === 150 || clickCount === 200 || clickCount === 300 || clickCount === 400 || clickCount === 500) {
      // Play level up sound if cat has levelled up
      meow.play();
    }
  },

  getLevel: function(cat) {
    // Set variables to hold clickCount, and
    var clickCount = model.currentCat.clickCount,
        catLevel;

    // Set catLevel based on how many clicks a cat has
    if (clickCount < 10) {
      catLevel = "Kitten";
    } else if (clickCount >= 10 && clickCount < 20) {
      catLevel = "Housecat";
    } else if (clickCount >= 20 && clickCount < 30) {
      catLevel = "Mouser";
    } else if (clickCount >= 30 && clickCount < 40) {
      catLevel = "Margay";
    } else if (clickCount >= 40 && clickCount < 50) {
      catLevel = "Ocelot";
    } else if (clickCount >= 50 && clickCount < 60) {
      catLevel = "Bobcat";
    } else if (clickCount >= 60 && clickCount < 70) {
      catLevel = "Lynx";
    } else if (clickCount >= 70 && clickCount < 80) {
      catLevel = "Cougar";
    } else if (clickCount >= 80 && clickCount < 90) {
      catLevel = "Puma";
    } else if (clickCount >= 90 && clickCount < 100) {
      catLevel = "Panther";
    } else if (clickCount >= 100 && clickCount < 125) {
      catLevel = "Leopard";
    } else if (clickCount >= 125 && clickCount < 150) {
      catLevel = "Cheetah";
    } else if (clickCount >= 150 && clickCount < 200) {
      catLevel = "Leopard";
    } else if (clickCount >= 200 && clickCount < 300) {
      catLevel = "Lion";
    } else if (clickCount >= 300 && clickCount < 400) {
      catLevel = "Tiger";
    } else if (clickCount >= 500) {
      catLevel = "Sabretooth";
    }
    // Meow if cat levelled up
    octopus.checkForMeow();
    // Set currentCat's level
    model.currentCat.level = catLevel;
  },

  // Adds one to currentCat's clickCount
  incrementClickCount: function() {
    // Increment click count
    model.currentCat.clickCount++;
    // Give cat appropriate level
    octopus.getLevel();
    // Re-render so proper information display
    currentCatView.render();
  }
};

/************** View ******************/
var currentCatView = {
  init: function() {
    // Set variables for currentCat DOM elements
    this.catElem = document.getElementById('cat');
    this.catNameElem = document.getElementById('cat-name');
    this.catLevelElem = document.getElementById('cat-level');
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
    this.catLevelElem.textContent = currentCat.level;
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
    var iCat, buttonElem;

    // Set allCats array to local variable & Set length array for for-loop
    var allCats = octopus.getAllCats();
    var allCatsLength = allCats.length;

    // Clear catListElem
    this.catListElem.innerHTML = '';

    for (var i = 0; i < allCatsLength; i++) {
      // Set iCat to current cat in loop
      iCat = allCats[i];

      // Create a li element and set its text
      buttonElem = document.createElement('button');
      buttonElem.textContent = iCat.name;

      // On click, setCurrentCat and render the currentCatView
      // Uses closure-in-a-loop JS magic
      // (connect value of cat variable to click event function)
      buttonElem.addEventListener('click', (function(thatCat) {
        return function() {
          octopus.setCurrentCat(thatCat);
          currentCatView.render();
        };
      })(iCat));

      // Add element to the list
      this.catListElem.appendChild(buttonElem);
    }
  }
};

octopus.init();
octopus.getLevel();
