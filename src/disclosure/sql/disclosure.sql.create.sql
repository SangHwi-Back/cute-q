CREATE TABLE stock_close (
  symbol VARCHAR(20) NOT NULL,
  date DATE NOT NULL,
  close NUMERIC,
  PRIMARY KEY (symbol, date)
);