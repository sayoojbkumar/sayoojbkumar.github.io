import { Code, Bug, Trophy, Shield } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-mono mb-2">
              <span className="text-muted-foreground">{'>'}</span> about.md
            </h2>
            <div className="h-1 w-20 bg-primary" />
          </div>

          {/* Main content */}
          <div className="bg-card border border-border rounded-md p-8 box-glow space-y-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-card-foreground leading-relaxed">
                Sayooj B Kumar is a passionate security researcher and engineer with a keen focus on 
                <span className="text-primary font-semibold"> API and web application security</span>. 
                He currently works as a security engineer at <span className="text-primary font-semibold">CRED</span>, 
                where he focuses on providing end-to-end product security and conducts research to enhance 
                SAST platforms and their integration into day-to-day security operations.
              </p>

              <p className="text-card-foreground leading-relaxed">
                From the early days of his cybersecurity journey, Sayooj has been actively involved in 
                CTF competitions, leading <span className="text-primary font-semibold">team Bi0s</span> to 
                become one of the top-ranking teams. In his spare time, he enjoys diving into vulnerability 
                research, bug bounty hunting, and tackling CTF challenges.
              </p>

              <p className="text-card-foreground leading-relaxed">
                His interests span various areas, including <span className="text-primary font-semibold">
                client-side security and side-channel attacks</span>, where he continually expands his expertise.
              </p>

              <p className="text-card-foreground leading-relaxed">
                In addition to his professional work, Sayooj has helped secure multiple organizations and 
                contributed to several open-source applications. His notable contributions include securing 
                StackOverflow (earning a spot in their Hall of Fame), enhancing security for deepnote.com, 
                and reporting multiple CVEs for securing Apache, Node packages, Gunicorn, and OpenLiteSpeed, 
                along with numerous contributions in private bug bounty programs.
              </p>
            </div>

            {/* Expertise areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              <div className="flex items-start gap-3 p-4 bg-secondary rounded border border-border">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-primary font-mono mb-1">Product Security</h3>
                  <p className="text-sm text-muted-foreground">
                    End-to-end security solutions | Specialized in securing applications and infrastructure
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-secondary rounded border border-border">
                <Code className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-primary font-mono mb-1">API Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Specialized in securing APIs and web applications
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-secondary rounded border border-border">
                <Trophy className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-primary font-mono mb-1">CTF Competitions</h3>
                  <p className="text-sm text-muted-foreground">
                    Leading team Bi0s to top rankings in global competitions
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-secondary rounded border border-border">
                <Bug className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-primary font-mono mb-1">Vulnerability Research</h3>
                  <p className="text-sm text-muted-foreground">
                    Bug bounty hunting and security research for major platforms
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
