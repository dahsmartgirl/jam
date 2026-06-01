import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { 
  ReactFlow, 
  Background, 
  Handle, 
  Position, 
  useNodesState, 
  useEdgesState,
  MarkerType,
  Node,
  Edge,
  ReactFlowProvider,
  useReactFlow,
  getBezierPath,
  BaseEdge,
  EdgeProps,
  Connection,
  addEdge
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
      {/* 0.5px grey line */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ ...style, stroke: '#94a3b8', strokeWidth: 0.5 }}
        markerEnd={markerEnd}
      />
      {/* Brand-colored bursts travelling along the path */}
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

// Unified Node wrapper matching source HTML exactly
const CustomNodeWrapper = ({ 
  nodeId, 
  status = 'completed', 
  title, 
  category, 
  children,
  hideSource = false,
  hideTarget = false,
  isCustom = false,
  onRename,
  onDelete,
  onDuplicate,
  isEditing = false,
  onRenameSave,
  onRenameCancel
}: { 
  nodeId: string; 
  status?: 'completed' | 'idle' | 'running'; 
  title: string; 
  category: string; 
  children: React.ReactNode;
  hideSource?: boolean;
  hideTarget?: boolean;
  isCustom?: boolean;
  onRename?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  isEditing?: boolean;
  onRenameSave?: (newTitle: string) => void;
  onRenameCancel?: () => void;
}) => {
  const statusColor = status === 'completed' ? 'bg-blue-500' : status === 'running' ? 'bg-amber-500 animate-pulse' : 'bg-muted-foreground/50';
  const [tempTitle, setTempTitle] = useState(title);

  useEffect(() => {
    if (isEditing) {
      setTempTitle(title);
    }
  }, [isEditing, title]);

  return (
    <div className="group relative">
      {/* Target Handle Dot (Left) */}
      {!hideTarget && (
        <Handle 
          type="target" 
          position={Position.Left} 
          className="!w-2.5 !h-2.5 !bg-muted-foreground/30 !border-2 !border-background target connectable connectionindicator" 
        />
      )}

      {/* Left Hover Buttons */}
      <div className="absolute -top-3.5 -left-3.5 z-30 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto">
        <button 
          type="button"
          title="View Details" 
          className="w-7 h-7 rounded-full flex items-center justify-center bg-background/80 backdrop-blur border border-border shadow-md hover:bg-accent hover:border-accent-foreground/20 transition-colors duration-150 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-foreground" />
        </button>
      </div>

      {/* Top Actions Panel */}
      <div className="absolute -top-11 left-1/2 -translate-x-1/2 z-30 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/80 backdrop-blur-md border border-border/80 rounded-lg shadow-md px-1.5 py-1 pointer-events-auto">
        <button 
          type="button" 
          onClick={onRename}
          className="flex items-center gap-1 px-1.5 py-1 rounded-md transition-colors duration-150 hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <Pencil className="w-3.5 h-3.5" />
          <span className="text-[10px] font-medium">Rename</span>
        </button>
        <button 
          type="button" 
          onClick={onDuplicate}
          className="flex items-center gap-1 px-1.5 py-1 rounded-md transition-colors duration-150 hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <Copy className="w-3.5 h-3.5" />
          <span className="text-[10px] font-medium">Duplicate</span>
        </button>
        {isCustom && (
          <button 
            type="button" 
            onClick={onDelete}
            className="flex items-center gap-1 px-1.5 py-1 rounded-md transition-colors duration-150 hover:bg-destructive/10 hover:text-destructive cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="text-[10px] font-medium">Delete</span>
          </button>
        )}
      </div>

      {/* Main Card Body (Borderless Premium Glassmorphism) */}
      <div 
        className="relative rounded-xl overflow-hidden transition-all duration-300 ease-out bg-card/85 dark:bg-[#101010]/85 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.35)] hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer flex flex-col border border-border/10"
        style={{ width: 240, height: 160 }}
      >
        {/* Upper portion */}
        <div className="bg-muted/15 dark:bg-[#101010]/20 h-[90px] overflow-hidden flex flex-col">
          {children}
        </div>

        {/* Lower portion */}
        <div className="px-4 py-2.5 bg-card/25 flex flex-col justify-center flex-1">
          {isEditing ? (
            <input
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter') {
                  onRenameSave?.(tempTitle);
                } else if (e.key === 'Escape') {
                  onRenameCancel?.();
                }
              }}
              onBlur={() => {
                onRenameSave?.(tempTitle);
              }}
              className="text-[13px] font-semibold text-foreground bg-accent/50 dark:bg-accent/30 border border-primary/50 rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-primary w-full leading-tight nodrag"
              autoFocus
            />
          ) : (
            <div 
              onDoubleClick={onRename}
              className="text-[13px] font-semibold text-foreground truncate leading-tight select-none hover:text-primary transition-colors duration-150"
              title="Double click to rename"
            >
              {title}
            </div>
          )}
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

      {/* Source Handle Dot (Right) */}
      {!hideSource && (
        <Handle 
          type="source" 
          position={Position.Right} 
          className="!w-2.5 !h-2.5 !bg-muted-foreground/30 !border-2 !border-background source connectable connectionindicator" 
        />
      )}
    </div>
  );
};

