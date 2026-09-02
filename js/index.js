const footerElement = document.createElement('footer')
const body = document.querySelector('body'
)
body.appendChild(footerElement)
const today = new Date()
const thisYear = today.getFullYear()
const footer = document.querySelector('footer')
const copyright = document.createElement('p')
copyright.innerHTML = `&copy; ${thisYear} Tyrell Hatcher`
footer.appendChild(copyright)
const skills = ["HTML", "JavaScript", "CSS", "GitHub", "Git"]
const skillsSection = document.querySelector('#skills')
const skillsList = skillsSection.querySelector('ul')

for (const skillName of skills) {
    const skill = document.createElement('li');
    skill.innerText = skillName;
    skillsList.appendChild(skill);
}
const messageForm = document.forms['leave_message']
messageForm.addEventListener("submit", function(event){
    event.preventDefault();
    let name = event.target.usersName.value;
    let email = event.target.usersEmail.value;
    let message = event.target.usersMessage.value;
    console.log(name,email, message);
    let messageSection = document.querySelector("#messages");
    let messageList = messageSection.querySelector('ul');
    let newMessage = document.createElement('li')
    newMessage.innerHTML =
        `<a href="mailto:${email}">${name}</a>
        <span>${message}</span>`;
         messageList.appendChild(newMessage)

        let removeButton = document.createElement('button');
        removeButton.textContent = "remove";
        removeButton.type ="button";

        removeButton.addEventListener('click', function(){
            let entry = removeButton.parentNode;
            entry.remove();
        })
        newMessage.appendChild(removeButton)

    messageForm.reset();
});