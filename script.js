var Tile = function(x, y, face) {
    this.x = x;
    this.y = y;
    this.size = 59;
    this.face = face;
    this.isFaceUp = false;
    this.isMatch = false;
};

Tile.prototype.draw = function() {
    fill(214, 247, 202);
    strokeWeight(2);
    rect(this.x, this.y, this.size, this.size, 10);
    if (this.isFaceUp) {
        image(this.face, this.x, this.y, this.size, this.size);
    } else {
        image(getImage("https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.6435-9/245280660_1006030970185760_4696268737257741001_n.jpg?_nc_cat=104&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=3u92H8fWr0IAX82ePts&_nc_ht=scontent.fsgn2-5.fna&oh=84915a621b8aee9dfea92c62d35c4aca&oe=618A7CC5"), this.x, this.y, this.size, this.size);
    }
};

Tile.prototype.isUnderMouse = function(x, y) {
    return x >= this.x && x <= this.x + this.size  &&
        y >= this.y && y <= this.y + this.size;
};

// Global config
var NUM_COLS = 8;
var NUM_ROWS = 4;

// Declare an array of all possible faces
var faces = [
    getImage("https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-9/245331297_1006002010188656_7786730256952990788_n.jpg?_nc_cat=107&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=4Vplgem2XdEAX90fuGX&_nc_ht=scontent.fsgn2-1.fna&oh=5a70844020b6611fd8d8e6a5812caac7&oe=618ACE8F"),
    getImage("https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.6435-9/245309218_1006002060188651_1863401850467548246_n.jpg?_nc_cat=109&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=PwudjDL4JqwAX-FDAGU&_nc_ht=scontent.fsgn2-4.fna&oh=8f891e7c4c3031f96ca2240dd61e403f&oe=618B329F"),
    getImage("https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.6435-9/245287526_1006002096855314_2319303428310184955_n.jpg?_nc_cat=109&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=BspXJu_NekIAX8yS2w2&_nc_ht=scontent.fsgn2-4.fna&oh=bb2323bb503138e3bd5eba63e1d86282&oe=6188DC9A"),
    getImage("https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-9/245126837_1006002236855300_2653757927304201957_n.jpg?_nc_cat=111&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=2yurMW84X9oAX_5O7x6&_nc_ht=scontent.fsgn2-6.fna&oh=9069490ca974a1cd613eb9488c5fcda2&oe=618A22EC"),
      getImage("https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-9/245280660_1006002373521953_6703279331605959594_n.jpg?_nc_cat=111&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=b9X8Yn-PPckAX_Aulzf&_nc_ht=scontent.fsgn2-6.fna&oh=a9d6041201e2427b33d35dd3841b3be5&oe=618B24EA"),
    getImage("https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.6435-9/245193221_1006002456855278_926549828283183280_n.jpg?_nc_cat=100&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=Yu8FmPLYJYsAX9bBTGM&_nc_ht=scontent.fsgn2-2.fna&oh=8e27a881dcb9be40a6746dc3fabfe6e6&oe=6188A7C1"),
    getImage("https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-9/245312287_1006002650188592_8358236942506903612_n.jpg?_nc_cat=110&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=tw5aZuP53VUAX-CFIFX&_nc_ht=scontent.fsgn2-6.fna&oh=c1207be7894a57ee6a51cd990e16fb4c&oe=618BA24A"),
    getImage("https://www.chemistrylearner.com/wp-content/uploads/2018/03/Francium-Symbol-150x150.jpg"),
      getImage("https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-9/245426943_1006002986855225_1792719844586812259_n.jpg?_nc_cat=106&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=yOPNbJ1QmbYAX-agtRU&tn=rTd7BmZnvllXp75Y&_nc_ht=scontent.fsgn2-3.fna&oh=f0717a8a83acffa79440a6d21cdfb5d2&oe=6189BAE0"),
    getImage("https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.6435-9/245116525_1006003186855205_3142344505052040320_n.jpg?_nc_cat=109&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=oTstQLP6D3QAX_ds2nW&_nc_ht=scontent.fsgn2-4.fna&oh=41d911627afca461a7da18f1ae80e3e3&oe=61898FF1"),
    getImage("https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-9/245254482_1006003250188532_6307764478207216922_n.jpg?_nc_cat=107&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=FGDq16l7bN0AX8srakf&_nc_ht=scontent.fsgn2-1.fna&oh=da827e7a513c0751e5a09d9a3e134501&oe=61888129"),
    getImage("https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-9/245184399_1006003646855159_2208293961792160771_n.jpg?_nc_cat=105&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=koiTnGgKGKkAX8id2l_&_nc_ht=scontent.fsgn2-1.fna&oh=e658c7f282db68d0f332aa499ea6f769&oe=61881B53"),
      getImage("https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-9/245157439_1006003686855155_5043183767400705481_n.jpg?_nc_cat=105&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=gMq8Oadd-t4AX_JIg79&_nc_ht=scontent.fsgn2-1.fna&oh=08938286170f9c46bdd3da8f3d5670db&oe=61895291"),
    getImage("https://www.chemistrylearner.com/wp-content/uploads/2018/07/Iodine-Symbol-150x150.jpg"),
    getImage("https://www.chemistrylearner.com/wp-content/uploads/2018/07/Radon-Symbol-150x150.jpg"),
    getImage("https://www.chemistrylearner.com/wp-content/uploads/2018/07/Silicon-Symbol-150x150.jpg"),
  
];

