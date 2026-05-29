import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  X,
  Eye,
  RotateCcw,
  Pencil,
  Copy,
  Plus,
  Trash2,
  ChevronDown,
  PanelRight,
  PanelLeftClose,
  LayoutGrid,
  Loader2,
  Sparkles,
  Send,
  Mail,
  Search,
  MessageSquare,
  Terminal,
  ChevronRight,
  BarChart3,
  Users,
  UserSearch,
  CheckCircle2,
  ArrowRight,
  Play,
  Github,
  Globe,
  FileText,
  ImagePlus,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface WorkflowCanvasProps {
  activeTab: string; // 'seo' | 'social' | 'prospects' | 'emails' | 'audits'
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
}

// Full Hydration Scenario Data from source.txt
const SCENARIOS = [
  {
    id: "rank-on-ai-search",
    tabKey: "seo", // maps to activeTab === 'seo'
    tabLabel: "Rank on AI search",
    windowTitle: "AI Citation Optimizer",
    messages: [
      {
        id: "r1",
        role: "user",
        content: "I want my SaaS to show up when people ask ChatGPT and Perplexity for tools like mine."
      },
      {
        id: "r2",
        role: "assistant",
        content: "I can help with that. What's your site URL?"
      },
      {
        id: "r3",
        role: "user",
        content: "trylumen.com"
      },
      {
        id: "r4",
        role: "assistant",
        content: "I checked 184 questions across ChatGPT, Perplexity, and Claude. You're currently cited in 13 responses. Your competitors (HubSpot, Apollo, Lemlist) are cited 2-10x more often. I found 6 specific gaps where you're missing. Here's the full report.",
        toolCall: {
          name: "geo_citation_report",
          input: { siteUrl: "trylumen.com" },
          output: {
            totalQuestions: 184,
            siteUrl: "https://trylumen.com",
            platformBreakdown: {
              ChatGPT: { total: 184, withCitations: 112, ourSiteCited: 7 },
              Perplexity: { total: 184, withCitations: 156, ourSiteCited: 4 },
              Claude: { total: 184, withCitations: 89, ourSiteCited: 2 }
            },
            citedBrands: [
              { brand: "HubSpot", count: 142, pct: 77 },
              { brand: "Mailchimp", count: 98, pct: 53 },
              { brand: "Apollo.io", count: 76, pct: 41 },
              { brand: "Lemlist", count: 54, pct: 29 },
              { brand: "Lumen (Us)", count: 13, pct: 7 }
            ],
            gaps: [
              { question: "What is the best cold email tool for startups?", opportunity: "Create comparison guide targeting this query" },
              { question: "How to improve email deliverability for SaaS?", opportunity: "Write technical guide on email infrastructure" },
              { question: "Best AI tools for B2B lead generation?", opportunity: "Publish lead gen playbook featuring your approach" },
              { question: "How to automate outbound sales?", opportunity: "Create outbound automation framework article" },
              { question: "What tools do YC startups use for growth?", opportunity: "Write case study on startup growth stacks" },
              { question: "How to get more replies to cold emails?", opportunity: "Publish personalization techniques guide" }
            ],
            contentFreshness: { totalPages: 28, freshPages: 19, stalePages: 9 }
          }
        }
      },
      {
        id: "r5",
        role: "user",
        content: "Can you fix these gaps?"
      },
      {
        id: "r6",
        role: "assistant",
        content: "Yes. I've set up a recurring workflow that monitors your AI citations weekly, finds new gaps, and creates content PRs targeting them. You review and merge when ready."
      }
    ],
    workflowSteps: [
      { id: "geo_monitor", label: "Monitor AI Citations", category: "Geo Monitor", output: "Checked 184 questions across 3 platforms" },
      { id: "geo_content_audit", label: "Audit Content Gaps", category: "Geo Content Audit", output: "6 gaps identified" },
      { id: "seo_create_plan", label: "Create Content Plan", category: "Seo Plan", output: "Plan created for 6 content pieces" },
      { id: "github_create_content_pr", label: "Create Content PRs", category: "Github PR", output: "3 articles generated, PRs ready" }
    ]
  },
  {
    id: "monitor-social",
    tabKey: "social",
    tabLabel: "Monitor social",
    windowTitle: "Social Lead Finder",
    messages: [
      {
        id: "s1",
        role: "user",
        content: "Find people on Reddit and Twitter who are struggling with cold email outreach and deliverability."
      },
      {
        id: "s2",
        role: "assistant",
        content: "What specific problems should I look for? For example: deliverability issues, low reply rates, tool fatigue, warmup pain, personalization challenges?"
      },
      {
        id: "s3",
        role: "user",
        content: "All of those. Especially people comparing tools or looking for alternatives."
      },
      {
        id: "s4",
        role: "assistant",
        content: "Found 127 relevant conversations across Reddit and Twitter from the last 7 days. The highest-intent ones are people actively looking for tool recommendations or describing specific pain points. Here are the results.",
        toolCall: {
          name: "search_social_posts",
          input: { keywords: ["email deliverability", "cold outreach", "warmup"] },
          output: {
            totalFound: 127,
            posts: [
              {
                id: "tw-1",
                platform: "twitter",
                authorName: "Sarah Kim",
                authorHandle: "founder_sarah",
                followers: "8.4k",
                text: "We've been struggling with email deliverability for months. Tried Sendgrid, Mailgun, and Postmark. Our open rates tanked from 45% to 12%. Anyone have a solution that actually works for cold outreach at scale?",
                engagement: { likes: 287, comments: 42, shares: 89 }
              },
              {
                id: "rd-1",
                platform: "reddit",
                authorName: "throwaway_founder",
                subreddit: "r/SaaS",
                upvoteRatio: "94%",
                title: "Our cold email reply rate dropped from 8% to 1%. What changed?",
                text: "We used to get solid reply rates on our outbound. Same ICP, same offer, but replies just fell off a cliff. Tried rewriting sequences, switching ESPs, nothing works. Is cold email just dead for SaaS or are we doing something wrong?",
                engagement: { likes: 342, comments: 87 }
              },
              {
                id: "tw-2",
                platform: "twitter",
                authorName: "Marcus Chen",
                authorHandle: "devtool_cto",
                followers: "12.3k",
                text: "Hot take: most \"AI outreach tools\" just spray and pray with slightly better copy. The personalization is surface level. What I want is something that actually researches the prospect before writing.",
                engagement: { likes: 534, comments: 67, shares: 145 }
              },
              {
                id: "rd-2",
                platform: "reddit",
                authorName: "series_a_grind",
                subreddit: "r/startups",
                upvoteRatio: "91%",
                title: "Looking for an alternative to Apollo + Instantly + Lemlist stack",
                text: "Currently paying $400/mo across three tools for outbound. Apollo for leads, Instantly for warmup, Lemlist for sequences. Looking for something that does it all in one place without the complexity. Any recommendations?",
                engagement: { likes: 189, comments: 56 }
              },
              {
                id: "tw-3",
                platform: "twitter",
                authorName: "Jen Park",
                authorHandle: "indie_dev_jen",
                followers: "3.2k",
                text: "Spent the entire weekend trying to set up email warmup for our new domain. Why is this still so painful in 2026? I just want to send cold emails without landing in spam.",
                engagement: { likes: 156, comments: 31, shares: 28 }
              }
            ]
          }
        }
      }
    ],
    workflowSteps: []
  },
  {
    id: "find-prospects",
    tabKey: "prospects",
    tabLabel: "Find prospects",
    windowTitle: "Prospect Finder",
    messages: [
      {
        id: "p1",
        role: "user",
        content: "Find marketing directors and VPs at Series A SaaS companies in the US."
      },
      {
        id: "p2",
        role: "assistant",
        content: "Found 47 contacts matching your criteria. Each one has been enriched with email, title, company, and LinkedIn profile. Here's the full list.",
        toolCall: {
          name: "search_contacts",
          input: { query: "marketing directors at Series A SaaS companies" },
          output: {
            totalFound: 47,
            contacts: [
              { id: "c1", name: "Rachel Torres", email: "rachel@growthstack.io", title: "VP of Marketing", company: "GrowthStack", location: "San Francisco, CA", initials: "RT" },
              { id: "c2", name: "David Kim", email: "david.kim@launchmetrics.com", title: "Head of Growth", company: "LaunchMetrics", location: "New York, NY", initials: "DK" },
              { id: "c3", name: "Priya Sharma", email: "priya@scaleup.co", title: "Marketing Director", company: "ScaleUp", location: "Austin, TX", initials: "PS" },
              { id: "c4", name: "James Wright", email: "jwright@velocity.ai", title: "CMO", company: "Velocity AI", location: "San Francisco, CA", initials: "JW" },
              { id: "c5", name: "Nina Patel", email: "nina@funnel.dev", title: "Growth Lead", company: "Funnel Dev", location: "Seattle, WA", initials: "NP" },
              { id: "c6", name: "Alex Rivera", email: "alex@basecamp.tech", title: "VP Marketing", company: "Basecamp Tech", location: "Denver, CO", initials: "AR" },
              { id: "c7", name: "Maria Santos", email: "maria@pipeline.io", title: "Director of Demand Gen", company: "Pipeline", location: "Chicago, IL", initials: "MS" }
            ]
          }
        }
      },
      {
        id: "p3",
        role: "user",
        content: "Great. Can you draft personalized emails to the top 10?"
      },
      {
        id: "p4",
        role: "assistant",
        content: "Sure. What's your product and what problem does it solve for them? I'll use that to personalize each email."
      }
    ],
    workflowSteps: []
  },
  {
    id: "send-cold-emails",
    tabKey: "emails",
    tabLabel: "Send cold emails",
    windowTitle: "Cold Email Campaign",
    messages: [
      {
        id: "ce1",
        role: "user",
        content: "Draft personalized cold emails to the top contacts from my list."
      },
      {
        id: "ce2",
        role: "assistant",
        content: "What's your product and what problem does it solve? I'll use that to make each email specific to the recipient."
      },
      {
        id: "ce3",
        role: "user",
        content: "We help SaaS companies get cited by AI search engines like ChatGPT and Perplexity."
      },
      {
        id: "ce4",
        role: "assistant",
        content: "Here are 4 personalized drafts. I've also set up a recurring workflow that finds new contacts, drafts emails, and queues them for your approval each week.",
        toolCall: {
          name: "drafts_created",
          input: { productDescription: "AI citation optimization for SaaS" },
          output: {
            totalCount: 4,
            drafts: [
              {
                id: "e-1",
                toEmail: "rachel@growthstack.io",
                toName: "Rachel Torres",
                subject: "GrowthStack on ChatGPT",
                body: "Hi Rachel,\n\nI asked ChatGPT \"best tools for scaling outbound\" and GrowthStack didn't come up. Apollo and Lemlist did.\n\nWe fix that. One of our users went from 3 AI citations to 40+ in six weeks.\n\nWorth a look?"
              },
              {
                id: "e-2",
                toEmail: "david.kim@launchmetrics.com",
                toName: "David Kim",
                subject: "LaunchMetrics is invisible to AI search",
                body: "Hi David,\n\nI ran a quick check. When people ask Perplexity or ChatGPT about analytics tools, LaunchMetrics doesn't show up. Your competitors do.\n\nWe help SaaS companies fix that. Happy to share the full report if you're curious."
              },
              {
                id: "e-3",
                toEmail: "priya@scaleup.co",
                toName: "Priya Sharma",
                subject: "ScaleUp vs Apollo on Perplexity",
                body: "Hi Priya,\n\nApollo gets cited in 76 AI search responses. ScaleUp gets cited in 0.\n\n40% of B2B buyers now research tools through ChatGPT before Google. We help companies close that gap. Want to see where ScaleUp stands?"
              },
              {
                id: "e-4",
                toEmail: "jwright@velocity.ai",
                toName: "James Wright",
                subject: "Velocity AI citations",
                body: "Hi James,\n\nVelocity AI shows up in about 5% of relevant AI search queries. Your competitors are at 15-25%.\n\nWe can fix that. Happy to share the full breakdown."
              }
            ]
          }
        }
      }
    ],
    workflowSteps: [
      { id: "search_contacts", label: "Find Contacts", category: "Search Contacts", output: "47 relevant contacts found" },
      { id: "ensure_email_infrastructure", label: "Setup Email", category: "Ensure Email Infrastructure", output: "Email infrastructure ready" },
      { id: "draft_emails", label: "Draft Emails", category: "Draft Emails", output: "4 personalized emails ready" },
      { id: "send_email", label: "Send Emails", category: "Send Emails", output: "Sending emails..." }
    ]
  },
  {
    id: "run-seo-audit",
    tabKey: "audits",
    tabLabel: "Run SEO audit",
    windowTitle: "SEO Audit Tools",
    messages: [
      {
        id: "a1",
        role: "user",
        content: "Run an SEO audit on my site and find keyword opportunities."
      },
      {
        id: "a2",
        role: "assistant",
        content: "What's your site URL?"
      },
      {
        id: "a3",
        role: "user",
        content: "trylumen.com"
      },
      {
        id: "a4",
        role: "assistant",
        content: "Audited your site and found 8 keyword opportunities. Here's the full breakdown with search volumes, difficulty scores, and competitor analysis.",
        toolCall: {
          name: "seo_keyword_research",
          input: { siteUrl: "trylumen.com" },
          output: {
            keywordMetrics: [
              { keyword: "best AI marketing tools 2026", volume: 8200, difficulty: 42, cpc: "$3.20", intent: "Commercial" },
              { keyword: "AI marketing automation", volume: 6100, difficulty: 55, cpc: "$4.10", intent: "Commercial" },
              { keyword: "how to get cited by ChatGPT", volume: 4800, difficulty: 28, cpc: "$1.90", intent: "Informational" },
              { keyword: "cold email automation for SaaS", volume: 3900, difficulty: 48, cpc: "$5.30", intent: "Commercial" },
              { keyword: "AI SEO vs traditional SEO", volume: 3200, difficulty: 35, cpc: "$2.10", intent: "Informational" },
              { keyword: "GEO optimization guide", volume: 1900, difficulty: 15, cpc: "$1.40", intent: "Informational" },
              { keyword: "outbound sales automation tools", volume: 5200, difficulty: 52, cpc: "$6.80", intent: "Commercial" },
              { keyword: "reddit lead generation", volume: 2800, difficulty: 22, cpc: "$2.30", intent: "Informational" },
              { keyword: "email deliverability best practices", volume: 7300, difficulty: 61, cpc: "$3.50", intent: "Informational" }
            ],
            serpCompetitors: [
              { domain: "hubspot.com", avgPos: 3.2, medianPos: 2, visibility: "78%" },
              { domain: "semrush.com", avgPos: 4.1, medianPos: 3, visibility: "65%" },
              { domain: "ahrefs.com", avgPos: 5.5, medianPos: 4, visibility: "52%" },
              { domain: "mailchimp.com", avgPos: 6.8, medianPos: 6, visibility: "41%" },
              { domain: "apollo.io", avgPos: 8.2, medianPos: 7, visibility: "28%" }
            ]
          }
        }
      },
      {
        id: "a5",
        role: "user",
        content: "Start with the low difficulty ones."
      },
      {
        id: "a6",
        role: "assistant",
        content: "On it. I'll create optimized content for the 3 low-competition keywords and push them as GitHub PRs. You'll get a notification in Slack when they're ready for review."
      }
    ],
    workflowSteps: []
  }
];

