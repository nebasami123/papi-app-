-- Economic Calendar Table
CREATE TABLE IF NOT EXISTS economic_calendar (
    id SERIAL PRIMARY KEY,
    event_time TIMESTAMP WITH TIME ZONE NOT NULL,
    currency VARCHAR(10) NOT NULL,
    impact VARCHAR(20) NOT NULL,
    event TEXT NOT NULL,
    actual VARCHAR(50),
    forecast VARCHAR(50),
    previous VARCHAR(50)
);

-- News Sentiment Feed Table
CREATE TABLE IF NOT EXISTS news_feed (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    source TEXT NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE NOT NULL,
    sentiment VARCHAR(20) NOT NULL,
    currency VARCHAR(10) NOT NULL
);

-- COT History Table
CREATE TABLE IF NOT EXISTS cot_history (
    id SERIAL PRIMARY KEY,
    currency VARCHAR(10) NOT NULL,
    week VARCHAR(50) NOT NULL,
    net_position INTEGER NOT NULL,
    trend VARCHAR(20)
);

-- Central Bank Rates Table
CREATE TABLE IF NOT EXISTS central_bank_rates (
    id SERIAL PRIMARY KEY,
    bank VARCHAR(100) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    rate NUMERIC(5,2) NOT NULL,
    next_meeting DATE,
    bias VARCHAR(20) NOT NULL
);
