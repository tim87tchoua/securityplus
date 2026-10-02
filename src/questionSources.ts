export const questionSources: Record<number, string> = {
  1: `Question1

A digital forensics team is investigating an incident at a crime scene. They are currently implementing integrity to ensure the collected data is not tampered or modified. Which of the following BEST describes this digital forensics phase?

Tabletop exercise, reporting, preservation, or acquisition?

The correct answer is the preservation phase because when we're talking about the integrity aspect of digital forensics, or even in general, it's most commonly associated with file hashing to ensure that hashes are not changed or modified. And this is what happens in the second phase of the digital forensics process. Then once we collect the data (in the first phase), we want to ensure that data is not tampered, modified with, or altered in any way when it's data at rest, when it's being sedentary, and that's why we use integrity in the preservation phase.

**Wrong answer**

The acquisition phase is the first when we collect the data.

The very last phase of digital forensics is the reporting phase, whereby we generate a report, a file, which contains things like which tools did we use to recover data that was there, who was involved at the crime scene, and so on.

A tabletop exercise has not much to do with digital forensics. A tabletop exercise involves discussing a potential incident response scenario, a hypothetical one, whereby individuals will gather around at a table to discuss this, but it is not associated with things like implementing integrity at the digital forensics process.`,
  2: `Question2

A software company's monitoring systems has recently noticed suspicious individuals surrounding the facility at night. The company desires preventive and deterrent controls to stop such incidents from reoccurring.

Which of the following should they MOST likely implement? (Choose two)

Lighting, bollard, security guard, fencing, or video surveillance.

The correct answers are security guard and fencing because these are the most optimal controls that can be implemented in this case, especially since these are both considered simultaneously deterrent and preventive controls. (A security guard is both a deterrent, and a preventive control, and they could indeed prevent individuals from surrounding this facility).

Lighting is a deterrent control, but it is not a preventive control.

A bollard is a preventive control, but first of all, not so much a deterrent, and second of all, it's only used to stop large vehicles or cars from bashing through the organization, but it can prevent individuals from surrounding the facility.

Video surveillance is CCTV cameras, and while it is a deterrent control and a detective control, it is not a preventive control, and as such it can't block or stop anyone from performing certain actions. It can only detect or notify the administrator of that system if someone does get into close proximity with that facility.`,
  3: `Question3

A nation state threat actor is performing port and vulnerability scanning against a company network. The company IPS systems detected and blocked the scans in real time.

Which of the following did the attacker MOST likely attempt?

Passive reconnaissance, known environment, active reconnaissance, or physical penetration test?

The correct answer is active reconnaissance because this involves gathering information on a company or individual (more meticulous details on exactly what is running on that company network) while directly interacting with the target systems.

**Wrong answer**

Passive reconnaissance involves doing things like OSINT or open-source intelligence whereby you look on search engines, you use social media sites, you gather information that's publicly available, but you do not interact with any of the company's systems in the passive reconnaissance process.

A known environment in terms of penetration testing describes when the penetration tester has the full details of exactly several details about what's happening on the network. They know the network layout, they know the credentials used to log in, they know the applications installed on company devices, they know the internal website IP addresses. They know all this information as opposed to if you did not know this information, that would be considered an unknown test, an unknown environment, or a black box test.

A physical penetration test involves physically dressing up as an employee or someone in the company, disguising yourself, and attempting to infiltrate the company physically in person to achieve a desired state such as exfiltrating company data. And if you successfully achieve that goal, then that would be the end of the physical penetration test.`,
  4: `Question4

A penetration tester is performing a thorough vulnerability scan against the company network. The results indicate that port 445 is open, many systems use default credentials, and all systems are unpatched.

Which of the following vulnerabilities is MOST likely to be exploited?

Virus, keylogger, worm, or rootkit?

The correct answer is a worm because we're talking about specifically malware that does not require any sort of user intervention to function or to replicate across a network, or better yet, come from the internet to exploit systems and enter a company. Because typically, especially when we're talking about port 445, that is a very specific port number, and that is because I was indicating that this is associated with the WannaCry ransomware worm, which is associated with the EternalBlue vulnerability, and this is absolutely essential to know for your exam, so you better understand this, that port 445 is associated with the WannaCry ransomware worm because this worm is known to infamously exploit this open port alongside potentially things like default credentials or unpatched systems. At least worms in general are known to exploit these vulnerabilities.

**Wrong answer**

A rootkit is a piece of malware that's also very sophisticated that operates at the kernel level of the operating system, this attempt to effectively evade antivirus detection.

A keylogger can either be a physical device you plug into your laptop, but it can also be a piece of software that is installed on the device, and what it'll do is that it'll automatically track all the keys that you type on your keyboard and send those directly to the attacker, whoever installed this malware to begin with.

A virus is a piece of malware that does require user intervention to replicate and to execute because how it works is that a virus attaches itself to a program, and it can only be run once the user double-clicks and runs that program, which will in consequence run that virus alongside it.`,
  5: `Question5

An attacker is attempting to access files outside the web root of an e-commerce website. Security logs indicate that the attacker is using the ../ sequence to navigate restricted areas.

Which of the following attacks is being described?

DNS attack, buffer overflow, privilege escalation, or directory traversal?

The correct answer is directory traversal because this is when an attacker attempts to view files and directories that are restricted and they should not be able to view or access under normal conditions. And they would typically use this ../ parameter or sequence to do this. So how this would work in a real-world scenario is that you would have the official website name, say example.com, but if an attacker wanted to view some sort of specific file, they could use the ../ parameter, say seven or eight times, and on that eighth time, they would do / and then a specific directory in an attempt to be able to access that particular file or directory.

**Wrong answer**

Privilege escalation, the act of first of all exploiting a vulnerability which would allow you to have higher level privileges on a system than you would normally have if you had not exploited this vulnerability. So for example, if you manage to successfully exploit a privilege escalation vulnerability on Windows, you could gain potentially administrator level access for your own account, or if you're doing this on Linux, you could gain a root level access as your account on that system.

A buffer overflow is when you override an area of memory with so much data that it simply spills into the next area of memory, this causing a DDoS or a distributed denial of service attack to that system.

A DNS attack is a domain name system attack. This is a broad term, but it describes something like DNS poisoning whereby the attacker will make it so that any website you enter, the associated IP address with that website will be changed and will automatically redirect users to the attacker's website as opposed to the official website that you were attempting to visit.`,
  6: `Question6

An attacker has successfully exploited a zero-day vulnerability in a SQL database software. When attempting to view stored passwords, they discover that all data is obscured with asterisks and false information.

Which of the following is most likely being used in the database?

Tokenization, hashing, masking, or salting?

The correct answer is data masking because this involves using asterisks or substitutes in the place of real data. Instead, you're using these asterisks or this false data, making it so that if an attacker were to gain access to this database, it would all be useless, illegitimate data because it's obscured or it's simply false data to begin with, so they would not be able to use any of that data to their advantage.

**Wrong answer**

Hashing is the act of using a one-way mathematical function or algorithm that is not reversible to increase the security of your passwords in your databases. So how this will work is that you would put your passwords through a hashing algorithm such as SHA-256 or MD5, which would generate this very long string of text so that the attacker would first have to manually crack that hash before they'll be able to view what the password originally was.

Tokenization is the act of using a one-time token, which is a surrogate value, a non-sensitive placeholder in the place of real, legitimate data.

Salting is the process of adding alphanumeric characters, so things like letters or numbers, to a password before you actually hash it so that when you do hash it, it is that much more random of a hash than if you had not salted that password hash.`,
  7: `Question7

A cybersecurity firm discovers that it purchased counterfeit network routers from a third-party organization. The routers were substituted for legitimate equipment before reaching the company.

Which of the following is MOST likely being described?

Vulnerable software, Typosquatting, supply chain and Pretexting?

The correct answer is the supply chain because this describes the third-party hardware or software vendors whereby, they were compromised at that stage long before you ever brought that software or hardware into your company. Because if it was already compromised at that stage, say it was infected with some sort of malware, well, by the time that you bring it into your company, you're already infected as well.

**Wrong answer**

Vulnerable software describes any sort of software that is vulnerable to security exploits that has not been patched or updated.

Typosquatting, the act of an attacker creating a domain name that is very similar to an official legitimate domain, but there's a tiny difference in the actual URL bar itself, making it so that a user could accidentally enter in the incorrect address bar into their website bar and then hit enter and then go to some random malicious website as opposed to going to the official website. So probably the most popular example of this ever occurring is if you have google.com, the official website, well, an attacker was smart enough to think, well, I'm going to register the domain name of goggle.com so that users could accidentally type that into their web browser and then I can infect their users with malware.

Pretexting is the act of creating a made-up or fictional scenario and is used in conjunction with something like phishing or smishing to better entice users into revealing their personal details.`,
  8: `Question8

A systems administrator performed a full-scale vulnerability scan across network devices. It was discovered that several devices contained critically rated vulnerabilities with an 8/10 severity score. The administrator quickly prioritizes and patches systems according to their importance level.

Which of the following best describes this scenario?

Dark web, false positive, CVE, CVSS?

The correct answer is CVSS, or the Common Vulnerability Scoring System, because whenever you see things like a severity score rating and the prioritization, patching, and remediation of your vulnerabilities accordingly, this is associated with CVSS, or the Common Vulnerability Scoring System. In this case, we're talking about an eight out of ten severity score, and this is always associated with CVSS, and this concept is absolutely essential to know for your exam.

**Wrong answer**

CVE is Common Vulnerabilities and Exposures. This is both a website that you can visit that has a brief list of vulnerabilities, but it is not associated with things like severity score ratings or the prioritization, remediation, and patching of your most critical vulnerabilities first and foremost.

A false positive is when you perform some sort of vulnerability scan and it detects some sort of vulnerability as being present or some sort of malware, if it's antivirus software, but in reality, upon further inspection, you see that what it detected is not actually there or it's not actually what it thought it was. It's a false positive, it's not legit.

The dark web is the onion router, or Tor. This is where you can access a lot of hidden services, but that's not what we're talking about in this question.`,
  9: `Question9

An organization is using facial recognition, smart cards, and fingerprint identification to authenticate employees.

Which of the following would add an additional authentication factor to their current setup?

Iris scan, hard authentication token, password, mobile phone with one-time SMS code.

The correct answer is a password because this is considered something you know (And other examples of something you know are things like usernames, security questions, passwords, and PINs.). It's a piece of information that only certain individuals would possess. If we take a look at what they're currently using in the question, they're already using facial recognition, which is considered something you are, it's a biometric, and here we're also using iris scan, which is considered something you are, a biometric once more, so it's not the correct answer.

**Wrong answer**

Smart cards is considered something you have, and this is something that you hold, your physical possession in your environment.

A mobile phone with one-time SMS code is considered something you have, not something you know, so this is also the incorrect answer.

Iris scan is considered a biometric once more, something you are, it's part of your body that's used to uniquely identify you, so that is also the incorrect answer here.

A hardware authentication token is also considered something you have, and we're already using smart cards, which is considered something you have, so the only correct answer here is a password.`,
  10: `Question10

A database administrator intends on heavily safeguarding stored passwords. They mandate that every password have random alphanumeric characters added before using a one-way, fixed-length algorithm.

Which of the following are they MOST likely using?

Obfuscation, escrow, salting, or hashing?

The correct answer is salting because this is the process of adding random characters, so things like alphanumeric characters, letters, and numbers, to a password before you actually hash that password.

**Wrong answer**

Hashing is the act of using a one-way, non-reversible mathematical algorithm.

Escrow is when you provide your private keys to some sort of third-party entity so that if you ever lose access to your private keys, which would be used to decrypt your data, a third-party entity could come in and decrypt your data so that you would then be able to access your data once more.

Obfuscation is commonly used in things like application development whereby you don't want your application source code to be reverse-engineered or discovered by individuals, so you perform obfuscation, which makes your code that much more difficult to read, making it nearly impossible at times for any individual to see what the code actually was.`,
  11: `Question11

A company employee received multiple text messages from an unknown number claiming to be from the organization's help desk. Each message contains an embedded link to a third-party website. Further verification revealed that the messages were fraudulent.

Which of the following attacks is MOST likely occurring?

Impersonation, phishing, vishing, smishing.

The correct answer is smishing because this is phishing that happens over text, or SMS phishing, whereby you receive either one or multiple malicious text messages which contain an embedded link to some sort of third-party website whereby it could ask you to enter in your login details so that you would have your information stolen and that would be sent to the attacker.

**Wrong answer**

Vishing is voice phishing, it's phishing that happens over the phone whereby the attacker attempts to get users to reveal their personal details over a phone call.

Phishing is the act of getting users to reveal or divulge their personal information to the attacker, but phishing typically happens over email.

Impersonation is the act of claiming or pretending to be someone that you're not in order to perform additional malicious functions, and while in this case we're talking about someone who claimed to be from the organization's help desk.`,
  12: `Question12

The incident response team has been notified after a recent malware infection occurred on the company network. They're currently using the organization's offsite backups to restore systems to their prior state before the infection took place.

Which of the following BEST describes the current incident response phase?

Containment, lessons learned, recovery, or eradication?

The correct answer is the recovery phase because this involves using backups to restore your systems to their previous state before you were ever infected with this malware in the first place, and this is a corrective control whereby you attempt to reverse the impact of the event after the event actually occurs.

**Wrong answer**

The eradication phase involves manually eradicating or removing the malware that's been installed on those systems using specialized antivirus software or tools.

The containment phase involves isolating or quarantining the infected systems so that the malware doesn't spread to other devices in the company.

The lessons learned phase involves taking a look at what was done well in the incident response process, what could be improved upon next time, and how do we actually prevent such incidents from occurring in the future.`,
  13: `Question13

A company network router has failed and is acting as a single point of failure. The IT department has been tasked with estimating the average amount of time it will take to restore the device to full functionality.

Which of the following is being described?

RPO, MTBF, RTO, or MTTR?

The correct answer is MTTR, or mean time to repair, because this describes the average amount of time it's going to take to repair or restore a device that has failed to full functionality.

**Wrong answer**

MTBF or mean time between failures describes the average amount of time that a device is expected to remain operational before it's going to fail.

RTO or recovery time objective is the maximum amount of acceptable downtime that an organization is willing to tolerate for an incident or a failed device.

RPO or recovery point objective is the maximum amount of data loss that a company is willing to tolerate after a security incident has occurred.`,
  14: `Question14

A hardware startup has been experiencing multiple DDoS attacks on their public web servers, resulting in resource inaccessibility for paying customers.

Which of the following should the startup MOST likely implement?

Load balancing, platform diversity, uninterruptible power supply, or generator?

The correct answer is load balancing because this is when you install multiple load balancers on the back end of web servers to provide you with a more evenly distributed load of traffic across those servers so that, especially in the event of something like a DDoS attack, you can hopefully have high availability for your users who are attempting to access websites and access data on those systems. Here we're specifically talking about a company experiencing multiple DDoS attacks on their web servers and WAF being used to provide high availability for their customers. This is the concept of load balancing to evenly distribute the load between multiple servers in the event of such an attack.

**Wrong answer**

Platform diversity is the act of implementing several different software or hardware vendors for a particular system in your company because, especially for something like a zero-day vulnerability, if an attacker manages to successfully exploit a vulnerability in one of those software or hardware vendors, if you have several different vendors, then they can't both be simultaneously vulnerable to the same zero-day exploit typically. So, you have this added layer of defense, this defense in depth going on, so that they would not be able to get past both layers if they manage to exploit one of them because you're implementing this platform diversity.

An uninterruptible power supply or a UPS is a device whereby when the primary power source fails in the company, this device will come online to provide your systems with temporary power so that your systems aren't abruptly shut down and lose any data. All your data will be safeguarded because your devices will not be abruptly shut down once the UPS comes online.

A generator is a very large device that can take several minutes to come online, but it can provide you with a lot more power than a simple UPS can.`,
  15: `Question15

A software developer wants customers to be able to verify that an application came from the legitimate developer and that the application has not been modified since its release.

Which of the following should the developer MOST likely use?

RADIUS, sandboxing, input validation, code signing.

The correct answer is code signing because this would allow the user to be able to verify that the software actually came from the original legitimate developer and that it's not some scam software that didn't actually come from them. We have their unique digital signatures whenever the company performs the concept of code signing, which is indeed adding their unique digital signatures to the file so that we can verify it actually came from them.

**Wrong answer**

Input validation is a very good security practice whereby you ensure that certain characters cannot be entered into web or comment forms, so things like apostrophes or dollar signs or hashtags cannot be entered into any form in the first place.

Sandboxing, the act of having a test isolated environment whereby you can do things like launch malware, test applications before launching them into a production environment.

RADIUS is remote authentication dial-in user service. This is an authentication network protocol that is on networks to ensure that employees who authenticate are indeed legitimate and belong to the company.`,
}

