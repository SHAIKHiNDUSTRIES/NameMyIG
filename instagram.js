		function generateUsername() {
			var words = [];
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "words.txt", false);
			xhr.onreadystatechange = function () {
				if(xhr.readyState === 4 && xhr.status === 200) {
					words = xhr.responseText.split("\n");
				}			
				var usernameElement = document.getElementById("username");
usernameElement.onclick = function() {
  document.execCommand("copy");
  alert("Username copied to clipboard!");
}
usernameElement.addEventListener("copy", function(event) {
  event.preventDefault();
  if (event.clipboardData) {
    event.clipboardData.setData("text/plain", usernameElement.textContent);
  }
});

			}
			xhr.send();

			var username = "";
			var word1 = words[Math.floor(Math.random() * words.length)];
			var word2 = words[Math.floor(Math.random() * words.length)];
			username += word1.charAt(0).toLowerCase() + word1.slice(1);
			if(Math.random() < 0.5) {
				username += word2.charAt(0).toUpperCase() + word2.slice(1);
			} else {
				username += "_" + word2.toLowerCase();
			}
			if(Math.random() < 0.3) {
				username = "." + username;
			}
			if(Math.random() < 0.3) {
				username += "_";
			}
			if(Math.random() < 0.3) {
				var num = Math.floor(Math.random() * 100);
				username = num + username;
			}
			if(Math.random() < 0.3) {
				var num = Math.floor(Math.random() * 100);
				username += num;
			}
			document.getElementById("username").innerHTML = username;
		}
		
		
		
		function addToFavorites() {
  var username = document.getElementById("username").innerHTML;
  if (localStorage.getItem("favorites")) {
    var favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!favorites.includes(username)) {
      favorites.push(username);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateFavoritesList();
    }
  } else {
    var favorites = [username];
    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavoritesList();
  }
}

function updateFavoritesList() {
  var favoritesList = document.getElementById("favorites-list");
  favoritesList.innerHTML = "";
  if (localStorage.getItem("favorites")) {
    var favorites = JSON.parse(localStorage.getItem("favorites"));
    for (var i = 0; i < favorites.length; i++) {
      var li = document.createElement("li");
      li.textContent = favorites[i];
      li.onclick = function() {
        copyUsername(this);
      };
      favoritesList.appendChild(li);
    }
  }
}

function copyUsername(li) {
  var username = li.textContent;
  var tempInput = document.createElement("input");
  tempInput.value = username;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  var copyAlert = document.getElementById("copy-alert");
  copyAlert.style.display = "block";
  setTimeout(function() {
    copyAlert.style.display = "none";
  }, 1000);
}


function clearFavorites() {
    localStorage.removeItem("favorites");
    updateFavoritesList();
}



// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("infoBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
