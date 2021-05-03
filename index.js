window.addEventListener("DOMContentLoaded", function () {
  var CANVAS = document.getElementById("canvas");
  var CTX = CANVAS.getContext("2d");
  var PREVIEW = document.getElementById("preview");
  var DATA_URL = "";

  var BG = new Image();
  var BG_READY = false;
  BG.addEventListener("load", function (e) { BG_READY = true; updateContext(); });
  BG.src = "./bv.png";

  var Person = function (id) {
    this.data = {
      firstName: "",
      lastName: "",
      profession: "",
      photo: ""
    };
    this.inputs = {
      firstName: document.getElementById(id + "_firstName"),
      lastName: document.getElementById(id + "_lastName"),
      profession: document.getElementById(id + "_profession"),
      photo: document.getElementById(id + "_photo")
    }
    this.update = function (event) {
      this.data[event.target.name] = event.target.value;
      updateContext();
    }
    this.update = this.update.bind(this);
    this.updatePhoto = function (evt) {
      var reader = new FileReader();
      var file = evt.target.files[evt.target.files.length - 1];
      var that = this;
      reader.addEventListener("load", function(event) {
          that.data.photo = new Image();
          that.data.photo.src = event.target.result;
          updateContext();
      });
      reader.readAsDataURL(evt.target.files[0]);
    }
    this.updatePhoto = this.updatePhoto.bind(this);

    this.data.firstName = this.inputs.firstName.value;
    this.data.lastName = this.inputs.lastName.value;
    this.data.profession = this.inputs.profession.value;
    this.data.photo = this.inputs.photo.value;

    this.inputs.firstName.addEventListener("keyup", this.update);
    this.inputs.lastName.addEventListener("keyup", this.update);
    this.inputs.profession.addEventListener("keyup", this.update);
    this.inputs.photo.addEventListener("change", this.updatePhoto);
  }


  var c1 = new Person("c1");
  var c2 = new Person("c2");
  var s1 = new Person("s1");
  var s2 = new Person("s2");


  var FIRST_NAME_CONFIG = {
    x: 0,
    y: 0,
    w: 200,
    h: 200,
    font: "bold 62px Montserrat",
    color: "#44b9ce"
  };

  var LAST_NAME_CONFIG = {
    x: 0,
    y: 30,
    w: 200,
    h: 200,
    font: "bold 80px Montserrat",
    color: "#44b9ce"
  };

  var PHOTO_CONFIG = {
    x: 50,
    y: 50,
    w: 100,
    h: 100
  }

  function updateContext () {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    if (BG_READY) {
      CTX.drawImage(BG, 0, 0, CANVAS.width, CANVAS.height);
    }
    CTX.textBaseline = "top";

    if (c1.data.firstName) {
      CTX.textAlign = "right";
      CTX.font = FIRST_NAME_CONFIG.font;
      CTX.fillStyle = FIRST_NAME_CONFIG.color;
      CTX.fillText(c1.data.firstName, 800, 620);
    }
    if (c1.data.lastName) {
      CTX.textAlign = "right";
      CTX.font = LAST_NAME_CONFIG.font;
      CTX.fillStyle = LAST_NAME_CONFIG.color;
      CTX.fillText(c1.data.lastName, 800, 695);
    }
    if (c2.data.firstName) {
      CTX.textAlign = "left";
      CTX.font = FIRST_NAME_CONFIG.font;
      CTX.fillStyle = FIRST_NAME_CONFIG.color;
      CTX.fillText(c2.data.firstName, 936, 620);
    }
    if (c2.data.lastName) {
      CTX.textAlign = "left";
      CTX.font = LAST_NAME_CONFIG.font;
      CTX.fillStyle = LAST_NAME_CONFIG.color;
      CTX.fillText(c2.data.lastName, 936, 695);
    }

    // if (c1.data.profession) {
    //   CTX.font = LAST_NAME_CONFIG.font;
    //   CTX.fillStyle = LAST_NAME_CONFIG.color;
    //   CTX.fillText(c1.data.profession, LAST_NAME_CONFIG.x, LAST_NAME_CONFIG.y);
    // }
    // if (c1.data.image) {
    //   CTX.drawImage(c1.data.image, PHOTO_CONFIG.x, PHOTO_CONFIG.y, PHOTO_CONFIG.w, PHOTO_CONFIG.h);
    // }

    DATA_URL = CANVAS.toDataURL();
    PREVIEW.style.backgroundImage = "url(" + DATA_URL + ")";
  }
});
