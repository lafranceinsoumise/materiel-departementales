window.addEventListener("DOMContentLoaded", function () {
  var CANVAS = document.getElementById("canvas");
  var CTX = CANVAS.getContext("2d");
  var PREVIEW = document.getElementById("preview");
  var DATA_URL = "";

  var BG = new Image();
  var BG_READY = false;
  BG.addEventListener("load", function (e) { BG_READY = true; updateContext(); });
  BG.src = "./affiche.png";

  var Person = function (id) {
    this.data = {
      firstName: "",
      lastName: "",
      profession: "",
      photo: "",
      localisation: ""
    };
    this.inputs = {
      firstName: document.getElementById(id + "_firstName"),
      lastName: document.getElementById(id + "_lastName"),
      profession: document.getElementById(id + "_profession"),
      photo: document.getElementById(id + "_photo"),
      localisation: document.getElementById("localisation"),
    }
    this.update = function (event) {
      this.data[event.target.name] = event.target.value.toUpperCase();
      updateContext();
    }
    this.update = this.update.bind(this);
    this.updatePhoto = function(evt) {
      var reader = new FileReader();
      var that = this;
      reader.addEventListener("load", function (event) {
          that.data.photo = new Image();
          that.data.photo.src = event.target.result;
          setTimeout(function() {
            updateContext();
          }, 500);
      });
      reader.readAsDataURL(evt.target.files[0]);
    }
    this.updatePhoto = this.updatePhoto.bind(this);

    this.inputs.firstName?.addEventListener("keyup", this.update);
    this.inputs.lastName?.addEventListener("keyup", this.update);
    this.inputs.profession?.addEventListener("keyup", this.update);
    this.inputs.photo?.addEventListener("change", this.updatePhoto);
    this.inputs.localisation?.addEventListener("keyup", this.update);
  }


  var FIRST_NAME_CONFIG = {
    x: 0,
    y: 0,
    w: 200,
    h: 200,
    font: "bold 24px Montserrat",
    color: "black"
  };

  var LAST_NAME_CONFIG = {
    x: 0,
    y: 30,
    w: 200,
    h: 200,
    font: "bold 36px Montserrat",
    color: "#44b9ce"
  };

  var SUPPLEANT_CONFIG = {
    firstName: {
      font: "bold 16px Montserrat",
      color: "black"
    },
    lastName: {
      font: "bold 30px Montserrat",
      color: "#44b9ce"
    }
  }

  var GEOLOC_CONFIG = {
    x: 105,
    y: 70,
    w: 200,
    h: 200,
    font: "bold 24px Montserrat",
    color: "#fff"
  };

  const DEFAULT_GEOLOC = "DEPARTEMENT DU TERRITOIRE DE BELFORT - CANTON DE BELFORT 1";

  const DEFAULT_PERSON = {
    firstName: "Landry",
    lastName: "NGANG",
    photo: "../bv.png"
  };

  function updateContext () {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    if (BG_READY) {
      CTX.drawImage(BG, 0, 0, CANVAS.width, CANVAS.height);
    }
    CTX.textBaseline = "top";

    if (c1.data.firstName) {
      CTX.textAlign = "left";
      CTX.font = FIRST_NAME_CONFIG.font;
      CTX.fillStyle = FIRST_NAME_CONFIG.color;
      CTX.fillText(c1.data.firstName, 87, 812);
    }
    if (c1.data.lastName) {
      CTX.textAlign = "left";
      CTX.font = LAST_NAME_CONFIG.font;
      CTX.fillStyle = LAST_NAME_CONFIG.color;
      CTX.fillText(c1.data.lastName, 87, 847);
    }
    if (c2.data.firstName) {
      CTX.textAlign = "right";
      CTX.font = FIRST_NAME_CONFIG.font;
      CTX.fillStyle = FIRST_NAME_CONFIG.color;
      CTX.fillText(c2.data.firstName, 920, 878);
    }
    if (c2.data.lastName) {
      CTX.textAlign = "right";
      CTX.font = LAST_NAME_CONFIG.font;
      CTX.fillStyle = LAST_NAME_CONFIG.color;
      CTX.fillText(c2.data.lastName, 920, 915);
    }

    // SUPPLEANTS
    if (s1.data.firstName) {
      CTX.textAlign = "left";
      CTX.font = SUPPLEANT_CONFIG.firstName.font;
      CTX.fillStyle = SUPPLEANT_CONFIG.firstName.color;
      CTX.fillText(s1.data.firstName, 87, 968);
    }
    if (s1.data.lastName) {
      CTX.textAlign = "left";
      CTX.font = SUPPLEANT_CONFIG.lastName.font;
      CTX.fillStyle = SUPPLEANT_CONFIG.lastName.color;
      CTX.fillText(s1.data.lastName, 87, 991);
    }

    if (s2.data.firstName) {
      CTX.textAlign = "right";
      CTX.font = SUPPLEANT_CONFIG.firstName.font;
      CTX.fillStyle = SUPPLEANT_CONFIG.firstName.color;
      CTX.fillText(s2.data.firstName, 920, 1008);
    }
    if (s2.data.lastName) {
      CTX.textAlign = "right";
      CTX.font = SUPPLEANT_CONFIG.lastName.font;
      CTX.fillStyle = SUPPLEANT_CONFIG.lastName.color;
      CTX.fillText(s2.data.lastName, 920, 1033);
    }

    if (c1.data.photo) {
      CTX.drawImage(c1.data.photo, 6, 160, 498, 622);
    }
    if (c2.data.photo) {
      CTX.drawImage(c2.data.photo, 498, 160, 498, 622);
    }
    if (s1.data.photo) {
      CTX.drawImage(s1.data.photo, 42, 1054, 165, 204);
    }
    if (s2.data.photo) {
      CTX.drawImage(s2.data.photo, 794, 1100, 165, 200);
    }

    // Triangles over photos
    CTX.beginPath();
    CTX.moveTo(42, 1249);
    CTX.lineTo(207, 1258);
    CTX.lineTo(42, 1258);
    CTX.closePath();
    CTX.fillStyle = "#00ADCF";
    CTX.fill();

    CTX.beginPath();
    CTX.moveTo(794, 1289);
    CTX.lineTo(980, 1300);
    CTX.lineTo(794, 1300);
    CTX.closePath();
    CTX.fillStyle = "#00ADCF";
    CTX.fill();


    if (localisation.data.localisation) {
      CTX.textAlign = "center";
      CTX.font = GEOLOC_CONFIG.font;
      CTX.fillStyle = GEOLOC_CONFIG.color;
      CTX.fillText(localisation.data.localisation, CANVAS.width / 2, GEOLOC_CONFIG.y);
    }

    DATA_URL = CANVAS.toDataURL();
    PREVIEW.style.backgroundImage = "url(" + DATA_URL + ")";
  }

  var c1 = new Person("c1");
  var c2 = new Person("c2");
  var s1 = new Person("s1");
  var s2 = new Person("s2");
  
  var localisation = new Person("localisation");
  
  updateContext();
});


