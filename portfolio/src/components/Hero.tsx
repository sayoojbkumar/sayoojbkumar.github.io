import { useEffect, useState } from "react";
import { Terminal, Shield, Code2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "$ whoami";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="scanline absolute inset-0 h-1 bg-primary" />
      </div>

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Terminal header */}
          <div className="bg-card border border-border rounded-t-md overflow-hidden box-glow">
            <div className="bg-secondary px-4 py-2 flex items-center gap-2 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-code-red" />
                <div className="w-3 h-3 rounded-full bg-warning-amber" />
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
              <span className="text-xs text-muted-foreground ml-2 font-mono">security@localhost:~</span>
            </div>
            
            <div className="p-8 space-y-6">
              {/* Terminal prompt */}
              <div className="font-mono text-primary">
                {displayText}
                <span className="terminal-cursor">▋</span>
              </div>

              {/* Name and title with glitch effect */}
              <div className="space-y-2 animate-slide-in">
                <h1 className="text-4xl md:text-6xl font-bold text-primary text-glow glitch">
                  SAYOOJ B KUMAR
                </h1>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-mono text-primary">{'>'}</span>
                  <h2 className="text-xl md:text-2xl text-card-foreground">
                    Security Engineer & Researcher
                  </h2>
                </div>
              </div>

              {/* Role highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-3 p-3 bg-secondary rounded border border-border hover:border-primary transition-colors">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground font-mono">current_role</div>
                    <div className="text-sm font-semibold">Senior Security Engineer @CRED</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary rounded border border-border hover:border-primary transition-colors">
                  <Terminal className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground font-mono">team</div>
                    <div className="text-sm font-semibold">Bi0s CTF</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary rounded border border-border hover:border-primary transition-colors">
                  <Code2 className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground font-mono">specialization</div>
                    <div className="text-sm font-semibold">API & WEB Security</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  variant="default" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
                  onClick={() => scrollToSection("achievements")}
                >
                  <Terminal className="w-4 h-4 mr-2" />
                  ./view_achievements.sh
                </Button>
                <Link to="/blogs/">
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-mono"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    ./read_blog.sh
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-mono"
                  onClick={() => scrollToSection("contact")}
                >
                  {'>'} contact --now
                </Button>
              </div>

              {/* Quick intro */}
              <div className="pt-4 border-t border-border">
                <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                  <span className="text-primary">$</span> cat about.txt<br />
                  <span className="text-card-foreground">
                    I’m Sayooj B Kumar, a Security Engineer with 5+ years of experience helping teams build and ship secure, resilient products. My work spans application and product security, from uncovering vulnerabilities to designing scalable defenses that enable faster, safer releases.
                    I specialize in vulnerability research, offensive security, and building scalable security processes that blend seamlessly into development pipelines — ensuring security strengthens delivery, not slows it down.
                    I’ve contributed to the broader ecosystem through bug bounty programs, open-source security enhancements, and the discovery of multiple CVEs in projects like Apache, Node.js packages, and OpenLiteSpeed.
                    Whether it’s helping teams uncover hidden weaknesses, automating security reviews with CodeQL, or mentoring the next generation of hackers, I’m driven by one goal — to make security an enabler of innovation for every product I work with.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