function normalizeQuestionSource(raw: string) {
  return raw
    .replace(/\*\*/g, "")
    .replace(/\r/g, "")
    .replace(/^Question\s*\d+\s*/i, "").replace(/^Q\d+\s*[-.]\s*/i, "")
    .replace(/^\s*(?:\d{1,2})\s*$/gm, "")
    .replace(/^\s*Detail\s*$/gim, "")
    .replace(/^\s*Definition of the rest\s*$/gim, "")
    .split(/\n\s*\n/)
    .map((section) => section.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n\n")
}

export function getOriginalQuestionPresentation(questionId: number) {
  const source = normalizeQuestionSource(questionSources[questionId] ?? "")
  const sections = source.split(/\n\s*\n/).map((section) => section.trim()).filter(Boolean)
  const stem = sections[0]?.replace(/^Question\s*(\d+)\b/i, "$1").replace(/^Q(\d+)[.-]\s*/i, "$1").trim() ?? ""
  const questionLine = sections[1] ?? ""
  const choiceLine = sections[2] ?? ""
  const options = choiceLine
    .replace(/[?.!]+$/, "")
    .split(/,\s*/)
    .map((option) => option.replace(/^(?:or|and)\s+/i, "").trim())
    .filter(Boolean)

  if (options.length === 3 && /\s+and\s+/i.test(options[2])) {
    const lastOptions = options[2].split(/\s+and\s+/i)
    options.splice(2, 1, ...lastOptions)
  }

  return {
    prompt: [stem, questionLine].filter(Boolean).join("\n\n"),
    options,
  }
}

Object.assign(questionSources, {
  16: `Question16

An employee is preparing a storage drive for reuse and wants to ensure that sensitive data previously stored on the device cannot be recovered even with specialized software.

Which of the following should the employee MOST likely request?

Data retention, certification, sanitization, or destruction?

The correct answer is data sanitization because this is the process of using specialized software to ensure that data cannot be recovered from that drive under any circumstances. You can be rest assured that no one's ever going to recover any of that data.

**Wrong answer**

Destruction is the process which is physically use to destroy the drive with something like a hammer or a shredder just to double check and ensure that no one can ever recover this data.

Certification is an actual file or certificate that a third-party company would provide you after the fact as proof that they indeed did what they said they would, which is sanitizing the drive and physically destroying the drive and providing the certification as proof that they did what they claimed they did.

Data retention is the concept of a law that states that you have to retain or store data on a device in a company for a set period of time before you are allowed to delete it. So, for example, you can have a law or a policy which dictates in the company that all emails must be stored for a period of one year, but after that one-year period, you are allowed to delete as many emails as you want.`,
  17: `Question17

A security company intends on installing CCTV video surveillance and sensors to monitor the actions of potential intruders. The company does not have the required budget to install additional security features.

Which of the following BEST describes the control type in use?

Corrective, compensating, detective, or preventative?

The correct answer is detective because video surveillance and sensors are both considered primarily detective controls and deterrent controls as a secondary control, but that was not any of the options here. The only one that they are is a detective control because they could, for example, alert the administrator of a system in real time after someone gets into close proximity with that sensor, or if we're talking about video surveillance, it would record that footage so that we can review the video after the fact to see who was actually there. A detective control performs some sort of action after the event actually occurs, but it can't actually prevent or stop anything.

**Wrong answer**

Examples of preventative controls are things like security guards, bollards, fencing, access control vestibules, and so on.

Corrective control attempts to reverse the impact of an event after the event actually occurs. So, if there is a company that was affected by a ransomware incident using backups to restore your systems to a previous state is an example of a corrective control because you're trying to get back to what you had initially before you were ever infected with that malware.

A compensating control, a control type that comes into play when the primary control fails and you're forced to use something that is suboptimal, that's temporary, but it's the best thing you can do at the moment.`,
  18: `Question18

A cybersecurity company recently experienced suspicious activity on their systems. The file owner dictates which resources can be accessed by users on the system.

Which of the following access control methods is MOST likely being used?

Mandatory, role-based, discretionary, or rule-based?

The correct answer is discretionary access control, or DAC, whereby the file owner, the person who created the files in the system, dictates which files are deleted, which files are kept, and who has access to view which files in the system. It's exactly what I'm using, and it's probably what you're using if you're not in an organization. If you're using a personal device, whereby you decide which files are kept, so you decide who has access to which files, of course. It's only logical.

**Wrong answer**

Mandatory access control, or MAC, is when you have the IT administrator of the system, typically, who manages access to files in the system, not the file owner, because the IT administrator will assign these things known as security labels or security clearances to literally everything in the company. All resources, files, and users are assigned these security labels to ensure that they only have the necessary access to access certain files and not access every file. So, for example, if you did want a user to be able to access a file, you would set the user's security clearance as being secret, and you would set the file's security clearance as being top secret so that they do not have the necessary rights to access that file. But if you did want them to access a particular file, you would set the file as being secret and the user as being top secret, or better yet, the file and the user both having the security label as secret so that they can both access that file.

Role-based access control is an access control implementation whereby you only have access to files and folders based on what your actual job or role is in the company.

Rule-based access control is things like DLPs, data loss prevention systems, firewalls, IPS (intrusion prevention systems), which all use rules, which are the security configuration files that dictate what they should block or do in that company, which files should the DLP will search for and block in real time before it be transferred outside the network, what signatures should the antivirus software or IPS look for, or what rules should the firewall look at to know what to block in real time, and so on.`,
  19: `Question19

An application developer is using input validation to protect against cross-site scripting and SQL injection-based attacks. The developer desires further protection to ensure the safety of customer data.

Which of the following should they MOST likely implement?

WAF, IDS, UTM, or WPA3?

The correct answer is WAF, or web application firewall, because this is software that can be installed on the backend of web servers to block in real time web threats such as cross-site scripting, SQL injection, and buffer overflows. And combining this with input validation is a very good security practice because they go well together.

**Wrong answer**

IDS is a detection system, it can only detect threats, malware-based threats, but it can't actually prevent threats, especially web-based threats.

UTM is a unified threat management system whereby it is an all-in-one encompassing device. It includes things like spam filtering, content filtering, antivirus software, and some things like stateful firewalls, but a lot of times it does not include web application firewalls.

WPA3 is Wi-Fi Protected Access version 3. This is an encryption standard that's used on wireless networks on routers to ensure that no one can brute force the password of that system.`,
  20: `Question20

A security administrator is concerned about potential on-path attacks which could result in data leakage. The administrator is installing VPN software on company systems to provide end-to-end encrypted tunnels between endpoints.

Which of the following is MOST associated with this process?

Non-repudiation, Availability, Integrity, confidentiality.

And the correct answer is confidentiality because this is the concept of ensuring that data is not viewable or accessible by unauthorized users who shouldn't be viewing that data, because VPNs, or virtual private networks, provide this end-to-end encrypted tunnel between endpoints or between devices whereby they use confidentiality alongside their encryption to ensure that no one can view that encrypted data except for the authorized users who have the appropriate private and public keys.

Integrity is the concept of ensuring that data is not tampered or modified with, is commonly associated with file hashes.

Availability, from the CIA triad, ensures high system uptime for your resources, your users, and for your services in general to ensure that, especially in the event of something like a DDoS attack whereby there is a ton of traffic going to a web server, your load balancers would be able to handle that load and that users would be able to access those web services even in those times.

Non-repudiation, the concept of someone being unable to deny they performed a specific function because we have proof that they did perform that function. So, if someone is trying to deny they sent an email, well, we have the proof that it's their own unique digital signature that's installed in their email, so they can't deny that they performed that function because we have this proof.`,
  21: `Question21

A company network administrator recently experienced several unexpected system shutdowns which resulted in data loss. The administrator desires a short-term solution that will provide devices with a graceful shutdown.

Which of the following technologies should the admin MOST likely implement?

UPS, TLS, generator, or jump server?

And the correct answer is UPS, or an uninterruptible power supply, because this is a device that will provide your systems with some short-term temporary power so that they can have a graceful shutdown. And what that means is that they can have an appropriate shutdown instead of an abrupt one whereby there could be potential data loss if systems are abruptly shut down all of the sudden when the power is pulled.

TLS is transport layer security. This is used on HTTPS, or hypertext transfer protocol secure websites, which run on port 443 to provide you with this encryption.

A generator is a very large device that can take several minutes to come online, but it can provide your systems with potential hours or days of power in the event that the primary power source fails, but it's not allowed for a short-term solution or a graceful shutdown because it would take several minutes to come online, so the data would be lost regardless.

A jump server is a hardened device whereby if you manage to successfully authenticate and connect to this one device, that one device would allow you to gain access to a multitude of internal devices in the company, so this can be a very good thing but also a very bad thing in potential scenarios because if the attacker manages to connect to this device, now the attacker has access to a myriad of systems in the network.`,
  22: `Question22

A help desk technician is determining the average amount of time that a Linux system will run for before failing.

Which of the following are they MOST likely calculating?

RTO, RPO, MTBF, or MTTR.

The correct answer is MTBF because this is mean time between failures. This is the average amount of time that a device will run for before it's expected to fail.

**Wrong answer**

MTTR, mean time to repair, the average amount of time that it's going to take a technician to repair a broken network device and bring it back online.

RTO, recovery time objective, the maximum amount of downtime that a company is willing to accept for a particular failed device.

RPO, recovery point objective, the maximum amount of data loss that a company is willing to tolerate in the event that something fails.`,
  23: `Question23

An organization desires increased security through the use of an additional authentication factor. Their current setup involves using iris scans, smart cards, and hardware authentication tokens.

Which of the following should they MOST likely implement?

Facial recognition, fingerprint identification, mobile phone with one-time passcode, or PIN.

The correct answer is PIN because they're already using iris scans, which are considered biometrics, they're considered something you are, and here facial recognition and fingerprint identification are both considered biometrics or something you are. Smart cards and hardware authentication tokens and mobile phones with one-time codes are all considered something you have because it's an object that you hold in your possession, whereas a PIN is the only one they're not using. They're not using the concept of something you know. Other examples of something you know are passwords, usernames, and security questions.`,
  24: `Question24

An organized crime threat group has infiltrated a company network, and begun to install malware on systems, which resulted in files having the .aaa extension.

Which of the following was MOST likely their motivation?

Financial gain, philosophical/political beliefs, espionage, or blackmail?

The correct answer is financial gain because in this case we're talking about installing ransomware specifically on company devices, which would result in the files having a specific file extension because they have encrypted files which are inaccessible to the users, and this is why the primary motivation is financial gain because the gang will demand payment for access to the private key to decrypt the company's files.

**Wrong answer**

Philosophical/political beliefs is the primary motivation for hacktivists whereby they'll attempt to promote or propagate their philosophical or political message or belief.

Espionage, the main motivator for nation-state hackers,

Blackmail, the main motivation for insider threats at a company.`,
  25: `Question25

An employee visits the company portal and is given the option to authenticate using existing credentials from a trusted third-party identity provider.

Which of the following is most likely being used?

Federation, least privilege, single sign-on, or OAuth.

The correct answer is federation because this involves someone authenticating to their current website using existing credentials from a third-party trusted identity provider.

**Wrong answer**

Single sign-on, or SSO, when you use a single set of credentials to access multiple services at a company.

Least privilege, the concept of ensuring that users don't have excessive rights or permissions beyond what's needed to perform their job or their role in the organization.

OAuth, open authentication, is when you're using some sort of third-party app and then that app requests access to move forward with whatever you're trying to accomplish with the application.`,
  26: `Question26

The incident response team was recently called to resolve a company-wide malware incident. They are currently performing a root cause analysis to ensure that such events do not happen in the future.

Which of the following BEST describes the current incident response phase?

Lessons learned, eradication, containment, or recovery?

The correct answer is lessons learned because this is the very last phase of incident response whereby you take a look at what was done well, what could be improved upon next time, and how did the attacker actually manage to infiltrate the company systems in the first place, and this is where this root cause analysis takes place.

**Wrong answer**

Eradication, the phase which involves eradicating or erasing the malware that's been installed on the systems using specialized antivirus software.

Containment, actually quarantining or isolating the infected systems so that the malware that's installed on those systems does not spread to all the other devices in the company.

Recovery, the incident response phase which involves using backups to restore your systems to their previous state, and this is considered a corrective control.`,
  27: `Question27

Several individuals have been logging into a single employee's corporate account from remote locations. The security administrator determined that logins in such a short time span from various countries is unreasonable.

Which of the following did the administrator MOST likely detect?

Brute force, impossible travel, spraying, or concurrent session usage.

The correct answer is impossible travel because this is when you have several users logging in to a single user account within a time span that is so unreasonable and from completely different countries. So how this would work is that you could have one user log in from Canada at 9:00 a.m. and then have a secondary user log in 5 minutes later from China, and you know that it's impossible to go from one country to another like that within a 5-minute time span, and this is the concept of impossible travel.

**Wrong answer**

Concurrent session usage is not associated with things like time spans or the specific country or location they're logging in from. It's just the concept that you have several users logging into a single account simultaneously.

Password brute forcing is the concept of trying endless passwords against a single user account.

Password spraying, the act of using a handful of different passwords against a multitude of user accounts in attempt that they would eventually be able to find a user account that used their password.`,
  28: `Question28

Ethical hackers are discussing a program which involves companies compensating individuals based on the total amount of vulnerabilities detected.

Which of the following is the hacker MOST likely referring to?

Bug bounty program, penetration test, Open Source Intelligence or OSINT, Threat hunting.

The correct answer is bug bounty program because this is a program whereby ethical hackers will hack on a company's platform or website and they'll be provided with a list of attacks that they can and cannot perform and they are paid or compensated solely based on the vulnerabilities detected and reported.

**Wrong answer**

Penetration test, this is an actual full-time job and while bug bounty programs can also be a full-time job, in most cases they're not, they're just a side hobby. Penetration testing is a full-time job whereby you do a multitude of things, not just detecting vulnerabilities. You're paid based on the reports you generate. You're paid on things like what recommendations did you provide the company after you've detected some sort of misconfiguration. You're paid on a multitude of different things, not just the vulnerabilities that you detected because in penetration testing you perform things like vulnerability scans, you exploit vulnerabilities, you do all this extra stuff that you would not do in a bug bounty program.

Open source intelligence or OSINT, the concept of looking at publicly available sources, so things like search engines or social media websites, to gather information on a company or on an individual.

Threat hunting, the concept of proactively searching for real-time threats maybe lurking within a network, but you're not just waiting to see what happens, you're actively searching for threats to find them in real time so that they can stop hiding.`,
  29: `Question29

A company identified several security risks that could negatively impact its operations. The organization implements security controls to reduce the likelihood or potential impact of the risk.

Which of the following risk types is being described?

Acceptance, mitigation, transference, or avoidance?

The correct answer is risk mitigation because this is the concept of implementing systems to reduce the potential impact or the potential for a risk to occur in the first place. Implementing IDS, IPS, firewalls, UTMs, WAF, input validation, and so on, these are all great security practices, but you're only reducing the risk to ensure that hopefully nothing happens, but you can never be 100% guaranteed that no one's ever going to exploit or gain access to your systems because this is the concept of risk avoidance whereby you completely eliminate a particular risk to ensure that that risk can never be exploited. So, for example, if you did not want malware from the internet to be able to access your systems, you could physically disconnect the ethernet to your system because you don't have an internet connection. Risk transfer is the concept of transferring the entirety of the risk to a third-party entity so that they can handle that burden. This is common in the concept of cybersecurity insurance whereby if you're affected with a ransomware incident, you can have this insurance so that all that goes on the cybersecurity insurance company instead of your company. And finally, risk acceptance, the concept of acknowledging that certain risks are present or could occur and you simply decide to move on with your day and not take any further action on those risks, you simply accept them. But here we're talking about reducing the potential impact.`,
  30: `Question30

A website administrator has mandated that all user passwords include numbers, symbols, and alphanumeric characters to protect against brute force attacks.

Which of the following is the administrator most likely implementing?

Reuse, length, complexity, or expiration?

And the correct answer is complexity because we're talking about including alphanumeric characters, letters, numbers, symbols, and all this extra stuff to make our passwords that much more complex and in turn, more difficult for the attacker to guess. Password length is the actual amount of characters that is used in the password, so saying things like 16 characters or 32 characters are very common. Password reuse is a very bad security practice whereby you reuse passwords across multiple systems or devices. And password expiration is a very good security practice in organizations whereby your passwords will periodically expire so that if an attacker were to gain access to one of your passwords from say a year ago, it would be invalid. They would not be able to use that password anymore. But here we're specifically talking about the password complexity aspect.`,
})

Object.assign(questionSources, {
  31: `Question31

Employees at the shipping department of a startup company have begun using an external third-party application to improve the efficiency of work-related tasks.

Which of the following BEST describes this scenario?

Pretexting, insider threat, shadow IT, or organized crime?

The correct answer is shadow IT because this is the concept of employees in an organization who are misusing software or hardware of the company, and this opens themselves up to potential security exploits or vulnerabilities. So, in this case, we're talking about using an external third-party application for improving the efficiency of their work.

**Wrong answer**

Insider threat is one specific employee as opposed to entire employees in a department who is abusing the rights and privileges in the company because of whatever permissions they are assigned in their job role, and would have malicious intentions in mind.

Pretexting is the concept of creating a made-up or fictional scenario so that you can better entice users with the concept of phishing, which is getting them to reveal their personal details to the attacker. So, for example, you could try to entice a user by creating some scenario that would make them feel sentimental or emotional, but of course, it's all fake. It's all designed to get the user to reveal their personal information.

Organized crime is a very sophisticated threat group. They are individuals who are primarily motivated by financial gain. So, if you ever see something like you see someone installing ransomware on company systems, well, you know that that is associated with financial gain and this organized crime because you need to pay for the private key to decrypt your data.`,
  32: `Question32

A software developer is preparing to release an application to the public but is concerned that individuals could reverse engineer the application to view its source code.

Which of the following would BEST address this concern?

Masking, obfuscation, tokenization, or steganography?

The correct answer is obfuscation because this is the concept of making your code very difficult or even near impossible to reverse engineer, and reverse engineering is the act of trying to see what the code originally was before it was all scrambled up.

**Wrong answer**

Data masking is the concept of obscuring the data in something like a database using asterisks or substitutes in the place of real data. Instead, you're using fake data that's illegitimacy.

Tokenization, the act of using a unique one-time token, this is a surrogate value in the place of real legitimate data so that if an attacker were to capture that token, they would not be able to use it after that certain transaction, after that one credit card transaction is done complete, they can't use that one-time token again.

Steganography, the act of embedding or concealing data in something like an image file, an audio file, or a video file so that you could then do something like send this file outside the company to a third-party entity, and the company would potentially never be aware that you're actually embedding sensitive data in these images or in these audio or video files.`,
  33: `Question33

A systems administrator is managing several domains for a company that operates multiple public-facing websites. It was later discovered that several websites have been defaced with political messages and beliefs.

Which of the following BEST describes this attacker?

Unskilled attacker, insider threat, hacktivist, Nation-state.

The correct answer is a hacktivist because this is an attacker who's primarily motivated by political or philosophical messages or beliefs that they're trying to propagate one way or another. So, in this question, we're talking about defacing a website and propagating or promoting it there.

**Wrong answer**

Nation-state threat actors are very sophisticated threat actors. In fact, they are the most sophisticated ones of the entire Security+ exam objectives, and they're primarily motivated by things like espionage and war, whereby they'll attack systems and data in opposing or foreign countries and do things like become an APT or an advanced persistent threat, whereby they'll get access to a company, stay there, and lurk in there for months or potentially years on end, secretly exfiltrating company data.

An insider threat is someone who abuses their rights in a company and would do something like use removable media, such as a USB thumb drive, plug it into a company system, download terabytes of sensitive company data, walk out of the company with that drive, and then threaten the company to leak all that data online if they refuse to pay that they don't leak it.

An unskilled attacker, also known as a script kiddie is someone who does not know what they're doing. They're not proficient or very knowledgeable in what they're doing. They just try and test random tools in an attempt that something will eventually work, and they're primarily motivated by disruption and chaos and by impressing their peer group.`,
  34: `Question34

An organization was recently affected by a fire which damaged several critical servers. The organization is currently attempting to repair the affected systems and restore services to normal operation.

Which of the following BEST describes the control type being used?

Corrective, Preventative, detective, deterrent.

The correct answer is corrective controls because a corrective control attempts to reverse the impact of the event after the event actually occurs. A corrective control is one that happens after the fact and you're trying to reverse that impact of what just happened. So, in this case, we're talking about a fire going on, that's the actual incident, and now they're trying to repair the affected systems so that they can get back to normal operations after the event occurred, and this is a corrective control. Other examples of corrective controls are things like if you have a ransomware incident or just a malware incident and you are performing the eradication phase of incident response whereby you're trying to eradicate that malware from those systems or even the very next phase of incident response after that, the recovery phase is also considered a corrective control because you're attempting to restore your systems to their previous state as they were before the initial infection occurred.

**Wrong answer**

Preventative control is whereby you can prevent it before it occurs.

A detective control, a control type that has some sort of reaction after the event occurs, such as notifying the administrator of that system or of that facility, something like video surveillance or sensors for example or IDS or intrusion detection systems, they can notify the administrator if malware is detected.

A compensating control, a control type that comes into play once the primary control has failed and you're forced to use something that's not as good but it's fine for now. So, things like a UPS or an uninterruptible power supply that comes online when the primary power source the company is using for their devices fails, well, we can have this temporary power source to provide us with this temporary power, but it's certainly not a long-term solution.

A deterrent control, a control type that attempts to discourage attackers from performing their actions such as breaking into the company. So, things like security guards or access control vestibules or fencing are all examples of deterrent controls.`,
  35: `Question35

A cybersecurity firm is looking to improve their overall security posture after several recent attempted break-ins. Their current setup involves employee fingerprint identification, mobile phones with one-time SMS codes, and IP address geolocation.

Which of the following would add an additional authentication factor?

PIN, hard authentication token, biometrics, or retina scan?

The correct answer is PIN because this is considered something you know. It's a piece of information that only certain individuals would possess. And in this case, we're already using employee fingerprint identification. This is considered something you are. It's a part of your body that so retina scan does not apply. And finally, mobile phone with one-time code is considered something you have, not something you know, and that is very important to know for your exam because you just might receive a question on that.

**Wrong answer**

A hard authentication token is also considered something you have because you're holding it in your possession, and we're already using mobile phones with one-time codes, which are considered something you have, not something you know, leaving us with the only correct answer as something you know, which is a PIN. Other examples of something you know are things like passwords, usernames, security questions, and so on.`,
  36: `Question36

The incident response team has been notified after a company-wide security breach. Ransomware-infected systems are currently being isolated from other network devices by disconnecting their ethernet cables.

Which of the following phases should the incident response team perform NEXT?

Lessons learned, eradication, recovery, or containment?

The correct answer is eradication because this is the phase that happens after the containment phase of incident response, whereby in the containment phase, you are quarantining or isolating all the infected systems so that the malware does not spread to all the other devices in the company. Then the next phase after that, which is what the question is asking, is the eradication phase, whereby you use specialized antivirus software or tools to manually eradicate or remove the malware that's installed on those systems. Then you have the recovery phase, which involves using backups to restore your systems to their previous state, or at least you are attempting to, and this is considered a corrective control.

**Wrong answer**

And finally, you have the lessons learned phase, whereby you take a look at what was done well, what could be improved upon, and finally, perform the concept of root cause analysis, and this is absolutely essential to know for your exam as well. Root cause analysis, which happens in the lessons learned phase by the way, involves taking a look at how the attacker actually managed to infiltrate company systems and access your data, and how we can prevent this from occurring in the future so that these incidents don't come again.

But here we're specifically talking about what happens after we perform the containment phase of incident response and we perform the eradication phase, which involves using specialized antivirus software to remove that malware.`,
  37: `Question37

A cybersecurity analyst recently installed company-approved software on various devices. The monitoring system quickly began generating a large volume of security notifications related to the software.

Which of the following BEST describes what the analyst should do to reduce unnecessary notifications?

False negative, alert tuning, false positive, or CVE?

The correct answer is alert tuning because this is the concept of tuning down or reducing or completely eliminating potentially the alerts that you're receiving. In the question, we're talking about having company-approved software, so this is not malicious probably, and the monitoring system is generating all these alerts and notifications to that analyst, and it could be potentially very annoying and giving them a headache, so you want to perform alert tuning to tune down these alerts either by a lot or completely so that you stop receiving these false positives. This is perform alert tuning whereby they'll reduce the amount of unnecessary notifications.

**Wrong answer**

A false positive is a notification where the software or the security system, like an IPS or antivirus, thinks that there is some sort of malware there, but in reality, there's nothing actually there. It's just detecting something that it thinks is malicious, but in reality, it's not actually malicious.

The complete opposite of this is a false negative whereby you have something like an IPS or antivirus software or some sort of vulnerability scanning software that fails to detect a vulnerability even though that vulnerability is actually present on that system upon further verification. This is a much more severe and serious scenario compared to a false positive, which involves just something that thinks that there is actually some vulnerability, but in reality, it's not actually present, so an attacker could not exploit that.

Finally, CVE is Common Vulnerabilities and Exposures. This is both a website and a catalog that provides you with a brief description of vulnerabilities, but it has nothing to do with things like generating a large volume of security notifications and what the analyst should do in this scenario.`,
  38: `Question38

Company employees are required to review a policy stating that personally owned devices used for work purposes cannot have their firmware modified to allow the installation of unauthorized third-party applications.

Which of the following is being described?

Sideloading, jailbreaking, misconfiguration, or supply chain?

The correct answer is jailbreaking because this is the act of in this case: we have a policy that dictates that users cannot modify the firmware of their mobile devices, and this is the part of the question that takes priority. Because once you jailbreak your system (if you're on Android, you call this rooting your system), you can then strip away some of these security restrictions on that device and allow you to perform additional abilities such as install third-party applications that are not native to the official app store.

**Wrong answer**

Sideloading, is the concept of installing third-party apps that you would not be able to download normally if you had not jailbroken your device. It involves installing these third-party applications from these random websites. This could open yourself up to a multitude of security exploits, and this is why they have this policy in the first place in the company.

A misconfiguration is a broad term that describes any sort of device or system whereby it's misconfigured, it's opening yourself up to some security exploit potentially.

The supply chain describes third-party software or hardware vendors which they were compromised at that point, and thus if you purchase, for example, some of their software or their hardware, you could involuntarily be already compromised at that point because you purchased their compromised software or hardware and you're bringing that directly into your company.`,
  39: `Question39

A technician has been tasked with restoring a network router to full functionality. It is expected that it will take an average of one hour before the device can function properly.

Which of the following is being described?

RTO, MTTR, RPO, or MTBF?

The correct answer is MTTR or Mean Time To Repair because It's the average amount of time that it's going to take for a technician to repair a faulty or broken network device. In this case, we're talking about restoring a network router to full functionality, and that will take an average of one hour before it can be back online.

**Wrong answer**

MTBF is Mean Time Between Failures. This is the average amount of time that a device will remain operational for or that it will run for before it's expected to fail periodically.

RTO is Recovery Time Objective. This is the maximum amount of downtime that a company is willing to accept for a failed network system.

RPO is Recovery Point Objective. This is the maximum amount of data loss that a company is willing to accept or endure when an incident occurs.`,
  40: `Question40

A user is receiving multiple text messages containing suspicious links to third-party websites. The website is demanding sensitive password information.

Which of the following best describes this type of attack?

Spyware, smishing, typosquatting, or phishing?

The correct answer is smishing because this is SMS phishing. It's phishing that happens over text messages whereby you look on your phone or on your tablet or whatever mobile system that receive an SMS code on, and then you receive this text message that contains an embedded link to some sort of malicious website whereby if you click on that website, you could either automatically have your credentials stolen or you would have to manually input your username or password and then you would be successfully phished by the attacker or in this case, smished.

**Wrong answer**

Phishing is the act of getting users to reveal or divulge their personal information to the attacker, but phishing typically happens over methods like email as opposed to smishing which is happening over SMS or text.

Spyware is malware that monitors everything you do on a system, so it's typically things like keyloggers which trap every key you type on your keyboard to then send that to the attacker. So, it involves spying or monitoring everything you do and then sending that to the attacker.

Typosquatting involves an attacker creating a domain name that is very similar to an official legitimate domain, but there's a tiny difference in the actual address or website URL bar itself whereby if you take a look at the URL bar, there'll be a tiny difference in what the URL actually is compared to the official domain name. So, for example, let's say we have a legitimate domain google.com, the attacker could generate a domain or buy the domain itself which is for example gogle.com because they know that people easily mistype that into their browser bar and don't spend time looking at the address bar before pressing enter, and it's commonly associated with very malicious domains that the attacker will generate for this type of squatted domain.`,
  41: `Question41

A security company is preparing in advance for potential ransomware incidents by purchasing cybersecurity insurance.

Which of the following BEST describes this risk type?

Transference, mitigation, avoidance, or acceptance?

The correct answer is risk transference because this involves transferring the entirety of a risk to a third-party entity so that they can deal with and handle that burden without it being on you. Because in this case, we're talking about purchasing the cybersecurity insurance so that if the company gets hit with ransomware, they can't worry about the consequences of this ransomware occurring and not you.

**Wrong answer**

Risk mitigation involves implementing systems to reduce the potential for a risk occurring, but you're not completely eliminating the risk 100%. So if you're doing something like installing antivirus software, IDS, IPS, intrusion detection, intrusion prevention, firewalls, or even things like fencing, security guards, bollards, and so on and so forth, you're effectively reducing the potential for risk occurring, but you can never be 100% certain that a risk or an incident could never occur on your network, for example, on any part of your network, because you always have things like zero-day vulnerabilities which could occur, and there's not that much you can do about it in those scenarios.

Risk avoidance involves completely eliminating a very specific risk at a company so that there is literally a 0% chance that the risk could occur because you're literally removing it. So, if you're worried, for example, about an application being exploited, well, if you literally remove that application from the network entirely, well, there's nothing to worry about. The attacker cannot exploit this app because the app is no longer there. This is risk avoidance whereby you're completely eliminating that risk.

Risk acceptance involves analyzing and acknowledging a risk as being present, but you don't take any further action on that risk. You simply accept it and move on with your day. Examples of risk acceptance are things like if you know that natural disasters could occur somewhere in your area, well, there's not that much you can do, so you simply accept that risk.`,
  42: `Question42

A cybersecurity firm is updating its systems, isolating critical applications, and installing web application firewalls on the back end of company web servers.

Which of the following BEST describes this risk type?

Mitigation, transference, acceptance, or avoidance?

The correct answer is risk mitigation because this involves reducing the potential for risk whereby you implement all these systems so that hopefully an incident or a risk doesn't occur, but it can never be 100% foolproof.

**Wrong answer**

Risk transference, things like cybersecurity insurance whereby you'll put the burden of that risk, you'll transfer it to a third-party entity so that they can deal with that as opposed to you dealing with that.

Risk acceptance, accepting that a risk is present, such as if you know that you have some low-level vulnerabilities or medium-level vulnerabilities present on your systems, you accept that risk essentially and you move on with your day. You don't take any further action on that.

Risk avoidance whereby you completely eliminate a risk. You literally remove something from the network so that it is impossible for that to occur.`,
  43: `Question43

An organization has determined that is required to store all emails for a period of one year before they can be deleted.

Which of the following BEST describes this requirement?

Data retention, data masking, data subject, or data sovereignty?

The correct answer is data retention because this is the amount of time that a company is required to store, for example, their emails for or whatever data that they're required to store for. So, for example, they have to do this for one year, but they are not required by law to store emails from the last five or 10 years. They're only required in this question to store all emails for a period of one year before they can be deleted.

**Wrong answer**

Data masking, the act of using asterisks or substitutes to obscure legitimate data with fake data instead.

Data subject, the actual person or entity that provided their sensitive data to a company.

Data sovereignty, the act of data being subject to the laws and regulations of a particular country and city.`,
  44: `Question44

A nation state attacker used publicly available sources to identify websites commonly visited by company employees. The attacker proceeded to exploit a zero-day vulnerability in the website.

Which of the following is being described?

Typosquatting, vishing, watering hole, Business email compromise.

The correct answer is watering hole because this is a very sophisticated attack which involves the attacker first identifying which websites employees often visit, then exploiting a vulnerability in that website, such as a zero-day vulnerability, but it could be whatever. It could be a SQL injection vulnerability, a cross-site scripting vulnerability, or a CSRF vulnerability. It could be whatever. And this involves these two phases, so first identifying which websites they often visit, then exploiting a vulnerability in that website.

**Wrong answer**

Typosquatting, generating a domain name that is very similar to the original legitimate domain to fool users into entering that in their web browser.

Vishing is voice phishing, getting users to reveal or divulge their personal information over a voice call or a phone call.

Business email compromise involves someone's actual official legitimate email in a company that gets hacked or taken over by an attacker who can then do things like impersonate that user, send spam to other users by using their authority, and so on and so forth.`,
  45: `Question45

A SOC analyst is reviewing employee account logs and notices several unsuccessful login attempts against a single account with a different password being used for each attempt.

Which of the following is MOST likely occurring?

Spraying, brute force, collision, or credential replay?

The correct answer is brute force because this involves attempting endless passwords against a single user account with different passwords each time.

**Wrong answer**

Password spraying involves trying a handful of common passwords against a multitude of different accounts as opposed to a single account. So how password spraying really works in the real world is that to avoid a successful account lockout, what they'll do is that they'll try three to five very common passwords such as password123, password1234, password12345, and so on. They'll try that against a user account, but if it doesn't work on the third or the fifth attempt, then they'll simply move on to the next account, try those same passwords, and so on. They won't try endless passwords against a single account like you would in a brute force attack.

Collision refers to a hash collision whereby you have two different files which generate the same identical hash, and this is a common problem in things like the MD5 hashing algorithm, so you better know that for your exam. You never use MD5, you always use something like SHA-256, which does not have these severe vulnerabilities present.

A credential replay attack involves an attacker performing an on-path or a man-in-the-middle attack against someone like a server that's communicating with a user, so the attacker will intercept that connection and they'll capture the credentials that the user is using, send those to the server, and pretend to be the user, and then the server starts interacting with that attacker as opposed to interacting with the original user.`,
})