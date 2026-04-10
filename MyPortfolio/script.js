// load navbar
fetch("../navbar/index.html")
.then(res => res.text())
.then(data => {
    document.getElementById("navbar").innerHTML = data;

    // load navbar css
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../navbar/navbar-styles.css";
    document.head.appendChild(link);

    // load navbar script after HTML is injected
    const script = document.createElement("script");
    script.src = "../navbar/navbar.js";
    script.defer = true;
    document.body.appendChild(script);
});



// load hero
fetch("../hero-section/index.html")
.then(res => res.text())
.then(data => {
    document.getElementById("hero-section").innerHTML = data;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../hero-section/hero-section.css";
    document.head.appendChild(link);

    
});

// load about
fetch("../about-page/index.html")
.then(res => res.text())
.then(data => {
    document.getElementById("about").innerHTML = data;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../about-page/about.css";
    document.head.appendChild(link);

    
});

// load skills
fetch("../skills/index.html")
.then(res => res.text())
.then(data => {
    document.getElementById("skills").innerHTML = data;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../skills/skills.css";
    document.head.appendChild(link);

    
});


// load projects
fetch("../projects/index.html")
.then(res => res.text())
.then(data => {
    document.getElementById("projects").innerHTML = data;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../projects/project.css";
    document.head.appendChild(link);    

    
});

// load contact
fetch("../contact/index.html")
.then(res => res.text())    
.then(data => {
    document.getElementById("contact").innerHTML = data;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../contact/contact.css";
    document.head.appendChild(link) ;    

    
});

// load footer
fetch("../footer/index.html")
.then(res => res.text())
.then(data => {
    document.getElementById("footer").innerHTML = data;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../footer/footer.css";
    document.head.appendChild(link);

});