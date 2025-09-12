import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, BookOpen, Target, Clock, CheckCircle2, Trophy, ArrowRight } from "lucide-react";

const plays = [
  {
    number: 1,
    title: "Own the First Tackle",
    onPitch: "Set the tone early. First contact, first sprint, first win — it changes the whole match.",
    inBoardroom: "Open meetings with a decisive fact or clear decision request. Establish pace and authority.",
    drill: "Write your opening sentence in advance. Deliver it within 10 seconds. No preamble."
  },
  {
    number: 2,
    title: "Control Your Breath, Control the Game",
    onPitch: "When the stadium roars, lungs lead. Calm body, calm choices.",
    inBoardroom: "Before high-stakes calls, run a 4-4-8 breathing cycle to reset physiology.",
    drill: "Inhale 4, hold 4, exhale 8. Repeat 4 times. Then state your top objective out loud."
  },
  {
    number: 3,
    title: "Play the Man, Not the Moment",
    onPitch: "Pressure spikes make players reactive. Study tendencies and exploit patterns.",
    inBoardroom: "Know your counterpart's incentives. Prepare three likely objections and your counters.",
    drill: "Write: Their win, their fear, their next move. Plan your response to each."
  },
  {
    number: 4,
    title: "Win Your Duel, Win the Day",
    onPitch: "Every match is a series of 1v1s. Win more duels than you lose.",
    inBoardroom: "Assign owners for every critical metric. Accountability beats committees.",
    drill: "For the next meeting, put one name next to each outcome. No outcome without an owner."
  },
  {
    number: 5,
    title: "Turn Noise into Fuel",
    onPitch: "Boos, headlines, pressure — convert it into intensity, not distraction.",
    inBoardroom: "Reframe stress as energy: 'This matters, so my body is preparing me to perform.'",
    drill: "Write a 1-line reframe before tough events. Read it right before you enter."
  },
  {
    number: 6,
    title: "Reset Fast After Errors",
    onPitch: "Mistakes happen. Champions recover in seconds, not halves.",
    inBoardroom: "Institute a 30-second post-error protocol: acknowledge, extract learning, re-commit.",
    drill: "Say: 'That's on me. Next play is ___.' Then immediately make the next positive action."
  },
  {
    number: 7,
    title: "Communicate Like a Captain",
    onPitch: "Simple, loud, constant. Captains reduce chaos with clarity.",
    inBoardroom: "Use the 3C call: Context (why), Command (what), Confirm (got it?).",
    drill: "Before you speak, script one sentence for each C. Deliver in under 20 seconds."
  },
  {
    number: 8,
    title: "Protect the Dressing Room",
    onPitch: "Culture wins titles. Standards guard the room from excuses and ego.",
    inBoardroom: "Define two non-negotiables and one consequence. Publish them; enforce them.",
    drill: "Write your two standards (e.g., on time, prepared) and the consequence. Share today."
  },
  {
    number: 9,
    title: "Train for Chaos",
    onPitch: "Unpredictable bounces decide games. Practice discomfort so it's familiar.",
    inBoardroom: "Run red-team drills and timed decisions. Limit information, force clarity.",
    drill: "Weekly 15-min chaos sprint: remove one resource, set a 7-min timer, decide and execute."
  },
  {
    number: 10,
    title: "Finish Ruthlessly",
    onPitch: "Chances are rare. Clinical finishers make careers.",
    inBoardroom: "End every meeting with a clear close: owner, deadline, success metric.",
    drill: "Use the Finisher's Script: 'To close: Owner = X, Deadline = Y, Success = Z. Any blockers?'"
  }
];

const checklistItems = [
  "Opening line scripted (10s)",
  "Breath cycle complete (4-4-8 x4)",
  "Opponent incentives and 3 objections mapped",
  "Owners assigned to outcomes",
  "Stress reframe written",
  "Post-error protocol ready",
  "3C call drafted (Context, Command, Confirm)",
  "Standards shared and enforced",
  "Chaos sprint scheduled this week",
  "Finisher's Script ready to close"
];

export default function Playbook() {
  const handleDownload = () => {
    // Create a blob with the playbook content
    const content = `
The Champion's Pressure Playbook
Patrice Evra's 10 strategies for performing under pressure — from Old Trafford to the boardroom.

${plays.map(play => `
Play ${play.number}: ${play.title}

On the Pitch: ${play.onPitch}
In the Boardroom: ${play.inBoardroom}
90-Second Drill: ${play.drill}
`).join('')}

Matchday Checklist:
${checklistItems.map(item => `☐ ${item}`).join('\n')}

© The Pressure Play. For personal use only.
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'champions-pressure-playbook.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              Free Download
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text font-display">
              The Champion's Pressure Playbook
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Patrice Evra's 10 strategies for performing under pressure — from Old Trafford to the boardroom.
              <br />
              <strong>Read this like a pre-match talk.</strong>
            </p>
            
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 mb-8">
              <p className="text-body text-muted-foreground">
                Pressure doesn't vanish. You master it. These 10 plays translate elite football habits to everyday 
                leadership — so founders, operators, and teams can win when it counts.
              </p>
            </div>

            <Button 
              onClick={handleDownload}
              size="lg"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/25"
              data-testid="download-playbook"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Playbook
            </Button>
          </div>

          {/* How to Use */}
          <Card className="mb-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Target className="w-6 h-6 mr-2 text-primary" />
                How to Use This Playbook
              </h2>
              <p className="text-muted-foreground">
                Each play includes: <strong>On the Pitch</strong> (Patrice's mindset), <strong>In the Boardroom</strong> (your translation), 
                and a <strong>90-Second Drill</strong> you can run before a meeting, pitch, or high-stakes decision.
              </p>
            </CardContent>
          </Card>

          {/* The 10 Plays */}
          <div className="space-y-8 mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 font-display">
              The 10 Championship Plays
            </h2>
            
            {plays.map((play, index) => (
              <Card key={play.number} className="border border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {play.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-4">{play.title}</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-primary mb-2 flex items-center">
                            <Trophy className="w-4 h-4 mr-2" />
                            On the Pitch
                          </h4>
                          <p className="text-muted-foreground">{play.onPitch}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-secondary mb-2 flex items-center">
                            <Target className="w-4 h-4 mr-2" />
                            In the Boardroom
                          </h4>
                          <p className="text-muted-foreground">{play.inBoardroom}</p>
                        </div>
                        
                        <div className="bg-muted/30 rounded-lg p-4">
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            90-Second Drill
                          </h4>
                          <p className="text-sm text-muted-foreground">{play.drill}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Matchday Checklist */}
          <Card className="mb-12 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center text-green-800">
                <CheckCircle2 className="w-6 h-6 mr-2" />
                Matchday Checklist
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {checklistItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-green-600 rounded flex-shrink-0"></div>
                    <span className="text-sm text-green-800">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 font-display">
                  Ready to Apply Championship Thinking?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Listen to The Pressure Play with Patrice Evra — new episodes drop weekly with more strategies 
                  for performing under pressure.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleDownload}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/5"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Again
                  </Button>
                  <Button 
                    asChild
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <a href="/newsletter">
                      Join Elite Circle
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-sm text-muted-foreground">
            <p>© The Pressure Play. For personal use only. Not affiliated with Manchester United. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}