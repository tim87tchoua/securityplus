export interface FullTermDefinition {
  term: string
  definition: string
}

export const questionDefinitions: Record<number, FullTermDefinition[]> = {
  1: [
    { term: "Preservation", definition: "Preservation phase is the second phase of the digital forensics process to ensure that data is not tampered, modified with, or altered in any way when it's at rest, or when it's being sedentary." },
    { term: "Acquisition", definition: "Acquisition phase is the first phase of the digital forensics process when we collect the data." },
    { term: "Reporting", definition: "Reporting phase is the very last phase of digital forensics process whereby we generate a report, a file, which contains things like which tools we use to recover data that was there, who was involved at the crime scene." },
    { term: "Tabletop exercise", definition: "Tabletop exercise involves discussing a potential incident response scenario, a hypothetical one, whereby individuals will gather around at a table to discuss of it." },
  ],
  2: [
    { term: "Security guard", definition: "Security guard is a deterrent and preventive control that prevents individuals from surrounding the facility." },
    { term: "Fencing", definition: "Fencing is a deterrent and preventive control that prevents individuals from surrounding the facility." },
    { term: "Lighting", definition: "Lighting is a deterrent control, but it is not a preventive control." },
    { term: "Bollard", definition: "Bollard is a preventive control, not a deterrent, and it's only used to stop large vehicles or cars from bashing through the organization and can also prevent individuals from surrounding the facility." },
    { term: "Video surveillance", definition: "Video surveillance is CCTV cameras used as deterrent control and a detective control, it is not a preventive control. It cannot block or stop anyone from performing certain actions. It can only detect or notify the administrator of that system if someone does get into close proximity with that facility." },
  ],
  3: [
    { term: "Active reconnaissance", definition: "Active reconnaissance involves gathering information on a company or individual (more meticulous details on exactly what is running on that company network) while directly interacting with the target systems." },
    { term: "Passive reconnaissance", definition: "Passive reconnaissance involves doing things like OSINT or open-source intelligence whereby you look on search engines, you use social media sites, you gather information that's publicly available, but you do not interact with any of the company's systems." },
    { term: "Known environment", definition: "Known environment in terms of penetration testing describes when the penetration tester has the full details of exactly several details about what's happening on the network. They know the network layout, they know the credentials used to log in, they know the applications installed on company devices, they know the internal website IP addresses. They know all this information as opposed to if you did not know this information, that would be considered an unknown test, an unknown environment, or a black box test." },
    { term: "Physical penetration test", definition: "Physical penetration test involves physically dressing up as an employee or someone in the company, disguising yourself, and attempting to infiltrate the company physically in person to achieve a desired state such as exfiltrating company data. And if you successfully achieve that goal, then that would be the end of the physical penetration test." },
  ],
  4: [
    { term: "Worm", definition: "Worm is a specifical malware that does not require any sort of user intervention to function or to replicate, it comes from the internet to exploit systems and enter a company. Worm is known to infamously exploit open port alongside potentially things like default credentials or unpatched systems. At least worms in general are known to exploit these vulnerabilities." },
    { term: "Rootkit", definition: "Rootkit is a piece of malware, very sophisticated and operates at the kernel level of the operating system, this attempt to effectively evade antivirus detection." },
    { term: "Keylogger", definition: "Keylogger can either be a physical device you plug into your laptop, but it can also be a piece of software that is installed on the device, and automatically track all the keys that you type on your keyboard and send those directly to the attacker, whoever installed this malware to begin with." },
    { term: "Virus", definition: "Virus is a piece of malware that does require user intervention to replicate and to execute. Because it is attached to a program, it can only be run once the user double-clicks and runs that program, which will in consequence run that virus alongside it." },
  ],
  5: [
    { term: "Directory traversal", definition: "Directory traversal is when an attacker attempts to view files and directories that are restricted and they should not be able to view or access under normal conditions. And they would typically use some parameter or sequence to do this. In a real-world scenario you would have the official website name, say example.com, but if an attacker wanted to view some sort of specific file, they could use the parameter like ../, say seven or eight times, and on that eighth time, they would do ../ and then a specific directory in an attempt to be able to access that particular file or directory." },
    { term: "Privilege escalation", definition: "Privilege escalation involves exploiting a vulnerability which would allow you to have higher level privileges on a system than you would normally have if you had not exploited this vulnerability. For example, if you manage to successfully exploit a privilege escalation vulnerability on Windows, you could gain potentially administrator level access for your own account, or if you're doing this on Linux, you could gain a root level access as your account on that system." },
    { term: "Buffer overflow", definition: "Buffer overflow is when you override an area of memory with so much data that it simply spills into the next area of memory, causing a DDoS or a distributed denial of service attack to that system." },
    { term: "DNS attack", definition: "DNS attack is a domain name system attack describes something like DNS poisoning whereby the attacker will make it so that any website you enter, the associated IP address with that website will be changed and will automatically redirect users to the attacker's website as opposed to the official website that you were attempting to visit." },
  ],
  6: [
    { term: "Masking", definition: "Data masking involves using asterisks or substitutes in the place of real data. Instead, you're using these asterisks or this false data, making it so that if an attacker were to gain access to this database, it would all be useless, illegitimate data because it's obscured or it's simply false data to begin with, so they would not be able to use any of that data to their advantage." },
    { term: "Hashing", definition: "Hashing involves using a one-way mathematical function or algorithm that is not reversible to increase the security of your passwords in your databases. You would put your passwords through a hashing algorithm such as SHA-256 or MD5, which would generate a very long string of text so that the attacker would first have to manually crack that hash before they'll be able to view what the password originally was." },
    { term: "Tokenization", definition: "Tokenization involves using a one-time token, which is a surrogate value, a non-sensitive placeholder in the place of real, legitimate data." },
    { term: "Salting", definition: "Salting is the process of adding alphanumeric characters, so things like letters or numbers, to a password before you actually hash it so that when you do hash it, it is that much more random of a hash than if you had not salted that password hash." },
  ],
  7: [
    { term: "Supply chain", definition: "Supply chain describes the third-party hardware or software vendors whereby, they were compromised at that stage long before you ever brought that software or hardware into your company." },
    { term: "Vulnerable software", definition: "Vulnerable software describes any sort of software that is vulnerable to security exploits that has not been patched or updated." },
    { term: "Typosquatting", definition: "Typosquatting is an attacker creating a domain name that is very similar to an official legitimate domain, but there's a tiny difference in the actual URL bar itself, making it so that a user could accidentally enter in the incorrect address bar into their website bar and then hit enter and then go to some random malicious website as opposed to going to the official website." },
    { term: "Pretexting", definition: "Pretexting is the act of creating a made-up or fictional scenario and is used in conjunction with something like phishing or smishing to better entice users into revealing their personal details." },
  ],
  8: [
    { term: "CVSS", definition: "CVSS or the Common Vulnerability Scoring System is the concept associated with thing like a severity score rating and the prioritization, patching, and remediation of your vulnerabilities accordingly." },
    { term: "CVE", definition: "CVE is Common Vulnerabilities and Exposures it is a website that you can visit and have a brief list of vulnerabilities." },
    { term: "False positive", definition: "False positive is when you perform some sort of vulnerability scan and it detects some sort of vulnerability as being present or some sort of malware, if it's antivirus software, but in reality, upon further inspection, you see that what it detected is not actually there or it's not actually what it thought it was. It's a false positive, it's not legit." },
    { term: "Dark web", definition: "Dark web it is where you can access a lot of hidden services." },
  ],
  9: [
    { term: "Password", definition: "Password is considered something you know (And other examples of something you know are things like usernames, security questions, passwords, and PINs.). It's a piece of information that only certain individuals would possess. If we take a look at what they're currently using in the question, they're already using facial recognition, which is considered something you are, it's a biometric, and here we're also using iris scan, which is considered something you are, a biometric once more, so it's not the correct answer." },
    { term: "Smart cards", definition: "Smart cards are considered something you have, and this is something that you hold, your physical possession in your environment." },
    { term: "Mobile phone with one-time SMS code", definition: "Mobile phone with one-time SMS code is considered something you have." },
    { term: "Iris scan", definition: "Iris scan is considered a biometric, something you are, it's part of your body that's used to uniquely identify you." },
    { term: "Hardware authentication token", definition: "Hardware authentication token is considered something you have like smart cards, which is considered something you have." },
  ],
  10: [
    { term: "Salting", definition: "Salting is the process of adding random characters, so things like alphanumeric characters, letters, numbers, and symbols, to a password before you actually hash that password." },
    { term: "Hashing", definition: "Hashing involves using a one-way, non-reversible mathematical algorithm." },
    { term: "Escrow", definition: "Escrow is when you provide your private keys to some sort of third-party entity so that if you ever lose access to your private keys, which would be used to decrypt your data, a third-party entity could come in and decrypt your data so that you would then be able to access your data once more." },
    { term: "Obfuscation", definition: "Obfuscation is commonly used in things like application development whereby you don't want your application source code to be reverse-engineered or discovered by individuals, so you perform obfuscation, which makes your code much more difficult to read, making it nearly impossible at times for any individual to see what the code actually was." },
  ],
  11: [
    { term: "Smishing", definition: "Smishing is phishing that happens over text, or SMS phishing, whereby you receive either one or multiple malicious text messages which contain an embedded link to some sort of third-party website whereby it could ask you to enter in your login details so that you would have your information stolen and that would be sent to the attacker." },
    { term: "Vishing", definition: "Vishing is voice phishing, it's phishing that happens over the phone whereby the attacker attempts to get users to reveal their personal details over a phone call." },
    { term: "Phishing", definition: "Phishing involves getting users to reveal or divulge their personal information to the attacker, but phishing typically happens over email." },
    { term: "Impersonation", definition: "Impersonation involves claiming or pretending to be someone that you're not in order to perform additional malicious functions, and while in this case we're talking about someone who claimed to be from the organization's help desk." },
  ],
  12: [
    { term: "Recovery", definition: "Recovery phase involves using backups to restore your systems to their previous state before you were ever infected with this malware in the first place, and this is a corrective control whereby you attempt to reverse the impact of the event after the event actually occurs." },
    { term: "Eradication", definition: "Eradication phase involves manually eradicating or removing the malware that's been installed on those systems using specialized antivirus software or tools." },
    { term: "Containment", definition: "Containment phase involves isolating or quarantining the infected systems so that the malware doesn't spread to other devices in the company." },
    { term: "Lessons learned", definition: "Lessons learned phase involves taking a look at what was done well in the incident response process, what could be improved upon next time, and how do we actually prevent such incidents from occurring in the future." },
  ],
  13: [
    { term: "MTTR", definition: "MTTR, or mean time to repair describes the average amount of time it's going to take to repair or restore a device that has failed to full functionality." },
    { term: "MTBF", definition: "MTBF or means time between failures describes the average amount of time that a device is expected to remain operational before it's going to fail." },
    { term: "RTO", definition: "RTO or recovery time objective is the maximum amount of acceptable downtime that an organization is willing to tolerate for an incident or a failed device." },
    { term: "RPO", definition: "RPO or recovery point objective is the maximum amount of data loss that a company is willing to tolerate after a security incident has occurred." },
  ],
  14: [
    { term: "Load balancing", definition: "Load balancing is when you install multiple load balancers on the back end of web servers to provide you with a more evenly distributed load of traffic across those servers so that, especially in the event of something like a DDoS attack, you can hopefully have high availability for your users who are attempting to access websites and access data on those systems." },
    { term: "Platform diversity", definition: "Platform diversity is the act of implementing several different software or hardware vendors for a particular system in your company because, especially for something like a zero-day vulnerability, if an attacker manages to successfully exploit a vulnerability in one of those software or hardware vendors, if you have several different vendors, then they can't both be simultaneously vulnerable to the same zero-day exploit typically. So, you have this added layer of defense, this defense in depth going on, so that they would not be able to get past both layers if they manage to exploit one of them because you're implementing this platform diversity." },
    { term: "Uninterruptible power supply", definition: "Uninterruptible power supply or a UPS is a device whereby when the primary power source fails in the company, this device will come online to provide your systems with temporary power so that your systems aren't abruptly shut down and lose any data. All your data will be safeguarded because your devices will not be abruptly shut down once the UPS comes online." },
    { term: "Generator", definition: "Generator is a very large device that can take several minutes to come online, but it can provide you with a lot more power than a simple UPS can." },
  ],
  15: [
    { term: "Code signing", definition: "Code signing allows the user to be able to verify that the software actually came from the original legitimate developer and that it's not some scam software that didn't actually come from them. We have their unique digital signatures whenever the company performs the concept of code signing, which is indeed adding their unique digital signatures to the file so that we can verify it actually came from them." },
    { term: "Input validation", definition: "Input validation is a very good security practice whereby you ensure that certain characters cannot be entered into web or comment forms, so things like apostrophes or dollar signs or hashtags cannot be entered into any form in the first place." },
    { term: "Sandboxing", definition: "Sandboxing involves having a test isolated environment whereby you can do things like launch malware and test applications before launching them into a production environment." },
    { term: "RADIUS", definition: "RADIUS is remote authentication dial-in user service. This is an authentication network protocol that is on networks to ensure that employees who authenticate are indeed legitimate and belong to the company." },
  ],
}

