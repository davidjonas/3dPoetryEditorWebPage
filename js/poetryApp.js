var videoApp;
var menuApp;
var personApp;
var aboutApp;
var downloadApp;

var youtube = {};
youtube.getURL = function(id, start)
{
  return '//www.youtube.com/embed/'+id+'?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&enablejsapi=1&start=' + start;
};

youtube.ready = false;

youtube.play = function (id) {
  if(youtube.ready)
  {
    videoApp.url = youtube.getURL(id);
  }
};

var addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

window.addEventListener('load', function () {
  Vue.component('youtube-embed', {
      props:['url', 'width', 'height'],
      template: '<iframe v-bind:src="url" v-bind:height="height" v-bind:width="width" allowfullscreen="" frameborder="0"></iframe>'
  });

  Vue.component('menu-item', {
      props:['item', 'anchor'],
      template: '<li v-on:click="scroll(anchor)"><span>{{ item }}</span></li>',
      data: function(){
        return {
          scroll: function(anchor) {
              document.querySelector('#'+anchor).scrollIntoView({
                behavior: 'smooth'
              });
              menuApp.open = false;
            }
        }
      }
  });

  Vue.component('person-item', {
      props:['name', 'description', 'url', 'css'],
      template: '<div class="person" v-bind:class="css"><h2><a v-bind:href="url">{{ decodeHtml(name) }}</a></h2><p>{{ decodeHtml(description) }}</p></div>',
      data: function()
      {
        return {
          decodeHtml: function (html) {
            var txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
          }
        }
      }
  });

  downloadApp = new Vue({
    el: '#download',
    data: {
      dialogOpen: false
    }
  });

  videoApp = new Vue({
    el: '#video',
    data: {
      url: youtube.getURL("L3v0sthqzNc", 0),
      width:  window.innerWidth,
      height:  Math.round(window.innerWidth/(16/9))
    }
  });

  aboutApp = new Vue({
    el: '#about',
    data: {
      open: false,
      message: "Read more >"
    },
    methods : {
      toggle : function ()
      {
        this.open = !this.open;
        if(!this.open)
        {
          this.message = "Read more >";
          document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
          });
        }
        else
        {
          this.message = "< Less";
        }
      }
    }
  });

  personApp = new Vue({
    el: '#credits',
    data: {
      personList: [
        {id: 0, cssClass:"person_0", name: "Michiel Koelink", url: "http://michielkoelink.net/",
        description: "Michiel Koelink is a media artist who works with software systems, video, sound and photography, through which he demonstrates a passion for loops and simple rule-based works, often subjected to infinite changes by algorithmic structures. In the process of research and development, Koelink often collaborates with scientists and other experts. Works like Spitzenkörper and 2.5 Dimensions show a commitment to an aesthetic visualization of science."},
        {id: 1, cssClass:"person_1" ,name: "David Jonas", url: "http://www.davidjonas.net",
        description: "David Jonas is a computer science engineer, media artist and educator on the fields of creative coding and game development. Based in The Netherlands, David has co-founded INTK and currently works with diverse artists, museums, cultural institutions and universities. He has been nominated and received international awards for his design and development work. An artist, maker and problem solver at heart, he plays multiple musical instruments and builds custom code, bikes, cars and drones."},
        {id: 2, cssClass:"person_2", name: "Jon Stale Ritland", url: "http://www.davidjonas.net",
        description: "Jon Stale Ritland was born in Drammen, Norway. He studied at the University of Oslo and the Norwegian University of Science and Technology, Trondheim, specialising in Ophthalmology, and is currently working as an ophthalmologist in Alesund. His doctoral thesis from 2008 was titled Primary Open-Angle Glaucoma & Exfoliative Glaucoma, Survival, Comorbidity and Genetics. His publications include the poetry collections Kroppsvisitasjoner [Body searches] (Aschehoug, 2004) and Vannmerker [Watermarks] (Aschehoug, 2009), and the essay Nar det biokjemiske sprak inntar litteraturens kropp [When Biochemical Language Enters the Body of Literature] (OEI, 2009)."},
        {id: 3, cssClass:"person_3", name: "Mike Hambleton", url: "http://www.mikehambleton.com/",
        description: "Creative Director based in San Francisco, with 18+ years experience leading award-winning, multidisciplinary design teams in the US and Europe. After 15 years at leading agencies in Amsterdam, I've spent the last 3.5 years living in the Bay Area, where I've made the transition from marketing and digital into product design. Currently a Creative Director at Native Design, the legendary London ID/XD studio behind groundbreaking work for premium global brands including Bowers & Wilkins, the BBC, Audi, Bentley, and HP, among others. Native is unique among design agencies in uniting physical and digital creativity in a single project stream. We typically form long-term relationships at C-level with clients who approach us for our strategic thinking and deep experience design skillsets."},
      ]
    }
  });

  menuApp = new Vue({
    el: '#menu_container',
    data: {
      open: false,
      menuList: [
        {id: 0, itemName: "Top", anchor: "video"},
        {id: 1, itemName: "About", anchor: "about"},
        {id: 2, itemName: "Download", anchor: "download"},
        {id: 3, itemName: "The gravity of words", anchor: "poets"},
        {id: 4, itemName: "Credits", anchor: "credits"},
        {id: 5, itemName: "Contact", anchor: "contact"},
      ]
    }
  });

  addEvent(window, "resize", function(){
    videoApp.width = window.innerWidth;
    videoApp.height = Math.round(window.innerWidth/(16/9));
  })

  youtube.ready = true;
});
