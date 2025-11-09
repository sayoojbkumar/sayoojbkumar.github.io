import { Mic, GraduationCap, Presentation, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Speaking = () => {
  const speakingEngagements = [
    {
      type: "Training",
      title: "Turbocharge Your Secure Code Reviews with CodeQL",
      event: "BSides Singapore 2024",
      description: "Conducted training workshop on SAST platforms and CodeQL for secure code reviews at BSides Singapore conference.",
      link: "https://bsidessg.org/archive/bsidessg2024/",
      icon: GraduationCap,
      badge: "Training"
    },
    {
      type: "Presentation",
      title: "Arsenal Presentation",
      event: "BlackHat USA & Europe",
      description: "Presented at BlackHat Arsenal, showcasing security research and tools to the global cybersecurity community.",
      link: "https://blackhat.com/us-25/arsenal/schedule/presenters.html#sayooj-b-kumar-50306",
      icon: Presentation,
      badge: "Conference"
    },
    {
      type: "Speaker",
      title: "Security Research & Insights",
      event: "bi0s Meetup",
      description: "Speaker at bi0s meetup, sharing knowledge and insights on cybersecurity research with the community.",
      link: "https://www.bi0smeetup.in/",
      icon: Mic,
      badge: "Meetup"
    }
  ];

  return (
    <section id="speaking" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-mono mb-2">
              <span className="text-muted-foreground">{'>'}</span> community_contributions.md
            </h2>
            <div className="h-1 w-20 bg-primary" />
          </div>

          {/* Main content */}
          <div className="bg-card border border-border rounded-md p-8 box-glow space-y-4">
            {speakingEngagements.map((engagement, index) => {
              const Icon = engagement.icon;
              return (
                <a
                  key={index}
                  href={engagement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="p-4 bg-secondary rounded border border-border hover:border-primary transition-colors group">
                    <div className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-primary font-mono text-sm">
                            {engagement.title}
                          </h3>
                          <Badge variant="outline" className="border-primary text-primary text-xs">
                            {engagement.badge}
                          </Badge>
                          <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <p className="text-xs text-muted-foreground font-semibold mb-1">
                          {engagement.event}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {engagement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

