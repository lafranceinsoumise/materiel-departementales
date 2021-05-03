window.addEventListener("DOMContentLoaded", function() {
  var CANVAS_BV = document.getElementById("canvas_bv");
  var CANVAS_PF = document.getElementById("canvas_pf");
  var DOWNLOAD_BV = document.getElementById("download_bv");
  var DOWNLOAD_PF = document.getElementById("download_pf");
  var DPT_INPUT = document.getElementById("departement");
  var PREVIEW = document.getElementById("preview");

  var dpt = DPT_INPUT.value.trim()
  DPT_INPUT.addEventListener("keyup", function (e) {
    dpt = e.target.value;
  });

  var BG_BV = new Image();
  var BG_BV_READY = false;
  BG_BV.addEventListener("load", function(e) {
    BG_BV_READY = true;
  });
  BG_BV.src = "./bv.png";

  var BG_PF = new Image();
  var BG_PF_READY = false;
  BG_PF.addEventListener("load", function(e) {
    BG_PF_READY = true;
  });
  BG_PF.src = "./pf.png";

  var Person = function(id) {
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
    this.update = function(event) {
      this.data[event.target.name] = event.target.value.trim();
    }
    this.update = this.update.bind(this);
    this.updatePhoto = function(evt) {
      var reader = new FileReader();
      var file = evt.target.files[evt.target.files.length - 1];
      var that = this;
      reader.addEventListener("load", function(event) {
        that.data.photo = new Image();
        that.data.photo.onload = function() {
        }
        that.data.photo.src = event.target.result;
      });
      reader.readAsDataURL(evt.target.files[0]);
    }
    this.updatePhoto = this.updatePhoto.bind(this);

    this.data.firstName = this.inputs.firstName.value;
    this.data.lastName = this.inputs.lastName.value;
    this.data.profession = this.inputs.profession.value;
    this.inputs.photo.value = "";

    this.inputs.firstName.addEventListener("keyup", this.update);
    this.inputs.lastName.addEventListener("keyup", this.update);
    this.inputs.profession.addEventListener("keyup", this.update);
    this.inputs.photo.addEventListener("change", this.updatePhoto);
  }

  var c1 = new Person("c1");
  var c2 = new Person("c2");
  var s1 = new Person("s1");
  var s2 = new Person("s2");

  function requestInterval (fn, delay) {
    var requestAnimFrame = (function () {
      return window.requestAnimationFrame || function (callback, element) {
        window.setTimeout(callback, 1000 / 60);
      };
    })(),
    start = new Date().getTime(),
    handle = {};
    function loop() {
      handle.value = requestAnimFrame(loop);
      var current = new Date().getTime(),
      delta = current - start;
      if (delta >= delay) {
        fn.call();
        start = new Date().getTime();
      }
    }
    handle.value = requestAnimFrame(loop);
    return handle;
  };

  function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

    if (arguments.length === 2) {
      x = y = 0;
      w = ctx.canvas.width;
      h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number"
      ? offsetX
      : 0.5;
    offsetY = typeof offsetY === "number"
      ? offsetY
      : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0)
      offsetX = 0;
    if (offsetY < 0)
      offsetY = 0;
    if (offsetX > 1)
      offsetX = 1;
    if (offsetY > 1)
      offsetY = 1;

    var iw = img.width,
      ih = img.height,
      r = Math.min(w / iw, h / ih),
      nw = iw * r, // new prop. width
      nh = ih * r, // new prop. height
      cx,
      cy,
      cw,
      ch,
      ar = 1;

    // decide which gap to fill
    if (nw < w)
      ar = w / nw;
    if (Math.abs(ar - 1) < 1e-14 && nh < h)
      ar = h / nh; // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0)
      cx = 0;
    if (cy < 0)
      cy = 0;
    if (cw > iw)
      cw = iw;
    if (ch > ih)
      ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
  }

  function drawBV() {
    var ctx = CANVAS_BV.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_BV.width, CANVAS_BV.height);
    if (BG_BV_READY) {
      ctx.drawImage(BG_BV, 0, 0, CANVAS_BV.width, CANVAS_BV.height);
    }
    ctx.textBaseline = "top";
    ctx.fillStyle = "#44b9ce";

    ctx.textAlign = "right";
    if (c1.data.firstName) {
      ctx.font = "bold 60px Montserrat";
      ctx.fillText(c1.data.firstName, 810, 625);
    }
    if (c1.data.lastName) {
      ctx.font = "bold 80px Montserrat";
      ctx.fillText(c1.data.lastName, 810, 693);
    }
    ctx.font = "500 32px Montserrat";
    ctx.fillText("REMPLAÇANTE", 810, 910);
    if (s1.data.firstName) {
      ctx.font = "bold 50px Montserrat";
      ctx.fillText(s1.data.firstName, 810, 957);
    }
    if (s1.data.lastName) {
      ctx.font = "bold 70px Montserrat";
      ctx.fillText(s1.data.lastName, 810, 1010);
    }

    ctx.textAlign = "left";
    if (c2.data.firstName) {
      ctx.font = "bold 60px Montserrat";
      ctx.fillText(c2.data.firstName, 938, 625);
    }
    if (c2.data.lastName) {
      ctx.font = "bold 80px Montserrat";
      ctx.fillText(c2.data.lastName, 938, 693);
    }
    ctx.font = "500 32px Montserrat";
    ctx.fillText("REMPLAÇANT", 938, 910);
    if (s2.data.firstName) {
      ctx.font = "bold 50px Montserrat";
      ctx.fillText(s2.data.firstName, 938, 957);
    }
    if (s2.data.lastName) {
      ctx.font = "bold 70px Montserrat";
      ctx.fillText(s2.data.lastName, 938, 1010);
    }

    // PREVIEW.src = CANVAS_BV.toDataURL();
    DOWNLOAD_BV.setAttribute("href", CANVAS_BV.toDataURL("image/png").replace("image/png", "image/octet-stream"));
  }

  function drawPF() {
    var ctx = CANVAS_PF.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_PF.width, CANVAS_PF.height);
    if (BG_PF_READY) {
      ctx.drawImage(BG_PF, 0, 0, CANVAS_PF.width, CANVAS_PF.height);
    }
    if (dpt) {
      ctx.textAlign = "center";
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "500 50px Montserrat";
      ctx.fillText(dpt.toUpperCase(), CANVAS_PF.width / 2, 248, CANVAS_PF.width);
    }
    if (c1.data.photo) {
      drawImageProp(ctx, c1.data.photo, 84, 273, 1232, 964);
    }
    ctx.textAlign = "right";
    if (c1.data.firstName) {
      ctx.fillStyle = "#000000";
      ctx.font = "bold 60px Montserrat";
      ctx.fillText(c1.data.firstName, 1256, 1316);
    }
    if (c1.data.lastName) {
      ctx.fillStyle = "#44b9ce";
      ctx.font = "bold 80px Montserrat";
      ctx.fillText(c1.data.lastName.toUpperCase(), 1256, 1400);
    }
    if (c1.data.profession) {
      ctx.fillStyle = "#000000";
      ctx.font = "500 50px Montserrat";
      ctx.fillText(c1.data.profession, 1256, 1490);
    }
    if (s1.data.photo) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(1189, 1753, 97, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      drawImageProp(ctx, s1.data.photo, 1092, 1656, 194, 194);
      ctx.restore();
    }
    if (s1.data.lastName || s1.data.firstName) {
      ctx.fillStyle = "#000000";
      ctx.font = "bold 50px Montserrat";
      ctx.fillText((s1.data.firstName + " " + s1.data.lastName).trim().toUpperCase(), 1068, 1740);
    }
    if (s1.data.profession) {
      ctx.fillStyle = "#000000";
      ctx.font = "500 40px Montserrat";
      ctx.fillText(s1.data.profession, 1068, 1789);
    }


    if (c2.data.photo) {
      drawImageProp(ctx, c2.data.photo, 1327, 273, 1232, 964);
    }
    ctx.textAlign = "left";
    if (c1.data.firstName) {
      ctx.fillStyle = "#000000";
      ctx.font = "bold 60px Montserrat";
      ctx.fillText(c1.data.firstName, 1386, 1316);
    }
    if (c1.data.lastName) {
      ctx.fillStyle = "#44b9ce";
      ctx.font = "bold 80px Montserrat";
      ctx.fillText(c1.data.lastName.toUpperCase(), 1386, 1400);
    }
    if (c2.data.profession) {
      ctx.fillStyle = "#000000";
      ctx.font = "500 50px Montserrat";
      ctx.fillText(c2.data.profession, 1386, 1490);
    }
    if (s2.data.photo) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(1427, 1753, 97, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      drawImageProp(ctx, s2.data.photo, 1330, 1656, 194, 194);
      ctx.restore();
    }
    if (s2.data.lastName || s2.data.firstName) {
      ctx.fillStyle = "#000000";
      ctx.font = "bold 50px Montserrat";
      ctx.fillText((s2.data.firstName + " " + s2.data.lastName).trim().toUpperCase(), 1552, 1740);
    }
    if (s1.data.profession) {
      ctx.fillStyle = "#000000";
      ctx.font = "500 40px Montserrat";
      ctx.fillText(s1.data.profession, 1552, 1789);
    }

    PREVIEW.src = CANVAS_PF.toDataURL("image/png", 0.5);
    DOWNLOAD_PF.setAttribute("href", CANVAS_PF.toDataURL("image/png").replace("image/png", "image/octet-stream"));
  }

  function updateContext() {
    drawBV();
    drawPF();
  }

  requestInterval(updateContext, 60);
});
