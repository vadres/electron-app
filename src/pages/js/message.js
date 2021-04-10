const closeMessage = (id) => {
  document.getElementById(id)?.remove();
}

module.exports = {
    SUCCESS: "success",
    ERROR: "error",
    createMessage: (type, message) => {
        closeMessage("message");

        const div = document.createElement("div");
        div.id = "message";
        div.classList.add("message", type);
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