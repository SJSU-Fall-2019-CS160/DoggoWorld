let socket = io.connect("http://localhost");
(function() {
    
    $(".send_message").click(function(e) {
        e.preventDefault();
        socket.emit("chat message", $("#message").val());
        let messages = document.getElementById("messages");
        let li = document.createElement("li");
        let span = document.createElement("span");
        messages.appendChild(li).append($("#message").val());
        messages.appendChild(span).append("by " + "Anonymous");

        $("#message").val("");
        return true;
    });
    socket.on("received", data => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        let messages = document.getElementById("messages");
        messages.appendChild(li).append(data.message);
        messages.appendChild(span).append("by " + "anonymous" + ": " + "just now");
        console.log("recieve new message!");
      });
})();

(function() {
    fetch("/chats")
      .then(data => {
        return data.json();
      })
      .then(json => {
        json.map(data => {
          let li = document.createElement("li");
          let span = document.createElement("span");
          messages.appendChild(li).append(data.message);
          messages
            .appendChild(span)
            .append("by " + data.name);
        });
      });
  })();