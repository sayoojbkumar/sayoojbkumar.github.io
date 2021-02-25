function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const BLACKLISTED_KEY_CODES = [ 38 ];
const COMMANDS = {
  help:
    'Supported commands: <span class="code">about</span>, <span class="code">experience</span>, <span class="code">education</span>, <span class="code">skills</span>, <span class="code">contact</span> ,<span class="code">write_ups</span> ,<span class="code">achievements</span>,<span class="code">clear</span>',
  about:
    "Hi this is Sayooj B Kumar. My field of interest is Cyber security/Web Application Security <br> Member of <a href='https://bi0s.in/'><B>team bi0s</b></a> <br> CTF player",
  skills:
    '<span class="code">Languages:</span> Python, Php, NodeJs, C, Cpp, Java, JavaScript<br><span class="code">Technologies:</span> Git, MySQL, Psql<br><span class="code">Frameworks:</span> React.js',
  education:
    "Currently : Amrita Vishwa Vidyapeetham, Amritapuri<br>B-TEC  Computer Science",
  experience: "Experience in Web Application development, Web Application Security.",
  contact:
    "You can contact me on any of following links:<br> <a href='https://twitter.com/_1nt3rc3pt0r' class='success link'>Twitter</a> ,<a href='https://github.com/sayoojbkumar' class='success link'>Github</a>",
  write_ups:"Find my small findings/write ups here: <a href='https://medium.com/@sayoojbkumar' class='success link'>Write Ups</a>",
  achievements:"<i>loading..............</i><br>",
  clear:" "
};
const COMMANDS_PHONE = {
  help:
    'Supported commands: <span class="code">about</span>, <span class="code">experience</span>, <span class="code">education</span>, <span class="code">skills</span>, <span class="code">contact</span> ,<span class="code">write_ups</span> ,<span class="code">achievements</span>,<span class="code">clear</span>',
  about:
    "Hi this is Sayooj B Kumar. My field of interest is Cyber security/Web Application Security <br> Member of <a href='https://bi0s.in/'><B>team bi0s</b></a> <br> CTF player",
  skills:
    '<span class="code">Languages:</span> Python, Php, NodeJs, C, Cpp, Java, JavaScript<br><span class="code">Technologies:</span> Git, MySQL, Psql<br><span class="code">Frameworks:</span> React.js',
  education:
    "Currently : Amrita Vishwa Vidyapeetham, Amritapuri<br>B-TEC  Computer Science",
  experience: "Experience in Web Application development, Web Application Security.",
  contact:
    "You can contact me on any of following links:<br> <a href='https://twitter.com/_1nt3rc3pt0r' class='success link'>Twitter</a> ,<a href='https://github.com/sayoojbkumar' class='success link'>Github</a>",
  write_ups:"Find my small findings/write ups here: <a href='https://medium.com/@sayoojbkumar' class='success link'>Write Ups</a>",
  achievements:"<i>loading..............</i><br>"
};
let userInput, terminalOutput;

const app = () => {
  userInput = document.getElementById("userInput");
  terminalOutput = document.getElementById("terminalOutput");
  document.getElementById("dummyKeyboard").focus();
  console.log("Application loaded");
};

const execute = function executeCommand(input) {
  let output;
  input = input.toLowerCase();
  if (input.length === 0) {
    return;
  }
  if (input=="clear") {
    window.location.reload();
  }
  output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;
  if (!COMMANDS.hasOwnProperty(input)) {
    output += `<div class="terminal-line">no such command: ${input}</div>`;
    console.log("Oops! no such command");
  } else {
    output += COMMANDS[input];
  }

  terminalOutput.innerHTML = `${
    terminalOutput.innerHTML
  }<div class="terminal-line">${output}</div>`;
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
};

var isMobile = false;
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}
console.log(isMobile);

if(isMobile){
  alert('Sorry to inform,you are currently viewing this page in smartphone 1nf0_5h311 works fine with desktop devices');
  alert('As you are using smartphone,all commands are executed in 1nf0_5h311 automatically.Feel free to scroll :P');
  for(const key in COMMANDS_PHONE){
    sleep(5000).then(() => {
      console.log(key);
      userInput = document.getElementById("userInput");
      terminalOutput = document.getElementById("terminalOutput");
      userInput.innerHTML = key;
      execute(key);
      userInput.innerHTML = "";
    });
  }
}

const key = function keyEvent(e) {
  const input = userInput.innerHTML;

  if (BLACKLISTED_KEY_CODES.includes(e.keyCode)) {
    return;
  }

  if (e.key === "Enter") {
    execute(input);
    userInput.innerHTML = "";
    return;
  }

  userInput.innerHTML = input + e.key;
};

const backspace = function backSpaceKeyEvent(e) {
  if (e.keyCode !== 8 && e.keyCode !== 46) {
    return;
  }
  userInput.innerHTML = userInput.innerHTML.slice(
    0,
    userInput.innerHTML.length - 1
  );
};

document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);