// Make an array which has 2 of each, then randomize it
var possibleFaces = faces.slice(0);
var selected = [];
for (var i = 0; i < (NUM_COLS * NUM_ROWS) / 2; i++) {
    // Randomly pick one from the array of remaining faces
    var randomInd = floor(random(possibleFaces.length));
    var face = possibleFaces[randomInd];
    // Push twice onto array
    selected.push(face);
    selected.push(face);
    // Remove from array
    possibleFaces.splice(randomInd, 1);
}

// Now shuffle the elements of that array
var shuffleArray = function(array) {
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var ind = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[ind];
        array[ind] = temp;
    }
};
shuffleArray(selected);

// Create the tiles
var tiles = [];
for (var i = 0; i < NUM_COLS; i++) {
    for (var j = 0; j < NUM_ROWS; j++) {
        var tileX = i * 48 + 2;
        var tileY = j * 63 + 40;
        var tileFace = selected.pop();
        tiles.push(new Tile(tileX, tileY, tileFace));
    }
}

background(255, 255, 255);

var numTries = 0;
var numMatches = 0;
var flippedTiles = [];
var delayStartFC = null;

mouseClicked = function() {
    for (var i = 0; i < tiles.length; i++) {
        var tile = tiles[i];
        if (tile.isUnderMouse(mouseX, mouseY)) {
            if (flippedTiles.length < 2 && !tile.isFaceUp) {
                tile.isFaceUp = true;
                flippedTiles.push(tile);
                if (flippedTiles.length === 2) {
                    numTries++;
                    if (flippedTiles[0].face === flippedTiles[1].face) {
                        flippedTiles[0].isMatch = true;
                        flippedTiles[1].isMatch = true;
                        flippedTiles.length = 0;
                        numMatches++;
                    }
                    delayStartFC = frameCount;
                }
            } 
            loop();
        }
    }
};

draw = function() {
    background(255, 255, 255);
    if (delayStartFC && (frameCount - delayStartFC) > 30) {
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            if (!tile.isMatch) {
                tile.isFaceUp = false;
            }
        }
        flippedTiles = [];
        delayStartFC = null;
        noLoop();
    }
    
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].draw();
    }
    
    if (numMatches === tiles.length/2) {
        fill(0, 0, 0);
        textSize(20);
        text("Bạn đã trở thành phù thủy hóa học quyền năng " + "trong" numTries + " lần thử!", 20, 375);
    }
};

noLoop();