// Node 1: Search Contacts
const SearchContactsNode = ({ data, id }: any) => (
  <CustomNodeWrapper 
    nodeId={id} 
    status={data.status || "completed"} 
    title={data.title || "Find Startup Founders"} 
    category={data.category || "Search Contacts"}
    hideTarget={true}
    isCustom={data.isCustom}
    onRename={data.onRename}
    onDelete={data.onDelete}
    onDuplicate={data.onDuplicate}
    isEditing={data.isEditing}
    onRenameSave={data.onRenameSave}
    onRenameCancel={data.onRenameCancel}
  >
    <div className="flex h-full w-full flex-col gap-0.5 p-1.5 text-[8px] text-left">
      <div className="flex items-center gap-1 border-b border-border/5 pb-0.5 font-bold text-foreground/45 px-1">
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
      </div>
    </div>
  </CustomNodeWrapper>
);

// Node 2: Conditional Split
const ConditionalNode = ({ data, id }: any) => (
  <CustomNodeWrapper 
    nodeId={id} 
    status={data.status || "completed"} 
    title={data.title || "Check if contacts found"} 
    category={data.category || "Conditional"}
    isCustom={data.isCustom}
    onRename={data.onRename}
    onDelete={data.onDelete}
    onDuplicate={data.onDuplicate}
    isEditing={data.isEditing}
    onRenameSave={data.onRenameSave}
    onRenameCancel={data.onRenameCancel}
  >
    <div className="flex h-full w-full items-center justify-center p-1.5">
      <div className="flex items-center gap-1">
        <div className="bg-foreground/10 h-px w-2" />
        <div className="bg-background/20 rounded px-2 py-1 text-center shadow-xs">
          <div className="text-foreground/40 text-[6px]">if contacts</div>
          <div className="text-foreground/75 text-[8px] font-medium">&gt; 10</div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-0.5">
            <div className="bg-foreground/10 h-px w-3" />
            <div className="bg-foreground/5 text-foreground/50 rounded px-1.5 py-0.5 text-[6px]">true</div>
          </div>
          <div className="flex items-center gap-0.5">
            <div className="bg-foreground/10 h-px w-3" />
            <div className="bg-foreground/5 text-foreground/50 rounded px-1.5 py-0.5 text-[6px]">false</div>
          </div>
        </div>
      </div>
    </div>
  </CustomNodeWrapper>
);

