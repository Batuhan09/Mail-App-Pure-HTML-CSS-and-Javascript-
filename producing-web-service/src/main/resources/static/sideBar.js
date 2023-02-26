if(localStorage.length == 0){
    alert("not logged in Redirected to main page");
    window.location.assign('http://localhost:8080/index.html')
}
console.log("localStorage",localStorage);
const username = localStorage.getItem("username");
const password = localStorage.getItem("password");
const role = localStorage.getItem("role");
if(role === "admin"){
    document.getElementById("sidebar").innerHTML +=
        "<a id=\"profile\" href='profile.html'>Profile</a><br>" +
        "<a id=\"sendMessage\" href='sendMessage.html'>Send Message</a><br>" +
        "<a id=\"viewAllUsers\" href='viewAllUsers.html'>View All Users</a><br>" +
        "<div class=\"dropdown\">\n" +
        "  <a>View Messages ></a>\n" +
        "  <div class=\"dropdown-content\">\n" +
        "  <a id=\"inbox\" href='inbox.html'>INBOX</a>\n" +
        "  <a id=\"outbox\" href='outbox.html' >OUTBOX</a>\n"+
        "  </div>\n" +
        "</div><br>\n"+
        "<a id=\"addUser\" href='addUser.html' click='addHTMLForAddUser()'>Add User</a><br>"+
        "<a id=\"updateUser\" href='updateUser.html'>Update User</a><br>";
}
else{
    document.getElementById("sidebar").innerHTML +=
        "<a id=\"profile\" href='profile.html' className=\"w3-bar-item w3-button w3-padding-24\">Profile</a><br>" +
        "<a id=\"sendMessage\" classname=\"w3-bar-item w3-button w3-padding-24\"href='sendMessage.html'>Send Message</a><br>" +
        "<a id=\"viewAllUsers\" href='viewAllUsers.html' classname=\"w3-bar-item w3-button w3-padding-24\" >View All Users</a><br>" +
        "<div class=\"dropdown\">\n" +
        "  <a>View Messages ></a>\n" +
        "  <div class=\"dropdown-content\">\n" +
        "  <a id=\"inbox\" href='inbox.html'>INBOX</a>\n" +
        "  <a id=\"outbox\" href='outbox.html' >OUTBOX</a>\n"+
        "  </div>\n" +
        "</div>";
}



