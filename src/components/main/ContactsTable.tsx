import React, { useState } from 'react';
import { Download, ArrowUpDown, MoreHorizontal } from 'lucide-react';

type ContactField = 'name' | 'email' | 'title' | 'company' | 'location' | 'status';

export default function ContactsTable() {
  const [search, setSearch] = useState('');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [sortField, setSortField] = useState<ContactField | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const contacts = [
    { name: 'Rachel Torres', email: 'rachel@growthstack.io', title: 'VP of Marketing', company: 'GrowthStack', location: 'San Francisco, CA', status: 'Enriched' },
    { name: 'David Kim', email: 'david.kim@launchmetrics.com', title: 'Head of Growth', company: 'LaunchMetrics', location: 'New York, NY', status: 'Enriched' },
    { name: 'Priya Sharma', email: 'priya@scaleup.co', title: 'Marketing Director', company: 'ScaleUp', location: 'Austin, TX', status: 'Enriched' },
    { name: 'James Wright', email: 'jwright@velocity.ai', title: 'CMO', company: 'Velocity AI', location: 'San Francisco, CA', status: 'Enriched' },
    { name: 'Nina Patel', email: 'nina@funnel.dev', title: 'Growth Lead', company: 'Funnel Dev', location: 'Seattle, WA', status: 'Enriched' },
    { name: 'Alex Rivera', email: 'alex@basecamp.tech', title: 'VP Marketing', company: 'Basecamp Tech', location: 'Denver, CO', status: 'Enriched' },
    { name: 'Maria Santos', email: 'maria@pipeline.io', title: 'Director of Demand Gen', company: 'Pipeline', location: 'Chicago, IL', status: 'Enriched' }
  ];

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase()) ||
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSort = (field: ContactField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField] || '';
    const valB = b[sortField] || '';
    
    if (valA.toLowerCase() < valB.toLowerCase()) return sortDirection === 'asc' ? -1 : 1;
    if (valA.toLowerCase() > valB.toLowerCase()) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSelectAll = () => {
    if (selectedEmails.length === filteredContacts.length && filteredContacts.length > 0) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(filteredContacts.map(c => c.email));
    }
  };

  const handleSelectOne = (email: string) => {
    setSelectedEmails(prev => 
      prev.includes(email) 
        ? prev.filter(e => e !== email) 
        : [...prev, email]
    );
  };

  const getSortIcon = (field: ContactField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-3 w-3 opacity-30 group-hover:opacity-60 transition-opacity" />;
    }
    return (
      <ArrowUpDown 
        className={`h-3 w-3 text-primary transition-transform ${
          sortDirection === 'desc' ? 'rotate-180' : ''
        }`} 
      />
    );
  };

  return (
    <div className="relative overflow-hidden p-6 lg:min-h-[520px] md:p-8 lg:p-10 flex flex-col justify-between">
      
      {/* Title */}
      <div className="relative z-10 max-w-none lg:max-w-[44%]">
        <span className="feature-badge">Leads</span>
        <h3 className="text-foreground text-2xl font-light md:text-3xl">Find warm leads</h3>
        <p className="text-muted-foreground/60 mt-1.5 text-base font-light">Surface contacts already in your orbit.</p>
      </div>

      {/* Table Overlay container on desktop */}
      <div className="pointer-events-auto relative mt-6 w-full lg:absolute lg:top-8 lg:right-[-30%] lg:bottom-0 lg:left-[48%] lg:mt-0 lg:w-auto lg:top-10">
        <div className="border-border bg-card max-h-[300px] overflow-x-auto overflow-y-hidden rounded-xl border lg:h-full lg:max-h-none lg:overflow-hidden lg:rounded-l-xl lg:rounded-r-none w-full lg:w-[650px] lg:w-[750px] select-none scrollbar-none">
          <div className="flex flex-col h-full">
            
            {/* Header info */}
            <div className="px-4 pt-4 pb-3 border-b border-border/40">
              <h2 className="text-lg font-semibold mb-2 text-foreground">Contacts Found</h2>
              <p className="text-sm text-muted-foreground">Found {contacts.length} contacts matching your criteria</p>
            </div>

            {/* Filter and export */}
            <div className="flex flex-col gap-4 p-4 border-b border-border/40">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-[300px]">
                  <svg 
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Search contacts..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-muted/50 placeholder:text-muted-foreground/60 focus-visible:ring-ring h-9 w-full rounded-md pl-9 pr-3 text-sm focus-visible:ring-1 focus-visible:outline-none border border-border"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => alert(`Exporting ${selectedEmails.length || filteredContacts.length} contacts as CSV...`)}
                    className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap text-sm font-medium transition-all border bg-background shadow-xs hover:bg-accent rounded-md gap-1.5 px-3 h-9 text-foreground border-border"
                  >
                    <Download className="mr-1.5 h-3.5 w-3.5" />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Table Wrapper */}
              <div className="rounded-md border border-border/80 overflow-hidden">
                <div className="relative overflow-auto max-h-[220px] scrollbar-none">
                  <div data-slot="table-container" className="relative w-full overflow-x-auto">
                    <table data-slot="table" className="w-full caption-bottom text-sm border-collapse text-left">
                      <thead data-slot="table-header" className="[&_tr]:border-b bg-background sticky top-0 z-10 border-b border-border/65">
                        <tr data-slot="table-row" className="hover:bg-muted/50 transition-colors border-b border-border/40">
                          <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap" style={{ width: '40px' }}>
                            <button 
                              type="button" 
                              onClick={handleSelectAll}
                              className={`peer h-4 w-4 shrink-0 rounded-sm border transition-all cursor-pointer flex items-center justify-center ${
                                selectedEmails.length === filteredContacts.length && filteredContacts.length > 0
                                  ? 'border-primary bg-primary text-primary-foreground'
                                  : 'border-primary/50 bg-transparent text-transparent'
                              }`}
                            >
                              {selectedEmails.length === filteredContacts.length && filteredContacts.length > 0 && (
                                <svg className="h-3 w-3 fill-current stroke-current stroke-2" viewBox="0 0 24 24" fill="none">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </button>
                          </th>
                          <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap" style={{ width: '140px' }}>
                            <button onClick={() => handleSort('name')} className="group inline-flex cursor-pointer items-center gap-1.5 hover:text-accent-foreground py-2 text-xs font-semibold">
                              Name {getSortIcon('name')}
                            </button>
                          </th>
                          <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap" style={{ width: '160px' }}>
                            <button onClick={() => handleSort('email')} className="group inline-flex cursor-pointer items-center gap-1.5 hover:text-accent-foreground py-2 text-xs font-semibold">
                              Email {getSortIcon('email')}
                            </button>
                          </th>
                          <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap" style={{ width: '140px' }}>
                            <button onClick={() => handleSort('title')} className="group inline-flex cursor-pointer items-center gap-1.5 hover:text-accent-foreground py-2 text-xs font-semibold">
                              Title {getSortIcon('title')}
                            </button>
                          </th>
                          <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap" style={{ width: '120px' }}>
                            <button onClick={() => handleSort('company')} className="group inline-flex cursor-pointer items-center gap-1.5 hover:text-accent-foreground py-2 text-xs font-semibold">
                              Company {getSortIcon('company')}
                            </button>
                          </th>
                          <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap" style={{ width: '140px' }}>
                            <button onClick={() => handleSort('location')} className="group inline-flex cursor-pointer items-center gap-1.5 hover:text-accent-foreground py-2 text-xs font-semibold">
                              Location {getSortIcon('location')}
                            </button>
                          </th>
                          <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap" style={{ width: '100px' }}>
                            <button onClick={() => handleSort('status')} className="group inline-flex cursor-pointer items-center gap-1.5 hover:text-accent-foreground py-2 text-xs font-semibold">
                              Status {getSortIcon('status')}
                            </button>
                          </th>
                          <th className="text-foreground h-10 px-2 text-left align-middle font-semibold whitespace-nowrap text-xs" style={{ width: '60px' }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody data-slot="table-body" className="[&_tr:last-child]:border-0 divide-y divide-border/20 font-sans">
                        {sortedContacts.length === 0 ? (
                          <tr data-slot="table-row" className="hover:bg-muted/50 border-b border-border/20">
                            <td data-slot="table-cell" className="p-4 align-middle whitespace-nowrap h-24 text-center text-muted-foreground text-xs font-light" colSpan={8}>
                              No results found
                            </td>
                          </tr>
                        ) : (
                          sortedContacts.map((contact, idx) => (
                            <tr 
                              key={idx} 
                              data-slot="table-row" 
                              className={`border-b border-border/20 transition-colors text-xs text-foreground/80 ${
                                selectedEmails.includes(contact.email)
                                  ? 'bg-primary/5 hover:bg-primary/10'
                                  : 'hover:bg-muted/30'
                              }`}
                            >
                              <td className="p-2 align-middle">
                                <button 
                                  type="button" 
                                  onClick={() => handleSelectOne(contact.email)}
                                  className={`peer h-4 w-4 shrink-0 rounded-sm border transition-all cursor-pointer flex items-center justify-center ${
                                    selectedEmails.includes(contact.email)
                                      ? 'border-primary bg-primary text-primary-foreground'
                                      : 'border-primary/50 bg-transparent text-transparent'
                                  }`}
                                >
                                  {selectedEmails.includes(contact.email) && (
                                    <svg className="h-3 w-3 fill-current stroke-current stroke-2" viewBox="0 0 24 24" fill="none">
                                      <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                  )}
                                </button>
                              </td>
                              <td className="p-2 align-middle font-semibold text-foreground">{contact.name}</td>
                              <td className="p-2 align-middle font-mono text-[11px] text-muted-foreground">{contact.email}</td>
                              <td className="p-2 align-middle font-medium">{contact.title}</td>
                              <td className="p-2 align-middle">{contact.company}</td>
                              <td className="p-2 align-middle text-muted-foreground">{contact.location}</td>
                              <td className="p-2 align-middle">
                                <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-medium shrink-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1 animate-pulse" />
                                  {contact.status}
                                </span>
                              </td>
                              <td className="p-2 align-middle">
                                <button type="button" className="text-muted-foreground hover:text-foreground cursor-pointer">
                                  <MoreHorizontal className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Table Footer info matching source */}
              <div className="text-muted-foreground flex items-center justify-between text-xs mt-2 px-2 pb-1 font-mono">
                <div>
                  Showing {sortedContacts.length} of {contacts.length} contacts
                  {selectedEmails.length > 0 && ` (${selectedEmails.length} selected)`}
                </div>
                <div className="flex items-center gap-4">
                  <span>Enriched: {contacts.length}</span>
                  <span>Unenriched: 0</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
