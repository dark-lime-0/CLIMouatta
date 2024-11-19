const output = document.getElementById('output');
const input = document.getElementById('input');
const suggestions = document.getElementById('suggestions');

// Initial Welcome Message
output.innerHTML += `<span class="output">
    <span style="font-weight: bold; font-size: 34px;">Youssef Mouatta</span><br>
    "Cybersecurity Specialist | Ethical Hacker | CTF Player"<br>
              Welcome to My Portfolio website!<br>
             This website is built with love <3
    <p>For more details about my experiences, 
        <a href="https://website.com/resume.pdf" target="_blank" style="color: #00ff00; font-weight: bold;">download my resume</a>.</p>
    For more info, type <span class="command">"help"</span>
</span>`;
const commands = {
    help: `<span class="output"><span style="font-weight: bold; font-size: 26px;">Help</span><br>
    <span class="output">
        <span class="command">whoami:</span> display all my information.<br>
        <span class="command">education:</span> display all my information about my education.<br>
        <span class="command">experiences:</span> display all my achievements in security.<br>
        <span class="command">programming:</span> display all my achievements in programming.<br>
        <span class="command">certifications:</span> display my certifications and achievements.<br>
        <span class="command">interests:</span> display all my interests.<br>
        <span class="command">love:</span> are you curious about my love?<br>
        <span class="command">contact:</span> Say hi.<br>
        <span class="command">clear:</span> clear terminal.<br>
        <span class="command">help:</span> display this menu.
    </span>`,

    whoami: `<span class="output"><span style="font-weight: bold; font-size: 26px;">Youssef Mouatta</span><br>
        I am 20 years old, from Morocco, Chtouka Ait Baha, Biougra.<br>
        I am a self-taught cybersecurity professional with hands-on experience in penetration testing, 
                  network security, and vulnerability assessments.<br>
        <p>For more details about my experiences, 
        <a href="https://website.com/resume.pdf" target="_blank" style="color: #00ff00; font-weight: bold;">download my resume</a>.</p>
    </span>`,
    education: `<span class="output">Education:<br>
        - Comptia A+ (Computer Hardware)<br>
        - CCNA, Network+<br>
        - Networking (Packet Tracer courses)<br>
        - Linux+<br>
        - MCSA (Windows Active Directory)<br>
        - Security+<br>
        - Certified Ethical Hacker (CEH)<br>
        - eLearnSecurity Junior Penetration Tester (eJPT)<br>
        - Offensive Security Certified Professional (OSCP)</span>`,
    experiences: `<span class="output">Security Achievements:<br>
        - Over 60 challenges solved on Cyber Talents.<br>
        - Over 90 rooms completed on TryHackMe (web security, cryptography, digital forensics, etc).<br>
        - HackTheBox rooms and OverTheWire Bandit challenges.<br>
        - Worked on OWASP Top 10 vulnerabilities.<br>
        - Explored vulnerable virtual machines like Mr. Robot, Metasploitable, and DVWA.<br>
        - Extensive public speaking and presentations.</span>`,
    programming: `<span class="output">Programming Skills:<br>
        - Proficient in Linux distributions and pentesting tools: Nmap, Burp Suite, Wireshark, Hashcat, Hydra, Metasploit.<br>
        - Familiar with HTML/CSS/JavaScript.<br>
        - Proficient in Python for security assessments and scripting.<br>
        - Skilled in querying databases using SQL for security analysis and pentesting.<br>
        - Scripting: Bash scripting and process automation.<br>
        - Version Control: Git commands and GitHub repository management.</span>`,
    certifications: `<span class="output">Certifications and Achievements:<br>
        - IBM: IT Fundamentals for Everyone (Ongoing).<br>
        - 365 Data Science: SQL Certification.<br>
        - Google: The Google Cybersecurity Certificate.<br>
        - LinkedIn: The Cybersecurity Threat Landscape.<br>
        - HP LIFE: IT for Business Success, Introduction to Cybersecurity Awareness.<br>
        - Cybrary: Penetration Testing and Ethical Hacking Certification.<br>
        - TeraCourses: Python Programming Language, Bash Scripting.</span>`,
    interests: `<span class="output">Interests:<br>
        - Chess<br>
        - Soccer<br>
        - Kick-boxing</span>`,
    love: `<span class="output">404 Not Found</span>`,
    contact: `<span class="output">Feel free to reach out to me:<br>
        Email: <a href="mailto:dark88lime@gmail.com" style="color: #00ff00;">dark88lime@gmail.com</a><br>
        GitHub: <a href="https://github.com/dark-lime-0" style="color: #00ff00;">dark-lime-0</a><br>
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
        output.innerHTML += `<span class="prompt">root@mouatta:~# </span>${command}\n`;

        if (command in commands) {
            const response = typeof commands[command] === 'function' ? commands[command]() : commands[command];
            output.innerHTML += `${response}\n`;
        } else {
            output.innerHTML += `<span class="output">${command}: command not found. Type "help" to see available commands.</span>\n`;
        }

        input.value = ''; // Clear input field
        output.scrollTop = output.scrollHeight; // Scroll to the bottom
        input.focus(); // Keep focus on input for continuous typing
    }
});
