-- Set up the table for diagnostic submissions
CREATE TABLE public.diagnostic_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Contact Info (Captured in Step 4)
    company_name VARCHAR(255),
    contact_email VARCHAR(255),
    
    -- Phase 1: Operational Baseline
    primary_role VARCHAR(100), -- Founder, Operations, Sales, Marketing
    current_tech_stack VARCHAR(100), -- Spreadsheets, Disconnected SaaS, Custom Software
    
    -- Phase 2: AI & Bottlenecks
    current_ai_usage VARCHAR(100), -- None, ChatGPT Manual, Zapier/Make, Custom Agents
    primary_bottleneck VARCHAR(100), -- Data Entry, Lead Routing, Client Onboarding, etc.
    
    -- Phase 3: The Financial Reality
    team_size INTEGER,
    manual_hours_weekly INTEGER,
    avg_hourly_rate INTEGER,
    
    -- Calculated Result
    calculated_annual_loss INTEGER
);

-- Note: Row Level Security (RLS) policies and appropriate indices should be added 
-- before production depending on the necessary read/write access patterns.