// Node 3: Ensure Email Infrastructure
const EnsureEmailInfrastructureNode = ({ data, id }: any) => (
  <CustomNodeWrapper 
    nodeId={id} 
    status={data.status || "completed"} 
    title={data.title || "Set up email infrastructure"} 
    category={data.category || "Ensure Email Infrastructure"}
    isCustom={data.isCustom}
    onRename={data.onRename}
    onDelete={data.onDelete}
    onDuplicate={data.onDuplicate}
    isEditing={data.isEditing}
    onRenameSave={data.onRenameSave}
    onRenameCancel={data.onRenameCancel}
  >
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-1.5">
      <div className="bg-background/20 w-full rounded p-1.5 shadow-xs text-left">
        <div className="text-foreground/75 mb-1 text-[7px] font-medium">AgentMail Inbox</div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-1 text-[6px]">
            <span className="text-foreground/40">Email:</span>
            <span className="text-foreground/70 font-mono">outreach@agentmail.io</span>
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
const DraftEmailsNode = ({ data, id }: any) => (
  <CustomNodeWrapper 
    nodeId={id} 
    status={data.status || "completed"} 
    title={data.title || "Draft personalized emails"} 
    category={data.category || "Draft Emails"}
    isCustom={data.isCustom}
    onRename={data.onRename}
    onDelete={data.onDelete}
    onDuplicate={data.onDuplicate}
    isEditing={data.isEditing}
    onRenameSave={data.onRenameSave}
    onRenameCancel={data.onRenameCancel}
  >
    <div className="flex h-full w-full flex-col p-1.5 text-left">
      <div className="bg-background/20 flex flex-1 flex-col gap-0.5 overflow-hidden rounded p-1.5 text-[8px] shadow-xs">
        <div className="flex items-center gap-1">
          <span className="text-foreground/40 w-5">To:</span>
          <span className="text-foreground/70">john@northwind.io</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-foreground/40 w-5">Subj:</span>
          <span className="text-foreground/70 truncate">Quick intro</span>
        </div>
        <div className="bg-foreground/5 my-0.5 h-px" />
        <div className="text-foreground/50 flex-1 overflow-hidden text-[7px] leading-tight space-y-0.5">
          <p>Hi John, I saw Northwind's news and wanted to reach out...</p>
        </div>
      </div>
    </div>
  </CustomNodeWrapper>
);

// Node 5: Send Email
const SendEmailNode = ({ data, id }: any) => (
  <CustomNodeWrapper 
    nodeId={id} 
    status={data.status || "idle"} 
    title={data.title || "Send approved emails"} 
    category={data.category || "Send Email"}
    isCustom={data.isCustom}
    onRename={data.onRename}
    onDelete={data.onDelete}
    onDuplicate={data.onDuplicate}
    isEditing={data.isEditing}
    onRenameSave={data.onRenameSave}
    onRenameCancel={data.onRenameCancel}
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
          <div className="h-2.5 w-2.5 shrink-0 rounded-full border-amber-500 border border-t-transparent animate-spin" />
          <span className="text-foreground/70 flex-1 truncate">john@northwind.io</span>
          <span className="text-[6px] text-amber-500 font-semibold">sending</span>
        </div>
      </div>
    </div>
  </CustomNodeWrapper>
);

// Node 6: Schedule Followups
const ScheduleFollowupsNode = ({ data, id }: any) => (
  <CustomNodeWrapper 
    nodeId={id} 
    status={data.status || "idle"} 
    title={data.title || "Schedule follow-up sequence"} 
    category={data.category || "Schedule Followups"}
    hideSource={true}
    isCustom={data.isCustom}
    onRename={data.onRename}
    onDelete={data.onDelete}
    onDuplicate={data.onDuplicate}
    isEditing={data.isEditing}
    onRenameSave={data.onRenameSave}
    onRenameCancel={data.onRenameCancel}
  >
    <div className="flex h-full w-full flex-col gap-0.5 p-1.5 text-left">
      <div className="bg-background/20 flex items-center gap-1 rounded px-1.5 py-0.5">
        <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
        <span className="text-foreground/50 w-7 text-[6px]">Day 3</span>
        <span className="text-foreground/75 flex-1 truncate text-[6px]">Follow-up #1</span>
      </div>
      <div className="bg-background/20 flex items-center gap-1 rounded px-1.5 py-0.5">
        <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
        <span className="text-foreground/50 w-7 text-[6px]">Day 5</span>
        <span className="text-foreground/75 flex-1 truncate text-[6px]">Follow-up #2</span>
      </div>
    </div>
  </CustomNodeWrapper>
);

// Node 7: Custom User Agent (Created via Add UI)
const CustomAgentNode = ({ data, id }: any) => (
  <CustomNodeWrapper 
    nodeId={id} 
    status={data.status || "idle"} 
    title={data.title || "Custom AI Agent"} 
    category={data.category || "AI Assistant"}
    isCustom={data.isCustom}
    onRename={data.onRename}
    onDelete={data.onDelete}
    onDuplicate={data.onDuplicate}
    isEditing={data.isEditing}
    onRenameSave={data.onRenameSave}
    onRenameCancel={data.onRenameCancel}
  >
    <div className="flex h-full w-full flex-col justify-center items-center p-3 text-center text-xs text-muted-foreground font-mono">
      <div className="text-[9px] text-foreground/70 font-semibold mb-1">Custom Task Execution</div>
      <div className="text-[8px] text-foreground/40">Listening for trigger events...</div>
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
  custom_agent: CustomAgentNode
};

interface CustomAutomationsProps {
  activeTab: string;
  darkMode: boolean;
}

// Inner canvas logic wrapper to gain useReactFlow hooks context
function FlowInner({ darkMode }: { darkMode: boolean }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);

  const flowData = useMemo(() => {
    const defaultEdgeOptions = {
      type: 'custom', // custom animated bezier edge
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: darkMode ? '#f43f5e' : '#c21d4c',
      },
    };

    // Spawn nodes at random layout positions with slight columns flow alignment
    const initialNodes: Node[] = [
      {
        id: '1',
        type: 'search_contacts',
        position: { x: 50 + Math.random() * 80, y: Math.random() * 80 - 40 },
        data: { title: "Find Startup Founders", category: "Search Contacts", isCustom: false },
      },
      {
        id: '2',
        type: 'conditional',
        position: { x: 350 + Math.random() * 80, y: 80 + Math.random() * 80 - 40 },
        data: { title: "Check if contacts found", category: "Conditional", isCustom: false },
      },
      {
        id: '3',
        type: 'ensure_email_infrastructure',
        position: { x: 650 + Math.random() * 80, y: -40 + Math.random() * 80 - 40 },
        data: { title: "Set up email infrastructure", category: "Ensure Email Infrastructure", isCustom: false },
      },
      {
        id: '4',
        type: 'draft_emails',
        position: { x: 950 + Math.random() * 80, y: 40 + Math.random() * 80 - 40 },
        data: { title: "Draft personalized emails", category: "Draft Emails", isCustom: false },
      },
      {
        id: '5',
        type: 'send_email',
        position: { x: 1250 + Math.random() * 80, y: -20 + Math.random() * 80 - 40 },
        data: { title: "Send approved emails", category: "Send Email", isCustom: false },
      },
      {
        id: '6',
        type: 'schedule_followups',
        position: { x: 1550 + Math.random() * 80, y: 60 + Math.random() * 80 - 40 },
        data: { title: "Schedule follow-up sequence", category: "Schedule Followups", isCustom: false },
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

  // Rename action
  const onRenameNode = useCallback((id: string, newTitle: string) => {
    setNodes((nds) => nds.map((n) => n.id === id ? { ...n, data: { ...n.data, title: newTitle } } : n));
  }, [setNodes]);

  // Delete action (and clean up edges associated with it)
  const onDeleteNode = useCallback((id: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
  }, [setNodes, setEdges]);

  // Duplicate action
  const onDuplicateNode = useCallback((id: string) => {
    setNodes((nds) => {
      const sourceNode = nds.find((n) => n.id === id);
      if (!sourceNode) return nds;
      const newId = `user-node-${Date.now()}`;
      const duplicate = {
        ...sourceNode,
        id: newId,
        selected: true,
        position: { x: sourceNode.position.x + 50, y: sourceNode.position.y + 50 },
        data: {
          ...sourceNode.data,
          isCustom: true, // Duplicated node is custom-created so it can be edited/deleted
        },
      };
      const deselectedNodes = nds.map((n) => ({ ...n, selected: false }));
      return deselectedNodes.concat(duplicate);
    });
  }, [setNodes]);

  // Map callbacks dynamically onto nodes list for child node component consumption
  const nodesWithCallbacks = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        isEditing: editingNodeId === node.id,
        onRename: () => setEditingNodeId(node.id),
        onRenameSave: (newTitle: string) => {
          onRenameNode(node.id, newTitle);
          setEditingNodeId(null);
        },
        onRenameCancel: () => setEditingNodeId(null),
        onDelete: () => onDeleteNode(node.id),
        onDuplicate: () => onDuplicateNode(node.id),
      },
    }));
  }, [nodes, editingNodeId, onRenameNode, onDeleteNode, onDuplicateNode]);

  // Create new card/agent node
  const addNewNode = useCallback((type: string) => {
    const id = `user-node-${Date.now()}`;
    let title = 'New Agent';
    let category = 'Custom Action';
    
    if (type === 'search_contacts') {
      title = 'Search Contacts';
      category = 'Contacts';
    } else if (type === 'conditional') {
      title = 'Filter Contacts';
      category = 'Conditional';
    } else if (type === 'draft_emails') {
      title = 'Draft Followups';
      category = 'Drafts';
    } else if (type === 'send_email') {
      title = 'Deliver Email';
      category = 'Delivery';
    } else if (type === 'custom_agent') {
      title = 'Custom AI Agent';
      category = 'AI Assistant';
    }
    
    const newNode = {
      id,
      type,
      position: { 
        x: 400 + Math.random() * 300, 
        y: Math.random() * 200 - 100 
      },
      data: {
        title,
        category,
        isCustom: true,
      }
    };
    
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  // Support drawing connections
  const onConnect = useCallback(
    (params: Connection) => {
      const defaultEdgeOptions = {
        type: 'custom',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: darkMode ? '#f43f5e' : '#c21d4c',
        },
      };
      setEdges((eds) => addEdge({ ...params, ...defaultEdgeOptions }, eds));
    },
    [setEdges, darkMode]
  );

  // Double-click connection line to remove it
  const onEdgeDoubleClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  }, [setEdges]);

  return (
    <div className="relative h-[480px] w-full overflow-hidden border-t border-border/50 bg-background/40">
      <ReactFlow
        nodes={nodesWithCallbacks}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeDoubleClick={onEdgeDoubleClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultViewport={{ x: 100, y: 120, zoom: 1.3 }}
        colorMode={darkMode ? 'dark' : 'light'}
        nodesDraggable={true}
        nodesConnectable={true}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={16} size={1} />
      </ReactFlow>

      {/* Floating Canvas Top Toolbar - Add Agent */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-background/70 dark:bg-[#101010]/70 backdrop-blur-md border border-border/40 rounded-full p-1.5 shadow-lg">
        <span className="text-[9px] text-muted-foreground font-semibold px-2 font-mono uppercase tracking-wider select-none">Add Agent:</span>
        <button
          onClick={() => addNewNode('custom_agent')}
          className="px-2.5 py-1 text-[9px] font-semibold rounded-full bg-card hover:bg-accent border border-border/10 text-foreground transition-all duration-150 cursor-pointer shadow-xs active:scale-95"
        >
          AI Agent
        </button>
        <button
          onClick={() => addNewNode('conditional')}
          className="px-2.5 py-1 text-[9px] font-semibold rounded-full bg-card hover:bg-accent border border-border/10 text-foreground transition-all duration-150 cursor-pointer shadow-xs active:scale-95"
        >
          Split
        </button>
        <button
          onClick={() => addNewNode('draft_emails')}
          className="px-2.5 py-1 text-[9px] font-semibold rounded-full bg-card hover:bg-accent border border-border/10 text-foreground transition-all duration-150 cursor-pointer shadow-xs active:scale-95"
        >
          Draft
        </button>
        <button
          onClick={() => addNewNode('send_email')}
          className="px-2.5 py-1 text-[9px] font-semibold rounded-full bg-card hover:bg-accent border border-border/10 text-foreground transition-all duration-150 cursor-pointer shadow-xs active:scale-95"
        >
          Send
        </button>
      </div>

      {/* Floating Canvas Bottom Toolbar - Aesthetic Controls */}
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
}

export default function CustomAutomations({ activeTab, darkMode }: CustomAutomationsProps) {
  return (
    <section className="section-border bg-transparent">
      <div className="relative overflow-hidden">
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
        <div className="max-w-2xl p-6 md:p-8 lg:p-10">
          <span className="feature-badge">Automations</span>
          <h3 className="text-foreground text-2xl font-light md:text-3xl">
            Build custom automations
          </h3>
          <p className="text-muted-foreground/60 mt-1.5 text-base font-light">
            Assemble the agents that bring you customers around the clock.
          </p>
        </div>
        
        <ReactFlowProvider>
          <FlowInner darkMode={darkMode} />
        </ReactFlowProvider>
        
        <p className="text-center text-[10px] text-muted-foreground py-2 border-t border-border/30 font-mono">
          * Note: Custom automation builder nodes can be dragged around, connected, duplicated, and renamed.
        </p>
      </div>
    </section>
  );
}
