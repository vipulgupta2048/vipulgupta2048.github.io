/***************************
    </> by Valentin SLD
***************************/
var before = document.getElementById("before");
var getter = document.getElementById("getter");
var pw = false;
let psw = false;
var cmd = document.getElementById("writer"); //zone d'ecriture
var textarea = document.getElementById("setter"); //textarea
var terminal = document.getElementById("terminal"); //commandes entré
var historique = []; // historique des commandes
var valueH = 0;
var frame = document.getElementsByClassName("container");
var close = document.getElementById("close");
// frame project
var back = document.getElementsByClassName("btn-back");
var project = document.getElementsByClassName("prez-2");
var projectLink = document.getElementsByClassName("btn-direction");

window.addEventListener("keyup", enterKey);
close.addEventListener("mousedown", function() {
  frame[0].classList.remove("open");
  enableProject();
  addLine("window close", "colored", 10);
});

//START
setTimeout(function() {
  boucleWrite(run, "", 120);
  //console.log(document.getElementsByClassName('animation'))
}, 7800);

//init
textarea.value = "";
cmd.innerHTML = textarea.value;

function enterKey(e) {
  if (pw) {
    let et = "*";
    let w = textarea.value.length;
    cmd.innerHTML = et.repeat(w);
    if (textarea.value === password) {
      psw = true;
      //console.log(psw)
    }

    if (psw && e.keyCode == 13) {
      boucleWrite(secret, "colored margin", 120);
      cmd.innerHTML = "";
      textarea.value = "";
      psw = false;
      pw = false;
      getter.classList.remove("password");
    } else if (e.keyCode == 13) {
      addLine("Wrong password", "error", 0);
      cmd.innerHTML = "";
      textarea.value = "";
      pw = false;
      getter.classList.remove("password");
    }
  } else {
    if (e.keyCode == 13) {
      historique.push(cmd.innerHTML);
      valueH = historique.length;
      addLine("admin> " + cmd.innerHTML, "no-animation", 0);
      testValue(cmd.innerHTML.toLowerCase());
      cmd.innerHTML = "";
      textarea.value = "";
    }
    if (e.keyCode == 38 && valueH != 0) {
      valueH -= 1;
      textarea.value = historique[valueH];
      cmd.innerHTML = textarea.value;
      //console.log(historique[valueH])
    }
    if (e.keyCode == 40 && valueH != historique.length) {
      valueH += 1;
      if (historique[valueH] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = historique[valueH];
      }
      cmd.innerHTML = textarea.value;
      //console.log(historique[valueH])
    }
  }
}

function testValue(test) {
  switch (test.toLowerCase()) {
    case "help":
      boucleWrite(help, "", 100);
      break;
    case "about":
      boucleWrite(about, "colored margin", 120);
      break;
    case "social":
      boucleWrite(social, "colored", 120);
      break;
    case "contact":
      addLine("My email :  " + email, "colored", 100);
      break;
    case "works":
      //soon
      addLine("window open", "colored", 10);
      frame[0].classList.add("open");
      console.log(frame);
      //soon
      break;
    case "credits":
      boucleWrite(credits, "colored", 120);
      break;
    case "secret":
      getter.classList.add("password");
      pw = true;
      //boucleWrite(secret, 'colored margin', 120)
      break;
    case "download":
      boucleWrite("download start in 1 s", "colored", 0);
      break;

    //social link
    case "social github":
      openTab(github, 1000);
      break;
    case "social linkedin":
      openTab(linkedin, 1000);
      break;
    case "social twitter":
      openTab(twitter, 1000);
      break;
    case "social instagram":
      openTab(instagram, 1000);
      break;
  }
}

function boucleWrite(name, classe, time) {
  name.forEach(function(item, index) {
    addLine(item, classe, index * time);
  });
}

function addLine(text, classe, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }

  setTimeout(function() {
    //txt = '<p class="'+ classe + '">' + t +'</p>'

    var txt = document.createElement("p");
    txt.innerHTML = t;
    txt.className = classe;

    before.parentNode.insertBefore(txt, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}
