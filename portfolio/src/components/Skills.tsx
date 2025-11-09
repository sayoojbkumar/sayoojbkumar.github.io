import { Code, Shield, Cloud, Zap, Target, Eye, Terminal, Award } from "lucide-react";

export const Skills = () => {
  const skillCategories = [
    {
      category: "Application Security",
      icon: Shield
    },
    {
      category: "Secure Development",
      icon: Code
    },
    {
      category: "Cloud Security",
      icon: Cloud
    },
    {
      category: "Automation & DevSecOps",
      icon: Zap
    },
    {
      category: "Pentesting & Exploitation",
      icon: Target
    },
    {
      category: "Secure Coding",
      icon: Eye
    },
    {
      category: "Secure Code Review",
      icon: Terminal
    },
    {
      category: "Threat modeling and Mitigations",
      icon: Award
    }
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-mono mb-2">
              <span className="text-muted-foreground">{'>'}</span> skills.txt
            </h2>
            <div className="h-1 w-20 bg-primary" />
          </div>

          {/* Main content */}
          <div className="bg-card border border-border rounded-md p-8 box-glow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {skillCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.category}
                    className="flex items-center gap-3 p-4 bg-secondary rounded border border-border hover:border-primary transition-colors"
                  >
                    <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-semibold text-primary font-mono text-sm">
                      {category.category}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