export default function WorkflowCanvas({ activeTab, setActiveTab, darkMode }: WorkflowCanvasProps) {
  // Find scenario based on active tab
  const scenario = useMemo(() => {
    return SCENARIOS.find(s => s.tabKey === activeTab) || SCENARIOS[0];
  }, [activeTab]);

  // Mobile navigation tab inside mockup
  const [mobileSubTab, setMobileSubTab] = useState<'chat' | 'preview' | 'workflow'>('preview');

  // Interactive Playback State
  const [revealedMessages, setRevealedMessages] = useState<any[]>([]);
  const [currentMsgIdx, setCurrentMsgIdx] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [activeToolRun, setActiveToolRun] = useState<string | null>(null);
  const [toolCompleted, setToolCompleted] = useState<boolean>(false);
  const [playbackKey, setPlaybackKey] = useState<number>(0); // force reset

  // Right Side Panel Tabs
  const [activeRightTab, setActiveRightTab] = useState<'workflows' | 'preview'>('preview');
  const hasWorkflow = scenario.workflowSteps.length > 0;

  // Track executing node inside workflow diagram
  const [workflowNodeStates, setWorkflowNodeStates] = useState<Record<string, 'idle' | 'running' | 'completed'>>({});

  // Active email draft tab state
  const [selectedEmailIdx, setSelectedEmailIdx] = useState<number>(0);

  // Collapsible sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Scenario dropdown state
  const [isScenarioDropdownOpen, setIsScenarioDropdownOpen] = useState<boolean>(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsScenarioDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set default tabs depending on scenario workflow availability
  useEffect(() => {
    setActiveRightTab('preview');
    setMobileSubTab('preview');
  }, [scenario, hasWorkflow]);

  // Restart playback when tab changes
  useEffect(() => {
    setRevealedMessages([]);
    setCurrentMsgIdx(0);
    setIsTyping(false);
    setActiveToolRun(null);
    setToolCompleted(false);
    setSelectedEmailIdx(0);

    // Initial workflow node states
    const initialStates: Record<string, 'idle' | 'running' | 'completed'> = {};
    scenario.workflowSteps.forEach(step => {
      initialStates[step.id] = 'idle';
    });
    setWorkflowNodeStates(initialStates);

    setPlaybackKey(prev => prev + 1);
  }, [scenario]);

  // Playback loop
  useEffect(() => {
    let active = true;
    const playTimeline = async () => {
      if (currentMsgIdx >= scenario.messages.length) return;

      const nextMsg = scenario.messages[currentMsgIdx];

      if (nextMsg.role === 'assistant') {
        // Show typing indicator
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1400));
        if (!active) return;
        setIsTyping(false);

        // Add message
        setRevealedMessages(prev => [...prev, nextMsg]);

        // Trigger tool run if message has toolCall
        if (nextMsg.toolCall) {
          setActiveToolRun(nextMsg.toolCall.name);
          setToolCompleted(false);

          // Animate nodes in workflow diagram
          if (scenario.id === 'rank-on-ai-search') {
            // geo_monitor runs
            setWorkflowNodeStates(prev => ({ ...prev, geo_monitor: 'running' }));
            await new Promise(resolve => setTimeout(resolve, 1200));
            if (!active) return;
            setWorkflowNodeStates(prev => ({ ...prev, geo_monitor: 'completed' }));
          } else if (scenario.id === 'send-cold-emails') {
            // Find Contacts, Setup Email, Draft Emails
            setWorkflowNodeStates(prev => ({ ...prev, search_contacts: 'running' }));
            await new Promise(resolve => setTimeout(resolve, 800));
            if (!active) return;
            setWorkflowNodeStates(prev => ({ ...prev, search_contacts: 'completed', ensure_email_infrastructure: 'running' }));
            await new Promise(resolve => setTimeout(resolve, 800));
            if (!active) return;
            setWorkflowNodeStates(prev => ({ ...prev, ensure_email_infrastructure: 'completed', draft_emails: 'running' }));
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (!active) return;
            setWorkflowNodeStates(prev => ({ ...prev, draft_emails: 'completed', send_email: 'running' }));
          }

          // Complete tool run
          await new Promise(resolve => setTimeout(resolve, 800));
          if (!active) return;
          setToolCompleted(true);
          setActiveToolRun(null);

          // Auto-switch to preview tab for scenarios without workflow graphs to show findings
          if (!hasWorkflow) {
            setActiveRightTab('preview');
            setMobileSubTab('preview');
          }
        }
      } else {
        // User message, typing buffer
        await new Promise(resolve => setTimeout(resolve, 800));
        if (!active) return;
        setRevealedMessages(prev => [...prev, nextMsg]);
      }

      // Stagger remaining workflow nodes if we just finished the last assistant step
      if (currentMsgIdx === scenario.messages.length - 1) {
        if (scenario.id === 'rank-on-ai-search') {
          // play through other nodes
          await new Promise(resolve => setTimeout(resolve, 1000));
          if (!active) return;
          setWorkflowNodeStates(prev => ({ ...prev, geo_content_audit: 'running' }));
          await new Promise(resolve => setTimeout(resolve, 1000));
          if (!active) return;
          setWorkflowNodeStates(prev => ({ ...prev, geo_content_audit: 'completed', seo_create_plan: 'running' }));
          await new Promise(resolve => setTimeout(resolve, 1000));
          if (!active) return;
          setWorkflowNodeStates(prev => ({ ...prev, seo_create_plan: 'completed', github_create_content_pr: 'running' }));
          await new Promise(resolve => setTimeout(resolve, 1200));
          if (!active) return;
          setWorkflowNodeStates(prev => ({ ...prev, github_create_content_pr: 'completed' }));
        }
      }

      // Next message
      setCurrentMsgIdx(prev => prev + 1);
    };

    playTimeline();

    return () => {
      active = false;
    };
  }, [currentMsgIdx, playbackKey, scenario, hasWorkflow]);

  // Scroll chat window to bottom on update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [revealedMessages, isTyping, activeToolRun]);

  // Render Tool Call Outputs inside Preview Tab
  const renderPreviewContent = () => {
    const isRunning = activeToolRun !== null && !toolCompleted;
    if (isRunning) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-background text-muted-foreground select-none">
          <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
          <div className="text-sm font-medium text-foreground">Running AI distribution agent...</div>
          <div className="text-xs text-muted-foreground/60 mt-1.5 font-mono">Executing playbook tool: {activeToolRun}</div>
          
          {/* Skeleton Load Shimmer */}
          <div className="mt-8 w-full max-w-lg space-y-3">
            <div className="h-4 bg-muted/40 rounded-full w-3/4 animate-pulse" />
            <div className="h-3 bg-muted/30 rounded-full w-5/6 animate-pulse" />
            <div className="h-3 bg-muted/30 rounded-full w-2/3 animate-pulse" />
            <div className="h-4 bg-muted/40 rounded-full w-1/2 animate-pulse mt-6" />
            <div className="h-3 bg-muted/30 rounded-full w-4/5 animate-pulse" />
          </div>
        </div>
      );
    }

    if (!toolCompleted && revealedMessages.length < 3) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-background text-muted-foreground/50 select-none">
          <Terminal className="h-8 w-8 text-muted-foreground/30 mb-3" />
          <div className="text-sm">Waiting for agent to execute tools...</div>
          <div className="text-xs text-muted-foreground/40 mt-1 max-w-xs leading-normal">
            Data results will populate here once the playbook is triggered in the chat.
          </div>
        </div>
      );
    }

    switch (scenario.id) {
      case 'rank-on-ai-search': {
        const report = scenario.messages[3].toolCall?.output as any;
        return (
          <div className="p-5 overflow-y-auto h-full text-left bg-transparent text-foreground space-y-6">
            {/* Top Score Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-border/50 pb-5">
              <div className="bg-card border border-border p-4 rounded-xl flex flex-col justify-center">
                <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Citation Score</span>
                <span className="text-3xl font-light text-foreground mt-1">7%</span>
                <span className="text-xs text-muted-foreground/80 mt-1">13 of 184 responses</span>
              </div>
              <div className="bg-card border border-border p-4 rounded-xl flex flex-col justify-center">
                <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Identified Gaps</span>
                <span className="text-3xl font-light text-foreground mt-1">6 Gaps</span>
                <span className="text-xs text-muted-foreground/80 mt-1">Stale & missing content</span>
              </div>
              <div className="bg-card border border-border p-4 rounded-xl flex flex-col justify-center">
                <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Content Freshness</span>
                <span className="text-3xl font-light text-foreground mt-1">68%</span>
                <span className="text-xs text-muted-foreground/80 mt-1">19 of 28 pages fresh</span>
              </div>
            </div>

            {/* Platform breakdowns */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Platforms Citation Rate</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(report?.platformBreakdown || {}).map(([platform, stats]: [string, any]) => {
                  const percent = Math.round((stats.ourSiteCited / stats.total) * 100);
                  return (
                    <div key={platform} className="bg-muted/10 border border-border/30 p-3 rounded-lg flex flex-col">
                      <div className="flex justify-between items-center text-sm font-semibold">
                        <span>{platform}</span>
                        <span className="text-foreground">{percent}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-muted/40 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-foreground rounded-full" style={{ width: `${percent}%` }} />
                      </div>
                      <span className="text-[11px] text-muted-foreground/70 mt-1.5">{stats.ourSiteCited} citations ({stats.withCitations} with mentions)</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cited Brands comparison chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Cited Brands count</h4>
                <div className="border border-border rounded-xl bg-card p-4 space-y-3">
                  {report?.citedBrands.map((b: any) => (
                    <div key={b.brand} className="space-y-1 text-sm">
                      <div className="flex justify-between font-medium">
                        <span className={b.brand.includes('Us') ? 'text-foreground font-bold' : 'text-foreground/75'}>{b.brand}</span>
                        <span className="text-muted-foreground">{b.count} mentions</span>
                      </div>
                      <div className="h-3 w-full bg-muted/40 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${b.brand.includes('Us') ? 'bg-foreground' : 'bg-foreground/20'}`} 
                          style={{ width: `${b.pct}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gaps List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Identified Opportunity Gaps</h4>
                <div className="border border-border rounded-xl bg-card p-4 text-sm divide-y divide-border/30 max-h-[220px] overflow-y-auto">
                  {report?.gaps.map((gap: any, i: number) => (
                    <div key={i} className="py-2.5 first:pt-0 last:pb-0">
                      <div className="font-semibold text-foreground truncate">{gap.question}</div>
                      <div className="text-muted-foreground/80 text-xs mt-0.5">{gap.opportunity}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'monitor-social': {
        const report = scenario.messages[3].toolCall?.output as any;
        return (
          <div className="p-4 overflow-y-auto h-full text-left bg-transparent text-foreground space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-border/50">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Social Lead Stream</span>
              <span className="text-[11px] border border-border/60 bg-muted/20 text-foreground font-semibold px-2 py-0.5 rounded-full font-mono">{report?.totalFound} hits found</span>
            </div>

            <div className="space-y-3.5">
              {report?.posts.map((post: any) => (
                <div key={post.id} className="border border-border rounded-xl bg-card p-4 hover:shadow-2xs transition-shadow">
                  {/* Post Header */}
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-muted text-foreground/80 font-mono text-[11px] px-2 py-0.5 rounded border border-border/30">
                      {post.platform === 'twitter' ? 'X/Twitter' : 'Reddit'}
                    </div>
                    <span className="font-semibold text-foreground">{post.authorName}</span>
                    {post.authorHandle && <span className="text-muted-foreground/75 text-xs">@{post.authorHandle}</span>}
                    {post.subreddit && <span className="text-foreground/70 font-mono text-[11px] font-semibold">{post.subreddit}</span>}
                    <span className="text-muted-foreground/50 text-xs ml-auto font-mono">
                      {post.followers ? `Followers: ${post.followers}` : `Ratio: ${post.upvoteRatio}`}
                    </span>
                  </div>

                  {/* Post Content */}
                  {post.title && <div className="font-bold text-sm mt-2 text-foreground">{post.title}</div>}
                  <p className="text-sm text-foreground/85 mt-1.5 leading-relaxed font-normal">{post.text}</p>

                  {/* Engagement Footer */}
                  <div className="flex gap-4 mt-3 text-xs text-muted-foreground/80 border-t border-border/30 pt-2 font-mono">
                    <span>Likes: {post.engagement.likes}</span>
                    <span>Comments: {post.engagement.comments}</span>
                    {post.engagement.shares !== undefined && <span>Retweets: {post.engagement.shares}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'find-prospects': {
        const report = scenario.messages[1].toolCall?.output as any;
        return (
          <div className="p-4 overflow-y-auto h-full text-left bg-transparent text-foreground flex flex-col">
            <div className="flex justify-between items-center pb-3 border-b border-border/50 flex-shrink-0">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Prospecting CRM list</span>
              <span className="text-[11px] border border-border/60 bg-muted/20 text-foreground font-semibold px-2 py-0.5 rounded-full font-mono">{report?.totalFound} leads enriched</span>
            </div>

            <div className="flex-1 overflow-auto mt-3">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-muted/20 border-b border-border text-muted-foreground font-semibold">
                    <th className="p-2 w-8"></th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Company</th>
                    <th className="p-2">Role</th>
                    <th className="p-2">Location</th>
                    <th className="p-2 w-10">LinkedIn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {report?.contacts.map((c: any) => (
                    <tr key={c.id} className="hover:bg-muted/10 transition-colors">
                      <td className="p-2">
                        <div className="w-6 h-6 rounded-full bg-muted text-foreground border border-border/40 flex items-center justify-center font-bold text-[9px] font-mono">{c.initials}</div>
                      </td>
                      <td className="p-2 font-semibold text-foreground">{c.name}</td>
                      <td className="p-2 text-foreground/80">{c.company}</td>
                      <td className="p-2 text-muted-foreground">{c.title}</td>
                      <td className="p-2 text-muted-foreground/60 text-[10px]">{c.location}</td>
                      <td className="p-2 text-center">
                        <a href="#" className="text-foreground/60 hover:text-foreground transition-colors"><Globe className="h-3.5 w-3.5" /></a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      case 'send-cold-emails': {
        const report = scenario.messages[3].toolCall?.output as any;
        const currentDraft = report?.drafts[selectedEmailIdx];
        return (
          <div className="h-full flex text-left bg-transparent text-foreground select-none">
            {/* Email Drafts List Sidebar */}
            <div className="w-2/5 border-r border-border flex flex-col h-full bg-background/80 backdrop-blur-xs">
              <div className="p-3 border-b border-border text-sm font-semibold text-muted-foreground flex justify-between items-center">
                <span>Leads Queue</span>
                <span className="font-mono text-xs">{report?.totalCount} drafts</span>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-border/30">
                {report?.drafts.map((d: any, idx: number) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedEmailIdx(idx)}
                    className={`w-full p-3 flex flex-col gap-0.5 text-left cursor-pointer transition-colors ${
                      selectedEmailIdx === idx ? 'bg-muted/20 border-l-4 border-foreground' : 'hover:bg-muted/10'
                    }`}
                  >
                    <span className="text-sm font-bold text-foreground">{d.toName}</span>
                    <span className="text-xs text-muted-foreground truncate">{d.toEmail}</span>
                    <span className="text-xs text-foreground/60 truncate font-mono mt-1">{d.subject}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Email Detail Pane */}
            <div className="w-3/5 p-5 flex flex-col h-full overflow-y-auto">
              {currentDraft ? (
                <div className="space-y-4 text-sm h-full flex flex-col">
                  <div className="space-y-2 border-b border-border/50 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground w-12 font-medium">To:</span>
                      <span className="font-semibold">{currentDraft.toName}</span>
                      <span className="text-muted-foreground font-mono text-xs">({currentDraft.toEmail})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground w-12 font-medium">Subject:</span>
                      <span className="font-semibold font-mono text-foreground">{currentDraft.subject}</span>
                    </div>
                  </div>
                  <div className="flex-1 bg-muted/5 border border-border/35 rounded-xl p-4 font-mono text-xs leading-relaxed whitespace-pre-line text-foreground/80 overflow-y-auto max-h-[220px]">
                    {currentDraft.body}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                    <span>* AI Personalized variables auto-mapped</span>
                    <button className="bg-foreground text-background font-semibold px-3 py-1 rounded-full hover:opacity-90 cursor-pointer shadow-xs transition-opacity">
                      Send now
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground/40 text-xs">
                  Select a draft from the queue
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'run-seo-audit': {
        const report = scenario.messages[3].toolCall?.output as any;
        return (
          <div className="p-4 overflow-y-auto h-full text-left bg-transparent text-foreground space-y-6">
            {/* Keywords opportunities table */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Keyword Research opportunities</h4>
                <span className="text-xs text-foreground/60 font-semibold">* Selected low competition keywords</span>
              </div>
              <div className="border border-border rounded-xl bg-card overflow-hidden">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-muted/20 border-b border-border text-muted-foreground font-semibold">
                      <th className="p-2">Keyword</th>
                      <th className="p-2 text-right">Volume</th>
                      <th className="p-2 text-center">Difficulty</th>
                      <th className="p-2 text-right">CPC</th>
                      <th className="p-2 text-center">Intent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {report?.keywordMetrics.concat(report?.relatedKeywords || []).map((k: any, i: number) => (
                      <tr key={i} className={`hover:bg-muted/10 transition-colors ${k.difficulty < 30 ? 'bg-muted/5' : ''}`}>
                        <td className="p-2 font-medium text-foreground">
                          {k.keyword}
                          {k.difficulty < 30 && <span className="ml-2 bg-muted text-foreground border border-border/30 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded">low diff</span>}
                        </td>
                        <td className="p-2 text-right font-mono">{k.volume.toLocaleString()}</td>
                        <td className="p-2 text-center font-mono">
                          <span className="font-semibold text-foreground">
                            {k.difficulty}
                          </span>
                        </td>
                        <td className="p-2 text-right font-mono">{k.cpc}</td>
                        <td className="p-2 text-center">
                          <span className="bg-foreground/5 text-foreground/60 text-[11px] px-1.5 py-0.5 rounded-full font-medium">{k.intent}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SERP Competitors */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Competitor SERP analysis</h4>
              <div className="border border-border rounded-xl bg-card overflow-hidden">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-muted/20 border-b border-border text-muted-foreground font-semibold">
                      <th className="p-2">Domain</th>
                      <th className="p-2 text-right">Avg Position</th>
                      <th className="p-2 text-right">Median Position</th>
                      <th className="p-2 text-right font-mono">SERP Visibility</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {report?.serpCompetitors.map((comp: any) => (
                      <tr key={comp.domain} className="hover:bg-muted/10 transition-colors">
                        <td className="p-2 font-semibold text-foreground">{comp.domain}</td>
                        <td className="p-2 text-right font-mono">{comp.avgPos}</td>
                        <td className="p-2 text-right font-mono">{comp.medianPos}</td>
                        <td className="p-2 text-right font-mono text-foreground font-semibold">{comp.visibility}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  // Re-run animation playback handler
  const handleRestartPlayback = () => {
    setRevealedMessages([]);
    setCurrentMsgIdx(0);
    setIsTyping(false);
    setActiveToolRun(null);
    setToolCompleted(false);
    setSelectedEmailIdx(0);

    const initialStates: Record<string, 'idle' | 'running' | 'completed'> = {};
    scenario.workflowSteps.forEach(step => {
      initialStates[step.id] = 'idle';
    });
    setWorkflowNodeStates(initialStates);

    setPlaybackKey(prev => prev + 1);
  };

  return (
    <div className="w-full h-full flex flex-col min-h-0 bg-background select-none workflow-canvas-container">
      
      {/* 1. Mobile viewport layout (<md:hidden) */}
      <div className="overflow-hidden md:hidden" style={{ containerType: 'inline-size' }}>
        <div style={{ height: 'calc(760 / 430 * 100cqw)' }}>
          <div 
            className="border-border bg-transparent flex flex-col overflow-hidden border-b" 
            style={{ width: '430px', height: '760px', transform: 'scale(calc(100cqw / 430px))', transformOrigin: 'top left' }}
          >
            <div className="flex h-full flex-col">
              
              {/* Mobile inner tabs bar */}
              <div className="border-border bg-background flex border-b md:hidden">
                <button 
                  onClick={() => setMobileSubTab('chat')}
                  className={`flex-1 border-b-2 py-3.5 text-base font-semibold transition-colors cursor-pointer ${
                    mobileSubTab === 'chat' ? 'border-primary text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground border-transparent'
                  }`}
                >
                  Chat
                </button>
                <button 
                  onClick={() => setMobileSubTab('preview')}
                  className={`flex-1 border-b-2 py-3.5 text-base font-semibold transition-colors cursor-pointer ${
                    mobileSubTab === 'preview' ? 'border-primary text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground border-transparent'
                  }`}
                >
                  Preview
                </button>
                {hasWorkflow && (
                  <button 
                    onClick={() => setMobileSubTab('workflow')}
                    className={`flex-1 border-b-2 py-3.5 text-base font-semibold transition-colors cursor-pointer ${
                      mobileSubTab === 'workflow' ? 'border-primary text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground border-transparent'
                    }`}
                  >
                    Workflow
                  </button>
                )}
              </div>

              {/* Mobile View Display area */}
              <div className="flex min-h-0 flex-1 relative">
                {mobileSubTab === 'chat' && (
                  <div className="w-full h-full flex flex-col">
                    <ChatSidebar 
                      revealedMessages={revealedMessages}
                      isTyping={isTyping}
                      activeToolRun={activeToolRun}
                      toolCompleted={toolCompleted}
                      onRestart={handleRestartPlayback}
                      chatContainerRef={chatContainerRef}
                    />
                  </div>
                )}
                {mobileSubTab === 'preview' && (
                  <div className="w-full h-full bg-transparent overflow-hidden">
                    {renderPreviewContent()}
                  </div>
                )}
                {mobileSubTab === 'workflow' && hasWorkflow && (
                  <div className="w-full h-full flex flex-col p-2 relative">
                    <div className="h-full flex flex-col border border-border rounded-lg bg-transparent overflow-hidden relative">
                      <WorkflowDiagram 
                        steps={scenario.workflowSteps} 
                        nodeStates={workflowNodeStates}
                        darkMode={darkMode}
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 2. Desktop split-screen layout (md:flex) */}
      <div className="flex h-full flex-col min-h-0 flex-1 hidden md:flex">
        
        {/* Desktop Header */}
        <header className="bg-background/80 backdrop-blur-md border-b border-border/50 h-12 flex-shrink-0">
          <div className="flex h-full items-center justify-between px-4">
            
            {/* Header Left (macOS Style Window Controls + URL bar / Window Title) */}
            <div className="flex flex-shrink-0 items-center gap-4 transition-all duration-300 w-[36%]">
              {/* macOS window control buttons */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-80" />
              </div>
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="truncate whitespace-nowrap text-[10px] font-mono uppercase tracking-wider text-muted-foreground/80">
                  {scenario.windowTitle}
                </span>
              </div>
            </div>

            {/* Header Middle (Empty) */}
            <div className="flex flex-1 items-center justify-center" />

            {/* Header Right (Empty) */}
            {/* Header Right */}
            <div className="flex-shrink-0 flex items-center justify-end px-4">
              <button 
                onClick={handleRestartPlayback}
                className="text-foreground/75 hover:text-foreground text-[10px] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors border border-border bg-card hover:bg-accent px-3 py-1 rounded-full shadow-2xs"
                title="Replay Demo"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Replay Demo</span>
              </button>
            </div>

          </div>
        </header>

        {/* Split screen content container */}
        <div className="flex min-h-0 flex-1">
          
          {/* Collapsible Chat Sidebar */}
          <div className={`flex flex-col overflow-hidden transition-all duration-300 border-r border-border ${isSidebarOpen ? 'w-[34%]' : 'w-0 border-r-0'}`}>
            {isSidebarOpen && (
              <>
                {/* Chat Sidebar Header: Jam logo + scenario dropdown + collapse toggle */}
                <div className="flex-shrink-0 h-10 flex items-center justify-between px-3 border-b border-border/40 bg-muted/5">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {/* Jam outline logo */}
                    <img 
                      alt="Jam" 
                      loading="lazy" 
                      width="16" 
                      height="19" 
                      className="dark:hidden opacity-80" 
                      src="/jam-outline-transparent-light-thick.svg"
                    />
                    <img 
                      alt="Jam" 
                      loading="lazy" 
                      width="16" 
                      height="19" 
                      className="hidden dark:block opacity-80" 
                      src="/jam-outline-transparent-dark-thick.svg"
                    />
                    
                    {/* Scenario filter dropdown */}
                    <div ref={dropdownRef} className="relative min-w-0">
                      <button 
                        onClick={() => setIsScenarioDropdownOpen(!isScenarioDropdownOpen)}
                        className="flex items-center gap-1 text-xs font-semibold text-foreground hover:text-foreground/80 transition-colors cursor-pointer truncate"
                      >
                        <span className="truncate">{scenario.tabLabel}</span>
                        <ChevronDown className={`h-3 w-3 flex-shrink-0 text-muted-foreground transition-transform ${isScenarioDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Dropdown menu */}
                      {isScenarioDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 z-50 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[180px]">
                          {SCENARIOS.map(s => (
                            <button
                              key={s.id}
                              onClick={() => {
                                setActiveTab(s.tabKey);
                                setIsScenarioDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                                s.tabKey === activeTab 
                                  ? 'bg-muted/30 text-foreground font-semibold' 
                                  : 'text-foreground/70 hover:bg-muted/15 hover:text-foreground'
                              }`}
                            >
                              {s.tabLabel}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Collapse sidebar button */}
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="inline-flex cursor-pointer items-center justify-center rounded-md hover:bg-accent text-muted-foreground hover:text-foreground h-7 w-7 flex-shrink-0"
                    title="Close sidebar"
                  >
                    <PanelLeftClose className="h-4 w-4" />
                  </button>
                </div>

                <ChatSidebar 
                  revealedMessages={revealedMessages}
                  isTyping={isTyping}
                  activeToolRun={activeToolRun}
                  toolCompleted={toolCompleted}
                  onRestart={handleRestartPlayback}
                  chatContainerRef={chatContainerRef}
                />
              </>
            )}
          </div>

          {/* Workflow Canvas display side */}
          <div className="min-w-0 flex-1 flex p-2 relative bg-muted/5">
            <div className="h-full w-full flex flex-col border border-border rounded-lg bg-background overflow-hidden relative">
              <div className="border-border flex h-10 shrink-0 items-center justify-between border-b px-2 bg-muted/5">
                {/* Expand sidebar button (visible when sidebar is closed) */}
                <div className="flex items-center w-1/4">
                  {!isSidebarOpen && (
                    <button 
                      onClick={() => setIsSidebarOpen(true)}
                      className="inline-flex cursor-pointer items-center justify-center rounded-md hover:bg-accent text-muted-foreground hover:text-foreground h-7 w-7"
                      title="Open sidebar"
                    >
                      <PanelRight className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Section Tabs: Preview and Workflows */}
                <div className="flex h-full items-center gap-6 justify-center">
                  <button 
                    onClick={() => setActiveRightTab('preview')}
                    className={`relative h-full text-xs font-medium transition-colors cursor-pointer flex items-center px-1 ${
                      activeRightTab === 'preview' ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>Preview</span>
                    {activeRightTab === 'preview' && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                    )}
                  </button>
                  {hasWorkflow && (
                    <button 
                      onClick={() => setActiveRightTab('workflows')}
                      className={`relative h-full text-xs font-medium transition-colors cursor-pointer flex items-center px-1 ${
                        activeRightTab === 'workflows' ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span>Workflows</span>
                      {activeRightTab === 'workflows' && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                      )}
                    </button>
                  )}
                </div>

                <div className="flex justify-end w-1/4">
                  <button 
                    className="inline-flex cursor-pointer items-center justify-center rounded-md hover:bg-accent hover:text-foreground text-muted-foreground h-7 w-7"
                    title="Close panel"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Display either the Workflow diagram or the Output Preview */}
              <div className="flex-1 min-h-0 overflow-hidden relative bg-background">
                {activeRightTab === 'workflows' && hasWorkflow ? (
                  <WorkflowDiagram 
                    steps={scenario.workflowSteps} 
                    nodeStates={workflowNodeStates}
                    darkMode={darkMode}
                  />
                ) : (
                  renderPreviewContent()
                )}
              </div>
            </div>
          </div>

        </div>

      </div>


    </div>
  );
}

/* ==========================================================================
   HELPER SUB-COMPONENTS
   ========================================================================== */

// Chat Sidebar UI
const ChatSidebar = ({
  revealedMessages,
  isTyping,
  activeToolRun,
  toolCompleted,
  onRestart,
  chatContainerRef
}: {
  revealedMessages: any[];
  isTyping: boolean;
  activeToolRun: string | null;
  toolCompleted: boolean;
  onRestart: () => void;
  chatContainerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div className="flex flex-1 min-h-0 flex-col bg-card select-none">
      {/* Scrollable message window */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto pl-4 pr-3 py-4 space-y-4 scrollbar-thin scroll-smooth"
      >
        {revealedMessages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} className="space-y-1.5">
              <div className={`flex items-start ${isUser ? 'justify-end' : 'justify-start'}`}>
                {/* Message Content */}
                {isUser ? (
                  /* User Message: warm-cream bubble */
                  <div 
                    className="max-w-[85%] text-xs leading-relaxed px-4 py-2.5 rounded-2xl text-left whitespace-pre-wrap bg-accent text-foreground shadow-2xs"
                  >
                    {msg.content}
                  </div>
                ) : (
                  /* Agent Message: plain text, no bubble, no avatar */
                  <div 
                    className="max-w-[90%] text-xs leading-relaxed text-left whitespace-pre-wrap text-foreground/90 py-1"
                  >
                    {msg.content}
                  </div>
                )}
              </div>

              {/* Action Row: ThumbsUp, ThumbsDown, Copy */}
              {!isUser && (
                <div className="flex items-center gap-2.5 justify-start pl-0.5">
                  <button className="text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-pointer">
                    <ThumbsUp className="h-3 w-3" />
                  </button>
                  <button className="text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-pointer">
                    <ThumbsDown className="h-3 w-3" />
                  </button>
                  <button className="text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-pointer">
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              )}

              {/* Tool Execution Card inside Chat */}
              {msg.toolCall && (
                <div className="flex items-start">
                  <div className="bg-muted/20 border border-border/30 rounded-xl p-3 text-left w-full space-y-2 max-w-[85%] shadow-2xs">
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
                      <Terminal className="h-3.5 w-3.5 text-foreground/60" />
                      <span className="font-mono text-[9px] text-foreground/80 truncate">
                        {msg.toolCall.name}(...)
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] bg-background border border-border/20 rounded p-1.5 font-mono text-foreground/60">
                      <span>Parameters check</span>
                      {activeToolRun === msg.toolCall.name && !toolCompleted ? (
                        <span className="flex items-center gap-1 text-primary font-bold animate-pulse">
                          <Loader2 className="h-2.5 w-2.5 animate-spin" /> running
                        </span>
                      ) : (
                        <span className="text-foreground/80 font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="h-3 w-3 text-foreground/50" /> success
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start justify-start">
            <div className="flex items-center gap-1 bg-muted/10 border border-border/25 rounded-2xl px-4 py-2.5 w-fit">
              <span className="w-1.5 h-1.5 bg-foreground/35 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-foreground/35 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-foreground/35 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Chat Footer Box */}
      <div className="flex-shrink-0 border-t border-border/40 p-3 bg-muted/5 flex flex-col">
        <form className="group bg-card focus-within:border-foreground/30 flex flex-col gap-2 rounded-xl border border-border p-2.5 shadow-2xs transition-colors duration-150 ease-in-out">
          <div className="relative flex flex-1 items-center">
            <textarea 
              placeholder="Sign up to chat with Jam" 
              className="placeholder:text-muted-foreground/40 m-1 flex min-h-[36px] w-full resize-none rounded-md border-none bg-transparent p-0 text-xs leading-snug focus-visible:outline-none disabled:cursor-not-allowed" 
              disabled 
              style={{ height: '36px' }} 
            />
          </div>
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              disabled 
              className="border border-border/40 hover:bg-accent flex h-8 w-8 items-center justify-center rounded-full transition-colors disabled:opacity-50"
            >
              <ImagePlus className="h-3.5 w-3.5 text-muted-foreground/60" />
            </button>
            <div className="ml-auto">
              <button 
                type="submit" 
                disabled 
                className="bg-foreground text-background flex h-8 w-8 items-center justify-center rounded-full transition-opacity disabled:opacity-50"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Workflow Diagram Panel (Custom flowchart layout, responsive SVG lines)
const WorkflowDiagram = ({ 
  steps, 
  nodeStates,
  darkMode
}: { 
  steps: any[]; 
  nodeStates: Record<string, 'idle' | 'running' | 'completed'>;
  darkMode: boolean;
}) => {
  return (
    <div 
      className="h-full w-full min-h-0 flex-1 relative overflow-auto bg-background p-6 flex items-center justify-start xl:justify-center scrollbar-thin select-none"
      style={{
        backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
        backgroundPosition: 'center'
      }}
    >
      <div className="relative w-[1320px] h-[360px] flex-shrink-0">
        
        {/* SVG connection lines with animated dashes */}
        <svg className="absolute inset-0 pointer-events-none w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker
              id="arrow-workflow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill={darkMode ? '#f2f1f3' : '#101010'} />
            </marker>
            <style>{`
              @keyframes flowDash {
                0% { stroke-dashoffset: 24; }
                100% { stroke-dashoffset: 0; }
              }
              .animate-flow-dash {
                animation: flowDash 1.2s linear infinite;
              }
            `}</style>
          </defs>
          
          {steps.map((step, idx) => {
            if (idx === steps.length - 1) return null;
            const startX = 290 + idx * 330;
            const endX = 350 + idx * 330;
            const sourceState = nodeStates[step.id];
            const isFinished = sourceState === 'completed';

            return (
              <path 
                key={step.id}
                d={`M ${startX} 180 L ${endX} 180`} 
                fill="none" 
                stroke={isFinished ? (darkMode ? '#f2f1f3' : '#101010') : (darkMode ? '#222024' : '#eae8e3')} 
                strokeWidth="1.5" 
                strokeDasharray={isFinished ? "4 4" : "0"} 
                markerEnd="url(#arrow-workflow)" 
                className={isFinished ? "animate-flow-dash" : ""}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {steps.map((node, index) => {
          const leftOffset = 20 + index * 330;
          const status = nodeStates[node.id] || 'idle';
          const isCompleted = status === 'completed';
          const isRunning = status === 'running';

          const cardBorderClass = isRunning 
            ? 'border-foreground shadow-xs ring-1 ring-foreground/15' 
            : isCompleted 
              ? 'border-border shadow-2xs' 
              : 'border-border/40 opacity-60';

          const dotColorClass = isCompleted 
            ? 'bg-foreground' 
            : isRunning 
              ? 'bg-primary animate-pulse' 
              : 'bg-muted-foreground/30';

          return (
            <div 
              key={node.id}
              className="absolute text-left group transition-all duration-300"
              style={{ left: `${leftOffset}px`, top: '90px', width: '270px', height: '180px' }}
            >
              {/* Target Handle Dot (Left) */}
              {index > 0 && (
                <div 
                  className={`absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-background z-10 transition-colors ${
                    isCompleted ? 'bg-foreground' : 'bg-muted/40'
                  }`} 
                />
              )}

              {/* Left Hover buttons */}
              <div className="absolute -top-3.5 -left-3.5 z-30 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto">
                <button 
                  title="View Details" 
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-background border border-border shadow-xs hover:bg-accent hover:border-accent-foreground/10 transition-colors duration-150 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-foreground/80" />
                </button>
              </div>

              {/* Top Actions Panel */}
              <div className="absolute -top-11 left-1/2 -translate-x-1/2 z-30 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background border border-border rounded-lg shadow-sm px-1.5 py-1 pointer-events-auto">
                <button 
                  type="button" 
                  className="flex items-center gap-1 px-1.5 py-1 rounded-md transition-colors duration-150 hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-medium">Rename</span>
                </button>
                <button 
                  type="button" 
                  className="flex items-center gap-1 px-1.5 py-1 rounded-md transition-colors duration-150 hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-medium">Duplicate</span>
                </button>
                <button 
                  type="button" 
                  className="flex items-center gap-1 px-1.5 py-1 rounded-md transition-colors duration-150 hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-medium">Delete</span>
                </button>
              </div>

              {/* Add node after button */}
              {index < steps.length - 1 && (
                <button 
                  type="button" 
                  title="Add node after" 
                  className="absolute top-1/2 -translate-y-1/2 -right-3 z-30 w-6 h-6 rounded-full bg-background border border-border shadow-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-accent hover:border-accent-foreground/10 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-foreground" />
                </button>
              )}

              {/* Main Card Body */}
              <div 
                className={`relative w-full h-full rounded-xl border overflow-hidden transition-all duration-300 bg-card hover:border-border/80 cursor-pointer flex flex-col ${cardBorderClass}`}
              >
                {/* Upper portion */}
                <div className="bg-muted/10 h-[90px] overflow-hidden flex flex-col p-2 select-none border-b border-border/40">
                  <div className="flex items-center gap-1.5 mb-1.5 flex-shrink-0">
                    <span className="text-foreground/60 text-[11px] font-semibold uppercase tracking-wider">
                      {isCompleted ? 'Step Complete' : isRunning ? 'Executing' : 'Waiting'}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-center text-center px-2">
                    {isCompleted ? (
                      <span className="text-foreground/80 text-xs font-mono leading-normal font-normal bg-background border border-border/30 rounded py-1 px-2 max-w-[240px] truncate shadow-2xs">
                        {node.output}
                      </span>
                    ) : isRunning ? (
                      <div className="flex items-center justify-center gap-1.5 text-foreground/80 font-normal font-mono text-xs">
                        <Loader2 className="h-3 w-3 animate-spin text-foreground/50" /> running agent...
                      </div>
                    ) : (
                      <span className="text-foreground/30 text-xs italic">Queued in sequence</span>
                    )}
                  </div>
                </div>

                {/* Lower portion */}
                <div className="px-4 py-2.5 bg-card flex flex-col justify-center flex-1">
                  <div className="text-[15px] font-bold text-foreground truncate leading-tight">
                    {node.label}
                  </div>
                  <div className="flex items-center justify-between mt-1.5 gap-2">
                    <span className="text-xs text-muted-foreground truncate flex-1 font-normal">
                      {node.category}
                    </span>
                    <div className="flex items-center shrink-0">
                      <div className={`w-2 h-2 rounded-full ${dotColorClass}`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Source Handle Dot (Right) */}
              {index < steps.length - 1 && (
                <div 
                  className={`absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-background z-10 transition-colors ${
                    isCompleted ? 'bg-foreground' : 'bg-muted/40'
                  }`} 
                />
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
};
