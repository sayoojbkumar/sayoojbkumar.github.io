import { Mail, Linkedin, Github, Twitter, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      url: "mailto:sayooj@example.com",
      handle: "sayoojbkumar@gmail.com",
      color: "text-primary"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/sayooj-b-kumar-96a914195/",
      handle: "/in/sayoojbkumar",
      color: "text-cyber-cyan"
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/sayoojbkumar",
      handle: "@sayoojbkumar",
      color: "text-primary"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://x.com/_1nt3rc3pt0r_",
      handle: "@_1nt3rc3pt0r_",
      color: "text-cyber-cyan"
    }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-mono mb-2">
              <span className="text-muted-foreground">{'>'}</span> contact.sh
            </h2>
            <div className="h-1 w-20 bg-primary" />
          </div>

          {/* Terminal-style contact card */}
          <div className="bg-card border border-border rounded-md box-glow">
            <div className="bg-secondary px-4 py-2 flex items-center gap-2 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-code-red" />
                <div className="w-3 h-3 rounded-full bg-warning-amber" />
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
              <span className="text-xs text-muted-foreground ml-2 font-mono">~/contact</span>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <p className="font-mono text-muted-foreground">
                  <span className="text-primary">$</span> ./connect.sh --mode=collaborate
                </p>
                <p className="text-card-foreground leading-relaxed">
                  Interested in security research collaboration, CTF team-ups, or just want to discuss 
                  the latest vulnerabilities? Feel free to reach out through any of the channels below.
                </p>
              </div>

              {/* Social links grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="p-4 bg-secondary rounded border border-border hover:border-primary transition-all duration-300 hover:translate-x-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className={`w-5 h-5 ${link.color}`} />
                            <div>
                              <div className="font-semibold text-primary font-mono text-sm">
                                {link.name}
                              </div>
                              <div className="text-xs text-muted-foreground font-mono">
                                {link.handle}
                              </div>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="pt-6 border-t border-border">
                <div className="bg-secondary rounded p-6 border border-border">
                  <p className="font-mono text-sm text-muted-foreground mb-4">
                    <span className="text-primary">{'>'}</span> Looking for security consultation or 
                    research collaboration?
                  </p>
                  <Button 
                    variant="default"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
                    onClick={() => window.location.href = 'mailto:sayoojbkumar@gmail.com'}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-muted-foreground font-mono text-sm">
          <span className="text-primary">$</span> Built with security in mind © 2024 Sayooj B Kumar
        </p>
      </div>
    </section>
  );
};
