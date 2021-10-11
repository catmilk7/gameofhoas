
(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.6435-9/245280660_1006030970185760_4696268737257741001_n.jpg?_nc_cat=104&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=3u92H8fWr0IAX82ePts&_nc_ht=scontent.fsgn2-5.fna&oh=84915a621b8aee9dfea92c62d35c4aca&oe=618A7CC5"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "Po",
			img: "https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-9/245126837_1006002236855300_2653757927304201957_n.jpg?_nc_cat=111&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=2yurMW84X9oAX_5O7x6&_nc_ht=scontent.fsgn2-6.fna&oh=9069490ca974a1cd613eb9488c5fcda2&oe=618A22EC",
			id: 1,
		},
		{
			name: "Tl",
			img: "https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-9/245280660_1006002373521953_6703279331605959594_n.jpg?_nc_cat=111&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=b9X8Yn-PPckAX_Aulzf&_nc_ht=scontent.fsgn2-6.fna&oh=a9d6041201e2427b33d35dd3841b3be5&oe=618B24EA",
			id: 2
		},
		{
			name: "Pt",
			img: "https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.6435-9/245193221_1006002456855278_926549828283183280_n.jpg?_nc_cat=100&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=Yu8FmPLYJYsAX9bBTGM&_nc_ht=scontent.fsgn2-2.fna&oh=8e27a881dcb9be40a6746dc3fabfe6e6&oe=6188A7C1",
			id: 3
		},
		{
			name: "Th",
			img: "https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-9/245312287_1006002650188592_8358236942506903612_n.jpg?_nc_cat=110&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=tw5aZuP53VUAX-CFIFX&_nc_ht=scontent.fsgn2-6.fna&oh=c1207be7894a57ee6a51cd990e16fb4c&oe=618BA24A",
			id: 4
		}, 
		{
			name: "Cs",
			img: "https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-9/245426943_1006002986855225_1792719844586812259_n.jpg?_nc_cat=106&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=yOPNbJ1QmbYAX-agtRU&tn=rTd7BmZnvllXp75Y&_nc_ht=scontent.fsgn2-3.fna&oh=f0717a8a83acffa79440a6d21cdfb5d2&oe=6189BAE0",
			id: 5
		},
		{
			name: "Fr",
			img: "https://www.chemistrylearner.com/wp-content/uploads/2018/03/Francium-Symbol-150x150.jpg",
			id: 6
		},
		{
			name: "Si",
			img: "https://www.chemistrylearner.com/wp-content/uploads/2018/07/Silicon-Symbol-150x150.jpg",
			id: 7
		},
		{
			name: "Ti",
			img: "https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.6435-9/245116525_1006003186855205_3142344505052040320_n.jpg?_nc_cat=109&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=oTstQLP6D3QAX_ds2nW&_nc_ht=scontent.fsgn2-4.fna&oh=41d911627afca461a7da18f1ae80e3e3&oe=61898FF1",
			id: 8
		},
		{
			name: "Cr",
			img: "https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-9/245254482_1006003250188532_6307764478207216922_n.jpg?_nc_cat=107&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=FGDq16l7bN0AX8srakf&_nc_ht=scontent.fsgn2-1.fna&oh=da827e7a513c0751e5a09d9a3e134501&oe=61888129",
			id: 9
		},
		{
			name: "Hg",
			img: "https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-9/245184399_1006003646855159_2208293961792160771_n.jpg?_nc_cat=105&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=koiTnGgKGKkAX8id2l_&_nc_ht=scontent.fsgn2-1.fna&oh=e658c7f282db68d0f332aa499ea6f769&oe=61881B53",
			id: 10
		},
		{
			name: "Ra",
			img: "https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-9/245157439_1006003686855155_5043183767400705481_n.jpg?_nc_cat=105&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=gMq8Oadd-t4AX_JIg79&_nc_ht=scontent.fsgn2-1.fna&oh=08938286170f9c46bdd3da8f3d5670db&oe=61895291",
			id: 11
		},
		{
			name: "I",
			img: "https://www.chemistrylearner.com/wp-content/uploads/2018/07/Iodine-Symbol-150x150.jpg",
			id: 12
		},
	];
    
	Memory.init(cards);


})();
