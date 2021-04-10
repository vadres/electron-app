const closeMessage = (id) => {
  return new Promise(function(resolve, reject) {
    document.getElementById(id)?.classList.add("fadeOut");
    setTimeout(() => resolve(document.getElementById(id)?.remove()), 400);
  })
}

module.exports = {
    SUCCESS: "success",
    ERROR: "error",
    createMessage: async (type, message) => {
        await closeMessage("message");

        const div = document.createElement("div");
        div.id = "message";
        div.classList.add("message", "fadeIn", type);
        div.innerHTML = message;
                
        const close = document.createElement("a");
        close.href = "#";
        close.classList.add("mclose");
        close.innerHTML = "✖";
        close.onclick = () => closeMessage("message");

        div.appendChild(close);
                
        document.body.appendChild(div);
    }
}