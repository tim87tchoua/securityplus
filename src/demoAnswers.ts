import type { AnswerSet } from "./types"

export const demoAnswerSet: AnswerSet = {
  id: "welcome-session",
  question: "How does a zero-trust security model reduce the risk of lateral movement?",
  createdAt: new Date().toISOString(),
  source: "demo",
  proposals: [
    {
      id: "clear",
      title: "Start with the core idea",
      style: "PLAIN LANGUAGE",
      answer: "Zero trust assumes no user or device is automatically safe, even after it joins the network. It checks identity and device health for each request, then grants only the access needed. If an attacker gets in, those small, verified permissions make it harder to move from one system to another.",
      terms: [
        { term: "Zero trust", definition: "A security approach that verifies every access request instead of trusting users or devices by default." },
        { term: "permissions", definition: "The specific actions or resources an identity is allowed to access." },
        { term: "move", definition: "Lateral movement: an attacker navigating from one compromised system to other systems." },
      ],
    },
    {
      id: "mechanism",
      title: "Explain how it works",
      style: "TECHNICAL",
      answer: "A zero-trust architecture combines strong identity checks, device posture, and least privilege. Policies are evaluated continuously, while network segmentation limits which services can communicate. Together, these controls contain a compromised account and reduce lateral movement across the environment.",
      terms: [
        { term: "zero-trust architecture", definition: "A system design that continuously verifies identity, device state, and access policy." },
        { term: "least privilege", definition: "Giving an account only the minimum access needed for its task." },
        { term: "network segmentation", definition: "Dividing a network into isolated zones to restrict unnecessary traffic." },
        { term: "lateral movement", definition: "An attacker's movement between systems after gaining an initial foothold." },
      ],
    },
    {
      id: "example",
      title: "Make it concrete",
      style: "WITH AN EXAMPLE",
      answer: "Imagine an employee laptop is stolen. A zero-trust system still asks the user to prove their identity with MFA and checks whether the device is healthy. The account can reach only approved apps, so the thief cannot use one stolen login to roam across the company network.",
      terms: [
        { term: "zero-trust", definition: "A model that verifies each request and does not assume a device is safe just because it is on the network." },
        { term: "MFA", definition: "Multi-factor authentication: proving identity with two or more different types of evidence." },
        { term: "approved apps", definition: "Applications explicitly permitted by the organization's access policy." },
      ],
    },
  ],
}