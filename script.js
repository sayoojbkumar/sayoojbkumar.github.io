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
