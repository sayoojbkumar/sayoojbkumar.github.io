import { Award, FileText, Shield, Users, Trophy, Bug, DollarSign, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Achievements = () => {
  const cves = [
    { 
      id: "CVE-2024-6827", 
      target: "Gunicorn",
      description: "HTTP Request Smuggling vulnerability in Gunicorn web server",
      link: "https://nvd.nist.gov/vuln/detail/CVE-2024-6827"
    },
    { 
      id: "CVE-2023-37379", 
      target: "Apache Airflow",
      description: "Server-Side Request Forgery (SSRF) vulnerability in Apache Airflow",
      link: "https://hackerone.com/reports/2123113"
    },
    { 
      id: "CVE-2021-23448", 
      target: "CONFIGHANDLER",
      description: "Prototype Pollution vulnerability in CONFIGHANDLER NodeJs package",
      link: "https://security.snyk.io/vuln/SNYK-JS-CONFIGHANDLER-1564947"
    },
    { 
      id: "CVE-2021-23718", 
      target: "SSRFAGENT",
      description: "SSRF Bypass vulnerability in SSRFAGENT NodeJs package",
      link: "https://security.snyk.io/vuln/SNYK-JS-SSRFAGENT-1584362"
    },
    { 
      id: "CVE-2024-31617", 
      target: "OpenLiteSpeed",
      description: "HTTP Request Smuggling vulnerability in OpenLiteSpeed web server",
      link: "https://www.cve.org/CVERecord?id=CVE-2024-31617"
    },
  ];

  const hallOfFame = [
    { 
      platform: "StackExchange", 
      description: "Identified security vulnerability in StackOverflow, earning a spot in their Hall of Fame. This discovery helped secure one of the world's largest developer communities.",
      icon: Shield,
      link: "https://stackexchange.com/about/security"
    },
    { 
      platform: "Deepnote", 
      description: "Identified security vulnerability in deepnote.com, earning recognition in their Hall of Fame. Enhanced security for the collaborative data science platform.",
      icon: Shield,
      link: "https://deepnote.com/.well-known/acknowledgments.txt"
    },
    { 
      platform: "1Shoppingcart.com", 
      description: "Identified Stored XSS vulnerability in 1Shoppingcart.com, contributing to improved security for e-commerce platforms.",
      icon: Shield,
      link: "https://bugcrowd.com/1nt3rc3pt0r"
    },
  ];

  const bugBounties = [
    {
      platform: "Private Program",
      amount: "$2,550",
      vulnerabilities: ["SSRF in Apache Airflow"],
      description: "Awarded $2,550 for discovering SSRF vulnerability in Apache Airflow, leading to CVE-2023-37379. This critical finding helped secure a widely-used workflow management platform.",
      icon: DollarSign
    },
    {
      platform: "Private Program",
      amount: "$1,925",
      vulnerabilities: ["XSS", "User De-Anonymization", "Reflected File Download"],
      description: "Awarded $1,925 for disclosing multiple vulnerabilities including XSS, user de-anonymization leak of emails and usernames, and reflected file download issues.",
      icon: DollarSign
    },
    {
      platform: "Private Program",
      amount: "$200",
      vulnerabilities: ["Socket Hijacking"],
      description: "Awarded $200 for identifying socket hijacking vulnerability, demonstrating expertise in network security and connection handling.",
      icon: DollarSign
    },
    {
      platform: "Twitter Open Source",
      amount: "Recognition",
      vulnerabilities: ["Security Vulnerability"],
      description: "Reported security vulnerability in Twitter's open source projects, contributing to the security of widely-used open source software.",
      icon: Bug,
      link: "https://sayoojbkumar.in/pwning/"
    },
  ];

  return (
    <section id="achievements" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-mono mb-2">
              <span className="text-muted-foreground">{'>'}</span> achievements.log
            </h2>
            <div className="h-1 w-20 bg-primary" />
          </div>

          {/* Main content */}
          <div className="bg-card border border-border rounded-md p-8 box-glow space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* CVEs */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-primary font-mono">CVE Contributions</h3>
                </div>
                {cves.map((cve) => (
                  <a
                    key={cve.id}
                    href={cve.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="p-3 bg-secondary rounded border border-border hover:border-primary transition-colors group">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-primary font-semibold text-sm">{cve.id}</span>
                        <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                        <Badge variant="outline" className="border-primary text-primary text-xs">
                          {cve.target}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {cve.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Hall of Fame */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-primary font-mono">Hall of Fame</h3>
                </div>
                {hallOfFame.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <a
                      key={achievement.platform}
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="p-3 bg-secondary rounded border border-border hover:border-primary transition-colors group">
                        <div className="flex items-start gap-2">
                          <Icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-primary font-mono text-sm">
                                {achievement.platform}
                              </h4>
                              <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

            </div>

            {/* Bug Bounties */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Bug className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-primary font-mono">Bug Bounty Achievements</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {bugBounties.map((bounty, index) => {
                  const Icon = bounty.icon;
                  const content = (
                    <div className={`p-3 bg-secondary rounded border border-border hover:border-primary transition-colors ${bounty.link ? "group" : ""}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                        <h4 className="font-semibold text-primary font-mono text-sm">
                          {bounty.platform}
                        </h4>
                        <span className="text-xs font-semibold text-cyber-cyan">
                          {bounty.amount}
                        </span>
                        {bounty.link && (
                          <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
                        )}
                      </div>
                      <div className="mb-1">
                        {bounty.vulnerabilities.map((vuln, i) => (
                          <Badge 
                            key={i}
                            variant="outline" 
                            className="border-primary text-primary text-xs mr-1 mb-1"
                          >
                            {vuln}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {bounty.description}
                      </p>
                    </div>
                  );
                  return bounty.link ? (
                    <a
                      key={index}
                      href={bounty.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </div>
            </div>

            {/* CTF Achievements */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-primary font-mono">Team Bi0s - CTF Excellence</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-secondary rounded border border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-primary font-mono text-sm">Top-Ranking Team</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Leading team Bi0s to become one of India's top-ranked CTF teams globally
                  </p>
                </div>
                <div className="p-3 bg-secondary rounded border border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-primary font-mono text-sm">Continuous Participation</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Actively competing in international CTF competitions and security challenges
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Contributions */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-primary font-mono">Open Source & Community Impact</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2 p-2 bg-secondary rounded border border-border">
                  <span className="text-primary font-mono">{'>'}</span>
                  <p className="text-xs text-muted-foreground">
                    Helped secure multiple organizations through responsible disclosure
                  </p>
                </div>
                <div className="flex items-start gap-2 p-2 bg-secondary rounded border border-border">
                  <span className="text-primary font-mono">{'>'}</span>
                  <p className="text-xs text-muted-foreground">
                    Contributed to several open-source applications with security enhancements
                  </p>
                </div>
                <div className="flex items-start gap-2 p-2 bg-secondary rounded border border-border">
                  <span className="text-primary font-mono">{'>'}</span>
                  <p className="text-xs text-muted-foreground">
                    Made numerous contributions in private bug bounty programs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
