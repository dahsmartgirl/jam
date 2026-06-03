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
  Check,
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
  isFixedScenario?: boolean;
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
                id: "tw-2",
                platform: "twitter",
                authorName: "Marcus Chen",
                authorHandle: "devtool_cto",
                followers: "12.3k",
                text: "Hot take: most \"AI outreach tools\" just spray and pray with slightly better copy. The personalization is surface level. What I want is something that actually researches the prospect before writing.",
                engagement: { likes: 534, comments: 67, shares: 145 }
              },
              {
                id: "rd-1",
                platform: "reddit",
                authorName: "throwaway_founder",
                subreddit: "r/SaaS",
                authorHandle: "throwaway_founder",
                upvoteRatio: "94%",
                title: "Our cold email reply rate dropped from 8% to 1%. What changed?",
                text: "We used to get solid reply rates on our outbound. Same ICP, same offer, but replies just fell off a cliff. Tried rewriting sequences, switching ESPs, nothing works. Is cold email just dead for SaaS or are we doing something wrong?",
                engagement: { likes: 342, comments: 87 }
              },
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
                id: "rd-3",
                platform: "reddit",
                authorName: "bootstrapped_ben",
                subreddit: "r/SaaS",
                authorHandle: "bootstrapped_ben",
                upvoteRatio: "95%",
                title: "How are you doing outbound in 2026?",
                text: "How are you doing outbound in 2026? What stack are you using? Let me know.",
                engagement: { likes: 290, comments: 59 }
              },
              {
                id: "rd-2",
                platform: "reddit",
                authorName: "series_a_grind",
                subreddit: "r/startups",
                authorHandle: "series_a_grind",
                upvoteRatio: "91%",
                title: "Looking for an alternative to Apollo + Instantly + Lemlist stack",
                text: "Currently paying $400/mo across three tools for outbound. Apollo for leads, Instantly for warmup, Lemlist for sequences. Looking for something that does it all in one place without the complexity. Any recommendations?",
                engagement: { likes: 189, comments: 56 }
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

export default function WorkflowCanvas({ activeTab, setActiveTab, darkMode, isFixedScenario = false }: WorkflowCanvasProps) {
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

  // Redesigned drafts table preview states & functions for send-cold-emails
  const [draftsState, setDraftsState] = useState<any[]>([]);
  const [selectedDraftIds, setSelectedDraftIds] = useState<string[]>([]);
  const [expandedDraftIds, setExpandedDraftIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sendingState, setSendingState] = useState<'idle' | 'sending' | 'success'>('idle');

  const report = useMemo(() => {
    return scenario.messages.find(m => m.toolCall?.output)?.toolCall?.output as any;
  }, [scenario]);

  useEffect(() => {
    if (scenario.id === 'send-cold-emails' && report?.drafts) {
      setDraftsState(report.drafts.map((d: any) => ({ ...d, status: 'Pending' })));
      setSelectedDraftIds([]);
      setExpandedDraftIds([]);
      setSearchQuery('');
      setSendingState('idle');
    }
  }, [scenario, report, playbackKey, toolCompleted]);

  const handleApproveIndividual = (id: string) => {
    setDraftsState(prev => prev.map(d => d.id === id ? { ...d, status: 'Approved' } : d));
  };
  const handleRejectIndividual = (id: string) => {
    setDraftsState(prev => prev.map(d => d.id === id ? { ...d, status: 'Rejected' } : d));
  };
  const handleApproveAll = () => {
    setDraftsState(prev => prev.map(d => ({ ...d, status: 'Approved' })));
  };
  const handleRejectAll = () => {
    setDraftsState(prev => prev.map(d => ({ ...d, status: 'Rejected' })));
  };
  const toggleSelect = (id: string) => {
    setSelectedDraftIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };
  const handleSelectAll = (checked: boolean, filteredIds: string[]) => {
    if (checked) {
      setSelectedDraftIds(filteredIds);
    } else {
      setSelectedDraftIds([]);
    }
  };
  const toggleExpand = (id: string) => {
    setExpandedDraftIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };
  const handleSendApproved = () => {
    const count = draftsState.filter(d => d.status === 'Approved').length;
    if (count === 0) {
      alert('Please approve at least one email draft before sending.');
      return;
    }
    setSendingState('sending');
    setTimeout(() => {
      setSendingState('success');
    }, 1800);
  };

  // Redesigned Rank on AI search states
  const [showGaps, setShowGaps] = useState<boolean>(true);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(true);
  const [showFreshness, setShowFreshness] = useState<boolean>(true);
  const [showChanges, setShowChanges] = useState<boolean>(true);

  // Redesigned Monitor social states
  const [socialFilter, setSocialFilter] = useState<'all' | 'twitter' | 'reddit'>('all');
  const [socialSort, setSocialSort] = useState<'engagement' | 'time'>('engagement');
  const [expandedPostIds, setExpandedPostIds] = useState<string[]>([]);

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
    setShowGaps(true);
    setShowLeaderboard(true);
    setShowFreshness(true);
    setShowChanges(true);
    setSocialFilter('all');
    setSocialSort('engagement');
    setExpandedPostIds([]);

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
          <div className="p-4 sm:p-6 overflow-y-auto h-full text-left bg-background text-foreground space-y-6 select-none shadow-none">
            {/* Header */}
            <div className="flex flex-col gap-1 border-b border-border/40 pb-4 shadow-none">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">AI Citation Report</h2>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground shadow-none">
                <span className="font-mono text-foreground/80">https://trylumen.com</span>
                <span>•</span>
                <span>Checked Apr 3, 2026, 11:30 AM</span>
                <span>•</span>
                <span className="text-green-600 dark:text-green-400 font-medium">+1 citation</span>
              </div>
            </div>

            {/* 3 side-by-side key metric cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 shadow-none">
              <div className="bg-gradient-to-b from-card/60 to-card/25 border border-border/40 hover:border-border/80 hover:bg-card/50 p-3 sm:p-4 rounded-xl flex flex-col justify-center shadow-none transition-all duration-200">
                <span className="text-[9px] sm:text-[11px] text-muted-foreground/80 uppercase font-semibold tracking-wider">Questions Tracked</span>
                <span className="text-xl sm:text-3xl font-bold text-foreground mt-1 tracking-tight">184</span>
              </div>
              <div className="bg-gradient-to-b from-card/60 to-card/25 border border-border/40 hover:border-border/80 hover:bg-card/50 p-3 sm:p-4 rounded-xl flex flex-col justify-center shadow-none transition-all duration-200">
                <span className="text-[9px] sm:text-[11px] text-muted-foreground/80 uppercase font-semibold tracking-wider">Your Citations</span>
                <span className="text-xl sm:text-3xl font-bold text-foreground mt-1 tracking-tight">13</span>
              </div>
              <div className="bg-gradient-to-b from-card/60 to-card/25 border border-border/40 hover:border-border/80 hover:bg-card/50 p-3 sm:p-4 rounded-xl flex flex-col justify-center shadow-none transition-all duration-200">
                <span className="text-[9px] sm:text-[11px] text-muted-foreground/80 uppercase font-semibold tracking-wider">Citation Gaps</span>
                <span className="text-xl sm:text-3xl font-bold text-foreground mt-1 tracking-tight">6</span>
              </div>
            </div>

            {/* Platform Breakdown */}
            <div className="space-y-3 shadow-none">
              <h3 className="text-xs sm:text-sm font-bold tracking-tight text-foreground/90 uppercase">Platform Breakdown</h3>
              <div className="border border-border/40 rounded-xl bg-card/45 overflow-hidden shadow-none">
                {Object.entries(report?.platformBreakdown || {}).map(([platform, stats]: [string, any], idx, arr) => {
                  return (
                    <div 
                      key={platform} 
                      className={`p-3 sm:p-4 flex items-center justify-between text-xs sm:text-sm border-b border-border/40 last:border-b-0 shadow-none`}
                    >
                      <div className="font-semibold text-foreground w-1/3">
                        {platform}
                      </div>
                      <div className="text-muted-foreground text-center w-1/3">
                        {stats.withCitations}/{stats.total} questions cited
                      </div>
                      <div className="text-foreground font-semibold text-right w-1/3">
                        You: cited {stats.ourSiteCited}x
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Competitor Leaderboard (5) Collapsible Section */}
            <div className="space-y-3 shadow-none">
              <button 
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-tight text-foreground/90 uppercase hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-0 outline-none"
              >
                <span>Competitor Leaderboard (5)</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showLeaderboard ? 'rotate-180' : ''}`} />
              </button>
              
              {showLeaderboard && (
                <div className="space-y-2.5 shadow-none">
                  <div className="text-xs text-muted-foreground/75 font-normal pl-0.5">
                    You are cited 13 times
                  </div>
                  <div className="border border-border/40 rounded-xl bg-card/45 overflow-hidden shadow-none">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[500px] sm:min-w-0 table-fixed">
                        <thead>
                          <tr className="bg-muted/15 border-b border-border/40 text-muted-foreground font-semibold select-none">
                            <th className="p-3 w-[30%]">Brand</th>
                            <th className="p-3 w-[25%] text-center">Citations</th>
                            <th className="p-3 w-[45%]">Platforms</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y-0">
                          {[
                            { brand: "HubSpot", citations: 142, platforms: "ChatGPT, Perplexity, Claude" },
                            { brand: "Mailchimp", citations: 98, platforms: "ChatGPT, Perplexity" },
                            { brand: "Apollo.io", citations: 76, platforms: "ChatGPT, Perplexity, Claude" },
                            { brand: "Lemlist", citations: 54, platforms: "ChatGPT, Perplexity" },
                            { brand: "Lumen (Us)", citations: 13, platforms: "ChatGPT, Perplexity, Claude", highlight: true }
                          ].map((row, i) => (
                            <tr 
                              key={i} 
                              className={`hover:bg-muted/5 transition-colors border-b border-border/40 last:border-b-0 ${
                                row.highlight ? 'bg-primary/5 font-semibold' : ''
                              }`}
                            >
                              <td className="p-3 text-foreground truncate max-w-0">{row.brand}</td>
                              <td className="p-3 text-center tabular-nums text-foreground">{row.citations}</td>
                              <td className="p-3 text-muted-foreground truncate max-w-0">{row.platforms}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Content Freshness Collapsible Section */}
            <div className="space-y-3 shadow-none">
              <button 
                onClick={() => setShowFreshness(!showFreshness)}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-tight text-foreground/90 uppercase hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-0 outline-none"
              >
                <span>Content Freshness</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFreshness ? 'rotate-180' : ''}`} />
              </button>
              
              {showFreshness && (
                <div className="space-y-2.5 shadow-none">
                  <div className="text-xs text-muted-foreground/75 font-normal pl-0.5">
                    28 pages published, 9 need refresh
                  </div>
                  <div className="grid grid-cols-3 gap-3 shadow-none">
                    <div className="border border-border/40 bg-gradient-to-b from-card/60 to-card/25 hover:border-border/80 hover:bg-card/50 p-3 rounded-xl flex flex-col justify-center shadow-none transition-all duration-200">
                      <span className="text-[9px] sm:text-[10px] text-muted-foreground/80 uppercase font-semibold tracking-wider">Total Pages</span>
                      <span className="text-lg sm:text-2xl font-bold text-foreground mt-0.5 tracking-tight">28</span>
                    </div>
                    <div className="border border-border/40 bg-gradient-to-b from-card/60 to-card/25 hover:border-border/80 hover:bg-card/50 p-3 rounded-xl flex flex-col justify-center shadow-none transition-all duration-200">
                      <span className="text-[9px] sm:text-[10px] text-muted-foreground/80 uppercase font-semibold tracking-wider">Fresh</span>
                      <span className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400 mt-0.5 tracking-tight">19</span>
                    </div>
                    <div className="border border-border/40 bg-gradient-to-b from-card/60 to-card/25 hover:border-border/80 hover:bg-card/50 p-3 rounded-xl flex flex-col justify-center shadow-none transition-all duration-200">
                      <span className="text-[9px] sm:text-[10px] text-muted-foreground/80 uppercase font-semibold tracking-wider">Stale</span>
                      <span className="text-lg sm:text-2xl font-bold text-amber-600 dark:text-amber-500 mt-0.5 tracking-tight">9</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Changes Since Last Check Collapsible Section */}
            <div className="space-y-3 shadow-none">
              <button 
                onClick={() => setShowChanges(!showChanges)}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-tight text-foreground/90 uppercase hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-0 outline-none"
              >
                <span>Changes Since Last Check</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showChanges ? 'rotate-180' : ''}`} />
              </button>
              
              {showChanges && (
                <div className="border border-border/40 bg-card/45 p-3 rounded-xl flex flex-col gap-1 text-xs text-foreground/85 shadow-none">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400 font-semibold font-mono text-sm">+1 citation</span>
                    <span className="text-muted-foreground/60">•</span>
                    <span className="font-mono text-[11px] text-muted-foreground">ChatGPT</span>
                  </div>
                  <div className="text-muted-foreground text-[11px] leading-relaxed mt-0.5">
                    <span className="font-semibold text-foreground/90 font-mono">trylumen.com/blog/cold-email-tools</span> has been newly cited on ChatGPT for queries regarding best cold outreach stacks.
                  </div>
                </div>
              )}
            </div>

            {/* Citation Gaps Collapsible Table */}
            <div className="space-y-3 shadow-none">
              <button 
                onClick={() => setShowGaps(!showGaps)}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-tight text-foreground/90 uppercase hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-0 outline-none"
              >
                <span>Citation Gaps ({report?.gaps.length || 0})</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showGaps ? 'rotate-180' : ''}`} />
              </button>
              
              {showGaps && (
                <div className="border border-border/40 rounded-xl bg-card/45 overflow-hidden shadow-none">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[500px] sm:min-w-0 table-fixed">
                      <thead>
                        <tr className="bg-muted/15 border-b border-border/40 text-muted-foreground font-semibold select-none">
                          <th className="p-3 w-[60%]">Question</th>
                          <th className="p-3 w-[40%]">Opportunity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-0">
                        {report?.gaps.map((gap: any, i: number) => (
                          <tr key={i} className="hover:bg-muted/5 transition-colors border-b border-border/40 last:border-b-0">
                            <td className="p-3 font-medium text-foreground truncate max-w-0">{gap.question}</td>
                            <td className="p-3 text-muted-foreground truncate max-w-0">{gap.opportunity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'monitor-social': {
        const report = scenario.messages[3].toolCall?.output as any;
        
        // Filter and sort posts
        const processedPosts = (() => {
          let result = [...(report?.posts || [])];
          if (socialFilter !== 'all') {
            result = result.filter(p => p.platform === socialFilter);
          }
          
          const postsWithMetrics = result.map(p => {
            const totalEng = p.engagement.likes + p.engagement.comments + (p.engagement.shares || 0);
            let ageStr = '';
            let ageHours = 0;
            if (p.id === 'tw-2') { ageStr = '2 hours ago'; ageHours = 2; }
            else if (p.id === 'rd-1') { ageStr = '5 hours ago'; ageHours = 5; }
            else if (p.id === 'tw-1') { ageStr = '1 day ago'; ageHours = 24; }
            else if (p.id === 'rd-3') { ageStr = '3 days ago'; ageHours = 72; }
            else if (p.id === 'rd-2') { ageStr = '1 week ago'; ageHours = 168; }
            
            return {
              ...p,
              totalEngagement: totalEng,
              ageStr,
              ageHours
            };
          });
          
          if (socialSort === 'engagement') {
            postsWithMetrics.sort((a, b) => b.totalEngagement - a.totalEngagement);
          } else {
            postsWithMetrics.sort((a, b) => a.ageHours - b.ageHours);
          }
          
          return postsWithMetrics;
        })();

        const togglePostExpand = (postId: string) => {
          setExpandedPostIds(prev => 
            prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
          );
        };

        return (
          <div className="p-4 sm:p-6 overflow-y-auto h-full text-left bg-background text-foreground space-y-6 shadow-none">
            {/* Header */}
            <div className="flex flex-col gap-1 border-b border-border/40 pb-4 shadow-none">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">Social Search Results</h2>
            </div>

            {/* 4 side-by-side metric cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 shadow-none">
              <div className="bg-gradient-to-b from-card/60 to-card/25 border border-border/40 hover:border-border/80 hover:bg-card/50 p-3 sm:p-4 rounded-xl flex flex-col justify-center shadow-none transition-all duration-200">
                <span className="text-[9px] sm:text-[11px] text-muted-foreground/80 uppercase font-semibold tracking-wider">Total Found</span>
                <span className="text-xl sm:text-2xl font-bold text-foreground mt-1 tracking-tight">127</span>
              </div>
              <div className="bg-gradient-to-b from-card/60 to-card/25 border border-border/40 hover:border-border/80 hover:bg-card/50 p-3 sm:p-4 rounded-xl flex flex-col justify-center shadow-none transition-all duration-200">
                <span className="text-[9px] sm:text-[11px] text-muted-foreground/80 uppercase font-semibold tracking-wider">Twitter</span>
                <span className="text-xl sm:text-2xl font-bold text-foreground mt-1 tracking-tight">67</span>
              </div>
              <div className="bg-gradient-to-b from-card/60 to-card/25 border border-border/40 hover:border-border/80 hover:bg-card/50 p-3 sm:p-4 rounded-xl flex flex-col justify-center shadow-none transition-all duration-200">
                <span className="text-[9px] sm:text-[11px] text-muted-foreground/80 uppercase font-semibold tracking-wider">Reddit</span>
                <span className="text-xl sm:text-2xl font-bold text-foreground mt-1 tracking-tight">60</span>
              </div>
              <div className="bg-gradient-to-b from-card/60 to-card/25 border border-border/40 hover:border-border/80 hover:bg-card/50 p-3 sm:p-4 rounded-xl flex flex-col justify-center shadow-none transition-all duration-200">
                <span className="text-[9px] sm:text-[11px] text-muted-foreground/80 uppercase font-semibold tracking-wider">Total Engagement</span>
                <span className="text-xl sm:text-2xl font-bold text-foreground mt-1 tracking-tight">2.4K</span>
              </div>
            </div>

            {/* Filter & Sort row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2 shadow-none">
              {/* Redesigned Filter segmented button group */}
              <div className="border border-border/40 bg-muted/20 p-1 rounded-lg flex gap-1 w-fit shadow-none">
                {(['all', 'twitter', 'reddit'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSocialFilter(tab)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer border-0 outline-none ${
                      socialFilter === tab
                        ? 'bg-card text-foreground shadow-none'
                        : 'bg-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Redesigned Sort segmented button group */}
              <div className="border border-border/40 bg-muted/20 p-1 rounded-lg flex gap-1 w-fit shadow-none">
                <button
                  onClick={() => setSocialSort('engagement')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer border-0 outline-none ${
                    socialSort === 'engagement'
                      ? 'bg-card text-foreground shadow-none'
                      : 'bg-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Engagement
                </button>
                <button
                  onClick={() => setSocialSort('time')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer border-0 outline-none ${
                    socialSort === 'time'
                      ? 'bg-card text-foreground shadow-none'
                      : 'bg-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Time
                </button>
              </div>
            </div>

            {/* Posts feed list container */}
            <div className="space-y-3 shadow-none">
              <div className="flex justify-between items-center pb-2 border-b border-border/40 shadow-none">
                <span className="font-bold text-sm text-foreground">Posts ({processedPosts.length})</span>
              </div>

              <div className="space-y-3 shadow-none">
                {processedPosts.map((post: any) => {
                  const isExpanded = expandedPostIds.includes(post.id);
                  const platformIcon = post.platform === 'twitter' ? <TwitterIcon /> : <RedditIcon />;
                  
                  // Compute platform-specific engagement display for header
                  const isTwitter = post.platform === 'twitter';
                  const engagementHeaderDisplay = isTwitter
                    ? `Likes ${post.engagement.likes} · Reposts ${post.engagement.shares}`
                    : `Upvotes ${post.engagement.likes} · Comments ${post.engagement.comments}`;

                  return (
                    <div
                      key={post.id}
                      onClick={() => togglePostExpand(post.id)}
                      className="border border-border/40 rounded-xl bg-card/45 overflow-hidden hover:border-border/80 transition-colors cursor-pointer text-left shadow-none"
                    >
                      {/* Post Card Header */}
                      <div className="p-4 flex items-center justify-between gap-3 select-none border-b border-border/40 last:border-b-0 shadow-none">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePostExpand(post.id);
                            }}
                            className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
                          >
                            <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                          </button>
                          <div className="flex-shrink-0">{platformIcon}</div>
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="font-semibold text-foreground text-sm">{post.authorName}</span>
                            <span className="text-muted-foreground text-xs font-mono">
                              {isTwitter ? `@${post.authorHandle}` : `r/${post.subreddit}`}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                          <span className="font-medium text-foreground/80">{engagementHeaderDisplay}</span>
                          <span>•</span>
                          <span>{post.ageStr}</span>
                        </div>
                      </div>

                      {/* Post Card Body / Snippet */}
                      <div className="px-4 pb-4 pt-3 pl-12 text-left shadow-none">
                        {post.title && (
                          <h4 className="font-bold text-foreground text-sm mb-1 leading-snug">{post.title}</h4>
                        )}
                        
                        {isExpanded ? (
                          <div className="space-y-4 shadow-none">
                            <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-wrap">{post.text}</p>
                            
                            <div className="flex flex-wrap items-center gap-3 text-xs border-t border-border/40 pt-3 shadow-none">
                              <span className="text-muted-foreground font-mono">
                                {isTwitter ? `Followers: ${post.followers}` : `Upvote Ratio: ${post.upvoteRatio}`}
                              </span>
                              <span className="text-border/40">•</span>
                              <div className="flex items-center gap-3 font-mono text-muted-foreground shadow-none">
                                {isTwitter ? (
                                  <>
                                    <span>Likes: {post.engagement.likes}</span>
                                    <span>Reposts: {post.engagement.shares}</span>
                                    <span>Comments: {post.engagement.comments}</span>
                                  </>
                                ) : (
                                  <>
                                    <span>Upvotes: {post.engagement.likes}</span>
                                    <span>Comments: {post.engagement.comments}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-sm truncate leading-relaxed">
                            {post.text}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
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
        const drafts = draftsState.length > 0 ? draftsState : (report?.drafts || []).map((d: any) => ({ ...d, status: 'Pending' }));
        
        const filteredDrafts = drafts.filter((d: any) => 
          d.toName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.toEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.subject.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const pendingCount = drafts.filter((d: any) => d.status === 'Pending').length;
        const approvedCount = drafts.filter((d: any) => d.status === 'Approved').length;

        const isAllSelected = filteredDrafts.length > 0 && filteredDrafts.every((d: any) => selectedDraftIds.includes(d.id));

        if (sendingState === 'sending') {
          return (
            <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-background select-none min-h-[400px]">
              <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
              <div className="text-base font-semibold text-foreground">Sending approved emails...</div>
              <div className="text-xs text-muted-foreground mt-1.5 font-mono">Connecting to warmed-up mailboxes...</div>
            </div>
          );
        }

        if (sendingState === 'success') {
          return (
            <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-background select-none min-h-[400px]">
              <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500 mb-4 animate-bounce">
                <Check className="h-6 w-6" />
              </div>
              <div className="text-lg font-semibold text-foreground">Campaign Launched!</div>
              <div className="text-sm text-muted-foreground mt-1">
                {approvedCount} email{approvedCount === 1 ? '' : 's'} sent successfully.
              </div>
              <button 
                onClick={() => {
                  setSendingState('idle');
                  setDraftsState(prev => prev.map((d: any) => ({ ...d, status: 'Pending' })));
                  setSelectedDraftIds([]);
                }}
                className="mt-6 bg-foreground text-background hover:opacity-90 font-semibold px-4 py-2 rounded-lg text-xs transition-opacity shadow-sm cursor-pointer"
              >
                Reset Campaign Demo
              </button>
            </div>
          );
        }

        return (
          <div className="h-full flex flex-col bg-background text-foreground select-none overflow-y-auto p-4 sm:p-5 space-y-4">
            
            {/* Header Block */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/20 pb-4 shrink-0">
              <div className="text-left">
                <h2 className="text-xl font-bold text-foreground tracking-tight">Drafts</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Showing {drafts.length} emails for this campaign.
                </p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-1.5">
                <button 
                  onClick={() => alert('Settings: Custom variables mapped: [Company], [Role], [AI Search citation gap]')}
                  className="flex items-center gap-1 px-3 py-1.5 border border-border bg-card hover:bg-accent text-foreground text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                  <span>Customize</span>
                </button>
                <div className="text-[10px] text-muted-foreground/80 font-mono">
                  {drafts.length} drafts shown · {pendingCount} pending
                </div>
              </div>
            </div>

            {/* Tabs Selector Bar */}
            <div className="border-b border-border/30 flex shrink-0">
              <div className="border-b-2 border-foreground px-4 py-2 text-xs font-semibold text-foreground">
                Drafts ({drafts.length})
              </div>
            </div>

            {/* Filter and Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 shrink-0">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground/45" />
                <input 
                  type="text" 
                  placeholder="Search by name, email, or subject..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-card border border-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/35 focus:outline-none focus:ring-1 focus:ring-foreground/20"
                />
              </div>
              {pendingCount > 0 && (
                <button 
                  onClick={handleApproveAll}
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-border bg-card hover:bg-accent text-foreground text-xs font-semibold rounded-lg transition-colors cursor-pointer w-full sm:w-auto"
                >
                  <Check className="h-3.5 w-3.5 text-green-500" />
                  <span>Approve All ({pendingCount})</span>
                </button>
              )}
            </div>

            {/* Table Container */}
            <div className={`border border-border rounded-xl bg-card overflow-hidden flex-1 min-h-0 ${isMobile ? 'overflow-x-auto' : 'overflow-y-auto'}`}>
              <div className={isMobile ? 'min-w-[600px]' : 'w-full'}>
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-muted/15 border-b border-border/40 text-muted-foreground font-semibold">
                      <th className="p-3 w-12 text-center">
                        <input 
                          type="checkbox" 
                          checked={isAllSelected}
                          onChange={(e) => handleSelectAll(e.target.checked, filteredDrafts.map((d: any) => d.id))}
                          className="rounded border-border text-foreground focus:ring-0 cursor-pointer"
                        />
                      </th>
                      <th className="p-3 w-[25%]">Contact</th>
                      <th className="p-3 w-[35%]">Email</th>
                      <th className="p-3 w-[15%]">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {filteredDrafts.length > 0 ? (
                      filteredDrafts.map((d: any) => {
                        const isExpanded = expandedDraftIds.includes(d.id);
                        const isSelected = selectedDraftIds.includes(d.id);
                        return (
                          <React.Fragment key={d.id}>
                            <tr className={`hover:bg-muted/5 transition-colors ${isSelected ? 'bg-muted/10' : ''}`}>
                              {/* Checkbox and Expand Chevron */}
                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <button 
                                    onClick={() => toggleExpand(d.id)}
                                    className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
                                  >
                                    <ChevronRight className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                  </button>
                                  <input 
                                    type="checkbox" 
                                    checked={isSelected}
                                    onChange={() => toggleSelect(d.id)}
                                    className="rounded border-border text-foreground focus:ring-0 cursor-pointer"
                                  />
                                </div>
                              </td>
                              {/* Contact Name */}
                              <td className="p-3 font-semibold text-foreground">
                                <button 
                                  onClick={() => toggleExpand(d.id)}
                                  className="font-semibold text-foreground hover:underline text-left cursor-pointer focus:outline-none"
                                >
                                  {d.toName}
                                </button>
                              </td>
                              {/* Email */}
                              <td className="p-3 text-muted-foreground font-mono">
                                {d.toEmail}
                              </td>
                              {/* Status Badge */}
                              <td className="p-3">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                  d.status === 'Approved' 
                                    ? 'bg-green-500/10 text-green-600 dark:text-green-400' 
                                    : d.status === 'Rejected'
                                      ? 'bg-red-500/10 text-red-600 dark:text-red-400'
                                      : 'bg-muted text-muted-foreground'
                                }`}>
                                  {d.status}
                                </span>
                              </td>
                              {/* Quick row actions */}
                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button 
                                    onClick={() => handleApproveIndividual(d.id)}
                                    className="p-1 hover:bg-green-500/10 rounded text-muted-foreground hover:text-green-500 transition-colors cursor-pointer"
                                    title="Approve"
                                  >
                                    <Check className="h-3.5 w-3.5" />
                                  </button>
                                  <button 
                                    onClick={() => handleRejectIndividual(d.id)}
                                    className="p-1 hover:bg-red-500/10 rounded text-muted-foreground hover:text-red-500 transition-colors cursor-pointer"
                                    title="Reject"
                                  >
                                    <X className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                            {/* Expanded email view */}
                            {isExpanded && (
                              <tr className="bg-muted/5">
                                <td colSpan={5} className="p-4 border-t border-border/10">
                                  <div className="space-y-3 pl-8 text-left">
                                    <div className="flex items-baseline gap-2 border-b border-border/10 pb-2 text-[11px]">
                                      <span className="text-muted-foreground w-14 shrink-0 font-medium">Subject:</span>
                                      <span className="text-foreground font-semibold font-mono">{d.subject}</span>
                                    </div>
                                    <div className="text-foreground/80 leading-relaxed font-mono text-[11px] whitespace-pre-line bg-card/50 border border-border/10 rounded-xl p-3.5 max-h-[160px] overflow-y-auto">
                                      {d.body}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground italic">
                          No drafts found matching search query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sticky Bottom Actions Bar */}
            <div className="border border-border rounded-xl bg-muted/15 p-4 flex items-center justify-between shrink-0">
              <div className="text-xs text-muted-foreground font-mono">
                {pendingCount} pending · {approvedCount} approved
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleRejectAll}
                  className="text-xs text-muted-foreground hover:text-foreground font-semibold transition-colors cursor-pointer bg-transparent border-0"
                >
                  Reject all
                </button>
                <button 
                  onClick={handleSendApproved}
                  className="flex items-center gap-1.5 bg-foreground text-background hover:opacity-90 font-semibold px-4 py-2 rounded-lg text-xs transition-opacity shadow-sm cursor-pointer"
                >
                  <Send className="h-3 w-3" />
                  <span>Send approved</span>
                </button>
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
    setShowGaps(true);
    setSocialFilter('all');
    setSocialSort('engagement');
    setExpandedPostIds([]);

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
                      {isFixedScenario ? (
                        <div className="flex items-center gap-1 text-xs font-semibold text-foreground truncate select-none">
                          <span className="truncate">{scenario.tabLabel}</span>
                        </div>
                      ) : (
                        <>
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
                        </>
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

const TwitterIcon = () => (
  <svg className="h-4 w-4 text-[#1DA1F2]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const RedditIcon = () => (
  <svg className="h-4 w-4 text-[#FF4500]" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="#FF4500" />
    <path d="M12 4a1.5 1.5 0 011.4 2.1l-.8 1.6c1.6.2 3.1.8 4.2 1.7a1.5 1.5 0 11.2 2.2c-.8-.7-1.8-1.2-2.9-1.4l-.5 2.5c1 .5 1.6 1.4 1.6 2.3 0 1.7-2.3 3-5.2 3s-5.2-1.3-5.2-3c0-1 .6-1.8 1.6-2.3l-.5-2.5c-1.1.2-2.1.7-2.9 1.4a1.5 1.5 0 11.2-2.2c1.1-.9 2.6-1.5 4.2-1.7l-.8-1.6A1.5 1.5 0 0112 4z" fill="white" />
  </svg>
);

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