export function getFullTermDefinition(questionId: number, term: string) {
  const aliases: Record<string, string> = {
    hardauthenticationtoken: "hardwareauthenticationtoken",
    spraying: "passwordspraying",
    opensourceintelligenceorosint: "opensourceintelligenceosint",
  }
  const rawTerm = term.toLowerCase().replace(/[^a-z0-9]/g, "")
  const normalizedTerm = aliases[rawTerm] ?? rawTerm
  return questionDefinitions[questionId]?.find(({ term: candidate }) => {
    const normalizedCandidate = candidate.toLowerCase().replace(/[^a-z0-9]/g, "")
    return [rawTerm, normalizedTerm].some((searchTerm) => normalizedCandidate === searchTerm || normalizedCandidate.startsWith(searchTerm) || searchTerm.startsWith(normalizedCandidate))
  })?.definition
}

Object.assign(questionDefinitions, {
  31: [
    { term: "Shadow IT", definition: "Shadow IT is the concept of employees in an organization who are misusing software or hardware of the company, and this opens themselves up to potential security exploits or vulnerabilities. So, in this case, we're talking about using an external third-party application for improving the efficiency of their work." },
    { term: "Insider threat", definition: "Insider threat is one specific employee as opposed to entire employees in a department who is abusing the rights and privileges in the company because of whatever permissions they are assigned in their job role, and would have malicious intentions in mind." },
    { term: "Pretexting", definition: "Pretexting is the concept of creating a made-up or fictional scenario so that you can better entice users with the concept of phishing, which is getting them to reveal their personal details to the attacker. So, for example, you could try to entice a user by creating some scenario that would make them feel sentimental or emotional, but of course, it's all fake. It's all designed to get the user to reveal their personal information." },
    { term: "Organized crime", definition: "Organized crime is a very sophisticated threat group. They are individuals who are primarily motivated by financial gain. So, if you ever see something like you see someone installing ransomware on company systems, well, you know that that is associated with financial gain and this organized crime because you need to pay for the private key to decrypt your data." },
  ],
  32: [
    { term: "Obfuscation", definition: "Obfuscation is the concept of making your code very difficult or even near impossible to reverse engineer, and reverse engineering is the act of trying to see what the code originally was before it was all scrambled up." },
    { term: "Masking", definition: "Data masking is the concept of obscuring the data in something like a database using asterisks or substitutes in the place of real data. Instead, you're using fake data that's illegitimacy." },
    { term: "Tokenization", definition: "Tokenization is the act of using a unique one-time token, this is a surrogate value in the place of real legitimate data so that if an attacker were to capture that token, they would not be able to use it after that certain transaction, after that one credit card transaction is done complete, they can't use that one-time token again." },
    { term: "Steganography", definition: "Steganography is the act of embedding or concealing data in something like an image file, an audio file, or a video file so that you could then do something like send this file outside the company to a third-party entity, and the company would potentially never be aware that you're actually embedding sensitive data in these images or in these audio or video files." },
  ],
  33: [
    { term: "Hacktivist", definition: "Hacktivist is an attacker who's primarily motivated by political or philosophical messages or beliefs that they're trying to propagate one way or another. So, in this question, we're talking about defacing a website and propagating or promoting it there." },
    { term: "Nation-state", definition: "Nation-state threat actors are very sophisticated threat actors. In fact, they are the most sophisticated ones of the entire Security+ exam objectives, and they're primarily motivated by things like espionage and war, whereby they'll attack systems and data in opposing or foreign countries and do things like become an APT or an advanced persistent threat, whereby they'll get access to a company, stay there, and lurk in there for months or potentially years on end, secretly exfiltrating company data." },
    { term: "Insider threat", definition: "An insider threat is someone who abuses their rights in a company and would do something like use removable media, such as a USB thumb drive, plug it into a company system, download terabytes of sensitive company data, walk out of the company with that drive, and then threaten the company to leak all that data online if they refuse to pay that they don't leak it." },
    { term: "Unskilled attacker", definition: "An unskilled attacker, also known as a script kiddie is someone who does not know what they're doing. They're not proficient or very knowledgeable in what they're doing. They just try and test random tools in an attempt that something will eventually work, and they're primarily motivated by disruption and chaos and by impressing their peer group." },
  ],
  34: [
    { term: "Corrective", definition: "Corrective controls attempt to reverse the impact of the event after the event actually occurs. A corrective control is one that happens after the fact and you're trying to reverse that impact of what just happened. So, in this case, we're talking about a fire going on, that's the actual incident, and now they're trying to repair the affected systems so that they can get back to normal operations after the event occurred, and this is a corrective control. Other examples of corrective controls are things like if you have a ransomware incident or just a malware incident and you are performing the eradication phase of incident response whereby you're trying to eradicate that malware from those systems or even the very next phase of incident response after that, the recovery phase is also considered a corrective control because you're attempting to restore your systems to their previous state as they were before the initial infection occurred." },
    { term: "Preventative", definition: "Preventative control is whereby you can prevent it before it occurs." },
    { term: "Detective", definition: "A detective control is a control type that has some sort of reaction after the event occurs, such as notifying the administrator of that system or of that facility, something like video surveillance or sensors for example or IDS or intrusion detection systems, they can notify the administrator if malware is detected." },
    { term: "Compensating", definition: "A compensating control is a control type that comes into play once the primary control has failed and you're forced to use something that's not as good but it's fine for now. So, things like a UPS or an uninterruptible power supply that comes online when the primary power source the company is using for their devices fails, well, we can have this temporary power source to provide us with this temporary power, but it's certainly not a long-term solution." },
    { term: "Deterrent", definition: "A deterrent control is a control type that attempts to discourage attackers from performing their actions such as breaking into the company. So, things like security guards or access control vestibules or fencing are all examples of deterrent controls." },
  ],
  35: [
    { term: "PIN", definition: "PIN is considered something you know. It's a piece of information that only certain individuals would possess. And in this case, we're already using employee fingerprint identification. This is considered something you are. It's a part of your body that so retina scan does not apply. And finally, mobile phone with one-time code is considered something you have, not something you know, and that is very important to know for your exam because you just might receive a question on that." },
    { term: "Hard authentication token", definition: "Hard authentication token is also considered something you have because you're holding it in your possession, and we're already using mobile phones with one-time codes, which are considered something you have, not something you know, leaving us with the only correct answer as something you know, which is a PIN. Other examples of something you know are things like passwords, usernames, security questions, and so on." },
    { term: "Biometrics", definition: "Employee fingerprint identification is considered something you are. It's a part of your body that is used as an authentication factor." },
    { term: "Retina scan", definition: "Retina scan is a biometric, something you are, a part of your body." },
  ],
  36: [
    { term: "Eradication", definition: "Eradication is the phase that happens after the containment phase of incident response, whereby you use specialized antivirus software or tools to manually eradicate or remove the malware that's installed on those systems." },
    { term: "Containment", definition: "Containment is the phase in which you quarantine or isolate all the infected systems so that the malware does not spread to all the other devices in the company." },
    { term: "Recovery", definition: "Recovery involves using backups to restore your systems to their previous state, or at least you are attempting to, and this is considered a corrective control." },
    { term: "Lessons learned", definition: "Lessons learned is the phase whereby you take a look at what was done well, what could be improved upon, and finally, perform the concept of root cause analysis. Root cause analysis, which happens in the lessons learned phase, involves taking a look at how the attacker actually managed to infiltrate company systems and access your data, and how we can prevent this from occurring in the future so that these incidents don't come again." },
  ],
  37: [
    { term: "Alert tuning", definition: "Alert tuning is the concept of tuning down or reducing or completely eliminating potentially the alerts that you're receiving. In the question, we're talking about having company-approved software, so this is not malicious probably, and the monitoring system is generating all these alerts and notifications to that analyst, and it could be potentially very annoying and giving them a headache, so you want to perform alert tuning to tune down these alerts either by a lot or completely so that you stop receiving these false positives. This is perform alert tuning whereby they'll reduce the amount of unnecessary notifications." },
    { term: "False positive", definition: "A false positive is a notification where the software or the security system, like an IPS or antivirus, thinks that there is some sort of malware there, but in reality, there's nothing actually there. It's just detecting something that it thinks is malicious, but in reality, it's not actually malicious." },
    { term: "False negative", definition: "A false negative is whereby you have something like an IPS or antivirus software or some sort of vulnerability scanning software that fails to detect a vulnerability even though that vulnerability is actually present on that system upon further verification. This is a much more severe and serious scenario compared to a false positive, which involves just something that thinks that there is actually some vulnerability, but in reality, it's not actually present, so an attacker could not exploit that." },
    { term: "CVE", definition: "CVE is Common Vulnerabilities and Exposures. This is both a website and a catalog that provides you with a brief description of vulnerabilities, but it has nothing to do with things like generating a large volume of security notifications and what the analyst should do in this scenario." },
  ],
  38: [
    { term: "Jailbreaking", definition: "Jailbreaking is the act of modifying the firmware of mobile devices. Once you jailbreak your system (if you're on Android, you call this rooting your system), you can strip away some security restrictions on that device and install third-party applications that are not native to the official app store." },
    { term: "Sideloading", definition: "Sideloading is the concept of installing third-party apps that you would not be able to download normally if you had not jailbroken your device. It involves installing these third-party applications from these random websites. This could open yourself up to a multitude of security exploits, and this is why they have this policy in the first place in the company." },
    { term: "Misconfiguration", definition: "A misconfiguration is a broad term that describes any sort of device or system whereby it's misconfigured, it's opening yourself up to some security exploit potentially." },
    { term: "Supply chain", definition: "The supply chain describes third-party software or hardware vendors which they were compromised at that point, and thus if you purchase, for example, some of their software or their hardware, you could involuntarily be already compromised at that point because you purchased their compromised software or hardware and you're bringing that directly into your company." },
  ],
  39: [
    { term: "MTTR", definition: "MTTR or Mean Time To Repair is the average amount of time that it's going to take for a technician to repair a faulty or broken network device. In this case, we're talking about restoring a network router to full functionality, and that will take an average of one hour before it can be back online." },
    { term: "MTBF", definition: "MTBF is Mean Time Between Failures. This is the average amount of time that a device will remain operational for or that it will run for before it's expected to fail periodically." },
    { term: "RTO", definition: "RTO is Recovery Time Objective. This is the maximum amount of downtime that a company is willing to accept for a failed network system." },
    { term: "RPO", definition: "RPO is Recovery Point Objective. This is the maximum amount of data loss that a company is willing to accept or endure when an incident occurs." },
  ],
  40: [
    { term: "Smishing", definition: "Smishing is SMS phishing. It's phishing that happens over text messages whereby you look on your phone or on your tablet or whatever mobile system that receive an SMS code on, and then you receive this text message that contains an embedded link to some sort of malicious website whereby if you click on that website, you could either automatically have your credentials stolen or you would have to manually input your username or password and then you would be successfully phished by the attacker or in this case, smished." },
    { term: "Phishing", definition: "Phishing is the act of getting users to reveal or divulge their personal information to the attacker, but phishing typically happens over methods like email as opposed to smishing which is happening over SMS or text." },
    { term: "Spyware", definition: "Spyware is malware that monitors everything you do on a system, so it's typically things like keyloggers which trap every key you type on your keyboard to then send to the attacker. So, it involves spying or monitoring everything you do and then sending that to the attacker." },
    { term: "Typosquatting", definition: "Typosquatting involves an attacker creating a domain name that is very similar to an official legitimate domain, but there's a tiny difference in the actual address or website URL bar itself whereby if you take a look at the URL bar, there'll be a tiny difference in what the URL actually is compared to the official domain name. So, for example, let's say we have a legitimate domain google.com, the attacker could generate a domain or buy the domain itself which is for example gogle.com because they know that people easily mistype that into their browser bar and don't spend time looking at the address bar before pressing enter, and it's commonly associated with very malicious domains that the attacker will generate for this type of squatted domain." },
  ],
  41: [
    { term: "Transference", definition: "Risk transference involves transferring the entirety of a risk to a third-party entity so that they can deal with and handle that burden without it being on you. Because in this case, we're talking about purchasing the cybersecurity insurance so that if the company gets hit with ransomware, they can't worry about the consequences of this ransomware occurring and not you." },
    { term: "Mitigation", definition: "Risk mitigation involves implementing systems to reduce the potential for a risk occurring, but you're not completely eliminating the risk 100%. So if you're doing something like installing antivirus software, IDS, IPS, intrusion detection, intrusion prevention, firewalls, or even things like fencing, security guards, bollards, and so on and so forth, you're effectively reducing the potential for risk occurring, but you're not 100% eliminating it because you can never be 100% certain that a risk or an incident could never occur on your network, for example, on any part of your network, because you always have things like zero-day vulnerabilities which could occur, and there's not that much you can do about it in those scenarios." },
    { term: "Avoidance", definition: "Risk avoidance involves completely eliminating a very specific risk at a company so that there is literally a 0% chance that the risk could occur because you're literally removing it. So, if you're worried, for example, about an application being exploited, well, if you literally remove that application from the network entirely, well, there's nothing to worry about. The attacker cannot exploit this app because the app is no longer there. This is risk avoidance whereby you're completely eliminating that risk." },
    { term: "Acceptance", definition: "Risk acceptance involves analyzing and acknowledging a risk as being present, but you don't take any further action on that risk. You simply accept it and move on with your day. Examples of risk acceptance are things like if you know that natural disasters could occur somewhere in your area, well, there's not that much you can do, so you simply accept that risk." },
  ],
  42: [
    { term: "Mitigation", definition: "Risk mitigation involves reducing the potential for risk whereby you implement all these systems so that hopefully an incident or a risk doesn't occur, but it can never be 100% foolproof." },
    { term: "Transference", definition: "Risk transference, things like cybersecurity insurance whereby you'll put the burden of that risk, you'll transfer it to a third-party entity so that they can deal with that as opposed to you dealing with that." },
    { term: "Acceptance", definition: "Risk acceptance, accepting that a risk is present, such as if you know that you have some low-level vulnerabilities or medium-level vulnerabilities present on your systems, you accept that risk essentially and you move on with your day. You don't take any further action on that." },
    { term: "Avoidance", definition: "Risk avoidance whereby you completely eliminate a risk. You literally remove something from the network so that it is impossible for that to occur." },
  ],
  43: [
    { term: "Data retention", definition: "Data retention is the amount of time that a company is required to store, for example, their emails for or whatever data that they're required to store for. So, for example, they have to do this for one year, but they are not required by law to store emails from the last five or 10 years. They're only required in this question to store all emails for a period of one year before they can be deleted." },
    { term: "Data masking", definition: "Data masking is the act of using asterisks or substitutes to obscure legitimate data with fake data instead." },
    { term: "Data subject", definition: "Data subject is the actual person or entity that provided their sensitive data to a company." },
    { term: "Data sovereignty", definition: "Data sovereignty is the act of data being subject to the laws and regulations of a particular country and city." },
  ],
  44: [
    { term: "Watering hole", definition: "Watering hole is a very sophisticated attack which involves the attacker first identifying which websites employees often visit, then exploiting a vulnerability in that website, such as a zero-day vulnerability, but it could be whatever. It could be a SQL injection vulnerability, a cross-site scripting vulnerability, or a CSRF vulnerability. It could be whatever. And this involves these two phases, so first identifying which websites they often visit, then exploiting a vulnerability in that website." },
    { term: "Typosquatting", definition: "Typosquatting is generating a domain name that is very similar to the original legitimate domain to fool users into entering that in their web browser." },
    { term: "Vishing", definition: "Vishing is voice phishing, getting users to reveal or divulge their personal information over a voice call or a phone call." },
    { term: "Business email compromise", definition: "Business email compromise involves someone's actual official legitimate email in a company that gets hacked or taken over by an attacker who can then do things like impersonate that user, send spam to other users by using their authority, and so on and so forth." },
  ],
  45: [
    { term: "Brute force", definition: "Brute force involves attempting endless passwords against a single user account with different passwords each time." },
    { term: "Password spraying", definition: "Password spraying involves trying a handful of common passwords against a multitude of different accounts as opposed to a single account. So how password spraying really works in the real world is that to avoid a successful account lockout, what they'll do is that they'll try three to five very common passwords such as password123, password1234, password12345, and so on. They'll try that against a user account, but if it doesn't work on the third or the fifth attempt, then they'll simply move on to the next account, try those same passwords, and so on. They won't try endless passwords against a single account like you would in a brute force attack." },
    { term: "Collision", definition: "Collision refers to a hash collision whereby you have two different files which generate the same identical hash, and this is a common problem in things like the MD5 hashing algorithm, so you better know that for your exam. You never use MD5, you always use something like SHA-256, which does not have these severe vulnerabilities present." },
    { term: "Credential replay", definition: "A credential replay attack involves an attacker performing an on-path or a man-in-the-middle attack against someone like a server that's communicating with a user, so the attacker will intercept that connection and they'll capture the credentials that the user is using, send those to the server, and pretend to be the user, and then the server starts interacting with that attacker as opposed to interacting with the original user." },
  ],
})

