import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { 
  ReactFlow, 
  Background, 
  Handle, 
  Position, 
  MarkerType,
  Node as FlowNode,
  Edge,
  ReactFlowProvider,
  useReactFlow,
  getBezierPath,
  BaseEdge,
  EdgeProps
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

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
  const [mobileSubTab, setMobileSubTab] = useState<'chat' | 'preview' | 'workflow'>('chat');
  const [tabDirection, setTabDirection] = useState<number>(1);
  const prevTabRef = useRef<'chat' | 'preview' | 'workflow'>('chat');

  const handleMobileTabChange = (newTab: 'chat' | 'preview' | 'workflow') => {
    const tabsOrder: ('chat' | 'preview' | 'workflow')[] = ['chat', 'preview', 'workflow'];
    const oldIdx = tabsOrder.indexOf(prevTabRef.current);
    const newIdx = tabsOrder.indexOf(newTab);
    setTabDirection(newIdx > oldIdx ? 1 : -1);
    prevTabRef.current = newTab;
    setMobileSubTab(newTab);
  };

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
    prevTabRef.current = 'chat';
    setMobileSubTab('chat');
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
            prevTabRef.current = 'preview';
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
  const renderPreviewContent = (isMobile: boolean = false) => {
    const isRunning = activeToolRun !== null && !toolCompleted;
    if (isRunning) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-background text-muted-foreground select-none">
          <Loader2 className={`${isMobile ? 'h-10 w-10' : 'h-8 w-8'} text-primary animate-spin mb-4`} />
          <div className={`${isMobile ? 'text-base' : 'text-sm'} font-medium text-foreground`}>Running AI distribution agent...</div>
          <div className={`${isMobile ? 'text-xs' : 'text-[11px]'} text-muted-foreground/60 mt-1.5 font-mono`}>Executing playbook tool: {activeToolRun}</div>
          
          {/* Skeleton Load Shimmer */}
          <div className="mt-8 w-full max-w-lg space-y-3">
            <div className={`bg-muted/40 rounded-full w-3/4 animate-pulse ${isMobile ? 'h-5' : 'h-4'}`} />
            <div className={`bg-muted/30 rounded-full w-5/6 animate-pulse ${isMobile ? 'h-4' : 'h-3'}`} />
            <div className={`bg-muted/30 rounded-full w-2/3 animate-pulse ${isMobile ? 'h-4' : 'h-3'}`} />
            <div className={`bg-muted/40 rounded-full w-1/2 animate-pulse mt-6 ${isMobile ? 'h-5' : 'h-4'}`} />
            <div className={`bg-muted/30 rounded-full w-4/5 animate-pulse ${isMobile ? 'h-4' : 'h-3'}`} />
          </div>
        </div>
      );
    }

    if (!toolCompleted && revealedMessages.length < 3) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-background text-muted-foreground/50 select-none">
          <Terminal className={`${isMobile ? 'h-10 w-10' : 'h-8 w-8'} text-muted-foreground/30 mb-3`} />
          <div className={isMobile ? 'text-base' : 'text-sm'}>Waiting for agent to execute tools...</div>
          <div className={`${isMobile ? 'text-sm' : 'text-xs'} text-muted-foreground/40 mt-1 max-w-xs leading-normal`}>
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
                <span className={`${isMobile ? 'text-xs' : 'text-[11px]'} text-muted-foreground uppercase font-semibold tracking-wider`}>Citation Score</span>
                <span className={`${isMobile ? 'text-4xl' : 'text-3xl'} font-light text-foreground mt-1`}>7%</span>
                <span className={`${isMobile ? 'text-sm' : 'text-xs'} text-muted-foreground/80 mt-1`}>13 of 184 responses</span>
              </div>
              <div className="bg-card border border-border p-4 rounded-xl flex flex-col justify-center">
                <span className={`${isMobile ? 'text-xs' : 'text-[11px]'} text-muted-foreground uppercase font-semibold tracking-wider`}>Identified Gaps</span>
                <span className={`${isMobile ? 'text-4xl' : 'text-3xl'} font-light text-foreground mt-1`}>6 Gaps</span>
                <span className={`${isMobile ? 'text-sm' : 'text-xs'} text-muted-foreground/80 mt-1`}>Stale & missing content</span>
              </div>
              <div className="bg-card border border-border p-4 rounded-xl flex flex-col justify-center">
                <span className={`${isMobile ? 'text-xs' : 'text-[11px]'} text-muted-foreground uppercase font-semibold tracking-wider`}>Content Freshness</span>
                <span className={`${isMobile ? 'text-4xl' : 'text-3xl'} font-light text-foreground mt-1`}>68%</span>
                <span className={`${isMobile ? 'text-sm' : 'text-xs'} text-muted-foreground/80 mt-1`}>19 of 28 pages fresh</span>
              </div>
            </div>

            {/* Platform breakdowns */}
            <div className="space-y-3">
              <h4 className={`${isMobile ? 'text-sm' : 'text-xs'} font-bold uppercase tracking-wider text-muted-foreground`}>Platforms Citation Rate</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(report?.platformBreakdown || {}).map(([platform, stats]: [string, any]) => {
                  const percent = Math.round((stats.ourSiteCited / stats.total) * 100);
                  return (
                    <div key={platform} className="bg-muted/10 border border-border/30 p-3 rounded-lg flex flex-col">
                      <div className={`flex justify-between items-center font-semibold ${isMobile ? 'text-base' : 'text-sm'}`}>
                        <span>{platform}</span>
                        <span className="text-foreground">{percent}%</span>
                      </div>
                      <div className={`${isMobile ? 'h-3.5' : 'h-2.5'} w-full bg-muted/40 rounded-full overflow-hidden mt-2`}>
                        <div className="h-full bg-foreground rounded-full" style={{ width: `${percent}%` }} />
                      </div>
                      <span className={`text-muted-foreground/70 mt-1.5 ${isMobile ? 'text-xs' : 'text-[11px]'}`}>{stats.ourSiteCited} citations ({stats.withCitations} with mentions)</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cited Brands comparison chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className={`${isMobile ? 'text-sm' : 'text-xs'} font-bold uppercase tracking-wider text-muted-foreground`}>Cited Brands count</h4>
                <div className="border border-border rounded-xl bg-card p-4 space-y-3">
                  {report?.citedBrands.map((b: any) => (
                    <div key={b.brand} className={`space-y-1 ${isMobile ? 'text-base' : 'text-sm'}`}>
                      <div className="flex justify-between font-medium">
                        <span className={b.brand.includes('Us') ? 'text-foreground font-bold' : 'text-foreground/75'}>{b.brand}</span>
                        <span className="text-muted-foreground">{b.count} mentions</span>
                      </div>
                      <div className={`${isMobile ? 'h-4' : 'h-3'} w-full bg-muted/40 rounded-full overflow-hidden`}>
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
                <h4 className={`${isMobile ? 'text-sm' : 'text-xs'} font-bold uppercase tracking-wider text-muted-foreground`}>Identified Opportunity Gaps</h4>
                <div className="border border-border rounded-xl bg-card p-4 divide-y divide-border/30 max-h-[220px] overflow-y-auto">
                  {report?.gaps.map((gap: any, i: number) => (
                    <div key={i} className="py-2.5 first:pt-0 last:pb-0">
                      <div className={`font-semibold text-foreground truncate ${isMobile ? 'text-base' : 'text-sm'}`}>{gap.question}</div>
                      <div className={`text-muted-foreground/80 mt-0.5 ${isMobile ? 'text-xs' : 'text-[11px]'}`}>{gap.opportunity}</div>
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
              <span className={`font-bold uppercase tracking-wider text-muted-foreground ${isMobile ? 'text-sm' : 'text-xs'}`}>Social Lead Stream</span>
              <span className={`border border-border/60 bg-muted/20 text-foreground font-semibold px-2 py-0.5 rounded-full font-mono ${isMobile ? 'text-xs' : 'text-[11px]'}`}>{report?.totalFound} hits found</span>
            </div>

            <div className="space-y-3.5">
              {report?.posts.map((post: any) => (
                <div key={post.id} className="border border-border rounded-xl bg-card p-4 hover:shadow-2xs transition-shadow">
                  {/* Post Header */}
                  <div className={`flex flex-wrap items-center gap-x-2 gap-y-1.5 ${isMobile ? 'text-base' : 'text-sm'}`}>
                    <div className={`bg-muted text-foreground/80 font-mono px-2 py-0.5 rounded border border-border/30 ${isMobile ? 'text-xs' : 'text-[11px]'}`}>
                      {post.platform === 'twitter' ? 'X/Twitter' : 'Reddit'}
                    </div>
                    <span className="font-semibold text-foreground">{post.authorName}</span>
                    {post.authorHandle && <span className={`text-muted-foreground/75 ${isMobile ? 'text-xs' : 'text-[11px]'}`}>@{post.authorHandle}</span>}
                    {post.subreddit && <span className={`text-foreground/70 font-mono font-semibold ${isMobile ? 'text-xs' : 'text-[11px]'}`}>{post.subreddit}</span>}
                    <span className={`text-muted-foreground/50 ml-auto font-mono whitespace-nowrap ${isMobile ? 'text-xs' : 'text-[11px]'}`}>
                      {post.followers ? `Followers: ${post.followers}` : `Ratio: ${post.upvoteRatio}`}
                    </span>
                  </div>

                  {/* Post Content */}
                  {post.title && <div className={`font-bold mt-2 text-foreground ${isMobile ? 'text-base' : 'text-sm'}`}>{post.title}</div>}
                  <p className={`mt-1.5 leading-relaxed font-normal text-foreground/85 ${isMobile ? 'text-base' : 'text-sm'}`}>{post.text}</p>

                  {/* Engagement Footer */}
                  <div className={`flex gap-4 mt-3 text-muted-foreground/80 border-t border-border/30 pt-2 font-mono ${isMobile ? 'text-xs' : 'text-[11px]'}`}>
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
              <span className={`font-bold uppercase tracking-wider text-muted-foreground ${isMobile ? 'text-sm' : 'text-xs'}`}>Prospecting CRM list</span>
              <span className={`border border-border/60 bg-muted/20 text-foreground font-semibold px-2 py-0.5 rounded-full font-mono ${isMobile ? 'text-xs' : 'text-[11px]'}`}>{report?.totalFound} leads enriched</span>
            </div>

            <div className="flex-1 overflow-auto mt-3">
              <table className={`w-full text-left border-collapse ${isMobile ? 'text-base' : 'text-sm'} ${isMobile ? 'min-w-[650px]' : ''}`}>
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
                        <div className={`rounded-full bg-muted text-foreground border border-border/40 flex items-center justify-center font-bold font-mono ${
                          isMobile ? 'w-8 h-8 text-xs' : 'w-6 h-6 text-[9px]'
                        }`}>{c.initials}</div>
                      </td>
                      <td className="p-2 font-semibold text-foreground">{c.name}</td>
                      <td className="p-2 text-foreground/80">{c.company}</td>
                      <td className="p-2 text-muted-foreground">{c.title}</td>
                      <td className={`p-2 text-muted-foreground/60 ${isMobile ? 'text-xs' : 'text-[10px]'}`}>{c.location}</td>
                      <td className="p-2 text-center">
                        <a href="#" className="text-foreground/60 hover:text-foreground transition-colors"><Globe className={isMobile ? "h-4.5 w-4.5" : "h-3.5 w-3.5"} /></a>
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
          <div className={`h-full flex text-left bg-transparent text-foreground select-none ${isMobile ? 'overflow-x-auto' : ''}`}>
            <div className={`h-full flex flex-shrink-0 ${isMobile ? 'w-[640px]' : 'w-full'}`}>
              {/* Email Drafts List Sidebar */}
              <div className="w-2/5 flex-shrink-0 border-r border-border flex flex-col h-full bg-background/80 backdrop-blur-xs">
                <div className={`p-3 border-b border-border font-semibold text-muted-foreground flex justify-between items-center ${isMobile ? 'text-base' : 'text-sm'}`}>
                  <span>Leads Queue</span>
                  <span className={`font-mono ${isMobile ? 'text-xs' : 'text-[11px]'}`}>{report?.totalCount} drafts</span>
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
                      <span className={`font-bold text-foreground ${isMobile ? 'text-base' : 'text-sm'}`}>{d.toName}</span>
                      <span className={`text-muted-foreground truncate ${isMobile ? 'text-xs' : 'text-[11px]'}`}>{d.toEmail}</span>
                      <span className={`text-foreground/60 truncate font-mono mt-1 ${isMobile ? 'text-xs' : 'text-[11px]'}`}>{d.subject}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Detail Pane */}
              <div className="w-3/5 flex-shrink-0 p-5 flex flex-col h-full overflow-y-auto">
                {currentDraft ? (
                  <div className={`space-y-4 h-full flex flex-col ${isMobile ? 'text-base' : 'text-sm'}`}>
                    <div className="space-y-2 border-b border-border/50 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground w-12 font-medium">To:</span>
                        <span className="font-semibold">{currentDraft.toName}</span>
                        <span className={`text-muted-foreground font-mono ${isMobile ? 'text-xs' : 'text-[11px]'}`}>({currentDraft.toEmail})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground w-12 font-medium">Subject:</span>
                        <span className="font-semibold font-mono text-foreground">{currentDraft.subject}</span>
                      </div>
                    </div>
                    <div className={`flex-1 bg-muted/5 border border-border/35 rounded-xl p-4 font-mono leading-relaxed whitespace-pre-line text-foreground/80 overflow-y-auto max-h-[220px] ${
                      isMobile ? 'text-xs' : 'text-[11px]'
                    }`}>
                      {currentDraft.body}
                    </div>
                    <div className={`flex items-center justify-between text-muted-foreground font-mono ${isMobile ? 'text-xs' : 'text-[11px]'}`}>
                      <span>* AI Personalized variables auto-mapped</span>
                      <button className="bg-foreground text-background font-semibold px-3 py-1 rounded-full hover:opacity-90 cursor-pointer shadow-xs transition-opacity">
                        Send now
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={`flex items-center justify-center h-full text-muted-foreground/40 ${isMobile ? 'text-sm' : 'text-xs'}`}>
                    Select a draft from the queue
                  </div>
                )}
              </div>
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
                <h4 className={`font-bold uppercase tracking-wider text-muted-foreground ${isMobile ? 'text-sm' : 'text-xs'}`}>Keyword Research opportunities</h4>
                <span className={`text-foreground/60 font-semibold ${isMobile ? 'text-xs' : 'text-[11px]'}`}>* Selected low competition keywords</span>
              </div>
              <div className="border border-border rounded-xl bg-card overflow-x-auto">
                <table className={`w-full text-left border-collapse ${isMobile ? 'text-base' : 'text-sm'} ${isMobile ? 'min-w-[600px]' : ''}`}>
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
                          {k.difficulty < 30 && <span className={`ml-2 bg-muted text-foreground border border-border/30 font-mono font-bold px-1.5 py-0.5 rounded ${isMobile ? 'text-xs' : 'text-[10px]'}`}>low diff</span>}
                        </td>
                        <td className="p-2 text-right font-mono">{k.volume.toLocaleString()}</td>
                        <td className="p-2 text-center font-mono">
                          <span className="font-semibold text-foreground">
                            {k.difficulty}
                          </span>
                        </td>
                        <td className="p-2 text-right font-mono">{k.cpc}</td>
                        <td className="p-2 text-center">
                          <span className={`bg-foreground/5 text-foreground/60 px-1.5 py-0.5 rounded-full font-medium ${isMobile ? 'text-xs' : 'text-[11px]'}`}>{k.intent}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SERP Competitors */}
            <div className="space-y-3">
              <h4 className={`font-bold uppercase tracking-wider text-muted-foreground ${isMobile ? 'text-sm' : 'text-xs'}`}>Competitor SERP analysis</h4>
              <div className="border border-border rounded-xl bg-card overflow-x-auto">
                <table className={`w-full text-left border-collapse ${isMobile ? 'text-base' : 'text-sm'} ${isMobile ? 'min-w-[500px]' : ''}`}>
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
      
      {/* 1. Mobile viewport layout (<lg:hidden) */}
      <div className="overflow-hidden lg:hidden flex justify-center bg-transparent w-full">
        <div className="w-full sm:max-w-[430px] flex justify-center" style={{ containerType: 'inline-size' }}>
          <div className="w-full relative overflow-hidden" style={{ height: 'calc(760 / 430 * 100cqw)' }}>
            <div 
              className="border-border bg-transparent flex flex-col overflow-hidden border-b" 
              style={{ width: '430px', height: '760px', transform: 'scale(calc(100cqw / 430px))', transformOrigin: 'top left' }}
            >
              <div className="flex h-full flex-col">
                
                {/* Mobile inner tabs bar */}
                <div className="border-border bg-background flex border-b lg:hidden relative">
                <button 
                  onClick={() => handleMobileTabChange('chat')}
                  className={`relative flex-1 py-3.5 text-base font-semibold transition-colors cursor-pointer ${
                    mobileSubTab === 'chat' ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>Chat</span>
                  {mobileSubTab === 'chat' && (
                    <motion.span 
                      layoutId="mobileActiveTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" 
                    />
                  )}
                </button>
                <button 
                  onClick={() => handleMobileTabChange('preview')}
                  className={`relative flex-1 py-3.5 text-base font-semibold transition-colors cursor-pointer ${
                    mobileSubTab === 'preview' ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>Preview</span>
                  {mobileSubTab === 'preview' && (
                    <motion.span 
                      layoutId="mobileActiveTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" 
                    />
                  )}
                </button>
                {hasWorkflow && (
                  <button 
                    onClick={() => handleMobileTabChange('workflow')}
                    className={`relative flex-1 py-3.5 text-base font-semibold transition-colors cursor-pointer ${
                      mobileSubTab === 'workflow' ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>Workflow</span>
                    {mobileSubTab === 'workflow' && (
                      <motion.span 
                        layoutId="mobileActiveTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" 
                      />
                    )}
                  </button>
                )}
              </div>

              {/* Mobile View Display area */}
              <div className="flex min-h-0 flex-1 relative overflow-hidden">
                <AnimatePresence initial={false} custom={tabDirection}>
                  <motion.div
                    key={mobileSubTab}
                    custom={tabDirection}
                    variants={{
                      enter: (dir: number) => ({
                        x: dir > 0 ? '100%' : '-100%',
                        opacity: 0
                      }),
                      center: {
                        x: 0,
                        opacity: 1
                      },
                      exit: (dir: number) => ({
                        x: dir > 0 ? '-100%' : '100%',
                        opacity: 0
                      })
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 350, damping: 32 },
                      opacity: { duration: 0.15 }
                    }}
                    className="absolute inset-0 w-full h-full flex flex-col"
                  >
                    {mobileSubTab === 'chat' && (
                      <div className="w-full h-full flex flex-col">
                        <ChatSidebar 
                          revealedMessages={revealedMessages}
                          isTyping={isTyping}
                          activeToolRun={activeToolRun}
                          toolCompleted={toolCompleted}
                          onRestart={handleRestartPlayback}
                          chatContainerRef={chatContainerRef}
                          isMobile={true}
                          onArtifactClick={() => handleMobileTabChange('preview')}
                        />
                      </div>
                    )}
                    {mobileSubTab === 'preview' && (
                      <div className="w-full h-full bg-transparent overflow-hidden">
                        {renderPreviewContent(true)}
                      </div>
                    )}
                    {mobileSubTab === 'workflow' && hasWorkflow && (
                      <div className="w-full h-full flex flex-col p-2 relative">
                        <div className="h-full flex flex-col border border-border rounded-lg bg-transparent overflow-hidden relative">
                          <WorkflowDiagram 
                            steps={scenario.workflowSteps} 
                            nodeStates={workflowNodeStates}
                            darkMode={darkMode}
                            isMobile={true}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </div>
      </div>

      {/* 2. Desktop split-screen layout (lg:flex) */}
      <div className="flex h-full flex-col min-h-0 flex-1 hidden lg:flex">
        
        {/* Desktop Header */}
        <header className="bg-background/80 backdrop-blur-md border-b border-border/50 h-12 flex-shrink-0">
          <div className="flex h-full items-center justify-between pl-4 pr-2">
            
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

            {/* Header Right */}
            <div className="flex-shrink-0 flex items-center justify-end">
              <button 
                onClick={handleRestartPlayback}
                className="text-foreground/75 hover:text-foreground text-[10px] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors border border-border bg-card hover:bg-accent px-3 py-1 rounded-full"
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
                  onArtifactClick={() => setActiveRightTab('preview')}
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
                      <motion.span 
                        layoutId="desktopRightTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" 
                      />
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
                        <motion.span 
                          layoutId="desktopRightTabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" 
                        />
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

const getToolCallTitle = (name: string) => {
  switch (name) {
    case 'geo_citation_report': return 'Geo Citation Report';
    case 'search_social_posts': return 'Social Lead Stream';
    case 'search_contacts': return 'Prospect CRM List';
    case 'drafts_created': return 'Email Campaign Drafts';
    case 'seo_keyword_research': return 'SEO Keyword Research';
    default: return 'Interactive Report';
  }
};

// Chat Sidebar UI
const ChatSidebar = ({
  revealedMessages,
  isTyping,
  activeToolRun,
  toolCompleted,
  onRestart,
  chatContainerRef,
  isMobile = false,
  onArtifactClick
}: {
  revealedMessages: any[];
  isTyping: boolean;
  activeToolRun: string | null;
  toolCompleted: boolean;
  onRestart: () => void;
  chatContainerRef: React.RefObject<HTMLDivElement | null>;
  isMobile?: boolean;
  onArtifactClick?: () => void;
}) => {
  return (
    <div className="flex flex-1 min-h-0 flex-col bg-card select-none">
      {/* Scrollable message window */}
      <div 
        ref={chatContainerRef}
        className={`flex-1 overflow-y-auto pl-4 pr-3 py-4 scrollbar-thin scroll-smooth ${
          isMobile ? 'space-y-5' : 'space-y-4'
        }`}
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
                    className={`max-w-[85%] leading-relaxed px-4 py-2.5 rounded-2xl text-left whitespace-pre-wrap bg-accent text-foreground shadow-2xs ${
                      isMobile ? 'text-base' : 'text-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                ) : (
                  /* Agent Message: plain text, no bubble, no avatar */
                  <div 
                    className={`max-w-[90%] leading-relaxed text-left whitespace-pre-wrap text-foreground/90 py-1 ${
                      isMobile ? 'text-base' : 'text-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                )}
              </div>

              {/* Action Row: ThumbsUp, ThumbsDown, Copy */}
              {!isUser && (
                <div className={`flex items-center justify-start pl-0.5 ${isMobile ? 'gap-3.5' : 'gap-2.5'}`}>
                  <button className="text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-pointer">
                    <ThumbsUp className={isMobile ? "h-4 w-4" : "h-3 w-3"} />
                  </button>
                  <button className="text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-pointer">
                    <ThumbsDown className={isMobile ? "h-4 w-4" : "h-3 w-3"} />
                  </button>
                  <button className="text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-pointer">
                    <Copy className={isMobile ? "h-4 w-4" : "h-3 w-3"} />
                  </button>
                </div>
              )}

              {/* Tool Execution Card inside Chat */}
              {msg.toolCall && (
                <button 
                  onClick={onArtifactClick}
                  className="flex items-start w-full cursor-pointer text-left focus:outline-none"
                >
                  <div className="bg-[#FAF9F5] dark:bg-muted/10 border border-border/80 rounded-xl p-3 flex items-center justify-between w-full max-w-[85%] relative overflow-hidden transition-colors hover:bg-[#F7F5EE] dark:hover:bg-muted/15">
                    {/* Left text portion */}
                    <div className="flex-1 min-w-0 z-10">
                      <div className={`font-semibold text-foreground truncate ${isMobile ? 'text-sm' : 'text-xs'}`}>
                        {getToolCallTitle(msg.toolCall.name)}
                      </div>
                      <div className={`text-muted-foreground/75 mt-0.5 flex items-center gap-1.5 ${isMobile ? 'text-xs' : 'text-[10px]'}`}>
                        {activeToolRun === msg.toolCall.name && !toolCompleted ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin text-primary" />
                            <span>Running analysis...</span>
                          </>
                        ) : (
                          <span>Interactive artifact</span>
                        )}
                      </div>
                    </div>

                    {/* Right rotated card file icon */}
                    <div className="z-10 ml-3 flex-shrink-0 flex items-center justify-center">
                      <div className="bg-background dark:bg-card border border-border/80 rounded-lg p-2 flex items-center justify-center w-9 h-12 transform rotate-[6deg] -mr-1">
                        <FileText className="h-4.5 w-4.5 text-foreground/80" />
                      </div>
                    </div>
                  </div>
                </button>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start justify-start">
            <div className="flex items-center gap-1 bg-muted/10 border border-border/25 rounded-2xl px-4 py-2.5 w-fit">
              <span className={`bg-foreground/35 rounded-full animate-bounce ${isMobile ? 'w-2 h-2' : 'w-1.5 h-1.5'}`} style={{ animationDelay: '0ms' }} />
              <span className={`bg-foreground/35 rounded-full animate-bounce ${isMobile ? 'w-2 h-2' : 'w-1.5 h-1.5'}`} style={{ animationDelay: '150ms' }} />
              <span className={`bg-foreground/35 rounded-full animate-bounce ${isMobile ? 'w-2 h-2' : 'w-1.5 h-1.5'}`} style={{ animationDelay: '300ms' }} />
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
              className={`placeholder:text-muted-foreground/40 m-1 flex min-h-[36px] w-full resize-none rounded-md border-none bg-transparent p-0 leading-snug focus-visible:outline-none disabled:cursor-not-allowed ${
                isMobile ? 'text-base' : 'text-xs'
              }`} 
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

// Custom edge component with 0.5px grey line and brand-colored bursts
const AnimatedBezierEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetPosition,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ ...style, stroke: '#94a3b8', strokeWidth: 0.5 }}
        markerEnd={markerEnd}
      />
      <path
        d={edgePath}
        fill="none"
        stroke="var(--primary)"
        strokeWidth={1.2}
        strokeDasharray="8 35"
        className="animate-edge-burst"
      />
    </>
  );
};

const edgeTypes = {
  custom: AnimatedBezierEdge,
};

const WorkflowNode = ({ data }: any) => {
  const { label, category, output, status } = data;
  const isCompleted = status === 'completed';
  const isRunning = status === 'running';

  const statusColor = isCompleted 
    ? 'bg-blue-500' 
    : isRunning 
      ? 'bg-amber-500 animate-pulse' 
      : 'bg-muted-foreground/35';

  return (
    <div className="group relative">
      {/* Target Handle (Left) */}
      <Handle 
        type="target" 
        position={Position.Left} 
        className="!w-2.5 !h-2.5 !bg-muted-foreground/30 !border-2 !border-background target connectable" 
      />

      {/* Card Body - Borderless Premium Glassmorphism like CustomAutomations */}
      <div 
        className={`relative rounded-xl overflow-hidden transition-all duration-300 ease-out bg-card/85 dark:bg-[#101010]/85 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.35)] flex flex-col border border-border/10 ${isRunning ? 'ring-1 ring-primary/45 border-primary/20' : ''} ${!isCompleted && !isRunning ? 'opacity-70' : ''}`}
        style={{ width: 240, height: 160 }}
      >
        {/* Upper portion */}
        <div className="bg-muted/15 dark:bg-[#101010]/20 h-[90px] overflow-hidden flex flex-col p-3 text-center justify-center">
          <div className="flex items-center gap-1.5 mb-1.5 justify-center flex-shrink-0">
            <span className="text-foreground/40 font-semibold uppercase tracking-wider text-[8px]">
              {isCompleted ? 'Step Complete' : isRunning ? 'Executing' : 'Waiting'}
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center">
            {isCompleted ? (
              <span className="text-foreground/80 font-mono leading-normal font-normal bg-background/50 dark:bg-[#101010]/50 border border-border/30 rounded py-0.5 px-2 max-w-[200px] truncate shadow-2xs text-[9px]">
                {output}
              </span>
            ) : isRunning ? (
              <div className="flex items-center justify-center gap-1.5 text-foreground/80 font-normal font-mono text-[9px]">
                <Loader2 className="h-3 w-3 animate-spin text-foreground/50" /> running agent...
              </div>
            ) : (
              <span className="text-foreground/30 italic text-[9px]">Queued in sequence</span>
            )}
          </div>
        </div>

        {/* Lower portion */}
        <div className="px-4 py-2.5 bg-card/25 flex flex-col justify-center flex-1">
          <div className="text-[13px] font-semibold text-foreground truncate leading-tight">
            {label}
          </div>
          <div className="flex items-center justify-between mt-1.5 gap-2">
            <span className="text-xs text-muted-foreground/60 truncate flex-1">
              {category}
            </span>
            <div className="flex items-center shrink-0">
              <div className={`w-2 h-2 rounded-full ${statusColor}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Source Handle (Right) */}
      <Handle 
        type="source" 
        position={Position.Right} 
        className="!w-2.5 !h-2.5 !bg-muted-foreground/30 !border-2 !border-background source connectable" 
      />
    </div>
  );
};

const workflowNodeTypes = {
  workflowNode: WorkflowNode,
};

const WorkflowFlowInner = ({
  steps,
  nodeStates,
  darkMode,
  isMobile
}: {
  steps: any[];
  nodeStates: Record<string, 'idle' | 'running' | 'completed'>;
  darkMode: boolean;
  isMobile: boolean;
}) => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const nodes: FlowNode[] = useMemo(() => {
    return steps.map((step, idx) => ({
      id: step.id,
      type: 'workflowNode',
      position: { x: 50 + idx * 300, y: 80 },
      data: {
        label: step.label,
        category: step.category,
        output: step.output,
        status: nodeStates[step.id] || 'idle'
      }
    }));
  }, [steps, nodeStates]);

  const edges: Edge[] = useMemo(() => {
    const defaultEdgeOptions = {
      type: 'custom',
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: darkMode ? '#f43f5e' : '#c21d4c',
      },
    };

    const edgeList: Edge[] = [];
    for (let i = 0; i < steps.length - 1; i++) {
      const sourceState = nodeStates[steps[i].id];
      const isFinished = sourceState === 'completed';

      edgeList.push({
        id: `e-${steps[i].id}-${steps[i+1].id}`,
        source: steps[i].id,
        target: steps[i+1].id,
        ...defaultEdgeOptions,
        style: isFinished ? { stroke: darkMode ? '#f2f1f3' : '#101010', strokeWidth: 1 } : { stroke: '#94a3b8', strokeWidth: 0.5 }
      });
    }
    return edgeList;
  }, [steps, nodeStates, darkMode]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={workflowNodeTypes}
        edgeTypes={edgeTypes}
        defaultViewport={{ x: isMobile ? 20 : 80, y: isMobile ? 40 : 50, zoom: isMobile ? 0.85 : 1.15 }}
        colorMode={darkMode ? 'dark' : 'light'}
        nodesDraggable={true}
        nodesConnectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={16} size={1} />
      </ReactFlow>

      {/* Floating Canvas Bottom Toolbar - Aesthetic Controls on the left hand side */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 bg-background/70 dark:bg-[#101010]/70 backdrop-blur-md border border-border/40 rounded-full px-3 py-1.5 shadow-lg">
        <button 
          onClick={() => zoomIn()} 
          className="w-6 h-6 rounded-full flex items-center justify-center bg-card hover:bg-accent text-foreground transition-all duration-150 cursor-pointer border border-border/10 active:scale-90"
          title="Zoom In"
        >
          <Plus className="w-3 h-3" />
        </button>
        <button 
          onClick={() => zoomOut()} 
          className="w-6 h-6 rounded-full flex items-center justify-center bg-card hover:bg-accent text-foreground transition-all duration-150 cursor-pointer border border-border/10 active:scale-90"
          title="Zoom Out"
        >
          <span className="text-xs font-bold leading-none select-none">-</span>
        </button>
        <button 
          onClick={() => fitView({ duration: 800 })} 
          className="w-6 h-6 rounded-full flex items-center justify-center bg-card hover:bg-accent text-foreground transition-all duration-150 cursor-pointer border border-border/10 active:scale-90"
          title="Fit View"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

// Workflow Diagram Panel (React Flow version)
const WorkflowDiagram = ({ 
  steps, 
  nodeStates,
  darkMode,
  isMobile = false
}: { 
  steps: any[]; 
  nodeStates: Record<string, 'idle' | 'running' | 'completed'>;
  darkMode: boolean;
  isMobile?: boolean;
}) => {
  return (
    <div className="h-full w-full select-none relative overflow-hidden bg-background">
      <style>{`
        @keyframes edgeBurst {
          from {
            stroke-dashoffset: 45;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-edge-burst {
          animation: edgeBurst 1.8s linear infinite;
          opacity: 0.95;
        }
        .react-flow__node {
          border: none !important;
          outline: none !important;
          background: transparent !important;
          padding: 0 !important;
        }
        .react-flow__node:focus, .react-flow__node:focus-visible {
          outline: none !important;
        }
        .react-flow__attribution {
          display: none !important;
        }
      `}</style>
      <ReactFlowProvider>
        <WorkflowFlowInner 
          steps={steps} 
          nodeStates={nodeStates} 
          darkMode={darkMode} 
          isMobile={isMobile} 
        />
      </ReactFlowProvider>
    </div>
  );
};
