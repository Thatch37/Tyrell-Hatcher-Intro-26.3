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