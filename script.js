const heartbeat = document.getElementById("heartbeatAudio");

function getRandomChar(isUpper) {
  const chars = isUpper ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "abcdefghijklmnopqrstuvwxyz";
  return chars[Math.floor(Math.random() * chars.length)];
}

function cipher(text) {
  if (text.length === 0) return "";
  const isUpper = text[0] === text[0].toUpperCase();
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const realChar = text[i];
    const randomChar = getRandomChar(isUpper);
    if (isUpper) {
      result += randomChar + realChar;
    } else {
      result += realChar + randomChar;
    }
  }
  return result;
}

function decipher(text) {
  if (text.length === 0) return "";
  const isUpper = text[0] === text[0].toUpperCase();
  let result = "";
  for (let i = 0; i < text.length; i += 2) {
    if (isUpper) {
      if (i + 1 < text.length) result += text[i + 1];
    } else {
      result += text[i];
    }
  }
  return result;
}

function runCipher() {
  const input = document.getElementById("inputText").value;
  const output = cipher(input);
  document.getElementById("outputText").value = output;
}

function runDecipher() {
  const input = document.getElementById("inputText").value;
  const output = decipher(input);
  document.getElementById("outputText").value = output;
}

function revealHint() {
  alert("::WARNING:: Checksum mismatch on log chain #4\nString corruption suspected.");
}

function secretMsg(id) {
  const messages = {
    1: "404: ACCESS TRACE STARTED",
    2: "memory leak from /user/system/local",
    3: "SPREAD",
    4: "signal pattern unstable",
    5: "entry denied: insufficient clearance",
    6: "fragment match: USER_A",
    7: "timestamp mismatch detected",
    8: "cipher tail looped (x12)",
    9: "terminate echo_loop? [Y/N]",
    10: "document CRC: CORRUPTED"
  };

  alert(messages[id] || "???");

  if (id === 3) {
    heartbeat.play().catch(() => {
      alert("Audio blocked by browser. Click anywhere on the page to enable sound.");
      document.body.addEventListener("click", () => {
        heartbeat.play();
      }, { once: true });
    });
  }
}
