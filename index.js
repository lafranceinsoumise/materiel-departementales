window.addEventListener("DOMContentLoaded", function () {
  var CANVAS = document.getElementById("canvas");
  var CTX = CANVAS.getContext("2d");
  var DOWNLOAD_BTN = document.getElementById("download");
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
      this.data[event.target.name] = event.target.value.trim();
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

  function updateContext () {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    if (BG_READY) {
      CTX.drawImage(BG, 0, 0, CANVAS.width, CANVAS.height);
    }

    CTX.textBaseline = "top";
    CTX.fillStyle = "#44b9ce";

    CTX.textAlign = "right";
    if (c1.data.firstName) {
      CTX.font = "bold 60px Montserrat";
      CTX.fillText(c1.data.firstName, 810, 625);
    }
    if (c1.data.lastName) {
      CTX.font = "bold 80px Montserrat";
      CTX.fillText(c1.data.lastName, 810, 693);
    }
    CTX.font = "500 32px Montserrat";
    CTX.fillText("REMPLAÇANTE", 810, 910);
    if (s1.data.firstName) {
      CTX.font = "bold 50px Montserrat";
      CTX.fillText(s1.data.firstName, 810, 957);
    }
    if (s1.data.lastName) {
      CTX.font = "bold 70px Montserrat";
      CTX.fillText(s1.data.lastName, 810, 1010);
    }


    CTX.textAlign = "left";
    if (c2.data.firstName) {
      CTX.font = "bold 60px Montserrat";
      CTX.fillText(c2.data.firstName, 938, 625);
    }
    if (c2.data.lastName) {
      CTX.font = "bold 80px Montserrat";
      CTX.fillText(c2.data.lastName, 938, 693);
    }
    CTX.font = "500 32px Montserrat";
    CTX.fillText("REMPLAÇANT", 938, 910);
    if (s2.data.firstName) {
      CTX.font = "bold 50px Montserrat";
      CTX.fillText(s2.data.firstName, 938, 957);
    }
    if (s2.data.lastName) {
      CTX.font = "bold 70px Montserrat";
      CTX.fillText(s2.data.lastName, 938, 1010);
    }

    DATA_URL = CANVAS.toDataURL();
    PREVIEW.src = DATA_URL;
    DOWNLOAD_BTN.setAttribute("href", CANVAS.toDataURL("image/png").replace("image/png", "image/octet-stream"));
  }
});
