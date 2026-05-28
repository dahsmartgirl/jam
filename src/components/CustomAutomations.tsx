import React, { useEffect, useMemo } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  Handle, 
  Position, 
  useNodesState, 
  useEdgesState,
  MarkerType,
  Node,
  Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { 
  Eye, 
  RotateCcw, 
  Pencil, 
  Copy, 
  Trash2, 
  Plus 
} from 'lucide-react';

// Unified Node wrapper matching source HTML exactly
const CustomNodeWrapper = ({ 
  nodeId, 
  status = 'completed', 
  title, 
  category, 
  children,
  hideSource = false,
  hideTarget = false
}: { 
  nodeId: string; 
  status?: 'completed' | 'idle' | 'running'; 
  title: string; 
  category: string; 
  children: React.ReactNode;
  hideSource?: boolean;
  hideTarget?: boolean;
}) => {
  const statusColor = status === 'completed' ? 'bg-blue-500' : status === 'running' ? 'bg-amber-500 animate-pulse' : 'bg-muted-foreground/50';

  return (
    <div className="group relative">
      {/* Target Handle Dot (Left) */}
      {!hideTarget && (
        <Handle 
          type="target" 
          position={Position.Left} 
          id={`1-${nodeId}-null-target`}
          className="!w-3 !h-3 !bg-jam-secondary !border-2 !border-background target connectable connectionindicator" 
        />
      )}

      {/* Left Hover Buttons */}
      <div className="absolute -top-3.5 -left-3.5 z-30 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto">
        <button 
          title="View Details" 
          className="w-7 h-7 rounded-full flex items-center justify-center bg-background border border-border shadow-md hover:bg-accent hover:border-accent-foreground/20 transition-colors duration-150 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-foreground" />
        </button>
      </div>

      {/* Top Actions Panel */}
      <div className="absolute -top-11 left-1/2 -translate-x-1/2 z-30 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background border border-border rounded-lg shadow-md px-1.5 py-1 pointer-events-auto">
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
      <button 
        type="button" 
        title="Add node after" 
        className="absolute top-1/2 -translate-y-1/2 -right-3 z-30 w-6 h-6 rounded-full bg-background border border-border shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-accent hover:border-accent-foreground/20 cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5 text-foreground" />
      </button>

      {/* Main Card Body */}
      <div 
        className="relative rounded-xl border-2 overflow-hidden transition-all duration-200 ease-out bg-card shadow-md hover:shadow-lg border-border hover:border-border/80 cursor-pointer flex flex-col"
        style={{ width: 240, height: 160 }}
      >
        {/* Upper portion */}
        <div className="bg-muted/30 h-[90px] overflow-hidden flex flex-col border-b border-border/50">
          {children}
        </div>

        {/* Lower portion */}
        <div className="px-4 py-2.5 bg-card flex flex-col justify-center flex-1">
          <div className="text-[13px] font-semibold text-foreground truncate leading-tight">
            {title}
          </div>
          <div className="flex items-center justify-between mt-1.5 gap-2">
            <span className="text-xs text-muted-foreground truncate flex-1">
              {category}
            </span>
            <div className="flex items-center shrink-0">
              <div className={`w-2 h-2 rounded-full ${statusColor}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Source Handle Dot (Right) */}
      {!hideSource && (
        <Handle 
          type="source" 
          position={Position.Right} 
          id={`1-${nodeId}-null-source`}
          className="!w-3 !h-3 !bg-jam-secondary !border-2 !border-background source connectable connectionindicator" 
        />
      )}
    </div>
  );
};

// Node 1: Search Contacts
const SearchContactsNode = () => (
  <CustomNodeWrapper 
    nodeId="1" 
    status="completed" 
    title="Find Startup Founders" 
    category="Search Contacts"
    hideTarget={true}
  >
    <div className="flex h-full w-full flex-col gap-0.5 p-1.5 text-[8px] text-left">
      <div className="flex items-center gap-1 border-b border-border/10 pb-0.5 font-bold text-foreground/45 px-1">
        <span className="w-4 shrink-0"></span>
        <span className="flex-1 truncate">Name</span>
        <span className="flex-1 truncate">Company</span>
        <span className="w-10 truncate">Title</span>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col gap-0.5">
        <div className="flex items-center gap-1 px-1 py-0.5">
          <div className="bg-foreground/10 text-foreground/50 flex h-4 w-4 items-center justify-center rounded-full text-[6px] font-medium">JD</div>
          <span className="text-foreground/75 flex-1 truncate font-medium">John Doe</span>
          <span className="text-foreground/50 flex-1 truncate">Northwind</span>
          <span className="text-foreground/45 w-10 truncate">CEO</span>
        </div>
        <div className="flex items-center gap-1 px-1 py-0.5">
          <div className="bg-foreground/10 text-foreground/50 flex h-4 w-4 items-center justify-center rounded-full text-[6px] font-medium">SM</div>
          <span className="text-foreground/75 flex-1 truncate font-medium">Sarah M.</span>
          <span className="text-foreground/50 flex-1 truncate">TechCorp</span>
          <span className="text-foreground/45 w-10 truncate">CTO</span>
        </div>
        <div className="flex items-center gap-1 px-1 py-0.5">
          <div className="bg-foreground/10 text-foreground/50 flex h-4 w-4 items-center justify-center rounded-full text-[6px] font-medium">MJ</div>
          <span className="text-foreground/75 flex-1 truncate font-medium">Mike J.</span>
          <span className="text-foreground/50 flex-1 truncate">StartupX</span>
          <span className="text-foreground/45 w-10 truncate">VP Sales</span>
        </div>
        <div className="flex items-center gap-1 px-1 py-0.5">
          <div className="bg-foreground/10 text-foreground/50 flex h-4 w-4 items-center justify-center rounded-full text-[6px] font-medium">AL</div>
          <span className="text-foreground/75 flex-1 truncate font-medium">Amy L.</span>
          <span className="text-foreground/50 flex-1 truncate">BigCo</span>
          <span className="text-foreground/45 w-10 truncate">Director</span>
        </div>
        <div className="flex items-center gap-1 px-1 py-0.5">
          <div className="bg-foreground/10 text-foreground/50 flex h-4 w-4 items-center justify-center rounded-full text-[6px] font-medium">RK</div>
          <span className="text-foreground/75 flex-1 truncate font-medium">Rob K.</span>
          <span className="text-foreground/50 flex-1 truncate">DevShop</span>
          <span className="text-foreground/45 w-10 truncate">Founder</span>
        </div>
      </div>
    </div>
  </CustomNodeWrapper>
);

// Node 2: Conditional Split
const ConditionalNode = () => (
  <CustomNodeWrapper 
    nodeId="2" 
    status="completed" 
    title="Check if contacts found" 
    category="Conditional"
  >
    <div className="flex h-full w-full items-center justify-center p-1.5">
      <div className="flex items-center gap-1">
        <div className="bg-foreground/20 h-px w-2" />
        <div className="bg-background/50 border-border/60 rounded border px-2 py-1 text-center shadow-xs">
          <div className="text-foreground/40 text-[6px]">if contacts</div>
          <div className="text-foreground/75 text-[8px] font-medium">&gt; 10</div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-0.5">
            <div className="bg-foreground/20 h-px w-3" />
            <div className="bg-foreground/5 text-foreground/50 rounded px-1.5 py-0.5 text-[6px]">true</div>
          </div>
          <div className="flex items-center gap-0.5">
            <div className="bg-foreground/20 h-px w-3" />
            <div className="bg-foreground/5 text-foreground/50 rounded px-1.5 py-0.5 text-[6px]">false</div>
          </div>
        </div>
      </div>
    </div>
  </CustomNodeWrapper>
);

// Node 3: Ensure Email Infrastructure
const EnsureEmailInfrastructureNode = () => (
  <CustomNodeWrapper 
    nodeId="3" 
    status="completed" 
    title="Set up email infrastructure" 
    category="Ensure Email Infrastructure"
  >
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-1.5">
      <div className="bg-background/50 border-border/60 w-full rounded border p-1.5 shadow-xs text-left">
        <div className="text-foreground/75 mb-1 text-[7px] font-medium">AgentMail Inbox</div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-1 text-[6px]">
            <span className="text-foreground/40">Email:</span>
            <span className="text-foreground/70 font-mono">outreach@agentmail.io</span>
          </div>
          <div className="flex items-center gap-1 text-[6px]">
            <span className="text-foreground/40">Limit:</span>
            <span className="text-foreground/70">35/day</span>
          </div>
          <div className="flex items-center gap-1 text-[6px]">
            <span className="text-foreground/40">Status:</span>
            <span className="text-foreground/70">Active</span>
          </div>
        </div>
      </div>
      <div className="text-foreground/40 text-[6px]">Smart Sending enabled</div>
    </div>
  </CustomNodeWrapper>
);

// Node 4: Draft Emails
const DraftEmailsNode = () => (
  <CustomNodeWrapper 
    nodeId="4" 
    status="completed" 
    title="Draft personalized emails" 
    category="Draft Emails"
  >
    <div className="flex h-full w-full flex-col p-1.5 text-left">
      <div className="bg-background/50 border-border/60 flex flex-1 flex-col gap-0.5 overflow-hidden rounded border p-1.5 text-[8px] shadow-xs">
        <div className="flex items-center gap-1">
          <span className="text-foreground/40 w-5">To:</span>
          <span className="text-foreground/70">john@northwind.io</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-foreground/40 w-5">Subj:</span>
          <span className="text-foreground/70 truncate">Quick intro - partnership</span>
        </div>
        <div className="bg-foreground/5 my-0.5 h-px" />
        <div className="text-foreground/50 flex-1 overflow-hidden text-[7px] leading-tight space-y-0.5">
          <p>Hi John,</p>
          <p>I saw Northwind's expansion news and wanted to reach out about a potential partnership...</p>
          <p>Would love to schedule a quick call.</p>
          <p>Best, Sarah</p>
        </div>
      </div>
    </div>
  </CustomNodeWrapper>
);

// Node 5: Send Email
const SendEmailNode = () => (
  <CustomNodeWrapper 
    nodeId="5" 
    status="idle" 
    title="Send approved emails" 
    category="Send Email"
  >
    <div className="flex h-full w-full flex-col gap-1 p-1.5 text-left">
      <div className="flex items-center justify-between px-0.5">
        <span className="text-foreground/40 text-[7px]">Sending...</span>
        <span className="text-foreground/60 text-[7px] font-medium">8/12</span>
      </div>
      <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
        <div className="flex items-center gap-1 rounded px-1 py-0.5 text-[7px] bg-foreground/5">
          <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
          <span className="text-foreground/70 flex-1 truncate">sarah@tech.co</span>
          <span className="text-[6px] text-emerald-500 font-semibold">sent</span>
        </div>
        <div className="flex items-center gap-1 rounded px-1 py-0.5 text-[7px] bg-foreground/5">
          <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
          <span className="text-foreground/70 flex-1 truncate">mike@startup.io</span>
          <span className="text-[6px] text-emerald-500 font-semibold">sent</span>
        </div>
        <div className="flex items-center gap-1 rounded px-1 py-0.5 text-[7px] bg-foreground/5">
          <div className="h-2.5 w-2.5 shrink-0 rounded-full border-amber-500 border border-t-transparent animate-spin" />
          <span className="text-foreground/70 flex-1 truncate">john@northwind.io</span>
          <span className="text-[6px] text-amber-500 font-semibold animate-pulse">sending</span>
        </div>
        <div className="flex items-center gap-1 rounded px-1 py-0.5 text-[7px] opacity-50">
          <div className="h-2 w-2 shrink-0 rounded-full bg-foreground/10" />
          <span className="text-foreground/70 flex-1 truncate">amy@bigco.com</span>
          <span className="text-[6px] text-foreground/40">queued</span>
        </div>
        <div className="flex items-center gap-1 rounded px-1 py-0.5 text-[7px] opacity-50">
          <div className="h-2 w-2 shrink-0 rounded-full bg-foreground/10" />
          <span className="text-foreground/70 flex-1 truncate">rob@dev.io</span>
          <span className="text-[6px] text-foreground/40">queued</span>
        </div>
      </div>
    </div>
  </CustomNodeWrapper>
);

// Node 6: Schedule Followups
const ScheduleFollowupsNode = () => (
  <CustomNodeWrapper 
    nodeId="6" 
    status="idle" 
    title="Schedule follow-up sequence" 
    category="Schedule Followups"
    hideSource={true}
  >
    <div className="flex h-full w-full flex-col gap-0.5 p-1.5 text-left">
      <div className="text-foreground/40 px-0.5 text-[6px]">Follow-up sequence</div>
      <div className="bg-background/50 border-border/30 flex items-center gap-1 rounded border px-1.5 py-0.5">
        <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
        <span className="text-foreground/50 w-7 text-[6px]">Day 3</span>
        <span className="text-foreground/75 flex-1 truncate text-[6px]">Follow-up #1</span>
      </div>
      <div className="bg-background/50 border-border/30 flex items-center gap-1 rounded border px-1.5 py-0.5">
        <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
        <span className="text-foreground/50 w-7 text-[6px]">Day 5</span>
        <span className="text-foreground/75 flex-1 truncate text-[6px]">Follow-up #2</span>
      </div>
      <div className="bg-background/50 border-border/30 flex items-center gap-1 rounded border px-1.5 py-0.5">
        <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/15" />
        <span className="text-foreground/50 w-7 text-[6px]">Day 7</span>
        <span className="text-foreground/75 flex-1 truncate text-[6px]">Follow-up #3</span>
      </div>
      <div className="text-foreground/30 mt-0.5 text-center text-[5px]">Auto-sends if no reply</div>
    </div>
  </CustomNodeWrapper>
);

const nodeTypes = {
  search_contacts: SearchContactsNode,
  conditional: ConditionalNode,
  ensure_email_infrastructure: EnsureEmailInfrastructureNode,
  draft_emails: DraftEmailsNode,
  send_email: SendEmailNode,
  schedule_followups: ScheduleFollowupsNode,
};

interface CustomAutomationsProps {
  activeTab: string;
  darkMode: boolean;
}

export default function CustomAutomations({ activeTab, darkMode }: CustomAutomationsProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const flowData = useMemo(() => {
    const defaultEdgeOptions = {
      type: 'smoothstep',
      animated: true,
      style: { stroke: 'var(--primary)', strokeWidth: 2, strokeDasharray: '4,4' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: darkMode ? '#f43f5e' : '#c21d4c',
      },
    };

    const initialNodes: Node[] = [
      {
        id: '1',
        type: 'search_contacts',
        position: { x: 0, y: 0 },
        data: {},
      },
      {
        id: '2',
        type: 'conditional',
        position: { x: 320, y: 80 },
        data: {},
      },
      {
        id: '3',
        type: 'ensure_email_infrastructure',
        position: { x: 640, y: -40 },
        data: {},
      },
      {
        id: '4',
        type: 'draft_emails',
        position: { x: 960, y: 40 },
        data: {},
      },
      {
        id: '5',
        type: 'send_email',
        position: { x: 1280, y: -20 },
        data: {},
      },
      {
        id: '6',
        type: 'schedule_followups',
        position: { x: 1600, y: 60 },
        data: {},
      },
    ];

    const initialEdges: Edge[] = [
      { id: 'e1-2', source: '1', target: '2', ...defaultEdgeOptions },
      { id: 'e2-3', source: '2', target: '3', ...defaultEdgeOptions },
      { id: 'e3-4', source: '3', target: '4', ...defaultEdgeOptions },
      { id: 'e4-5', source: '4', target: '5', ...defaultEdgeOptions },
      { id: 'e5-6', source: '5', target: '6', ...defaultEdgeOptions },
    ];

    return { nodes: initialNodes, edges: initialEdges };
  }, [darkMode]);

  useEffect(() => {
    setNodes(flowData.nodes);
    setEdges(flowData.edges);
  }, [flowData, setNodes, setEdges]);

  return (
    <section className="section-border bg-transparent">
      <div className="relative overflow-hidden">
        <div className="max-w-2xl p-6 md:p-8 lg:p-10">
          <span className="feature-badge">Automations</span>
          <h3 className="text-foreground text-2xl font-light md:text-3xl">
            Build custom automations
          </h3>
          <p className="text-muted-foreground/60 mt-1.5 text-base font-light">
            Assemble the agents that bring you customers around the clock.
          </p>
        </div>
        
        <div className="relative h-[480px] w-full overflow-hidden border-t border-border/50 bg-background/40">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            colorMode={darkMode ? 'dark' : 'light'}
            fitViewOptions={{ padding: 0.15 }}
            nodesDraggable={true}
            nodesConnectable={false}
          >
            <Background gap={16} size={1} />
            <Controls showInteractive={false} className="!bg-card !border-border" />
          </ReactFlow>
        </div>
        <p className="text-center text-[10px] text-muted-foreground py-2 border-t border-border/30 font-mono">
          * Note: Custom automation builder nodes can be dragged around to reconfigure.
        </p>
      </div>
    </section>
  );
}
