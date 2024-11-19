const output = document.getElementById('output');
const input = document.getElementById('input');
const suggestions = document.getElementById('suggestions');

// Initial Welcome Message
output.innerHTML += `
<div class="centered-content">
    <span class="title">YOUSSEF MOUATTA</span>
    <span class="subtitle">"Cybersecurity Specialist | Ethical Hacker | CTF Player"</span>
    <p>Welcome to My Portfolio website!<br>This website is built with love <3</p>
    <p>For more details about my experiences, 
  <a href="https://website.com/resume.pdf" target="_blank">download my resume</a></p>
    <p>For more info, type <span class="command">"help"</span></p>
</div>`;


const commands = {
    help: `<span class="output"><span style="font-weight: bold; font-size: 26px;">Help</span>
    <span class="output">
        <span class="command">whoami:</span> display all my information.
        <span class="command">education:</span> display all my information about my education.
        <span class="command">experiences:</span> display all my achievements in security.
        <span class="command">programming:</span> display all my achievements in programming.
        <span class="command">certifications:</span> display my certifications and achievements.
        <span class="command">interests:</span> display all my interests
        <span class="command">love:</span> are you curious about my love?
        <span class="command">contact:</span> Say hi.
        <span class="command">clear:</span> clear terminal.
        <span class="command">help:</span> display this menu.
    </span>`,
    whoami: `<span class="output"><span style="font-weight: bold; font-size: 28px;">Youssef Mouatta</span>
        I am 20 years old, from Morocco, Chtouka Ait Baha, Biougra.
        I am a self-taught cybersecurity professional with hands-on experience in penetration testing,\n\t network security, and vulnerability assessments.
        <p>For more details about my experiences,
        <a href="https://website.com/resume.pdf" target="_blank" style="color: #00ff00; font-weight: bold;">download my resume</a>.</p></span>`,
    education: `<span class="output">Education:
        - Comptia A+ (Computer Hardware)
        - CCNA, Network+
        - Networking (Packet Tracer courses)
        - Linux+
        - MCSA (Windows Active Directory)
        - Security+
        - Certified Ethical Hacker (CEH)
        - eLearnSecurity Junior Penetration Tester (eJPT)
        - Offensive Security Certified Professional (OSCP)</span>`,
    experiences: `<span class="output">Security Achievements:
        - Over 60 challenges solved on Cyber Talents.
        - Over 90 rooms completed on TryHackMe (web security, cryptography, digital forensics, etc).
        - HackTheBox rooms and OverTheWire Bandit challenges.
        - Worked on OWASP Top 10 vulnerabilities.
        - Explored vulnerable virtual machines like Mr. Robot, Metasploitable, and DVWA.
        - Extensive public speaking and presentations.</span>`,
    programming: `<span class="output">Programming Skills:
        - Proficient in Linux distributions and pentesting tools: Nmap, Burp Suite, Wireshark, Hashcat, Hydra, Metasploit.
        - Familiar with HTML/CSS/JavaScript.
        - Proficient in Python for security assessments and scripting.
        - Skilled in querying databases using SQL for security analysis and pentesting.
        - Scripting: Bash scripting and process automation.
        - Version Control: Git commands and GitHub repository management.</span>`,
    certifications: `<span class="output">Certifications and Achievements:
        <span class="command">- IBM:</span> IT Fundamentals for Everyone (Ongoing).
        <span class="command">- 365 Data Science:</span> SQL Certification.
        <span class="command">- Google:</span> The Google Cybersecurity Certificate.
        <span class="command">- LinkedIn:</span> The Cybersecurity Threat Landscape.
        <span class="command">- HP LIFE:</span> IT for Business Success, \n\n\t\t Introduction to Cybersecurity Awareness.
        <span class="command">- Cybrary:</span> Penetration Testing and Ethical Hacking Certification.
        <span class="command">- TeraCourses:</span> Python Programming Language, Bash Scripting.</span>`,
    interests: `<span class="output">Interests:
        - Chess
        - Kick-boxing
        - Soccer</span>`,
    love: `<span class="output">404 Not Found</span>`,
    contact: `<span class="output">Feel free to reach out to me:<br>
        Email: <a href="mailto:dark88lime@gmail.com" style="color: #00ff00;">dark88lime@gmail.com</a>
        GitHub: <a href="https://github.com/dark-lime-0" style="color: #00ff00;">dark-lime-0</a>
        LinkedIn: <a href="https://www.linkedin.com/in/youssef-mouatta/" style="color: #00ff00;">youssef-mouatta</a></span>`,
    clear: () => {
        output.innerHTML = ''; 
        return '';
    },
};

// Autocomplete Suggestions Logic
const commandList = Object.keys(commands);

input.addEventListener('input', function () {
    const value = input.value.trim();
    suggestions.innerHTML = ''; // Clear previous suggestions

    if (value) {
        const matches = commandList.filter(cmd => cmd.startsWith(value));
        if (matches.length > 0) {
            suggestions.style.display = 'block';
            matches.forEach(match => {
                const li = document.createElement('li');
                li.textContent = match;
                li.addEventListener('click', function () {
                    input.value = match; // Set input value to the clicked command
                    input.focus(); // Return focus to the input field
                    suggestions.style.display = 'none'; // Hide suggestions
                    input.setSelectionRange(input.value.length, input.value.length); // Set cursor at the end
                });
                suggestions.appendChild(li);
            });
        } else {
            suggestions.style.display = 'none'; // Hide suggestions if no matches
        }
    } else {
        suggestions.style.display = 'none'; // Hide suggestions if input is empty
    }
});

// Event Listener for Enter Key
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const command = input.value.trim(); // Get command
        suggestions.style.display = 'none'; // Hide suggestions on enter
        output.innerHTML += `<span class="prompt">\nroot@mouatta:~# </span><span class="command">${command}\n</span>`;

        if (command in commands) {
            const response = typeof commands[command] === 'function' ? commands[command]() : commands[command];
            output.innerHTML += `\n${response}\n`;
        } else {
            output.innerHTML += `<span class="output">${command}: command not recognized. Type "help" to see available commands.</span>\n`;
        }

        input.value = ''; // Clear input field
        output.scrollTop = output.scrollHeight; // Scroll to the bottom automatically
        
        // Refocus the input field to return cursor to the prompt
        input.focus();
    }
});