Object.assign(questionDefinitions, {
  16: [
    { term: "Sanitization", definition: "Sanitization is the process of using specialized software to ensure that data cannot be recovered from that drive under any circumstances. You can be rest assured that no one's ever going to recover any of that data." },
    { term: "Destruction", definition: "Destruction is the process which is physically used to destroy the drive with something like a hammer or a shredder just to double check and ensure that no one can ever recover this data." },
    { term: "Certification", definition: "Certification is an actual file or certificate that a third-party company would provide you after the fact as proof that they indeed did what they said they would, which is sanitizing the drive and physically destroying the drive and providing the certification as proof that they did what they claimed they did." },
    { term: "Data retention", definition: "Data retention is the concept of a law that states that you have to retain or store data on a device in a company for a set period of time before you are allowed to delete it. So, for example, you can have a law or a policy which dictates in the company that all emails must be stored for a period of one year, but after that one-year period, you are allowed to delete as many emails as you want." },
  ],
  17: [
    { term: "Detective", definition: "Detective performs some sort of action after the event actually occurs, but it can't actually prevent or stop anything." },
    { term: "Preventative", definition: "Preventative controls are things like security guards, bollards, fencing, access control vestibules." },
    { term: "Corrective", definition: "Corrective control attempts to reverse the impact of an event after the event actually occurs. So, if there is a company that was affected by a ransomware incident using backups to restore your systems to a previous state is an example of corrective control because you're trying to get back to what you had initially before you were ever infected with that malware." },
    { term: "Compensating", definition: "Compensating control is a control type that comes into play when the primary control fails and you're forced to use something that is suboptimal, that's temporary, but it's the best thing you can do at the moment." },
  ],
  18: [
    { term: "Discretionary", definition: "Discretionary access control, or DAC, involves whereby the file owner, the person who created the files in the system, dictates which files are deleted, which files are kept, and who has access to view which files in the system." },
    { term: "Mandatory", definition: "Mandatory access control, or MAC, is when you have the IT administrator of the system, typically, who manages access to files in the system, not the file owner, because the IT administrator will assign these things known as security labels or security clearances to literally everything in the company. All resources, files, and users are assigned these security labels to ensure that they only have the necessary access to access certain files and not access every file. So, for example, if you did want a user to be able to access a file, you would set the user's security clearance as being secret, and you would set the file's security clearance as being top secret so that they do not have the necessary rights to access that file. But if you did want them to access a particular file, you would set the file as being secret and the user as being top secret, or better yet, the file and the user both having the security label as secret so that they can both access that file." },
    { term: "Role-based", definition: "Role-based access control or RBAC is an access control implementation whereby you only have access to files and folders based on what your actual job or role is in the company." },
    { term: "Rule-based", definition: "Rule-based access control is things like DLPs, data loss prevention systems, firewalls, IPS (intrusion prevention systems), which all use rules, which are the security configuration files that dictate what they should block or do in that company, which files should the DLP will search for and block in real time before it be transferred outside the network, what signatures should the antivirus software or IPS look for, or what rules should the firewall look at to know what to block in real time." },
  ],
  19: [
    { term: "WAF", definition: "WAF, or web application firewall is software that can be installed on the backend of web servers to block in real time web threats such as cross-site scripting, SQL injection, and buffer overflows. And combining this with input validation is very good security practice because they go well together." },
    { term: "IDS", definition: "IDS is a detection system, it can only detect threats, malware-based threats, but it can't actually prevent threats, especially web-based threats." },
    { term: "UTM", definition: "UTM is a unified threat management system whereby it is an all-in-one encompassing device. It includes things like spam filtering, content filtering, antivirus software, and some things like stateful firewalls, but a lot of times it does not include web application firewalls." },
    { term: "WPA3", definition: "WPA3 is Wi-Fi Protected Access version 3. This is an encryption standard that's used on wireless networks on routers to ensure that no one can brute force the password of that system." },
  ],
  20: [
    { term: "Confidentiality", definition: "Confidentiality is the concept of ensuring that data is not viewable or accessible by unauthorized users who shouldn't be viewing that data. VPNs, or virtual private networks, provide this end-to-end encrypted tunnel between endpoints or between devices whereby they use confidentiality alongside their encryption to ensure that no one can view that encrypted data except for the authorized users who have the appropriate private and public keys." },
    { term: "Integrity", definition: "Integrity is the concept of ensuring that data is not tampered or modified with, is commonly associated with file hashes." },
    { term: "Availability", definition: "Availability, from the CIA triad, ensures high system uptime for your resources, your users, and for your services in general to ensure that, especially in the event of something like a DDoS attack whereby there is a ton of traffic going to a web server, your load balancers would be able to handle that load and that users would be able to access those web services even in those times." },
    { term: "Non-repudiation", definition: "Non-repudiation is the concept of someone being unable to deny they performed a specific function because we have proof that they did perform that function. So, if someone is trying to deny they sent an email we have the proof that it's their own unique digital signature that's installed in their email, so they can't deny that they performed that function because we have this proof." },
  ],
  21: [
    { term: "UPS", definition: "UPS, or an uninterruptible power supply is a device that will provide your systems with some short-term temporary power so that they can have a graceful shutdown. And what that means is that they can have an appropriate shutdown instead of an abrupt one whereby there could be potential data loss if systems are abruptly shut down all of the sudden when the power is pulled." },
    { term: "TLS", definition: "TLS is transport layer security. This is used on HTTPS, or hypertext transfer protocol secure websites, which run on port 443 to provide you with this encryption." },
    { term: "Generator", definition: "Generator is a very large device that can take several minutes to come online, but it can provide your systems with potential hours or days of power in the event that the primary power source fails, but it's not allowed for a short-term solution or a graceful shutdown because it would take several minutes to come online, so the data would be lost regardless." },
    { term: "Jump server", definition: "Jump server is a hardened device whereby if you manage to successfully authenticate and connect to this one device, that one device would allow you to gain access to a multitude of internal devices in the company, so this can be a very good thing but also a very bad thing in potential scenarios because if the attacker manages to connect to this device, now the attacker has access to a myriad of systems in the network." },
  ],
  22: [
    { term: "MTBF", definition: "MTBF is mean time between failures. This is the average amount of time that a device will run for before it's expected to fail." },
    { term: "MTTR", definition: "MTTR, mean time to repair, the average amount of time that it's going to take a technician to repair a broken network device and bring it back online." },
    { term: "RTO", definition: "RTO, recovery time objective, the maximum amount of downtime that a company is willing to accept for a particular failed device." },
    { term: "RPO", definition: "RPO, recovery point objective, the maximum amount of data loss that a company is willing to tolerate in the event that something fails." },
  ],
  23: [
    { term: "PIN", definition: "PIN because they're already using iris scans, which are considered biometrics, they're considered something you are, and here facial recognition and fingerprint identification are both considered biometrics or something you are. Smart cards and hardware authentication tokens and mobile phones with one-time codes are all considered something you have because it's an object that you hold in your possession, whereas a PIN is the only one they're not using. They're not using the concept of something you know. Other examples of something you know are passwords, usernames, and security questions." },
    { term: "Facial recognition", definition: "Facial recognition and fingerprint identification are both considered biometrics or something you are." },
    { term: "Fingerprint identification", definition: "Facial recognition and fingerprint identification are both considered biometrics or something you are." },
    { term: "Mobile phone with one-time passcode", definition: "Smart cards and hardware authentication tokens and mobile phones with one-time codes are all considered something you have because it's an object that you hold in your possession." },
    { term: "Hardware authentication token", definition: "Hard authentication token is also considered something you have because you're holding it in your possession, and we're already using mobile phones with one-time codes, which are considered something you have, not something you know, leaving us with the only correct answer as something you know, which is a PIN. Other examples of something you know are things like passwords, usernames, security questions, and so on." },
    { term: "Iris scan", definition: "Iris scans are considered biometrics, they're considered something you are." },
  ],
  24: [
    { term: "Financial gain", definition: "Financial gain is the primary motivation of a gang that will demand payment for access to the private key to decrypt the company's files." },
    { term: "Philosophical/political beliefs", definition: "Philosophical/political beliefs are the primary motivation for hacktivists whereby they'll attempt to promote or propagate their philosophical or political message or belief." },
    { term: "Espionage", definition: "Espionage is the main motivator for nation-state hackers." },
    { term: "Blackmail", definition: "Blackmail is the main motivation for insider threats at a company." },
  ],
  25: [
    { term: "Federation", definition: "Federation involves someone authenticating to their current website using existing credentials from a third-party trusted identity provider." },
    { term: "Single sign-on", definition: "Single sign-on, or SSO is when you use a single set of credentials to access multiple services at a company." },
    { term: "Least privilege", definition: "Least privilege is the concept of ensuring that users don't have excessive rights or permissions beyond what's needed to perform their job or their role in the organization." },
    { term: "OAuth", definition: "OAuth, open authentication, is when you're using some sort of third-party app and then that app requests access to move forward with whatever you're trying to accomplish with the application." },
  ],
  26: [
    { term: "Lessons learned", definition: "Lessons learned is the very last phase of incident response whereby you take a look at what was done well, what could be improved upon next time, and how did the attacker actually manage to infiltrate the company systems in the first place, and this is where this root cause analysis takes place." },
    { term: "Eradication", definition: "Eradication is the phase which involves eradicating or erasing the malware that's been installed on the systems using specialized antivirus software." },
    { term: "Containment", definition: "Containment is actually quarantining or isolating the infected systems so that the malware that's installed on those systems does not spread to all the other devices in the company." },
    { term: "Recovery", definition: "Recovery is the incident response phase which involves using backups to restore your systems to their previous state, and this is considered a corrective control." },
  ],
  27: [
    { term: "Impossible travel", definition: "Impossible travel is when you have several users logging in to a single user account within a time span that is so unreasonable and from completely different countries." },
    { term: "Concurrent session usage", definition: "Concurrent session usage is just the concept that you have several users logging into a single account simultaneously." },
    { term: "Brute force", definition: "Brute force is the concept of trying endless passwords against a single user account." },
    { term: "Password spraying", definition: "Spraying is the act of using a handful of different passwords against a multitude of user accounts in attempt that they would eventually be able to find a user account that used their password." },
  ],
  28: [
    { term: "Bug bounty program", definition: "Bug bounty program is a program whereby ethical hackers will hack on a company's platform or website and they'll be provided with a list of attacks that they can and cannot perform and they are paid or compensated solely based on the vulnerabilities detected and reported." },
    { term: "Penetration test", definition: "Penetration test is an actual full-time job and while bug bounty programs can also be a full-time job, in most cases they're not, they're just a side hobby. Penetration testing is a full-time job whereby you do a multitude of things, not just detecting vulnerabilities. You're paid based on the reports you generate. You're paid on things like what recommendations did you provide the company after you've detected some sort of misconfiguration. You're paid on a multitude of different things, not just the vulnerabilities that you detected because in penetration testing you perform things like vulnerability scans, you exploit vulnerabilities, you do all this extra stuff that you would not do in a bug bounty program." },
    { term: "Open source intelligence (OSINT)", definition: "Open source intelligence or OSINT, the concept of looking at publicly available sources, so things like search engines or social media websites, to gather information on a company or on an individual." },
    { term: "Threat hunting", definition: "Threat hunting is the concept of proactively searching for real-time threats maybe lurking within a network, but you're not just waiting to see what happens, you're actively searching for threats to find them in real time so that they can stop hiding." },
  ],
  29: [
    { term: "Mitigation", definition: "Risk mitigation is the concept of implementing systems to reduce the potential impact or the potential for a risk to occur in the first place. Implementing IDS, IPS, firewalls, UTMs, WAF, input validation, and so on, these are all great security practices, but you're only reducing the risk to ensure that hopefully nothing happens, but you can never be 100% guaranteed that no one's ever going to exploit or gain access to your systems." },
    { term: "Avoidance", definition: "Risk avoidance is whereby you completely eliminate a particular risk to ensure that that risk can never be exploited. So, for example, if you did not want malware from the internet to be able to access your systems, you could physically disconnect the ethernet to your system because you don't have an internet connection." },
    { term: "Transference", definition: "Risk transfer is the concept of transferring the entirety of the risk to a third-party entity so that they can handle that burden. This is common in the concept of cybersecurity insurance whereby if you're affected with a ransomware incident, you can have this insurance so that all that goes on the cybersecurity insurance company instead of your company." },
    { term: "Acceptance", definition: "Risk acceptance is the concept of acknowledging that certain risks are present or could occur and you simply decide to move on with your day and not take any further action on those risks, you simply accept them. But here we're talking about reducing the potential impact." },
  ],
  30: [
    { term: "Complexity", definition: "Complexity is the concept including alphanumeric characters, letters, numbers, symbols, and all this extra stuff to make our passwords that much more complex and in turn, more difficult for the attacker to guess." },
    { term: "Length", definition: "Password length is the actual amount of characters that is used in the password, so saying things like 16 characters or 32 characters are very common." },
    { term: "Reuse", definition: "Password reuse is a very bad security practice whereby you reuse passwords across multiple systems or devices." },
    { term: "Expiration", definition: "Password expiration is a very good security practice in organizations whereby your passwords will periodically expire so that if an attacker were to gain access to one of your passwords from say a year ago, it would be invalid. They would not be able to use that password anymore. But here we're specifically talking about the password complexity aspect." },
  ],
})