let currentFace = "front",
        iteration = 0;

      fetchAdviceData().then(data => populateCard(data, currentFace));

      function handleDiceClick(e) {
        e.target.classList.remove("dice-clicked");
      }

      $(".btn-dice").on("click", function () {
        $(this)
          .find("img")
          .on("animationend", handleDiceClick)
          .addClass("dice-clicked");

        nextCard();
      });

      async function nextCard() {
        const res = await fetchAdviceData();
        currentFace = currentFace === "front" ? "back" : "front";
        iteration++;
        populateCard(res, currentFace);
        $("#card-scene").css({ transform: `rotateY(${iteration * 180}deg)` });
      }

      function fetchAdviceData() {
        return fetch("https://api.adviceslip.com/advice", {
          method: "get"
        }).then(response => response.json());
      }

      function populateCard(data, face) {
        $(face === "front" ? ".card-front" : ".card-back")
          .find(".advice-title")
          .text("Advice #" + data.slip.id)
          .end()
          .find(".advice-text")
          .text(data.slip.advice);
      }